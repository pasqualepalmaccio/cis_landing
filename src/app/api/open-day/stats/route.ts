import { db } from "@/lib/db";
import { jobAuthorized } from "@/lib/ip";
import { pendingCounts } from "@/lib/preregistration/attempts";

/* Letto ogni ora dalla riconciliazione degli eventi del CRM: chiavi delle
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
  return Response.json({ deliveredKeys: delivered.map((r) => r.id), overdue, rejected, fallbacks24h: fb?.n ?? 0, generatedAt: new Date().toISOString() });
}
