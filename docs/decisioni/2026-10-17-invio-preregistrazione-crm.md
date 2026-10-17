# 2026-10-17 · Invio della pre-registrazione al CRM (progetto)

**Classe:** R3. Riguarda dati di genitori e minori inviati a un altro sistema, una migrazione sul database di produzione del CRM e una conferma mostrata all'utente.
**Precedente:** `2026-10-16-landing-modulo-preregistrazione.md` (presupposti).
**Stato:** progetto rivisto dopo gli audit del 2026-10-17 (blast-radius, infra-assumption, observability, data-protection). Nessuna modifica ancora fatta al CRM; si attendono le decisioni del titolare.

## Richiesta del committente

L'invio deve passare dal server della landing al CRM via API. La chiave non deve mai essere visibile nel browser.

## Stato del CRM verificato il 2026-10-17

- `POST /api/v1/leads` accetta un contatto e **un solo** figlio, con nome e cognome obbligatori. Il modulo invece raccoglie fino a 4 figli e **non** ne chiede il nome.
- Non c'è un posto per il questionario: nazionalità, livelli di lingua, età, anno di ingresso, scuola attuale, lingue, bus e messaggio. Le `notes` non si possono scrivere via API.
- L'endpoint non supporta l'idempotenza.
- `router.ts:129-131` restituisce 500 dopo un salvataggio riuscito, se fallisce l'aggiornamento di `lastUsedAt`.
- Le chiavi `crm_test_` rispondono 200 con `dryRun`, senza scrivere nulla.
- I payload respinti vengono cancellati dopo 90 giorni.

## Progetto

### Nel CRM

1. **Nuovo modello `PreRegistration`.** È collegato al `Contact`.
   - **Campi del genitore:** nazionalità, livello di italiano, livello di inglese.
   - **Campi della richiesta:** interesse per il bus, messaggio, lingua, fonte.
   - **Figli:** l'array `children` è JSON validato. Per ogni figlio: età, sesso, anno di ingresso, città futura, scuola attuale con città e paese, uso dell'italiano e dell'inglese, lingue extra con il loro uso.
   - **`idempotencyKey`** univoca.
   - **`expiresAt`** per la conservazione decisa dal titolare.
2. **Nuovo endpoint `POST /api/v1/pre-registrations`.** Usa l'ambito `leads:write`.
   - Crea in **una sola transazione** il contatto (con il segnale di possibile duplicato già esistente), il consenso marketing in stato PENDING se richiesto, e la pre-registrazione.
   - Con `Idempotency-Key` già vista, restituisce la stessa risposta 201 senza scrivere di nuovo.
3. **Correzione del bug di `router.ts:129-131`.** L'aggiornamento di `lastUsedAt` diventa una scrittura accessoria: se fallisce viene registrato nei log, ma non cambia l'esito.
4. **Vista minima nella scheda del contatto.** Mostra le pre-registrazioni. Senza questa vista i dati non li vedrebbe nessuno (I1).

### Nella landing

1. **`POST /api/pre-registration`**, eseguito solo sul server.
   - Validazione zod condivisa con il client.
   - La chiave del CRM sta solo nelle variabili di runtime di Coolify (`CRM_API_KEY`, `crm_live_`) e non arriva mai nel bundle del browser.
2. **Registro dei tentativi** nel Postgres della landing (`preregistration_attempts`). Si scrive **prima** della chiamata al CRM e contiene:
   - l'id del tentativo, che fa anche da chiave di idempotenza;
   - il payload;
   - lo stato (`received` → `delivered` | `failed`);
   - il codice dell'ultimo errore;
   - gli id restituiti dal CRM.

   Il payload viene cancellato 30 giorni dopo la consegna. I metadati restano.
3. **Successo solo con** `201` + `contact.id` + nessun `dryRun`. Il messaggio all'utente dice solo ciò che è vero:
   - *ricevuto e registrato*, se il CRM ha confermato;
   - *ricevuto, lo registriamo a breve*, se il tentativo è salvato ma il CRM non risponde.
4. **Nuovi tentativi.** Un'attività pianificata di Coolify chiama `POST /api/pre-registration/retry`, protetto da un segreto.
   - Prova con backoff i tentativi `failed`, usando la stessa chiave di idempotenza.
   - Esce con un errore se ci sono tentativi non consegnati da più di un'ora, così scatta la notifica di Coolify.
