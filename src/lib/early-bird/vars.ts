import { getDict, type Lang } from "@/content";
import { EARLY_BIRD } from "@/content/early-bird";
import { euro } from "@/lib/format";

/** I valori dei segnaposto dei testi early bird, nel formato della lingua.
 *  NSAF + iscrizione vengono dalle rette: se cambia il listino, cambia qui. */
export const earlyBirdVars = (lang: Lang) => {
  const tier = getDict(lang).fees.tiers[0]!;
  return {
    prebooking: euro(EARLY_BIRD.prebooking, lang),
    combined: euro(tier.nsaf + tier.registration, lang),
    places: EARLY_BIRD.places,
  };
};
export type EarlyBirdVars = ReturnType<typeof earlyBirdVars>;

/** Riempie i segnaposto fra graffe di un testo early bird. */
export const fillVars = (text: string, vars: Record<string, string | number>) => text.replace(/\{(\w+)\}/g, (whole, k: string) => (k in vars ? String(vars[k]) : whole));
