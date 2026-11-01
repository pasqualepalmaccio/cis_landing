import type { Dict, Lang } from "@/content";

import { CrestReveal } from "../brand/crest-reveal";
import { Section } from "../layout/section";
import { Magnetic } from "../motion/magnetic";
import { Reveal } from "../motion/reveal";
import { SectionHead } from "../section-head";
import { ButtonLink } from "../ui/button-link";

/* L'invito finale: un riquadro Blu Lario su fondo bianco, con lo stemma. */
export function Interest({ lang, t }: { lang: Lang; t: Dict["interest"] }) {
  return (
    <Section id="interesse" tone="white">
      <div className="tone-navy relative isolate flex flex-col items-center overflow-hidden rounded-[20px] bg-navy-900 px-6 py-14 text-center sm:px-12 sm:py-16">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_oklab,var(--color-gold-500)_18%,transparent),transparent_60%)]" />
        <CrestReveal />
        <SectionHead eyebrow={t.eyebrow} title={t.title} lead={t.lead} align="center" />
        <Reveal>
          <Magnetic strength={0.4}>
            <ButtonLink href={`/${lang}/registrazione`} arrow>
              {t.cta}
            </ButtonLink>
          </Magnetic>
          <p className="mt-5 text-[13px] text-white/60">{t.note}</p>
        </Reveal>
      </div>
    </Section>
  );
}
