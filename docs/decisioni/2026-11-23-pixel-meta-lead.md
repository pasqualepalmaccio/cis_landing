# Meta Pixel acceso ed evento Lead sulla pre-registrazione

Data: 2026-11-23 · Classe: **R3** (dati verso un terzo, Meta; pagina che raccoglie dati di bambini; una conversione sbagliata non produce errori)

## Richiesta
L'utente ha fornito l'ID del Pixel (2362216317913250) e ha chiesto tre cose:
1. codice base su tutte le pagine dopo il consenso marketing, con `init` e `PageView`;
2. `Lead` alla risposta positiva del server della pre-registrazione, non al clic;
3. lo stesso Lead dal server con l'API Conversioni e lo stesso `event_id`.

## Le quattro domande
- **Può decidere di non fare qualcosa?** Sì. Senza consenso marketing, o con il consenso revocato dopo il caricamento, il Lead non parte. Sul 202 (tentativo salvato ma non ancora nel CRM) il Lead non parte.
- **Fallisce in silenzio?** Sì. Un Lead mancante o doppio non produce errori sul sito. La verità resta il CRM, mentre Meta è un campione (manca la quota di chi rifiuta i cookie).
- **Cosa resta registrato:** lato Meta, Gestione eventi. Lato nostro, la pre-registrazione nel CRM. Una riconciliazione fra i due non c'è ancora.
- **Assunzioni:** CSP aperta a `connect.facebook.net` e `www.facebook.com` solo con l'ID configurato (`next.config.ts`); ID passato come variabile di build in Coolify; il cookie `cis_consent` è la fonte del consenso.

## Decisione
- **Punto 1.** Nessuna modifica al codice: c'era già dal 5/11 (`src/components/consent/consent-tags.tsx`) e partiva solo con l'ID. Il 23/11 è stato aggiunto `NEXT_PUBLIC_META_PIXEL_ID` in Coolify come variabile di build, poi il deploy. `autoConfig` è spento, quindi il Pixel non legge i campi dei moduli.
- **Punto 2.** Scelta dell'utente del 23/11: «solo Lead, senza dati». La regola del 5/11 «nessun evento Meta sulle pagine con dati di bambini» resta per il PageView, e `/registrazione` rimane in `NO_PIXEL_PATHS`. L'unica eccezione è il `Lead` senza parametri, con un `event_id` casuale, sul 201 e con il consenso marketing letto in quel momento (`src/lib/consent/meta-lead.ts`, chiamato da `use-submit.ts`). Nessun campo del modulo, del genitore o dei bambini, va a Meta.
- **Punto 3.** Rimandato. Servono un token dell'API Conversioni (da generare in Gestione eventi), la decisione su quali dati del genitore mandare in hash, il consenso che viaggi con il lead fino al server, il passaggio dell'`event_id` dal browser al server e un registro dei tentativi con stato finale. Finché non c'è, il Lead arriva solo dal browser.

## Prova
- **Senza consenso** (sito live, 23/11 ~17:30): nessuna richiesta verso Meta o Google, nessun cookie, banner visibile.
- **Con consenso marketing:** caricati `fbevents.js` e la configurazione del Pixel 2362216317913250, inviato `PageView` (`facebook.com/tr?id=2362216317913250&ev=PageView`).
- **Lead:** compilato (`tsc` e `eslint` puliti) e verificato nel codice pubblicato. **Non verificato end-to-end**, perché richiede una pre-registrazione vera in produzione, che crea un'anagrafica e manda mail. Da fare con una registrazione di prova concordata, controllando in Gestione eventi → Eventi di test.

## Rischi aperti
- Nessuna riconciliazione automatica fra Lead in Meta e pre-registrazioni nel CRM.
- Il modulo early bird non manda nessun evento: non è stato richiesto.
