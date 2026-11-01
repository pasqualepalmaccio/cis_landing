import type { Lang } from "@/content";
import type { OpenDayCopy } from "@/content/open-day";
import { localeOf } from "@/lib/format";
import type { PublicEvent } from "@/lib/open-day/event";

/* Data, sessioni, luogo e posti in una riga, sotto il titolo. Tutto viene
   dall'evento pubblicato dal CRM: se il CRM non risponde la striscia non c'è,
   e nessuna ora scritta a mano può contraddire il modulo. */
export function EventStrip({ lang, t, event }: { lang: Lang; t: OpenDayCopy["strip"]; event: PublicEvent }) {
  const fmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(localeOf(lang), { timeZone: "Europe/Rome", ...o });
  const day = fmt({ weekday: "long", day: "numeric", month: "long" });
  const time = fmt({ hour: "2-digit", minute: "2-digit" });
  const days = [...new Set(event.sessions.map((s) => day.format(new Date(s.startsAt))))];
  const open = event.status === "open" ? event.sessions.filter((s) => !s.started) : [];
  const items = [
    { k: t.date, v: days.join(" · ") },
    { k: t.sessions, v: event.sessions.map((s) => time.format(new Date(s.startsAt))).join(" · ") },
    { k: t.place, v: event.place },
    // A iscrizioni chiuse i posti non si dicono: lo dice il riquadro dell'iscrizione.
    ...(open.length ? [{ k: t.seats, v: open.some((s) => s.free > 0) ? t.limited : t.waitlist }] : []),
  ];

  return (
    <dl className={`grid grid-cols-2 gap-x-4 gap-y-6 rounded-[14px] border border-white/14 bg-white/6 p-6 ${items.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
      {items.map((it) => (
        <div key={it.k} className="text-center">
          <dt className="mb-1 font-label text-[11px] uppercase tracking-[0.1em] text-gold-300">{it.k}</dt>
          <dd className="font-display text-xl font-semibold first-letter:uppercase">{it.v}</dd>
        </div>
      ))}
    </dl>
  );
}
