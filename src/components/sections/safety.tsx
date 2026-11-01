import type { Dict } from "@/content";

import { Section } from "../layout/section";
import { Reveal } from "../motion/reveal";
import { SectionHead } from "../section-head";
import { IconBadge } from "../ui/icon-badge";
import type { IconName } from "../ui/icons";
import { CardList } from "./card-list";

/* Personale, spazi e vigilanza, trasporto, dati personali. */
const ICONS: IconName[] = ["shield-check", "eye", "bus", "lock"];

/* Le regole di tutela: anello Cremisi e filetto Oro a sinistra, per
   distinguerle dalle schede descrittive. */
export function Safety({ t }: { t: Dict["safety"] }) {
  return (
    <Section id="sicurezza" tone="white">
      <SectionHead eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {t.cards.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.08}>
            <article className="h-full rounded-r-xl border border-l-[3px] border-sand border-l-gold-500 bg-white p-8">
              <IconBadge name={ICONS[i] ?? "shield-check"} ring="crimson" />
              <h3 className="mb-4 mt-5 font-display text-xl font-semibold text-heading">{card.title}</h3>
              <CardList items={card.items} />
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
