import { SUBMISSION_ENABLED, UPDATES_TEXT_VERSION } from "@/content/registration";
import { db, recheckSchema } from "@/lib/db";
import { ipHash } from "@/lib/ip";
import { recordOutcome } from "@/lib/preregistration/attempts";
import { sendPreRegistration } from "@/lib/preregistration/crm";
import { formPayload } from "@/lib/preregistration/payload";

/* Invio della pre-registrazione (record 2026-10-17-invio-preregistrazione-crm).
   Solo lato server: il browser parla con questa rotta, mai con il CRM.
   1. il tentativo si scrive nel database della landing PRIMA della chiamata;
   2. poi si chiama il CRM con la chiave del tentativo come idempotencyKey;
   3. al visitatore si dice solo ciò che è vero: registrato (201 verificato),
      ricevuto e in registrazione (tentativo salvato), oppure errore. */

export const dynamic = "force-dynamic";

const RATE_WINDOW_MIN = 10;
const RATE_MAX = 5;

export async function POST(request: Request) {
  if (!SUBMISSION_ENABLED) return Response.json({ result: "disabled" }, { status: 403 });

  const raw = await request.text();
  if (raw.length > 30_000) return Response.json({ result: "invalid" }, { status: 413 });
  let parsed;
  try {
    parsed = formPayload.safeParse(JSON.parse(raw));
  } catch {
    return Response.json({ result: "invalid" }, { status: 400 });
  }
  if (!parsed.success) {
    // Solo i nomi dei campi nei log, mai i valori.
    const fields = parsed.error.issues.map((i) => i.path.join("."));
    console.warn(`[preregistrazione] respinta dalla validazione: ${fields.join(", ")}`);
    return Response.json({ result: "invalid", fields }, { status: 422 });
  }
  const form = parsed.data;
  const id = crypto.randomUUID();
  const hash = ipHash(request);
  const page = new URL(request.headers.get("referer") ?? "https://invalid/").pathname;

  const crmBody = {
    idempotencyKey: id,
    parent: form.parent,
    lang: form.lang,
    parentLevelIt: form.parentLevelIt ?? null,
    parentLevelEn: form.parentLevelEn ?? null,
    busInterest: form.busInterest,
    message: form.message ?? null,
    children: form.children,
    suspicious: false,
    ...(form.wantsUpdates
      ? {
          marketingConsent: {
            source: "landing-preregistrazione",
            textVersion: UPDATES_TEXT_VERSION,
            evidence: { attempt: id, page, at: new Date().toISOString(), userAgent: (request.headers.get("user-agent") ?? "").slice(0, 400), ...(hash ? { ipHash: hash } : {}) },
          },
        }
      : {}),
  };

  // 1 · Registro del tentativo. L'antispam marca e non scarta (regola cardinale).
  let stored = false;
  try {
    const sql = await db();
    const reasons: string[] = [];
    if (form.website) reasons.push("campo esca compilato");
    if (hash) {
      const [row] = await sql<{ n: number }[]>`
        select count(*)::int as n from preregistration_attempts where ip_hash = ${hash} and received_at > now() - make_interval(mins => ${RATE_WINDOW_MIN})`;
      const n = row?.n ?? 0;
      if (n >= RATE_MAX) reasons.push(`${n + 1} invii in ${RATE_WINDOW_MIN} minuti dalla stessa rete`);
    }
    crmBody.suspicious = reasons.length > 0;
    await sql`
      insert into preregistration_attempts (id, status, suspicious, suspicious_reason, ip_hash, payload)
      values (${id}, 'received', ${crmBody.suspicious}, ${reasons.join("; ") || null}, ${hash}, ${sql.json(crmBody as never)})`;
    stored = true;
  } catch (error) {
    recheckSchema();
    console.error(`[preregistrazione] ${id} tentativo non salvato nel registro: ${String(error)}`);
  }

  // 2 · Consegna al CRM.
  const outcome = await sendPreRegistration(crmBody);
  if (stored) {
    try {
      await recordOutcome(await db(), id, outcome, "preregistration");
    } catch (error) {
      // Il tentativo resta «received»: il job lo riprende e l'idempotenza del CRM evita il doppione.
      console.error(`[preregistrazione] ${id} esito non salvato (${outcome.status}): ${String(error)}`);
    }
  } else {
    console.error(`[preregistrazione] ${id} senza registro, esito CRM: ${outcome.status}${outcome.status === "delivered" ? "" : ` ${outcome.error}`}`);
  }

  // 3 · Risposta vera.
  if (outcome.status === "delivered") return Response.json({ result: "delivered" }, { status: 201 });
  if (stored) return Response.json({ result: "queued" }, { status: 202 });
  return Response.json({ result: "error" }, { status: 503 });
}
