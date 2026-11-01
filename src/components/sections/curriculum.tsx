import Link from "next/link";

import type { Dict, Lang } from "@/content";

import { Section } from "../layout/section";
import { Reveal } from "../motion/reveal";
import { Rich } from "../rich";
import { Eyebrow, SectionHead } from "../section-head";
import { CARD } from "../ui/card";
import { IconBadge } from "../ui/icon-badge";
import type { IconName } from "../ui/icons";

/* Pre-K e Primary: temi che si collegano. Lower Secondary: verso il diploma. */
const ICONS: IconName[] = ["network", "mortarboard"];

export function Curriculum({ lang, t }: { lang: Lang; t: Dict["curriculum"] }) {
  return (
    <Section id="curricolo" tone="ivory">
      <SectionHead eyebrow={t.eyebrow} title={t.title} />
      <div className="grid gap-8 md:grid-cols-2">
        {t.cards.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.12}>
            <article className={`h-full rounded-[20px] p-8 sm:p-10 ${CARD}`}>
              <IconBadge name={ICONS[i] ?? "network"} />
              <p className="mt-5 font-label text-[11px] font-bold uppercase tracking-[0.1em] text-accent">{card.kicker}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-heading sm:text-[1.7rem]">{card.title}</h3>
              <p className="mt-4 leading-relaxed text-fg-muted">{card.body}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8">
        <Link href={`/${lang}/curricolo`} className="group inline-flex items-center gap-1.5 font-semibold text-bordeaux">
          {t.more}
          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </Reveal>

      {t.equivalence && (
        <div className="mt-16 border-t border-rule pt-12">
          <Reveal>
            <Eyebrow>{t.equivalence.eyebrow}</Eyebrow>
            <h3 className="mt-4 max-w-2xl font-display text-[clamp(1.7rem,3.2vw,2.4rem)] font-semibold leading-tight text-heading">{t.equivalence.title}</h3>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {t.equivalence.cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.1}>
                <div className="h-full rounded-xl bg-white p-8">
                  <h4 className="font-display text-xl font-semibold text-heading">{c.title}</h4>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
                    <Rich text={c.body} />
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6">
            <div className="tone-navy rounded-xl bg-navy-900 p-8 sm:p-10">
              <h4 className="font-display text-2xl font-semibold text-gold-300">{t.equivalence.parity.title}</h4>
              <p className="mt-3 max-w-4xl leading-relaxed text-fg-muted">
                <Rich text={t.equivalence.parity.body} />
              </p>
              <p className="mt-3 text-sm text-fg-muted">{t.equivalence.parity.note}</p>
            </div>
          </Reveal>
        </div>
      )}
    </Section>
  );
}
