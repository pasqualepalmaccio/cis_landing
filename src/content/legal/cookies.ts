import { CONSENT_COOKIE, CONSENT_MAX_AGE_DAYS, TRACKING_ENABLED, DECLARED, type Purpose } from "@/lib/consent/config";

/* Inventario dei cookie: alimenta la tabella della cookie policy. Una riga per
   cookie, e compare solo se il fornitore è dichiarato (DECLARED). Va aggiornato insieme
   a CONSENT_VERSION quando cambia un fornitore. Durate dalla documentazione
   dei fornitori (Google: support.google.com/analytics/answer/11397207 e
   business.safety.google/adscookies; Meta: facebook.com/policies/cookies). */
export type CookieRow = {
  name: string;
  provider: string;
  purpose: Purpose | "necessary";
  /** Durata in giorni; 0 = sessione. */
  days: number;
  firstParty: boolean;
};

// Senza fornitori dichiarati il banner non c'è, e nemmeno il cookie che ricorda la scelta.
export const COOKIES: CookieRow[] = !TRACKING_ENABLED ? [] : [
  { name: CONSENT_COOKIE, provider: "CIS", purpose: "necessary", days: CONSENT_MAX_AGE_DAYS, firstParty: true },
  ...(DECLARED.ga4
    ? [
        { name: "_ga", provider: "Google Analytics", purpose: "statistics" as const, days: 730, firstParty: true },
        { name: "_ga_*", provider: "Google Analytics", purpose: "statistics" as const, days: 730, firstParty: true },
      ]
    : []),
  ...(DECLARED.googleAds
    ? [
        { name: "_gcl_au", provider: "Google Ads", purpose: "marketing" as const, days: 90, firstParty: true },
        { name: "IDE, test_cookie", provider: "Google (doubleclick.net)", purpose: "marketing" as const, days: 390, firstParty: false },
      ]
    : []),
  ...(DECLARED.metaPixel
    ? [
        { name: "_fbp", provider: "Meta", purpose: "marketing" as const, days: 90, firstParty: true },
        { name: "_fbc", provider: "Meta", purpose: "marketing" as const, days: 90, firstParty: true },
        { name: "fr", provider: "Meta (facebook.com)", purpose: "marketing" as const, days: 90, firstParty: false },
      ]
    : []),
];
