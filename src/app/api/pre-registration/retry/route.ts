import { db } from "@/lib/db";
import { jobAuthorized } from "@/lib/ip";
import { pendingCounts, retryDue } from "@/lib/preregistration/attempts";
import { crmLastReconciliation, existsInCrm } from "@/lib/preregistration/crm";

/* Job pianificato (Coolify, ogni 10 minuti). Fa tre cose e risponde 500 se
   qualcosa richiede una persona, così il task fallisce e scatta la notifica:
   1. ritenta i tentativi non terminali;
   2. verifica nel CRM i consegnati e cancella il payload solo dei verificati
      da più di 30 giorni; un consegnato che il CRM non ha più torna «failed»;
   3. controlla che il CRM stia ancora riconciliando (controllo reciproco). */

export const dynamic = "force-dynamic";

const HOUR = 3600_000;

export async function POST(request: Request) {
  if (!jobAuthorized(request)) return new Response(null, { status: 401 });
  const sql = await db();
  const figures: Record<string, number | string> = {};

  Object.assign(figures, await retryDue(sql));

  const toVerify = await sql<{ id: string }[]>`
    select id from preregistration_attempts where status = 'delivered' and verified_at is null and delivered_at < now() - interval '10 minutes' order by delivered_at limit 50`;
  let verified = 0;
  let lost = 0;
  let unknown = 0;
  for (const { id } of toVerify) {
    const exists = await existsInCrm(id);
    if (exists === true) {
      await sql`update preregistration_attempts set verified_at = now() where id = ${id}`;
      verified++;
    } else if (exists === false) {
      // Consegnato ma assente nel CRM (ripristino, cancellazione): si rimanda.
      await sql`update preregistration_attempts set status = 'failed', last_error = 'consegnato ma assente nel CRM', next_attempt_at = now() where id = ${id}`;
      console.error(`[preregistrazione] ${id} risultava consegnato ma il CRM non lo ha: rimesso in coda`);
      lost++;
    } else unknown++;
  }
  Object.assign(figures, { verificati: verified, persiNelCrm: lost, verificaNonRiuscita: unknown });

  const purged = await sql`
    update preregistration_attempts set payload = null, payload_purged_at = now()
    where status = 'delivered' and verified_at is not null and delivered_at < now() - interval '30 days' and payload is not null`;
  figures.payloadCancellati = purged.count;

  const { overdue, rejected } = await pendingCounts(sql);
  figures.inRitardo = overdue;
  figures.respinti = rejected;

  const last = await crmLastReconciliation();
  const crmStale = !last || Date.now() - last.getTime() > 2 * HOUR;
  figures.ultimaRiconciliazioneCrm = last?.toISOString() ?? "mai";

  const problems = [
    overdue > 0 && `${overdue} pre-registrazioni non consegnate da più di un'ora`,
    rejected > 0 && `${rejected} pre-registrazioni respinte dal CRM da controllare`,
    lost > 0 && `${lost} pre-registrazioni sparite dal CRM e rimesse in coda`,
    crmStale && "il CRM non riconcilia le pre-registrazioni da più di 2 ore",
  ].filter(Boolean);
  if (problems.length) console.error(`[preregistrazione] job: ${problems.join("; ")}`);
  return Response.json({ ok: problems.length === 0, problems, figures }, { status: problems.length ? 500 : 200 });
}
