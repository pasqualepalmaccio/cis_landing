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
    select id from preregistration_attempts where kind = 'preregistration' and status = 'delivered' and delivered_at > now() - interval '72 hours'`;
  const { overdue, rejected } = await pendingCounts(sql);
  // Early bird: TUTTE le chiavi consegnate, senza finestra (pochi record, di
  // valore: il CRM le confronta tutte a ogni giro).
  const ebDelivered = await sql<{ id: string }[]>`select id from preregistration_attempts where kind = 'early-bird' and status = 'delivered'`;
  const eb = await pendingCounts(sql, "early-bird");
  return Response.json({
    deliveredKeys: delivered.map((r) => r.id), overdue, rejected,
    earlyBird: { deliveredKeys: ebDelivered.map((r) => r.id), overdue: eb.overdue, rejected: eb.rejected, invalid: eb.invalid },
    generatedAt: new Date().toISOString(),
  });
}
