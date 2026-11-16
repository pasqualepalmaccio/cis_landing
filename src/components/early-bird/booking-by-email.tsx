import type { EarlyBirdCopy } from "@/content/early-bird";
import { BOOKING_ANCHOR } from "@/content/early-bird";

import { Section } from "../layout/section";
import { SectionHead } from "../section-head";

/* La sezione di prenotazione finché il modulo è spento: tutte le azioni
   della pagina arrivano qui. L'indirizzo è scritto per esteso, non solo
   dentro il collegamento: chi non ha un programma di posta configurato
   cliccando non vede succedere nulla, e deve poterlo copiare. */
export function BookingByEmail({ t }: { t: EarlyBirdCopy["book"] }) {
  const mailto = `mailto:info@cis-colico.com?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(t.body)}`;
  return (
    <Section id={BOOKING_ANCHOR.slice(1)} tone="navy">
      <SectionHead eyebrow="Early bird" title={t.title} lead={t.lead} />
      <div className="flex flex-col items-start gap-4">
        <p className="select-all font-display text-[clamp(1.6rem,4vw,2.6rem)] font-semibold text-gold-300">info@cis-colico.com</p>
        {/* Una mail, non un collegamento interno: per questo <a> e non ButtonLink. */}
        <a
          href={mailto}
          className="group inline-flex items-center gap-2 rounded-[4px] bg-action px-7 py-4 font-label text-[13px] font-semibold uppercase tracking-[0.06em] text-white transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-action-hover hover:shadow-lift"
        >
          {t.emailCta}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
        <p className="max-w-md text-sm text-mist">{t.note}</p>
      </div>
    </Section>
  );
}
