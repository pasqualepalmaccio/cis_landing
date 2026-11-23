import { readConsent } from "./cookie";

/* Evento Lead del Pixel Meta, decisione dell'utente del 23/11
   (docs/decisioni/2026-11-23-pixel-meta-lead.md).
   - Parte solo sull'esito verificato, il 201 della pre-registrazione: mai
     al clic, mai sul 202 (tentativo salvato ma non ancora nel CRM).
   - Solo con il consenso marketing letto ora dal cookie: chi l'ha revocato
     dopo il caricamento del Pixel non viene contato.
   - Nessun parametro: nessun campo del modulo (genitore o bambini) va a Meta.
     La pagina resta in NO_PIXEL_PATHS, quindi niente PageView.
   - event_id generato qui. Se un giorno si aggiunge l'API Conversioni, lo
     stesso id va mandato anche al server, altrimenti Meta conta due volte. */
export function trackMetaLead(): void {
  if (typeof window === "undefined" || !window.fbq) return;
  if (!readConsent()?.choices.marketing) return;
  window.fbq("track", "Lead", {}, { eventID: crypto.randomUUID() });
}
