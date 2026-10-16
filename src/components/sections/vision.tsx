import type { Dict } from "@/content";

import { Container } from "../layout/container";
import { Reveal } from "../motion/reveal";
import { SpotlightCard } from "../motion/spotlight-card";
import { SectionHead } from "../section-head";
import { CardList } from "./card-list";

export function Vision({ t }: { t: Dict["vision"] }) {
  return (
    <section id="visione" className="relative py-28 sm:py-40">
      <Container>
        <SectionHead eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
        <div className="grid gap-5 md:grid-cols-2">
          {t.cards.map((card, i) => (
            <Reveal key={card.title} delay={(i % 2) * 0.12}>
              <SpotlightCard className="h-full p-8 sm:p-10">
                <div className="mb-8 flex items-center justify-between">
                  <h3 className="font-display text-2xl text-gold-300 sm:text-3xl">{card.title}</h3>
                  <span className="font-display text-sm italic text-terracotta">0{i + 1}</span>
                </div>
                <CardList items={card.items} />
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
