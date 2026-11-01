import type { Dict } from "@/content";

import { Section } from "../layout/section";
import { Reveal } from "../motion/reveal";
import { SectionHead } from "../section-head";
import { CARD, CARD_LIFT } from "../ui/card";
import { IconBadge } from "../ui/icon-badge";
import type { IconName } from "../ui/icons";
import { CardList } from "./card-list";

/* Nell'ordine delle schede: bambini, genitori, insegnanti, età e lingue. */
const ICONS: IconName[] = ["flower", "home", "book", "globe"];

export function Vision({ t }: { t: Dict["vision"] }) {
  return (
    <Section id="visione" tone="white">
      <SectionHead eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {t.cards.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.08}>
            <article className={`h-full p-8 ${CARD} ${CARD_LIFT}`}>
              <IconBadge name={ICONS[i] ?? "flower"} />
              <h3 className="mb-4 mt-5 font-display text-2xl font-semibold text-heading">{card.title}</h3>
              <CardList items={card.items} />
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
