import type { Dict } from "@/content";

import { Section } from "../layout/section";
import { Reveal } from "../motion/reveal";
import { SectionHead } from "../section-head";
import { CardImage } from "../ui/card-image";
import { CardList } from "./card-list";

/* Le regole di tutela: filetto Oro a sinistra per distinguerle dalle schede
   descrittive, una fotografia in testa a ciascuna. Due per riga, come nel
   materiale del committente: con la foto quattro colonne sarebbero strette. */
export function Safety({ t }: { t: Dict["safety"] }) {
  return (
    <Section id="sicurezza" tone="white">
      <SectionHead eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <div className="grid gap-6 sm:grid-cols-2">
        {t.cards.map((card, i) => (
          <Reveal key={card.title} delay={(i % 2) * 0.08}>
            <article className="h-full rounded-r-xl border border-l-[3px] border-sand border-l-gold-500 bg-white p-5">
              <CardImage image={card.image} sizes="(min-width: 640px) 50vw, 100vw" />
              <div className="px-2 pb-2 pt-5">
                <h3 className="mb-4 font-display text-xl font-semibold text-heading">{card.title}</h3>
                <CardList items={card.items} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <p className="mt-4 text-[13px] italic text-fg-muted">{t.imagesNote}</p>
    </Section>
  );
}
