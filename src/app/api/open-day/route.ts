import { z } from "zod";

import { AGE_BANDS, MAX_ADULTS, MAX_CHILDREN, OPEN_DAY_ENABLED, OPEN_DAY_NOTICE_VERSION, UPDATES_TEXT_VERSION } from "@/content/open-day";
import { db, recheckSchema } from "@/lib/db";
import { ipHash } from "@/lib/ip";
import { OPEN_DAY_SLUG } from "@/lib/open-day/event";
import { recordOutcome } from "@/lib/preregistration/attempts";
import { sendOpenDayRegistration } from "@/lib/preregistration/crm";

/* Iscrizione all'Open Day (record docs/decisioni/2026-10-27-open-day.md).
   Stesso schema della pre-registrazione:
   1. il tentativo si scrive nel registro della landing PRIMA della chiamata;
   2. poi si chiama il CRM con la chiave del tentativo come idempotencyKey;
   3. al visitatore si dice solo ciò che è vero: confermato o in lista d'attesa
      (201 verificato dal CRM), iscrizioni chiuse (rifiuto del CRM), ricevuto
      e in registrazione (tentativo salvato), oppure errore.
   I posti li decide il CRM: la landing non scarta mai per «sessione piena». */

export const dynamic = "force-dynamic";

const RATE_WINDOW_MIN = 10;
const RATE_MAX = 5;

const formPayload = z.strictObject({
  sessionId: z.uuid(),
  parent: z.strictObject({
    firstName: z.string().trim().min(1).max(100),
    lastName: z.string().trim().min(1).max(100),
    email: z.email().max(254),
    phone: z.string().trim().min(4).max(40),
  }),
  lang: z.enum(["it", "en"]),
  adults: z.number().int().min(1).max(MAX_ADULTS),
  children: z.number().int().min(0).max(MAX_CHILDREN),
  childAgeBands: z.array(z.enum(AGE_BANDS.map((b) => b.v) as [string, ...string[]])).max(MAX_CHILDREN),
  wantsUpdates: z.boolean(),
  /** Campo esca: marca, non scarta. */
  website: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  if (!OPEN_DAY_ENABLED) return Response.json({ result: "disabled" }, { status: 403 });

  const raw = await request.text();
  if (raw.length > 10_000) return Response.json({ result: "invalid" }, { status: 413 });
  let parsed;
  try {
    parsed = formPayload.safeParse(JSON.parse(raw));
  } catch {
    return Response.json({ result: "invalid" }, { status: 400 });
  }
  if (!parsed.success || parsed.data.childAgeBands.length > parsed.data.children) {
    // Solo i nomi dei campi nei log, mai i valori.
    console.warn(`[open-day] respinta dalla validazione: ${parsed.success ? "childAgeBands" : parsed.error.issues.map((i) => i.path.join(".")).join(", ")}`);
    return Response.json({ result: "invalid" }, { status: 422 });
  }
  const form = parsed.data;
  const id = crypto.randomUUID();
  const hash = ipHash(request);
  const page = new URL(request.headers.get("referer") ?? "https://invalid/").pathname;

  const body = {
    idempotencyKey: id,
    sessionId: form.sessionId,
    parent: form.parent,
    lang: form.lang,
    adults: form.adults,
    children: form.children,
    childAgeBands: form.childAgeBands,
    noticeVersion: OPEN_DAY_NOTICE_VERSION,
    suspicious: false,
    ...(form.wantsUpdates
      ? {
          marketingConsent: {
            source: "landing-open-day",
            textVersion: UPDATES_TEXT_VERSION,
            evidence: { attempt: id, page, at: new Date().toISOString(), userAgent: (request.headers.get("user-agent") ?? "").slice(0, 400), ...(hash ? { ipHash: hash } : {}) },
          },
        }
      : {}),
  };

  // 1 · Registro del tentativo. L'antispam marca e non scarta.
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
    body.suspicious = reasons.length > 0;
    await sql`
      insert into preregistration_attempts (id, kind, status, suspicious, suspicious_reason, ip_hash, payload)
      values (${id}, 'open-day', 'received', ${body.suspicious}, ${reasons.join("; ") || null}, ${hash}, ${sql.json({ slug: OPEN_DAY_SLUG, body } as never)})`;
    stored = true;
  } catch (error) {
    recheckSchema();
    console.error(`[open-day] ${id} tentativo non salvato nel registro: ${String(error)}`);
  }

  // 2 · Consegna al CRM.
  const outcome = await sendOpenDayRegistration(OPEN_DAY_SLUG, body);
  if (stored) {
    try {
      await recordOutcome(await db(), id, outcome, "open-day");
    } catch (error) {
      // Il tentativo resta «received»: il job lo riprende e l'idempotenza del CRM evita il doppione.
      console.error(`[open-day] ${id} esito non salvato (${outcome.status}): ${String(error)}`);
    }
  } else {
    console.error(`[open-day] ${id} senza registro, esito CRM: ${outcome.status}${outcome.status === "delivered" ? "" : ` ${outcome.error}`}`);
  }

  // 3 · Risposta vera.
  if (outcome.status === "delivered") return Response.json({ result: outcome.result }, { status: 201 });
  if (outcome.status === "rejected" && (outcome.code === "event_closed" || outcome.code === "session_started")) {
    if (stored) {
      try {
        const sql = await db();
        await sql`update preregistration_attempts set status = 'closed' where id = ${id} and status = 'rejected'`;
      } catch (error) {
        // Resta «rejected»: un falso allarme, non una perdita.
        console.error(`[open-day] ${id} chiusura comunicata ma non registrata: ${String(error)}`);
      }
    }
    return Response.json({ result: "closed" }, { status: 409 });
  }
  if (outcome.status === "rejected") return Response.json({ result: "error" }, { status: 502 });
  if (stored) return Response.json({ result: "queued" }, { status: 202 });
  return Response.json({ result: "error" }, { status: 503 });
}
