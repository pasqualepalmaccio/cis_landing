import type { Dict } from "@/content";

import { Container } from "../layout/container";
import { Reveal } from "../motion/reveal";
import { SpotlightCard } from "../motion/spotlight-card";
import { SectionHead } from "../section-head";
import { CardList } from "./card-list";

const ICONS = ["◆", "◎", "⟶", "▣"];

export function Safety({ t }: { t: Dict["safety"] }) {
  return (
    <section id="sicurezza" className="relative bg-navy-800 py-28 sm:py-40">
      <Container>
        <SectionHead eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {t.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08}>
              <SpotlightCard className="h-full bg-navy-900/70 p-8">
                <span aria-hidden className="grid size-12 place-items-center rounded-2xl border border-line text-lg text-gold-300">
                  {ICONS[i]}
                </span>
                <h3 className="mb-6 mt-8 font-display text-2xl text-gold-300">{card.title}</h3>
                <CardList items={card.items} />
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
