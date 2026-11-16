import type { Lang } from "@/content";
import { EARLY_BIRD } from "@/content/early-bird";
import { euro } from "@/lib/format";

/** I valori dei segnaposto dei testi early bird, nel formato della lingua. */
export const earlyBirdVars = (lang: Lang) => ({
  prebooking: euro(EARLY_BIRD.prebooking, lang),
  combined: euro(EARLY_BIRD.combined, lang),
  places: EARLY_BIRD.places,
});
export type EarlyBirdVars = ReturnType<typeof earlyBirdVars>;
