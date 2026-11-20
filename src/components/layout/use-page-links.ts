"use client";

import { usePathname } from "next/navigation";

import type { Lang } from "@/content";
import { BOOKING_ANCHOR, EARLY_BIRD_PATH, earlyBirdOpen } from "@/content/early-bird";

/** Le pagine che contengono le sezioni del sito (visione, rette, percorso…):
 *  lì un collegamento a una sezione resta nella pagina, altrove porta alla home. */
const WITH_SECTIONS = ["", EARLY_BIRD_PATH];

/** Dove portano i collegamenti a una sezione e il comando principale della
 *  barra, nella pagina in cui ci si trova. Sulla pagina early bird ogni
 *  azione resta lì e porta alla prenotazione (richiesta della scuola, 16/11).
 *  In home, finché l'offerta è aperta, il comando porta alla pagina early
 *  bird (richiesta della scuola, 20/11); le altre pagine restano invariate. */
export function usePageLinks(lang: Lang) {
  const rest = usePathname().replace(/^\/(it|en)(?=\/|$)/, "");
  const earlyBird = rest === EARLY_BIRD_PATH;
  const promo = rest === "" && earlyBirdOpen();
  return {
    section: (hash: string) => (WITH_SECTIONS.includes(rest) ? hash : `/${lang}${hash}`),
    ctaHref: earlyBird ? BOOKING_ANCHOR : promo ? `/${lang}${EARLY_BIRD_PATH}` : `/${lang}/registrazione`,
    earlyBird,
    promo,
  };
}
