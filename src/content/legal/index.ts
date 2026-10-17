import type { Lang } from "../index";

import { legalEn } from "./en";
import { legalIt, type LegalDict } from "./it";

const LEGAL: Record<Lang, LegalDict> = { it: legalIt, en: legalEn };

export function getLegal(lang: Lang): LegalDict {
  return LEGAL[lang];
}

export type { LegalDict };
