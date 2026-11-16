import type { EarlyBirdCopy } from "@/content/early-bird";
import { EARLY_BIRD } from "@/content/early-bird";
import { fill } from "@/content/open-day";

import { Section } from "../layout/section";
import { Reveal } from "../motion/reveal";
import { Rich } from "../rich";
import { SectionHead } from "../section-head";
import { CARD } from "../ui/card";
import type { EarlyBirdVars } from "./amounts";

/* Le condizioni early bird: tre vantaggi e come assicurarseli. Il modulo di
   pre-prenotazione non c'è ancora: la sezione lo annuncia. */
export function EarlyBirdConditions({ t, vars }: { t: EarlyBirdCopy; vars: EarlyBirdVars }) {
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
      <p className="mt-8 text-center font-label text-sm font-semibold uppercase tracking-[0.06em] text-accent">{t.soon}</p>
      <p className="mt-2 text-center text-fg-muted">
        {t.questions}{" "}
        <a href="mailto:info@cis-colico.com" className="font-semibold text-accent underline underline-offset-4">info@cis-colico.com</a>
      </p>
    </Section>
  );
}
