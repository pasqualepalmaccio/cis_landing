import { TERMS_APPROVED, WITHDRAWAL_EMAIL } from "@/content/early-bird-terms";

/* L'interruttore del modulo di pre-prenotazione early bird (record
   2026-11-16-early-bird.md). Non è un banner: lo leggono la pagina (che
   mostra il modulo o la mail) e la rotta d'invio (che rifiuta con 403).
   Si accende solo se, oltre alla richiesta esplicita, ci sono i due requisiti
   che la scuola deve dare per iscritto: termini approvati e email per il
   recesso. In sviluppo NEXT_PUBLIC_EARLY_BIRD_FORM=preview lo mostra anche
   senza requisiti, per provarlo; in produzione quel valore non basta. */

export type FormSwitch = { enabled: boolean; preview: boolean; missing: string[] };

export function earlyBirdFormSwitch(): FormSwitch {
  const wanted = process.env.NEXT_PUBLIC_EARLY_BIRD_FORM;
  const missing = [...(TERMS_APPROVED ? [] : ["termini approvati dal legale"]), ...(WITHDRAWAL_EMAIL ? [] : ["email per il recesso"])];
  const preview = wanted === "preview" && process.env.NODE_ENV !== "production";
  return { enabled: preview || (wanted === "on" && missing.length === 0), preview, missing };
}
