import type { Dict, Lang } from "@/content";

import { Section } from "../layout/section";
import { Reveal } from "../motion/reveal";
import { SectionHead } from "../section-head";
import { CARD } from "../ui/card";
import { CardImage } from "../ui/card-image";
import { Calendar } from "./calendar";

/* Le scelte della scuola tutte in vista, senza nastro da scorrere: il
   committente (9/11/2026) ha chiesto di togliere lo scorrimento orizzontale
   perché nessuno andava a vedere le schede nascoste. Quattro schede con la
   foto, l'uniforme a tutta larghezza, poi il calendario. */
export function Philosophy({ lang, t }: { lang: Lang; t: Dict["philosophy"] }) {
  const uniform = t.cards[t.cards.length - 1];
  const cards = t.cards.slice(0, -1);

  return (
    <Section id="filosofia" tone="ivory">
      <SectionHead eyebrow={t.eyebrow} title={t.title} />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => (
          <Reveal key={card.tag} delay={i * 0.08}>
            <article className={`h-full p-5 ${CARD}`}>
              <CardImage image={card.image} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
              <Body card={card} />
            </article>
          </Reveal>
        ))}
      </div>

      {uniform && (
        <Reveal className="mt-6">
          <article className={`grid gap-6 p-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:items-center ${CARD}`}>
            <CardImage image={uniform.image} className="h-64 sm:h-72" sizes="(min-width: 640px) 40vw, 100vw" />
            <Body card={uniform} />
          </article>
        </Reveal>
      )}

      <Reveal className="mt-6">
        <Calendar lang={lang} t={t.calendar} />
      </Reveal>

      <p className="mt-4 text-[13px] italic text-fg-muted">{t.imagesNote}</p>
    </Section>
  );
}

function Body({ card }: { card: Dict["philosophy"]["cards"][number] }) {
  return (
    <div className="px-2 pb-2 pt-5">
      <p className="font-label text-[11px] font-bold uppercase tracking-[0.1em] text-accent">{card.tag}</p>
      <h3 className="mb-2 mt-2 font-display text-xl font-semibold leading-snug text-heading">{card.title}</h3>
      <p className="text-[14.5px] leading-relaxed text-fg-muted">{card.body}</p>
    </div>
  );
}
