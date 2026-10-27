/* Chiamate al CRM, solo lato server. La chiave sta in CRM_API_KEY (variabile
   di runtime in Coolify, mai nell'immagine né nel bundle del browser). */

export type AttemptKind = "preregistration" | "open-day";

export type CrmOutcome =
  /** `result`: esito dichiarato dal CRM (per l'Open Day: confirmed | waitlist). */
  | { status: "delivered"; contactId: string; recordId: string; result?: string }
  /** Il CRM ha esaminato i dati e li rifiuta: ritentare non serve, serve una
   *  persona. `code` distingue i casi (event_closed, session_started…). */
  | { status: "rejected"; error: string; code?: string }
  /** Il CRM non ha risposto come previsto: si ritenta con la stessa chiave. */
  | { status: "failed"; error: string };

function config(): { url: string; key: string } | null {
  const key = process.env.CRM_API_KEY;
  if (!key) return null;
  return { url: (process.env.CRM_URL ?? "https://crm.cis-colico.com").replace(/\/$/, ""), key };
}

async function call(method: "GET" | "POST", path: string, body?: unknown): Promise<{ status: number; json: unknown }> {
  const c = config();
  if (!c) throw new Error("CRM_API_KEY non impostata");
  const res = await fetch(`${c.url}/api/v1${path}`, {
    method,
    headers: { authorization: `Bearer ${c.key}`, "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(15_000),
  });
  const text = await res.text();
  let json: unknown = null;
  try {
    json = JSON.parse(text);
  } catch {
    // Una pagina HTML (sfida di Cloudflare, errore del proxy) non è una risposta del CRM.
    throw new Error(`risposta non JSON (${res.status})`);
  }
  return { status: res.status, json };
}

type Json = Record<string, unknown> | null;
const errorCode = (json: unknown) => {
  const e = (json as Json)?.error as Json;
  return e ? `${String(e.code)}: ${String(e.message ?? "").slice(0, 300)}` : "";
};

/** Successo SOLO con 201, id della pre-registrazione e del contatto, e nessun
 *  dryRun (una chiave di prova risponde 200 senza scrivere). */
export async function sendPreRegistration(body: unknown): Promise<CrmOutcome> {
  try {
    const { status, json } = await call("POST", "/pre-registrations", body);
    const j = json as Json;
    const contact = j?.contact as Json;
    if (status === 201 && !j?.dryRun && typeof j?.preRegistrationId === "string" && typeof contact?.id === "string") {
      return { status: "delivered", contactId: contact.id, recordId: j.preRegistrationId };
    }
    if (status === 400 || status === 409 || status === 422) return { status: "rejected", error: `${status} ${errorCode(json)}` };
    return { status: "failed", error: `${status} ${errorCode(json) || "risposta inattesa"}`.slice(0, 500) };
  } catch (error) {
    return { status: "failed", error: error instanceof Error ? error.message : String(error) };
  }
}

/** Iscrizione all'Open Day. Successo solo con 201, id dell'iscrizione e del
 *  contatto, esito confirmed|waitlist e nessun dryRun. Evento chiuso o sessione
 *  iniziata sono rifiuti con il loro codice: la landing li dice al visitatore. */
export async function sendOpenDayRegistration(slug: string, body: unknown): Promise<CrmOutcome> {
  try {
    const { status, json } = await call("POST", `/events/${encodeURIComponent(slug)}/registrations`, body);
    const j = json as Json;
    const contact = j?.contact as Json;
    const result = j?.status;
    if (status === 201 && !j?.dryRun && typeof j?.registrationId === "string" && typeof contact?.id === "string" && (result === "confirmed" || result === "waitlist")) {
      return { status: "delivered", contactId: contact.id, recordId: j.registrationId, result };
    }
    const code = String(((j?.error as Json)?.code as string | undefined) ?? "");
    if (status === 400 || status === 409 || status === 422) return { status: "rejected", error: `${status} ${errorCode(json)}`, code };
    return { status: "failed", error: `${status} ${errorCode(json) || "risposta inattesa"}`.slice(0, 500) };
  } catch (error) {
    return { status: "failed", error: error instanceof Error ? error.message : String(error) };
  }
}

/** Invio di un tentativo salvato, secondo il suo tipo. */
export function sendAttempt(kind: AttemptKind, payload: unknown): Promise<CrmOutcome> {
  if (kind === "open-day") {
    const p = payload as { slug: string; body: unknown };
    return sendOpenDayRegistration(p.slug, p.body);
  }
  return sendPreRegistration(payload);
}

/** Il record esiste davvero nel CRM? true / false / null = non si sa. */
export async function existsInCrm(idempotencyKey: string, kind: AttemptKind = "preregistration"): Promise<boolean | null> {
  try {
    const path = kind === "open-day" ? `/events/registrations/by-key/${idempotencyKey}` : `/pre-registrations/by-key/${idempotencyKey}`;
    const { status } = await call("GET", path);
    if (status === 200) return true;
    if (status === 404) return false;
    return null;
  } catch {
    // sg-ok: «non si sa» è un esito esplicito (null): il chiamante non cancella nulla e conta il caso
    return null;
  }
}

/** Quando il CRM ha controllato l'ultima volta la landing (controllo reciproco). */
export async function crmLastReconciliation(): Promise<Date | null> {
  try {
    const { status, json } = await call("GET", "/pre-registrations/status");
    const at = status === 200 ? ((json as Json)?.lastReconciliationAt as string | null) : null;
    return at ? new Date(at) : null;
  } catch {
    // sg-ok: null fa scattare l'allarme «CRM non controlla» nel job: il guasto resta visibile
    return null;
  }
}
