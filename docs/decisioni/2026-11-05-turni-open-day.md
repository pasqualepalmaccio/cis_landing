# 2026-11-05 · Open Day: niente scelta del turno sulla landing

**Classe:** R3 (iscrizioni a un evento con posti limitati e data fissa).
**Record principale nel CRM:** `crm/docs/decisioni/2026-11-05-turni-open-day.md`, con gli esami dei quattro revisori.

## Cosa cambia

Decisione della call del 02/11/2026: la famiglia non sceglie l'orario, lo assegna il CRM (primo turno con posto per tutto il gruppo, poi il successivo; altrimenti lista d'attesa).

- **Modulo** (`src/components/form/open-day-form.tsx`): i turni restano visibili con i posti indicativi, ma non si scelgono più. Il modulo non manda `sessionId`.
- **Inoltro** (`src/app/api/open-day/route.ts`): `sessionId` è ancora accettato, perché i moduli aperti prima del rilascio lo mandano, ma **non viene inoltrato** al CRM: potrebbe essere un turno tolto (la sessione delle 11:30 è stata sostituita da quella delle 11:00).
- **Esito**: se il CRM conferma e restituisce il turno, la pagina lo mostra («Il tuo turno: …»). Se non lo restituisce, ad esempio per una risposta salvata prima, l'orario arriva solo con l'email: la pagina non lo indovina.
- **Testi**: «Il turno lo assegniamo noi…»; la lista d'attesa non parla più di «sessione scelta»; la conferma invita a scrivere se l'orario non va bene.

## Ordine di rilascio

Prima il CRM (accetta l'iscrizione con o senza turno), poi la landing. Rovesciato, il CRM vecchio avrebbe respinto le iscrizioni senza turno. Prima del rilascio la coda dei tentativi `open-day` era vuota.

## Non cambia

L'invio resta spento (`OPEN_DAY_ENABLED = false`) finché non sono verificati i presupposti del record del 27/10.
