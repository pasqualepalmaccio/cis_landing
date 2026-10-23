import Link from "next/link";

import type { Dict, Lang } from "@/content";

import { Container } from "../layout/container";
import { Reveal } from "../motion/reveal";
import { Rich } from "../rich";
import { Eyebrow, SectionHead } from "../section-head";

export function Curriculum({ lang, t }: { lang: Lang; t: Dict["curriculum"] }) {
  return (
    <section id="curricolo" className="relative overflow-hidden bg-navy-800 py-28 sm:py-40">
      <div aria-hidden className="absolute inset-0 bg-[repeating-linear-gradient(115deg,color-mix(in_oklab,var(--color-gold-500)_5%,transparent)_0px,color-mix(in_oklab,var(--color-gold-500)_5%,transparent)_1px,transparent_1px,transparent_90px)]" />
      <Container className="relative">
        <SectionHead eyebrow={t.eyebrow} title={t.title} />
        <div className="grid gap-6 lg:grid-cols-2">
          {t.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.15}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-line bg-navy-900 p-8 transition-colors duration-500 hover:border-gold-500/60 sm:p-12">
                <span
                  aria-hidden
                  className="absolute -right-6 -top-10 font-display text-[11rem] leading-none text-gold-500/[0.06] transition-transform duration-700 ease-out-expo group-hover:-translate-y-3 group-hover:scale-110"
                >
                  {i + 1}
                </span>
                <p className="relative font-label text-xs font-semibold uppercase tracking-[0.2em] text-bordeaux-300">{card.kicker}</p>
                <h3 className="relative mt-4 font-display text-3xl leading-tight sm:text-4xl">{card.title}</h3>
                <p className="relative mt-6 leading-relaxed text-mist">{card.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link
            href={`/${lang}/curricolo`}
            className="group inline-flex items-center gap-3 rounded-full border border-line bg-cream/5 px-7 py-4 font-semibold backdrop-blur transition-colors hover:border-gold-500 hover:bg-cream/10"
          >
            {t.more}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>

        {t.equivalence && (
          <div className="mt-28">
            <Reveal>
              <Eyebrow>{t.equivalence.eyebrow}</Eyebrow>
              <h3 className="mt-5 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,2.8rem)] leading-tight">{t.equivalence.title}</h3>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {t.equivalence.cards.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.1}>
                  <div className="h-full rounded-3xl border border-line bg-navy-900/60 p-8">
                    <h4 className="font-display text-xl text-gold-300">{c.title}</h4>
                    <p className="mt-4 text-[15px] leading-relaxed text-mist">
                      <Rich text={c.body} />
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-5">
              <div className="relative overflow-hidden rounded-3xl border border-gold-500 bg-gradient-to-br from-gold-500/15 to-transparent p-8 sm:p-10">
                <h4 className="font-display text-2xl text-gold-300">{t.equivalence.parity.title}</h4>
                <p className="mt-4 max-w-4xl leading-relaxed text-mist">
                  <Rich text={t.equivalence.parity.body} />
                </p>
                <p className="mt-4 text-sm text-mist/80">{t.equivalence.parity.note}</p>
              </div>
            </Reveal>
          </div>
        )}
      </Container>
    </section>
  );
}
