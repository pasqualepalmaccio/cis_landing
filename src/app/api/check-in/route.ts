import { z } from "zod";

import { CHECK_IN_NOTICE_VERSION } from "@/content/check-in";
import { db, recheckSchema } from "@/lib/db";
import { OPEN_DAY_SLUG } from "@/lib/open-day/event";
import { recordOutcome } from "@/lib/preregistration/attempts";
import { sendCheckIn } from "@/lib/preregistration/crm";

/* Presenza all'ingresso del Meet & Discover CIS, dal QR alla porta
   (record docs/decisioni/2026-11-17-presenze-evento.md). Stesso schema delle
   iscrizioni:
   1. il tentativo si scrive nel registro della landing PRIMA della chiamata;
   2. poi si chiama il CRM con la chiave del tentativo come idempotencyKey;
   3. al visitatore si dice solo ciò che è vero: registrata (201 verificato),
      ricevuta e in registrazione (tentativo salvato), oppure errore con
      l'indicazione di rivolgersi al personale.
   Nessun limite per rete: alla porta tutti condividono il wifi della sala o
   la stessa cella, e un limite marcherebbe come sospette le persone vere.
   L'unico segnale è il campo esca, e marca: non scarta. */

export const dynamic = "force-dynamic";

const formPayload = z.strictObject({
  person: z.strictObject({
    firstName: z.string().trim().min(1).max(100),
    lastName: z.string().trim().min(1).max(100),
    email: z.email().max(254),
    phone: z.string().trim().min(4).max(40),
  }),
  lang: z.enum(["it", "en"]),
  /** «Ho letto l'informativa»: senza, il modulo non è stato compilato davvero. */
  privacyAck: z.literal(true),
  /** Campo esca: marca, non scarta. */
  website: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > 5_000) return Response.json({ result: "invalid" }, { status: 413 });
  let parsed;
  try {
    parsed = formPayload.safeParse(JSON.parse(raw));
  } catch {
    return Response.json({ result: "invalid" }, { status: 400 });
  }
  if (!parsed.success) {
    // Solo i nomi dei campi nei log, mai i valori.
    console.warn(`[presenza] respinta dalla validazione: ${parsed.error.issues.map((i) => i.path.join(".")).join(", ")}`);
    return Response.json({ result: "invalid" }, { status: 422 });
  }
  const form = parsed.data;
  const id = crypto.randomUUID();
  const body = {
    idempotencyKey: id,
    person: form.person,
    lang: form.lang,
    noticeVersion: CHECK_IN_NOTICE_VERSION,
    suspicious: Boolean(form.website),
    ...(form.website ? { suspiciousReason: "campo esca compilato" } : {}),
  };

  // 1 · Registro del tentativo, con lo slug: un ritentativo non cambia evento.
  let stored = false;
  try {
    const sql = await db();
    await sql`
      insert into preregistration_attempts (id, kind, status, suspicious, suspicious_reason, ip_hash, payload)
      values (${id}, 'check-in', 'received', ${body.suspicious}, ${body.suspiciousReason ?? null}, ${null}, ${sql.json({ slug: OPEN_DAY_SLUG, body } as never)})`;
    stored = true;
  } catch (error) {
    recheckSchema();
    console.error(`[presenza] ${id} tentativo non salvato nel registro: ${String(error)}`);
  }

  // 2 · Consegna al CRM.
  const outcome = await sendCheckIn(OPEN_DAY_SLUG, body);
  if (stored) {
    try {
      await recordOutcome(await db(), id, outcome, "check-in");
    } catch (error) {
      // Il tentativo resta «received»: il job lo riprende e l'idempotenza del CRM evita il doppione.
      console.error(`[presenza] ${id} esito non salvato (${outcome.status}): ${String(error)}`);
    }
  } else {
    console.error(`[presenza] ${id} senza registro, esito CRM: ${outcome.status}${outcome.status === "delivered" ? "" : ` ${outcome.error}`}`);
  }

  // 3 · Risposta vera.
  if (outcome.status === "delivered") return Response.json({ result: "delivered" }, { status: 201 });
  if (outcome.status === "rejected") return Response.json({ result: "error" }, { status: 502 });
  if (stored) return Response.json({ result: "queued" }, { status: 202 });
  return Response.json({ result: "error" }, { status: 503 });
}
