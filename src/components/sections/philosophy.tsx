import type { Dict } from "@/content";

import { Section } from "../layout/section";
import { Reveal } from "../motion/reveal";
import { SectionHead } from "../section-head";
import { CARD } from "../ui/card";
import { Carousel } from "../ui/carousel";
import { IconBadge } from "../ui/icon-badge";
import type { IconName } from "../ui/icons";

/* Lettura, comunicazione, compiti, schermi, uniforme, calendario. */
const ICONS: IconName[] = ["book", "speech", "home", "screen-off", "shirt", "calendar"];

/* Sei schede in un nastro con frecce, punti e tastiera: prima le prime tre
   coprivano le altre e non si capiva che si poteva scorrere. */
export function Philosophy({ t }: { t: Dict["philosophy"] }) {
  return (
    <Section id="filosofia" tone="ivory">
      <SectionHead eyebrow={t.eyebrow} title={t.title} />
      <Reveal>
        <Carousel labels={t.controls}>
          {t.cards.map((card, i) => (
            <article key={card.tag} className={`h-full p-8 ${CARD}`}>
              <IconBadge name={ICONS[i] ?? "book"} />
              <h3 className="mb-2 mt-5 font-display text-2xl font-semibold text-heading">{card.tag}</h3>
              <p className="text-[14.5px] leading-relaxed text-fg-muted">
                <strong className="font-semibold text-heading">{card.title}.</strong> {card.body}
              </p>
            </article>
          ))}
        </Carousel>
      </Reveal>
    </Section>
  );
}
