import { TERMS_VERSION } from "@/content/early-bird-terms";
import { POLICY_UPDATED } from "@/content/legal/owner";
import { UPDATES_TEXT_VERSION } from "@/content/registration";
import { db, recheckSchema } from "@/lib/db";
import { earlyBirdForm } from "@/lib/early-bird/payload";
import { earlyBirdFormSwitch } from "@/lib/early-bird/switch";
import { termsHash } from "@/lib/early-bird/terms";
import { ipHash } from "@/lib/ip";
import { recordOutcome } from "@/lib/preregistration/attempts";
import { sendEarlyBird } from "@/lib/preregistration/crm";

/* Invio della pre-prenotazione early bird (record 2026-11-16-early-bird.md).
   Stesso schema della pre-registrazione, con tre differenze dalla revisione R3:
   1. anche un invio NON valido si salva (stato «invalid», con i campi in
      errore): una famiglia respinta in silenzio è una prenotazione persa;
   2. la chiave arriva dal browser: un doppio clic o un nuovo invio dopo un
      timeout restituisce l'esito già noto, non crea una seconda prenotazione;
   3. al visitatore si dice solo ciò che è vero: «registrata» (con la causale
      data dal CRM), «ricevuta, la stiamo registrando», o un errore con la mail
      della scuola. Mai «posto prenotato»: il posto lo dà il bonifico. */

export const dynamic = "force-dynamic";

const RATE_WINDOW_MIN = 10;
const RATE_MAX = 5;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const keyOf = (v: unknown) => {
  const k = typeof v === "object" && v ? (v as { key?: unknown }).key : null;
  return typeof k === "string" && UUID.test(k) ? k : null;
};

function parseJson(raw: string): { ok: true; value: unknown } | { ok: false } {
  try {
    return { ok: true, value: JSON.parse(raw) };
  } catch (error) {
    console.warn(`[early-bird] corpo non JSON respinto (400): ${String(error).slice(0, 120)}`);
    return { ok: false };
  }
}

function pathOf(referer: string | null): string {
  if (!referer) return "";
  try {
    return new URL(referer).pathname;
  } catch (error) {
    console.warn(`[early-bird] referer non leggibile, prova senza pagina: ${String(error).slice(0, 120)}`);
    return "";
  }
}

async function database() {
  try {
    return await db();
  } catch (error) {
    // Senza registro si prova comunque la consegna al CRM; se manca anche quello la famiglia riceve 503.
    console.error(`[early-bird] database della landing non raggiungibile: ${String(error)}`);
    return null;
  }
}

export async function POST(request: Request) {
  if (!earlyBirdFormSwitch().enabled) return Response.json({ result: "disabled" }, { status: 403 });

  const raw = await request.text();
  if (raw.length > 30_000) return Response.json({ result: "invalid" }, { status: 413 });
  const json = parseJson(raw);
  if (!json.ok) return Response.json({ result: "invalid" }, { status: 400 });
  const sql = await database();
  const key = keyOf(json.value);
  const parsed = earlyBirdForm.safeParse(json.value);

  // Doppio invio con la stessa chiave: l'esito già noto, nessuna scrittura.
  if (sql && key) {
    const [seen] = await sql<{ status: string; crm_result: string | null }[]>`select status, crm_result from preregistration_attempts where id = ${key} and kind = 'early-bird'`;
    if (seen?.status === "delivered") return Response.json({ result: "delivered", code: seen.crm_result }, { status: 201 });
    if (seen && seen.status !== "invalid") return Response.json({ result: "queued" }, { status: 202 });
  }

  if (!parsed.success) {
    const fields = parsed.error.issues.map((i) => i.path.join("."));
    // Si salva tutto, campi in errore compresi: la segreteria può ricontattare.
    if (sql) {
      try {
        await sql`
          insert into preregistration_attempts (id, kind, status, last_error, payload)
          values (${key ?? crypto.randomUUID()}, 'early-bird', 'invalid', ${fields.join(", ").slice(0, 500)}, ${sql.json(json.value as never)})
          on conflict (id) do update set last_error = excluded.last_error, payload = excluded.payload`;
      } catch (error) {
        recheckSchema();
        console.error(`[early-bird] invio non valido non salvato: ${String(error)}`);
      }
    }
    return Response.json({ result: "invalid", fields }, { status: 422 });
  }

  const form = parsed.data;
  const id = form.key;
  const hash = ipHash(request);
  const page = pathOf(request.headers.get("referer"));
  const userAgent = (request.headers.get("user-agent") ?? "").slice(0, 400);
  const submittedAt = new Date().toISOString();
  const evidence = { attempt: id, page, userAgent, ...(hash ? { ipHash: hash } : {}) };
  const crmBody = {
    idempotencyKey: id,
    parent: form.parent,
    lang: form.lang,
    children: form.children,
    busInterest: form.busInterest,
    futureCity: form.futureCity,
    message: form.message,
    submittedAt,
    termsVersion: TERMS_VERSION,
    termsHash: termsHash(form.lang),
    noticeVersion: POLICY_UPDATED,
    evidence,
    suspicious: false,
    ...(form.wantsUpdates ? { marketingConsent: { source: "landing-early-bird", textVersion: UPDATES_TEXT_VERSION, evidence: { ...evidence, at: submittedAt } } } : {}),
  };

  // 1 · Registro del tentativo PRIMA del CRM. L'antispam marca e non scarta.
  let stored = false;
  if (sql) {
    try {
      const reasons: string[] = [];
      if (form.website) reasons.push("campo esca compilato");
      if (hash) {
        const [row] = await sql<{ n: number }[]>`select count(*)::int as n from preregistration_attempts where ip_hash = ${hash} and received_at > now() - make_interval(mins => ${RATE_WINDOW_MIN})`;
        if ((row?.n ?? 0) >= RATE_MAX) reasons.push(`${(row?.n ?? 0) + 1} invii in ${RATE_WINDOW_MIN} minuti dalla stessa rete`);
      }
      crmBody.suspicious = reasons.length > 0;
      await sql`
        insert into preregistration_attempts (id, kind, status, suspicious, suspicious_reason, ip_hash, payload)
        values (${id}, 'early-bird', 'received', ${crmBody.suspicious}, ${reasons.join("; ") || null}, ${hash}, ${sql.json(crmBody as never)})
        on conflict (id) do update set status = 'received', payload = excluded.payload, last_error = null where preregistration_attempts.status = 'invalid'`;
      stored = true;
    } catch (error) {
      recheckSchema();
      console.error(`[early-bird] ${id} tentativo non salvato: ${String(error)}`);
    }
  }

  // 2 · Consegna al CRM.
  const outcome = await sendEarlyBird(crmBody);
  if (stored && sql) {
    try {
      await recordOutcome(sql, id, outcome, "early-bird");
    } catch (error) {
      // Il tentativo resta «received»: il job lo riprende e l'idempotenza del CRM evita il doppione.
      console.error(`[early-bird] ${id} esito non salvato (${outcome.status}): ${String(error)}`);
    }
  }

  // 3 · Risposta vera.
  if (outcome.status === "delivered") return Response.json({ result: "delivered", code: outcome.result ?? null }, { status: 201 });
  if (outcome.status === "rejected") return Response.json({ result: "rejected" }, { status: 502 });
  if (stored) return Response.json({ result: "queued" }, { status: 202 });
  return Response.json({ result: "error" }, { status: 503 });
}
