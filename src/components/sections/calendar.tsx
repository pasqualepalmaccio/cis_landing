import type { Dict, Lang } from "@/content";
import { CALENDAR } from "@/content/school-year";

const DAY = 86_400_000;
const LOCALE: Record<Lang, string> = { it: "it-IT", en: "en-GB" };

const at = (iso: string) => Date.parse(`${iso}T00:00:00Z`);

/* «mer 1 set 2027» / «Wed 1 Sept 2027»: stesso ordine nelle due lingue. */
function day(lang: Lang, iso: string, year = true) {
  const parts = new Intl.DateTimeFormat(LOCALE[lang], {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).formatToParts(at(iso));
  const get = (type: string) => parts.find((p) => p.type === type)?.value.replace(".", "") ?? "";
  return [get("weekday"), get("day"), get("month"), year ? get("year") : ""].filter(Boolean).join(" ");
}

/* Il calendario 2027/28 su fondo Blu Lario: la barra va dal primo all'ultimo
   giorno di scuola, le pause sono i tratti dorati. Posizioni, giorni di pausa
   e date scritte si ricavano tutti da CALENDAR: nessun numero è scritto due volte. */
export function Calendar({ lang, t }: { lang: Lang; t: Dict["philosophy"]["calendar"] }) {
  const start = at(CALENDAR.first);
  const span = at(CALENDAR.last) - start;
  const pct = (ms: number) => `${((ms - start) / span) * 100}%`;

  const months: { label: string; left: string }[] = [];
  for (let d = new Date(start); d.getTime() <= start + span; d.setUTCMonth(d.getUTCMonth() + 1)) {
    const label = new Intl.DateTimeFormat(LOCALE[lang], { month: "short", timeZone: "UTC" }).format(d).replace(".", "");
    months.push({ label: label.charAt(0).toUpperCase() + label.slice(1, 3), left: pct(d.getTime()) });
  }

  const breaks = CALENDAR.breaks.map((b) => {
    const from = at(b.last) + DAY;
    const to = at(b.back);
    return { ...b, days: Math.round((to - from) / DAY), left: pct(from), width: `${((to - from) / span) * 100}%` };
  });

  return (
    <article className="tone-navy rounded-[20px] bg-navy-900 p-6 sm:p-10">
      <p className="font-label text-[11px] font-bold uppercase tracking-[0.1em] text-gold-300">{t.tag}</p>
      <h3 className="mt-2 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-tight text-heading">{t.title}</h3>

      <div className="mt-6 flex flex-wrap justify-between gap-3 text-sm text-fg-muted">
        <span>
          {t.first} <strong className="font-semibold text-gold-300">{day(lang, CALENDAR.first)}</strong>
        </span>
        <span>
          {t.last} <strong className="font-semibold text-gold-300">{day(lang, CALENDAR.last)}</strong>
        </span>
      </div>

      <div aria-hidden className="relative mt-4 h-4 text-[11px] font-semibold text-fg-muted">
        {months.map((m) => (
          <span key={m.left} className="absolute" style={{ left: m.left }}>
            {m.label}
          </span>
        ))}
      </div>
      <div aria-hidden className="relative mt-1.5 h-9 overflow-hidden rounded bg-navy-700">
        {breaks.map((b) => (
          <span key={b.key} className="absolute inset-y-0 bg-gold-500" style={{ left: b.left, width: b.width }} />
        ))}
      </div>

      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {breaks.map((b) => (
          <li key={b.key} className="text-[13px] leading-relaxed text-fg-muted">
            <p className="text-sm font-semibold text-gold-300">
              {t.breaks[b.key]} · {t.daysOff.replace("{n}", String(b.days))}
            </p>
            <p>
              {t.last} {day(lang, b.last, false)}
            </p>
            <p>
              {t.back} {day(lang, b.back, false)}
            </p>
          </li>
        ))}
      </ul>

      <dl className="mt-7 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {t.stats.map((s, i) => {
          const last = i === t.stats.length - 1;
          return (
            <div key={s.label} className={`rounded-xl border px-5 py-4 ${last ? "border-gold-500 bg-gold-500 text-navy-950" : "border-white/12 bg-white/5"}`}>
              <dt className="sr-only">{s.label}</dt>
              <dd className={`font-display text-2xl font-semibold ${last ? "" : "text-gold-300"}`}>{s.value}</dd>
              <dd className={`mt-1 text-sm ${last ? "" : "text-fg-muted"}`}>{s.label}</dd>
            </div>
          );
        })}
      </dl>

      <p className="mt-5 text-[13px] italic text-fg-muted">{t.note}</p>
    </article>
  );
}
