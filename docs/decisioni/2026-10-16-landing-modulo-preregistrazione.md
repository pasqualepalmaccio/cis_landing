# 2026-10-16 · Landing CIS e modulo di pre-registrazione

**Classe:** R0 per le pagine; **R3** per il modulo (dati personali di minori, invio a un sistema a valle).
**Specialisti consultati:** blast-radius, infra-assumption, observability, data-protection (audit preventivi, 2026-10-16).

## Decisione

1. La landing (Next.js 16, Motion, Tailwind v4) sostituisce le tre pagine HTML consegnate dal cliente, con gli stessi contenuti in italiano e inglese (`/it`, `/en`) e i vecchi indirizzi `*.html` reindirizzati.
2. Il committente ha scelto che il modulo invii al CRM (`POST /api/v1/leads`). **Il collegamento non è costruito in questo intervento** e l'invio è spento (`SUBMISSION_ENABLED = false` in `src/content/registration.ts`). Il modulo mostra all'utente che l'invio è disattivato e l'indirizzo email da usare: nessun «grazie» senza un fatto verificato (I6).
3. La landing non tratta dati personali finché l'invio è spento: nessun cookie, nessuna terza parte, font serviti dalla stessa origine, CSP `default-src 'self'`.
4. Pubblicazione su dominio di anteprima. Lo spostamento di `cis-colico.com` da Netlify al server richiede una conferma esplicita.

## Perché il collegamento al CRM è rinviato

Gli audit concordano: l'endpoint `/leads` oggi non può ricevere questo modulo senza perdere dati (I1).
- Il questionario (figli, lingue, anno di ingresso, bus) non ha un posto nel CRM. Metterlo in `notes` o nei `tags` lo renderebbe visibile a tutti e senza scadenza.
- L'alunno richiede nome e cognome, che il modulo giustamente non raccoglie.
- Un 422 conserva il modulo intero in `ApiRequestLog.rejectedPayload`, che viene cancellato dopo 90 giorni, senza alcun allarme.
- Una chiave `crm_test_` risponde 200 senza scrivere: la conferma sarebbe falsa.
- La landing non ha un registro durevole dei tentativi.

## Presupposti per attivare l'invio

**Dal titolare:**
- identità del titolare;
- informativa art. 13 in italiano e inglese;
- base giuridica;
- conservazione dei lead, coerente con ingressi fino al 2029;
- decisione sulla minimizzazione (sesso, scuola attuale, nazionalità);
- DPA con Resend.

**Nel CRM:**
- un'entità dedicata al questionario, con scadenza e accesso limitato;
- chiave di idempotenza su `/leads`;
- allarme alla prima risposta ≥ 400 e all'avvicinarsi della scadenza della chiave;
- payload respinti conservati finché non hanno uno stato terminale;
- correzione del 500 dopo il commit (`router.ts`).

**Nella landing:**
- successo solo con `201` + `contact.id` + nessun `dryRun`;
- rifiuto di avviarsi con una chiave sandbox;
- chiave solo a runtime;
- registro dei tentativi su volume persistente;
- riconciliazione giornaliera con `ApiRequestLog`;
- honeypot che marca senza scartare.

**Rete:** alias stabile `customNetworkAliases` su `crm-web` (il nome del container cambia a ogni rilascio).

## Già applicato al modulo (solo interfaccia)

- Nome e cognome separati.
- Valori delle opzioni come codici stabili, indipendenti dalla lingua.
- I figli già compilati restano quando aumenta il numero di figli.
- «4+» dichiarato esplicitamente.
- «Altro» con campo di dettaglio, sia per la città sia per il prefisso.
- `maxlength` su tutti i campi liberi.
- `method="post"`.
- Al posto della casella «Acconsento al trattamento» obbligatoria:
  - frase informativa;
  - consenso facoltativo e separato per gli aggiornamenti;
  - avvertenza contro i dati sanitari nel campo libero.

## Segnalazioni al committente (aperte)

- Il modulo oggi online su Netlify invia dati di genitori e minori a Formspree (USA) senza informativa. Prima di dismetterlo vanno controllati la cartella spam e l'export, governato come elenco di persone.
- Il render della sede conteneva un'area di ritocco azzurra: l'immagine è stata ritagliata.
- Le pagine curricolo e registrazione del materiale usavano il vecchio stemma «LCIS». Il sito usa ovunque lo stemma CIS.
- Le immagini della galleria sono a 384 px: servono originali più grandi.
- Testi con date ormai superate o in corso: «Ora → Settembre 2026», «la campagna parte in autunno 2026».

## Rischi accettati

Nessuno: l'invio resta spento finché i presupposti non sono soddisfatti.
