import { EARLY_BIRD } from "@/content/early-bird";
import { TERMS_APPROVED, WITHDRAWAL_EMAIL } from "@/content/early-bird-terms";

/* L'interruttore del modulo di pre-prenotazione early bird (record
   2026-11-16-early-bird.md). Non è un banner: lo leggono la pagina (che
   mostra il modulo o la mail) e la rotta d'invio (che rifiuta con 403).
   È acceso da EARLY_BIRD.FORM (nel codice, quindi con autore e data nella
   cronologia), ma solo se ci sono anche termini approvati ed email per il
   recesso. NEXT_PUBLIC_EARLY_BIRD_FORM=off lo spegne in emergenza senza
   toccare il codice; =preview in sviluppo lo mostra anche senza requisiti. */

export type FormSwitch = { enabled: boolean; preview: boolean; missing: string[] };

export function earlyBirdFormSwitch(): FormSwitch {
  const env = process.env.NEXT_PUBLIC_EARLY_BIRD_FORM;
  const missing = [...(TERMS_APPROVED ? [] : ["termini approvati"]), ...(WITHDRAWAL_EMAIL ? [] : ["email per il recesso"])];
  const preview = env === "preview" && process.env.NODE_ENV !== "production";
  const wanted = env === "on" || (EARLY_BIRD.FORM && env !== "off");
  return { enabled: preview || (wanted && missing.length === 0), preview, missing };
}
