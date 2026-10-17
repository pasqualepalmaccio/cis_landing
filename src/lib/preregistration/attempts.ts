import type postgres from "postgres";

import { sendPreRegistration, type CrmOutcome } from "./crm";

type Sql = ReturnType<typeof postgres>;

/* Ciclo di vita di un tentativo: received → delivered | failed | rejected.
   failed torna a essere ritentato con la stessa chiave; rejected aspetta una
   persona. Nessuno stato fa sparire il payload: solo la verifica nel CRM
   (verified_at) lo rende cancellabile dopo 30 giorni. */

export async function recordOutcome(sql: Sql, id: string, outcome: CrmOutcome): Promise<void> {
  if (outcome.status === "delivered") {
    await sql`
      update preregistration_attempts set status = 'delivered', attempts = attempts + 1, last_attempt_at = now(), last_error = null,
        delivered_at = now(), crm_contact_id = ${outcome.contactId}, crm_prereg_id = ${outcome.preRegistrationId}
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
  const rows = await sql<{ id: string; payload: unknown }[]>`
    select id, payload from preregistration_attempts
    where status in ('received', 'failed') and next_attempt_at <= now() and received_at < now() - interval '2 minutes' and payload is not null
    order by received_at limit ${limit}`;
  const tally: Record<string, number> = { delivered: 0, failed: 0, rejected: 0 };
  for (const row of rows) {
    const outcome = await sendPreRegistration(row.payload);
    await recordOutcome(sql, row.id, outcome);
    tally[outcome.status] = (tally[outcome.status] ?? 0) + 1;
  }
  return tally;
}

/** Ciò che chiede una persona: non consegnati da più di un'ora e respinti. */
export async function pendingCounts(sql: Sql): Promise<{ overdue: number; rejected: number }> {
  const [row] = await sql<{ overdue: number; rejected: number }[]>`
    select count(*) filter (where status in ('received', 'failed') and received_at < now() - interval '1 hour')::int as overdue,
           count(*) filter (where status = 'rejected')::int as rejected
    from preregistration_attempts`;
  return row ?? { overdue: 0, rejected: 0 };
}
