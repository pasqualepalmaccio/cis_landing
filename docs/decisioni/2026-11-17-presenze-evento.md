# Meet & Discover vol. 2 e pagina presenze dal QR

Data: 2026-11-17 · Classe: **R3** (dati personali nuovi dal sito verso il CRM, evento con data fissa)

**Record principale nel CRM:** `crm/docs/decisioni/2026-11-17-presenze-evento.md` (richiesta, riconoscimento della scheda, riconciliazione, rischi aperti).

## Decisione
- **Pagina evento:** `OPEN_DAY_SLUG` predefinito passa da `open-day` a `meet-and-discover-2026-12` (`src/lib/open-day/event.ts`). La pagina era già generica; in produzione la variabile non è impostata (verificato sui container). I tentativi salvati portano il proprio slug.
- **Pagina `/[lang]/presenza`** (`src/app/[lang]/presenza`, `src/components/form/check-in-form.tsx`, testi in `src/content/check-in.ts`): nome, cognome, email, telefono, presa visione dell'informativa, campo esca. Fuori dai motori di ricerca, senza pixel, barra ridotta. Esito vero: «registrata» solo su 201; su 202 e su errore «mostra questa schermata al personale all'ingresso».
- **QR verso `https://cis-colico.com/presenza`:** il proxy (`src/proxy.ts`) ora reindirizza alla lingua del browser anche `/presenza` e `/meet-and-discover`; prima rispondevano 404.
- **`POST /api/check-in`:** tentativo salvato prima dell'invio (tipo `check-in`, con lo slug), chiave = id del tentativo, consegna a `POST /api/v1/events/{slug}/check-ins`. 404 del CRM (evento non pubblicato) è un rifiuto. Nessun limite per rete: alla porta tutti condividono la stessa rete. Soglia di ritardo 5 minuti; ritentativi, verifica nel CRM e allarmi nel job esistente `/api/pre-registration/retry`. `/api/open-day/stats` espone `checkIns` per la riconciliazione del CRM.
- **Informativa IT/EN:** sezione «La registrazione della presenza agli eventi» / «Checking in at events», voce nella base giuridica (legittimo interesse) e nei tempi. Versione registrata con ogni presenza: `2026-11-17-presenze` (`POLICY_UPDATED` era già al 17/11 per la revisione early bird dello stesso giorno).

## Difetto trovato e corretto nello stesso rilascio
`src/lib/db.ts` riapplica lo schema a ogni avvio e conteneva un vincolo intermedio sugli stati senza `invalid`. Appena esiste una riga `invalid` (invio early bird non valido salvato apposta), l'avvio dello schema fallisce e **ogni scrittura della landing fallisce**: consensi, tentativi, statistiche. Le iscrizioni arrivavano comunque al CRM, ma senza registro né ritentativi. Trovato nella prova locale (il database di sviluppo ha una riga `invalid`); in produzione il 17/11 il registro risultava sano (`/api/health`: `consentRegistry: ok`), ma il riavvio del rilascio lo avrebbe esposto. Corretto: il vincolo si scrive una sola volta, con l'elenco completo.

## Verifica
(da completare al rilascio)
