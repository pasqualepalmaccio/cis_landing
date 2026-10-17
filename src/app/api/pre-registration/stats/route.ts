import { db } from "@/lib/db";
import { jobAuthorized } from "@/lib/ip";
import { pendingCounts } from "@/lib/preregistration/attempts";

/* Letto ogni ora dalla riconciliazione del CRM: quali chiavi la landing dice
   di aver consegnato e quante sono ferme. Solo identificativi e conteggi. */

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!jobAuthorized(request)) return new Response(null, { status: 401 });
  const sql = await db();
  const delivered = await sql<{ id: string }[]>`
    select id from preregistration_attempts where status = 'delivered' and delivered_at > now() - interval '72 hours'`;
  const { overdue, rejected } = await pendingCounts(sql);
  return Response.json({ deliveredKeys: delivered.map((r) => r.id), overdue, rejected, generatedAt: new Date().toISOString() });
}
