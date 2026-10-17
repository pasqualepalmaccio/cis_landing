# 2026-10-17 · Consenso cookie, policy e tracciamento per le campagne

**Classe:** R3. Dati personali dei visitatori (e potenzialmente di genitori di minori) inviati a Google e Meta, con trasferimento negli USA. Il consenso deve essere dimostrabile (art. 7.1 GDPR).
**Specialisti consultati (2026-10-17):** data-protection, infra-assumption, observability, blast-radius.

## Scelte del committente

- **CMP fatta da noi**, senza fornitori esterni. Il committente sapeva che registro, versionamento e aggiornamento normativo restano a nostro carico. In alternativa gli erano state proposte iubenda e Cookiebot.
- **Tracciamenti richiesti:**
  - Google Analytics 4;
  - Google Ads con remarketing;
  - Meta Pixel;
  - enhanced conversions e advanced matching;
  - Conversions API dal CRM.
- **Titolare:** Athena Education S.r.l., Via Costituzione 7, Colico (LC), P.IVA 04326810134, dal certificato di attribuzione della partita IVA fornito dal committente. Contatto privacy: info@cis-colico.com. DPO non indicato.
- **Conservazione del registro dei consensi:** 6 anni dall'ultima scelta, scelta del committente il 2026-10-17, da confermare con il legale.

## Decisione: fase 1, realizzata in questo intervento

1. **Banner di consenso**, IT/EN, conforme alle Linee guida del Garante del 10/06/2021:
   - «Rifiuta» e «Accetta» con pari evidenza;
   - la X chiude e vale come rifiuto;
   - «Personalizza» apre la scelta per finalità;
   - nessuna casella preselezionata;
   - un link permanente «Preferenze cookie» nel footer.
2. **Due finalità facoltative:**
   - *Statistiche* (GA4 → `analytics_storage`);
   - *Marketing e remarketing* (Google Ads e Meta Pixel → `ad_storage`, `ad_user_data`, `ad_personalization`).

   Il cookie tecnico `cis_consent` conserva la scelta.
3. **Il banner si ripropone** dopo 6 mesi, oppure quando cambia `CONSENT_VERSION`. La versione va cambiata a ogni modifica di finalità, fornitori o policy.
4. **Consent Mode v2 in modalità *base*.**
   - Il default `denied` su tutte le chiavi viene impostato prima di ogni tag.
   - `gtag.js` e `fbevents.js` si caricano **solo dopo** il consenso alla finalità corrispondente.
   - Senza consenso il visitatore non contatta Google né Meta.
   - Si perde la modellazione delle conversioni di Google. È una scelta prudente: i ping senza cookie della modalità avanzata trasmettono comunque l'IP, e il Garante non li ha mai valutati.
5. **Meta Pixel:**
   - `autoConfig` disattivato, quindi niente advanced matching automatico e niente lettura dei campi dei moduli;
   - nessun evento su `/registrazione`, perché la pagina raccoglie dati sui figli.
6. **Registro dei consensi lato server** (`POST /api/consent`) su un Postgres dedicato nel progetto Coolify «CIS Landing», con backup orario su S3.
   - **Contenuto di ogni riga:**
     - id della scelta (lo stesso del cookie);
     - orario del server;
     - versione;
     - finalità scelte;
     - azione (accetta, rifiuta, personalizza, chiude);
     - lingua e pagina;
     - hash con sale dell'IP troncato;
     - user agent.
   - **Le righe non si aggiornano mai:** ogni scelta è una riga nuova.
   - **Se il registro non risponde, la scelta del visitatore vale lo stesso.** Il cookie si marca «da inviare» e il browser ritenta alla pagina successiva. Il guasto si vede nei log e in `/api/health`. Questo applica la regola cardinale: il registro misura, quindi non può bloccare.
7. **Testi delle policy archiviati.** Le policy pubblicate (privacy, cookie) e il testo del banner sono salvati nel registro con il loro hash al primo consenso di ogni versione. Così si può dimostrare quale testo era in vigore.
8. **CSP aperta** solo ai domini di Google e Meta necessari, con `report-uri /api/csp-report`. Le violazioni vengono registrate nello stesso database.
9. **Il reindirizzamento di `/` conserva la query string** (`gclid`, `fbclid`, `utm_*`). Prima la perdeva, e le conversioni degli annunci puntati sulla radice risultavano non attribuibili.
10. **Pagine `/[lang]/privacy` e `/[lang]/cookie`**, con l'inventario dei cookie e il titolare preso da un'unica costante.

## Cancelli: niente tag finché

- i dati del titolare non sono compilati (`src/content/legal/owner.ts`);
- gli ID dei tag non sono impostati come variabili di build in Coolify (`NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GADS_ID`, `NEXT_PUBLIC_META_PIXEL_ID`);
- il registro dei consensi non risponde in produzione (verifica manuale prima dell'accensione).

## Rinviato: fase 2, con il collegamento del modulo al CRM

Ogni voce richiede un proprio record R3.
- **Enhanced conversions e advanced matching manuale:**
  - solo l'email del genitore, in hash, solo con consenso marketing registrato;
  - mai i campi dei figli né il testo libero.
- **Conversions API dal CRM:**
  - il consenso viaggia con il lead;
  - `event_id` uguale all'id del lead per la deduplica con il Pixel;
  - token tra le variabili di runtime;
  - registro dei tentativi.
- **Conversioni:** partono solo su `201` + `contact.id` + nessun `dryRun` dal CRM.
- **Riconciliazione giornaliera** tra lead CRM e conversioni Ads/Meta, con allarme in entrambe le direzioni (zero e oltre il 100%).
- **Test periodico** «nessuna terza parte prima del consenso», contro la produzione, con notifica. Lo script manuale c'è già: `scripts/consent-check.mjs`.

## Rischi accettati e aperti

- **Origine raggiungibile senza Cloudflare** (audit infra, A1). Gli header `CF-*` sono falsificabili, quindi il registro salva l'IP visto dal proxy, troncato e in hash, e non lo usa per decisioni. Va chiuso con un firewall sull'origine prima della Conversions API.
- **Conservazione del registro dei consensi:** 6 anni (vedi sopra). La cancellazione automatica delle righe scadute non esiste ancora: il trigger append-only la impedisce, quindi servirà una procedura dedicata prima del 2032.
- **I testi di privacy e cookie policy sono una bozza tecnica.** Vanno validati dal titolare o da un legale prima di accendere i tag. Domande aperte nella sezione «Per il legale».
- **Vecchio sito Netlify con modulo verso Formspree:** dati di minori negli USA senza informativa, ancora in corso. Segnalato al committente; non riguarda questa base di codice.

## Per il legale

1. La scuola deve nominare un DPO (art. 37)?
2. Per i dati dei figli comunicati dal genitore nella pre-registrazione basta l'art. 6.1.b, o serve il consenso?
3. Va bene un tempo di conservazione del registro dei consensi di 6 anni?
4. Il trasferimento a Formspree del vecchio sito va annotato o qualificato come violazione (art. 33)? Serve una valutazione scritta anche se l'esito è negativo.
5. Con quale base e quale informativa si può inviare l'email in hash del genitore a Google e Meta (fase 2)?