5. **Antispam che non scarta.** Un campo esca (honeypot) e un limite di frequenza per IP in hash **marcano** il tentativo (tag `sospetto`) ma lo consegnano lo stesso.
6. **Consenso agli aggiornamenti.** Va al CRM con:
   - `source=landing-preregistrazione`;
   - la versione del testo;
   - l'impronta dell'IP e lo user agent come prova.
7. **Indirizzo del CRM.** Si usa quello pubblico `https://crm.cis-colico.com`, attraverso Cloudflare.
   - Va verificato che le regole anti-bot non blocchino le chiamate fra server.
   - Va valutato in alternativa un alias di rete interno stabile.

## Presupposti dal titolare ancora aperti

- Base giuridica per i dati dei figli (art. 6.1.b o consenso).
- Conservazione delle pre-registrazioni.
- Minimizzazione: sesso, scuola attuale, nazionalità.
- DPA con Resend, se le email di conferma passano da lì.
- Sezione dell'informativa dedicata al modulo.

Finché mancano, `SUBMISSION_ENABLED` resta `false` anche dopo la consegna del codice.

## Correzioni dagli audit (2026-10-17)

**Perdita e duplicati (blast-radius)**
- Il retry rilegge **ogni stato non terminale** (`received`, `failed`), non solo `failed`. Un processo morto tra scrittura e chiamata lasciava il tentativo fermo per sempre.
- L'id del tentativo è un **UUID casuale**, non una sequenza. Il CRM salva anche l'impronta del payload con la chiave: stessa chiave e payload diverso danno 409, così un database ripristinato non può confermare un lead nuovo con la risposta di uno vecchio.
- L'idempotenza nel CRM è **atomica**: insert con vincolo unico e, sul conflitto, rilettura della risposta salvata. Niente «leggi e poi scrivi». Due retry possono girare in sovrapposizione: Coolify fa fino a 3 tentativi senza protezione.
- I 422 portano a uno stato terminale **`rejected`**, con motivo e allarme. Non si ritenta.
- Il payload nella landing si cancella solo dopo che la **riconciliazione** ha trovato l'id nel CRM, non sulla sola risposta 201.
- La marcatura `sospetto` non è letta da segmenti né campagne. Prima di attivare il limite per IP si verifica che la landing legga l'IP reale e non quello del proxy.
- `/leads` resta com'è. La nuova rotta fa contatto, consenso e pre-registrazione in una transazione.

**Osservabilità**
- Il worker del CRM riconcilia ogni ora:
  - tentativi consegnati nella landing contro pre-registrazioni nel CRM, tolleranza 0;
  - tentativi non terminali più vecchi di 1 ora, atteso 0;
  - landing raggiungibile.

  Ogni campo ha la sua `raiseAlert`.
- Allarme **fuori dal CRM**: il retry della landing esce con errore se l'ultima riconciliazione del CRM è più vecchia di 2 ore. I due sistemi si controllano a vicenda.
- Avviso 30 giorni prima della scadenza della chiave API.
- Il destinatario degli allarmi è una persona nominata, con `ALERT_EMAIL` impostata e provata.

**Infrastruttura (verifiche sul server)**
- La landing raggiunge `https://crm.cis-colico.com` senza sfide di Cloudflare: 401 JSON in 100-365 ms (L12). Si usa l'indirizzo pubblico. Una risposta non JSON vale `failed`.
- **Le notifiche di Coolify non hanno canali attivi** (L13, falsa). Va configurato un canale e provato con un task che fallisce di proposito, prima di contarci.
- Il task deve indicare il campo `container`, altrimenti durante un rilascio fallisce perché trova più container.
- **La migrazione Prisma del CRM gira all'avvio del container** e il backup è solo orario (L14, falsa). Prima del rilascio con la migrazione si fa un backup manuale. La migrazione aggiunge soltanto: durante la rotazione il codice vecchio resta in servizio.
- Container in UTC (L15).

**Protezione dei dati**
- Nuovo permesso `preregistrations.read`, riservato a segreteria, direzione e amministrazione. I campi restano fuori dai segmenti, dagli export e da `leads:read`.
- Il nuovo endpoint registra il consenso con `recordConsent`, che invia l'email di conferma (doppio opt-in). Prima di accendere il modulo si verifica `EMAIL_MODE=live` in produzione.
- La copia nella landing ha un tetto assoluto anche per i tentativi mai consegnati, con un allarme prima della cancellazione.
- Ogni esito mostrato all'utente riporta il contatto alternativo info@cis-colico.com.
- Per il testo libero serve una procedura scritta: chi trova dati sanitari li cancella e lo registra.
- «Considerazione prioritaria» è una promessa senza riscontro: si toglie o si scrive il criterio (decisione del titolare).
