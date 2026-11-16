# Pre-prenotazione early bird: modulo della landing

Data: 2026-11-16 · Classe: **R3** · Record completo: `crm/docs/decisioni/2026-11-16-early-bird.md`

Parte della landing:
- pagina `/[lang]/early-bird` = sito principale con apertura, condizioni, banner prima delle rette e conto alla rovescia;
- modulo `components/early-bird/booking-form.tsx`, rotta `/api/early-bird`, tipo di tentativo `early-bird` nello stesso registro (`preregistration_attempts`) con soglia di ritardo di 15 minuti e stato nuovo `invalid` (invio non valido salvato, aspetta una persona);
- un tipo di tentativo sconosciuto è un errore, mai l'endpoint delle pre-registrazioni (`sendAttempt`, `existsInCrm`, `pendingCounts`);
- `/api/pre-registration/stats` espone le chiavi early bird consegnate senza finestra temporale; il job allarma su ritardi, respinte e non validi;
- termini da `content/early-bird-terms.ts`, importi dalla fonte unica, impronta del testo mostrato inviata al CRM;
- **interruttore** `lib/early-bird/switch.ts`: modulo spento finché la scuola non approva i termini e indica l'email per il recesso (`TERMS_APPROVED`, `WITHDRAWAL_EMAIL`) e non si imposta `NEXT_PUBLIC_EARLY_BIRD_FORM=on` al build. Intanto resta il pulsante che apre una mail a info@.

Non ci sono test automatici nella landing: la copertura del tipo è data dal controllo dei tipi (switch esaustivo) e dalla prova locale descritta nel record del CRM.
