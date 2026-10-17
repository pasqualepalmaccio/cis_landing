import { VENDORS, type Choices, type Purpose } from "@/lib/consent/config";

export const BUTTON = "rounded-full px-5 py-2.5 text-sm font-bold transition-colors";
/** «Rifiuta» e «Accetta» devono avere lo stesso aspetto: una sola classe per entrambi. */
export const EQUAL_BUTTON = `${BUTTON} bg-cta text-navy-900 hover:bg-cta-hover`;

/* Solo le finalità che hanno davvero un fornitore configurato: il banner non
   chiede il permesso per cose che il sito non fa (I6). */
export function activePurposes(and: string): { key: Purpose; vendors: string }[] {
  const marketing = [VENDORS.googleAds && "Google Ads", VENDORS.metaPixel && "Meta (Facebook, Instagram)"].filter(Boolean) as string[];
  return [
    ...(VENDORS.ga4 ? [{ key: "statistics" as const, vendors: "Google Analytics" }] : []),
    ...(marketing.length ? [{ key: "marketing" as const, vendors: marketing.join(` ${and} `) }] : []),
  ];
}

export const NONE: Choices = { statistics: false, marketing: false };
export const ALL: Choices = { statistics: true, marketing: true };
