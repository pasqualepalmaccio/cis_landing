import type { EarlyBirdCopy } from "@/content/early-bird";
import { EARLY_BIRD } from "@/content/early-bird";
import { fill } from "@/content/open-day";

import { Section } from "../layout/section";
import { Reveal } from "../motion/reveal";
import { Rich } from "../rich";
import { SectionHead } from "../section-head";
import { CARD } from "../ui/card";
import type { EarlyBirdVars } from "@/lib/early-bird/vars";

/* Le condizioni early bird: tre vantaggi, come assicurarseli e il comando
   per prenotare (per ora una mail a info@, finché il modulo non c'è). */
/* `formEnabled`: con il modulo acceso il comando porta al modulo (#prenota),
   altrimenti apre la mail a info@. */
export function EarlyBirdConditions({ t, vars, formEnabled }: { t: EarlyBirdCopy; vars: EarlyBirdVars; formEnabled: boolean }) {
  return (
    <Section id="early-bird" tone="ivory">
      {EARLY_BIRD.PREVIEW ? (
        <p role="note" className="mb-8 rounded-lg border border-bordeaux/40 bg-bordeaux/5 px-4 py-3 text-sm text-bordeaux">
          {t.preview}
        </p>
      ) : null}
      <SectionHead eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <div className="grid gap-5 md:grid-cols-3">
        {t.offers.map((o, i) => (
          <Reveal key={o.value} delay={i * 0.1}>
            <article className={`h-full border-t-4 border-t-gold-500 p-7 ${CARD}`}>
              <p className="font-display text-5xl font-semibold leading-none text-bordeaux">{o.value}</p>
              <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-heading">{o.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{fill(o.body, vars)}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.15}>
        <div className="tone-navy mt-6 rounded-xl bg-bordeaux p-7 shadow-float sm:p-10">
          <p className="font-label text-xs font-semibold uppercase tracking-[0.18em] text-accent">{t.how.eyebrow}</p>
          <h3 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.3rem)] font-semibold leading-tight text-heading">{fill(t.how.title, vars)}</h3>
          <ul className="mt-5 space-y-3 text-[15.5px] leading-relaxed text-fg-muted">
            {t.how.points.map((p) => (
              <li key={p}>
                <Rich text={fill(p, vars)} />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          {/* Una mail, non un collegamento interno: per questo <a> e non ButtonLink. */}
          <a
            href={formEnabled ? "#prenota" : `mailto:info@cis-colico.com?subject=${encodeURIComponent(t.book.subject)}&body=${encodeURIComponent(t.book.body)}`}
            className="group inline-flex items-center gap-2 rounded-[4px] bg-action px-7 py-4 font-label text-[13px] font-semibold uppercase tracking-[0.06em] text-white transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-action-hover hover:shadow-lift"
          >
            {t.book.cta}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          {formEnabled ? null : <p className="max-w-md text-sm text-fg-muted">{t.book.note}</p>}
        </div>
      </Reveal>
    </Section>
  );
}
