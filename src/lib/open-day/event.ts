import { db } from "@/lib/db";

/* L'evento come lo pubblica il CRM (GET /api/v1/events/{slug}). La pagina lo
   rilegge al massimo ogni 60 secondi: i posti mostrati sono indicativi, chi
   decide è l'iscrizione. Se il CRM non risponde, la pagina mostra il ripiego
   («iscrizioni a breve») e lo REGISTRA: il CRM lo legge e allarma se intanto
   l'evento è aperto. Un evento non pubblicato (404) non è un guasto. */

export const OPEN_DAY_SLUG = process.env.OPEN_DAY_SLUG ?? "open-day";

export type PublicSession = { id: string; startsAt: string; endsAt: string; capacity: number; free: number; waitlist: number; started: boolean };
export type PublicEvent = {
  slug: string;
  status: "open" | "closed";
  title: { it: string; en: string };
  place: string;
  sessions: PublicSession[];
  generatedAt: string;
};

export type EventState = { kind: "ok"; event: PublicEvent } | { kind: "unpublished" } | { kind: "unavailable" };

function isEvent(j: unknown): j is PublicEvent {
  const e = j as PublicEvent;
  return Boolean(e && typeof e.slug === "string" && (e.status === "open" || e.status === "closed") && Array.isArray(e.sessions) && e.sessions.every((s) => typeof s.id === "string" && typeof s.free === "number"));
}

async function recordFallback(reason: string) {
  try {
    const sql = await db();
    await sql`insert into open_day_fallbacks (reason) values (${reason.slice(0, 300)})`;
  } catch (error) {
    // sg-ok: il ripiego resta nei log; senza database non c'è altro posto dove scriverlo
    console.error(`[open-day] ripiego non registrato (${reason}): ${String(error)}`);
  }
}

export async function loadEvent(): Promise<EventState> {
  const key = process.env.CRM_API_KEY;
  // In fase di build la chiave non c'è: niente chiamata e niente ripiego registrato.
  if (!key) return { kind: "unavailable" };
  const url = (process.env.CRM_URL ?? "https://crm.cis-colico.com").replace(/\/$/, "");
  try {
    const res = await fetch(`${url}/api/v1/events/${encodeURIComponent(OPEN_DAY_SLUG)}`, {
      headers: { authorization: `Bearer ${key}` },
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(8_000),
    });
    if (res.status === 404) return { kind: "unpublished" };
    if (!res.ok) throw new Error(`il CRM risponde ${res.status}`);
    const json: unknown = await res.json();
    if (!isEvent(json)) throw new Error("risposta del CRM in un formato inatteso");
    return { kind: "ok", event: json };
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.error(`[open-day] evento non letto dal CRM: ${reason}`);
    await recordFallback(reason);
    return { kind: "unavailable" };
  }
}
