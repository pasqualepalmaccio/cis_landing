
import type { EarlyBirdCopy } from "@/content/early-bird";
import { BOOKING_ANCHOR } from "@/content/early-bird";
import { fill } from "@/content/open-day";

import { Container } from "../layout/container";
import { PageLink } from "../ui/page-link";
import type { EarlyBirdVars } from "@/lib/early-bird/vars";

/* Richiamo all'offerta. Sulla pagina early bird sta prima delle rette e
   porta alla prenotazione; in home sta sotto l'apertura e porta alla
   pagina early bird (`href`). */
export function EarlyBirdBanner({ t, vars, href = BOOKING_ANCHOR }: { t: EarlyBirdCopy["banner"]; vars: EarlyBirdVars; href?: string }) {
  return (
    <aside aria-label={t.label} className="tone-navy bg-bordeaux py-6">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[15.5px] leading-relaxed text-fg">
          <span className="mr-2 font-label text-xs font-semibold uppercase tracking-[0.18em] text-accent">{t.label}</span>
          {fill(t.text, vars)}
        </p>
        <PageLink href={href} className="shrink-0 rounded-[4px] border-[1.5px] border-white/55 px-5 py-3 font-label text-xs font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:border-white hover:bg-white/10">
          {t.link} →
        </PageLink>
      </Container>
    </aside>
  );
}
