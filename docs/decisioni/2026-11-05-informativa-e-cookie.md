# 2026-11-05 · Informativa del Meet & Discover CIS e cookie policy aderente al sito

**Classe:** R2. Un testo legale che afferma cose false non produce nessun errore (I6).
**Segue:** `2026-10-17-consenso-cookie-e-campagne.md` e `2026-10-27-open-day.md` (presupposto 1, «Informativa»).

## Perché

L'agenzia ha letto l'informativa il 05/11 e ha chiesto tre cose:
- perché Google e Meta compaiono fra chi riceve i dati;
- se la casella «ho letto l'informativa» valga come consenso alle comunicazioni della scuola;
- come si concilia «non raccogliamo dati dai minori» con il modulo che chiede nome ed età dei bambini.

Verifica fatta prima di cambiare i testi:
- sulle pagine live non è configurato nessun identificativo di Google o di Meta;
- il sito non imposta cookie;
- il banner quindi non compare (`TRACKING_ENABLED` falso);
- l'informativa descriveva comunque Google, Meta, banner e registro dei consensi;
- mancava la sezione sull'iscrizione all'evento.

## Cosa cambia

- **Nuova sezione «L'iscrizione al Meet & Discover CIS»** (italiano e inglese). Descrive:
  - i dati raccolti dal modulo, compresi gli utm;
  - le basi giuridiche (6.1.b per l'iscrizione, 6.1.f per gli utm, 6.1.a per gli aggiornamenti);
  - che la casella dell'informativa non è un consenso;
  - la cancellazione a 12 mesi dall'incontro di dati dei bambini, «come ci avete conosciuto» e utm (`purgeEventData` nel CRM);
  - la copia tecnica della landing, cancellata 30 giorni dopo la verifica.
- **Google, Meta, banner, «Preferenze cookie», registro dei consensi e tabella dei cookie** compaiono solo se il fornitore è configurato. Senza tag la cookie policy dice che il sito non usa cookie e perché non c'è il banner. Il banner e i tag sono già nel codice e si accendono da soli quando arrivano gli identificativi di build (`NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GADS_ID`, `NEXT_PUBLIC_META_PIXEL_ID`).
- **Resend** fra i fornitori in ogni caso, perché invia conferme e promemoria dell'evento.
- `POLICY_UPDATED` e `OPEN_DAY_NOTICE_VERSION` passano a `2026-11-05`. Ogni iscrizione registra nel CRM la versione che ha visto.

## Revisione del data-protection-auditor e correzioni

Applicate:
- **Email di servizio.** «Puoi disiscriverti da ogni email» era falso: conferme e promemoria non hanno la disiscrizione. Ora: disiscrizione dagli aggiornamenti; le email sull'evento portano il link per annullare l'iscrizione.
- **utm.** Dopo 12 mesi resta il collegamento alla campagna (`campaignId`). Il testo ora lo dice.
- **Copia tecnica.** Si svuota 30 giorni dopo la verifica solo se l'iscrizione è andata a buon fine. Il testo ora lo dice.
- **Elementi dell'art. 13 aggiunti:**
  - quali dati sono obbligatori e quali facoltativi;
  - la prova del doppio opt-in;
  - l'impronta IP usata dall'antispam.
- **Hosting.** Hetzner ospita sito e gestionale: stessa macchina.
- **Meta Pixel.** `/open-day` aggiunto a `NO_PIXEL_PATHS`: il Pixel, se configurato, non invia eventi dalla pagina che raccoglie dati sui bambini.
- **`CONSENT_VERSION`** allineata a `2026-11-05`.

## Rischi lasciati aperti (segnalati, decide l'utente)

- **Conservazione dell'anagrafica.** Le anagrafiche create dall'evento (nome, email, telefono) non hanno una scadenza automatica nel CRM. Il testo dice il vero («finché servono… cancellazione su richiesta»), ma non indica un termine, come richiede l'art. 13.2.a. Per indicarne uno serve un job di cancellazione nel CRM.
- **Iscrizioni non andate a buon fine.** La copia tecnica nella landing (chiusa, respinta, fallita) non ha scadenza automatica, e `ip_hash` resta sulla riga anche dopo lo svuotamento.
- **Durata della prova del consenso.** Non è indicata nel testo.

## Verifica

- Tipi e lint superati.
- Testi generati in due configurazioni:
  - senza fornitori: nessuna menzione di Google, Meta o del banner, tabella dei cookie vuota e nascosta;
  - con Pixel e GA: tutte le sezioni presenti.
