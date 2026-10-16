import { en } from "./en";
import { it, type Dict } from "./it";

export const LANGS = ["it", "en"] as const;
export type Lang = (typeof LANGS)[number];

const DICTS: Record<Lang, Dict> = { it, en };

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

export function getDict(lang: Lang): Dict {
  return DICTS[lang];
}

export type { Dict };
