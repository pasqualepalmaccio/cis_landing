import { createHash } from "node:crypto";

import type { Lang } from "@/content";
import { earlyBirdTerms, WITHDRAWAL_EMAIL } from "@/content/early-bird-terms";

import { earlyBirdVars, fillVars } from "./vars";

/** I termini come li vede la famiglia, con importi ed email riempiti dalla
 *  fonte unica. Senza l'email del recesso resta un segnaposto visibile, e
 *  l'interruttore tiene il modulo spento. */
export function filledTerms(lang: Lang) {
  const vars = { ...earlyBirdVars(lang), email: WITHDRAWAL_EMAIL ?? (lang === "it" ? "[email da indicare]" : "[email to be provided]") };
  const t = earlyBirdTerms[lang];
  return {
    title: t.title,
    clauses: t.clauses.map((c) => ({ title: c.title, body: fillVars(c.body, vars) })),
    precontract: { title: t.precontract.title, lines: t.precontract.lines.map((l) => fillVars(l, vars)) },
  };
}

/** Impronta del testo esatto mostrato: resta sulla prenotazione come prova. */
export function termsHash(lang: Lang): string {
  return createHash("sha256").update(JSON.stringify(filledTerms(lang))).digest("hex");
}
