import type { Lang } from "@/content";
import { fill, type OpenDayCopy } from "@/content/open-day";
import type { PublicSession } from "@/lib/open-day/event";

/* Un turno come biglietto: matrice cremisi con l'ora di inizio, corpo avorio
   con giorno, orario, posti e luogo. Le tacche sono due cerchi del colore del
   fondo. «Prenota» porta ai dati: il turno non si sceglie, lo assegna il CRM. */

const fmt = (lang: Lang, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(lang === "it" ? "it-IT" : "en-GB", { timeZone: "Europe/Rome", ...o });

export function SessionTicket({ lang, t, session: s, place, href }: { lang: Lang; t: OpenDayCopy; session: PublicSession; place: string; href: string }) {
  const time = fmt(lang, { hour: "2-digit", minute: "2-digit" });
  const start = time.format(new Date(s.startsAt));
  const seats = s.started ? t.sessions.started : s.free > 0 ? (s.free === 1 ? t.sessions.freeOne : fill(t.sessions.freeMany, { n: s.free })) : t.sessions.full;

  return (
    <li className={`relative flex overflow-hidden rounded-xl bg-cream text-navy-900 shadow-lift ${s.started ? "opacity-50" : ""}`}>
      <span aria-hidden className="absolute -top-3 left-[calc(var(--spacing)*28-0.75rem)] size-6 rounded-full bg-navy-900 sm:left-[calc(var(--spacing)*36-0.75rem)]" />
      <span aria-hidden className="absolute -bottom-3 left-[calc(var(--spacing)*28-0.75rem)] size-6 rounded-full bg-navy-900 sm:left-[calc(var(--spacing)*36-0.75rem)]" />
      <div className="flex w-28 shrink-0 flex-col items-center justify-center bg-bordeaux px-2 py-6 text-cream sm:w-36">
        <span className="font-label text-xs tracking-[0.18em] uppercase">{t.sessions.at}</span>
        <span className="font-display text-4xl leading-none sm:text-5xl">{start}</span>
      </div>
      <div className="min-w-0 flex-1 px-5 py-5 sm:px-8 sm:py-6">
        <p className="font-display text-2xl leading-tight first-letter:uppercase sm:text-3xl">{fmt(lang, { weekday: "long", day: "numeric", month: "long" }).format(new Date(s.startsAt))}</p>
        <p className="mt-1 text-ink-soft">
          {start}–{time.format(new Date(s.endsAt))} · <span className={s.free > 0 && !s.started ? "" : "font-semibold"}>{seats}</span>
        </p>
        <p className="mt-1 text-ink-soft">{place}</p>
        {s.started ? null : (
          <a href={href} className="mt-3 inline-flex items-center gap-1 font-semibold text-bordeaux hover:text-action-hover">
            {t.sessions.book} <span aria-hidden>→</span>
          </a>
        )}
      </div>
    </li>
  );
}
