import { OWNER_READY } from "@/content/legal/owner";

/* Configurazione del consenso: un solo luogo per finalità, cookie, versione e
   fornitori (record docs/decisioni/2026-10-17-consenso-cookie-e-campagne.md). */

/** Da cambiare a ogni modifica di finalità, fornitori o testi delle policy:
 *  il banner viene riproposto a tutti e il registro distingue le versioni. */
export const CONSENT_VERSION = "2026-10-17";

export const CONSENT_COOKIE = "cis_consent";

/** Il Garante chiede di non riproporre il banner prima di 6 mesi. */
export const CONSENT_MAX_AGE_DAYS = 182;

export const PURPOSES = ["statistics", "marketing"] as const;
export type Purpose = (typeof PURPOSES)[number];
export type Choices = Record<Purpose, boolean>;

export type ConsentAction = "accept_all" | "reject_all" | "custom" | "close";

/* Gli ID arrivano come variabili di build (Coolify, build args). Vuoti = il
   fornitore non esiste per il sito: niente script, niente CSP. */
export const VENDORS = {
  ga4: process.env.NEXT_PUBLIC_GA4_ID ?? "",
  googleAds: process.env.NEXT_PUBLIC_GADS_ID ?? "",
  metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
} as const;

/** Nessun tag parte senza titolare dichiarato nelle policy (cancello del record). */
export const TRACKING_ENABLED = OWNER_READY && Object.values(VENDORS).some(Boolean);

/** Pagine dove il Pixel non manda eventi: raccolgono dati sui figli. */
export const NO_PIXEL_PATHS = ["/registrazione"];
