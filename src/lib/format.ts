import type { Lang } from "@/content";

/* Importi in euro senza decimali, nel formato della lingua della pagina:
   €10.500 in italiano, €10,500 in inglese. Una regola, un posto. */
export function localeOf(lang: Lang): string {
  return lang === "it" ? "it-IT" : "en-GB";
}

export function euro(amount: number, lang: Lang): string {
  return `€${new Intl.NumberFormat(localeOf(lang), { maximumFractionDigits: 0, useGrouping: "always" }).format(amount)}`;
}
