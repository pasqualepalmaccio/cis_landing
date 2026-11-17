import { db } from "@/lib/db";
import { jobAuthorized } from "@/lib/ip";
import { pendingCounts } from "@/lib/preregistration/attempts";

/* Letto dalla riconciliazione degli eventi del CRM (ogni ora) e da quella
   delle presenze (ogni 10 minuti): chiavi delle
   iscrizioni Open Day consegnate, ferme, respinte, e quante volte la pagina
   ha mostrato il ripiego. Solo identificativi e conteggi. */

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!jobAuthorized(request)) return new Response(null, { status: 401 });
  const sql = await db();
  const delivered = await sql<{ id: string }[]>`
    select id from preregistration_attempts where kind = 'open-day' and status = 'delivered' and delivered_at > now() - interval '72 hours'`;
  const { overdue, rejected } = await pendingCounts(sql, "open-day");
  const [fb] = await sql<{ n: number }[]>`select count(*)::int as n from open_day_fallbacks where at > now() - interval '24 hours'`;
  // Presenze all'ingresso (QR): lette ogni 10 minuti dal CRM nei giorni dell'evento.
  const checkInDelivered = await sql<{ id: string }[]>`
    select id from preregistration_attempts where kind = 'check-in' and status = 'delivered' and delivered_at > now() - interval '72 hours'`;
  const checkIn = await pendingCounts(sql, "check-in");
  return Response.json({
    deliveredKeys: delivered.map((r) => r.id),
    overdue,
    rejected,
    fallbacks24h: fb?.n ?? 0,
    checkIns: { deliveredKeys: checkInDelivered.map((r) => r.id), overdue: checkIn.overdue, rejected: checkIn.rejected },
    generatedAt: new Date().toISOString(),
  });
}
