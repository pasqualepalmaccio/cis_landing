import type postgres from "postgres";

import { sendAttempt, type AttemptKind, type CrmOutcome } from "./crm";

type Sql = ReturnType<typeof postgres>;

/* Ciclo di vita di un tentativo: received → delivered | failed | rejected.
   failed torna a essere ritentato con la stessa chiave; rejected aspetta una
   persona. Nessuno stato fa sparire il payload: solo la verifica nel CRM
   (verified_at) lo rende cancellabile dopo 30 giorni. */

export async function recordOutcome(sql: Sql, id: string, outcome: CrmOutcome, kind: AttemptKind = "preregistration"): Promise<void> {
  if (outcome.status === "delivered") {
    await sql`
      update preregistration_attempts set status = 'delivered', attempts = attempts + 1, last_attempt_at = now(), last_error = null,
        delivered_at = now(), crm_contact_id = ${outcome.contactId}, crm_record_id = ${outcome.recordId}, crm_result = ${outcome.result ?? null},
        crm_prereg_id = ${kind === "preregistration" ? outcome.recordId : null}
      where id = ${id}`;
    return;
  }
  await sql`
    update preregistration_attempts set status = ${outcome.status}, attempts = attempts + 1, last_attempt_at = now(),
      last_error = ${outcome.error.slice(0, 500)},
      -- Attesa crescente: 1, 2, 4… minuti, al massimo un'ora.
      next_attempt_at = now() + make_interval(mins => least(60, power(2, attempts)::int))
    where id = ${id}`;
  console.error(`[preregistrazione] ${id} ${outcome.status}: ${outcome.error}`);
}

/** Ritenta i tentativi non terminali scaduti. La finestra di 2 minuti evita di
 *  correre contro la richiesta del visitatore ancora in corso; se due job si
 *  sovrappongono, l'idempotenza del CRM rende innocuo il doppio invio. */
export async function retryDue(sql: Sql, limit = 20): Promise<Record<string, number>> {
  const rows = await sql<{ id: string; kind: AttemptKind; payload: unknown }[]>`
    select id, kind, payload from preregistration_attempts
    where status in ('received', 'failed') and next_attempt_at <= now() and received_at < now() - interval '2 minutes' and payload is not null
    order by received_at limit ${limit}`;
  const tally: Record<string, number> = { delivered: 0, failed: 0, rejected: 0 };
  for (const row of rows) {
    const outcome = await sendAttempt(row.kind, row.payload);
    await recordOutcome(sql, row.id, outcome, row.kind);
    tally[outcome.status] = (tally[outcome.status] ?? 0) + 1;
  }
  return tally;
}

/** Ciò che chiede una persona: non consegnati oltre la soglia e respinti.
 *  L'Open Day ha una data fissa: la soglia è 15 minuti, non un'ora. */
export async function pendingCounts(sql: Sql, kind: AttemptKind = "preregistration"): Promise<{ overdue: number; rejected: number }> {
  const minutes = kind === "open-day" ? 15 : 60;
  const [row] = await sql<{ overdue: number; rejected: number }[]>`
    select count(*) filter (where status in ('received', 'failed') and received_at < now() - make_interval(mins => ${minutes}))::int as overdue,
           count(*) filter (where status = 'rejected')::int as rejected
    from preregistration_attempts where kind = ${kind}`;
  return row ?? { overdue: 0, rejected: 0 };
}
