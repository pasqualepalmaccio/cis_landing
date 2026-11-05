import { TRACKING_ENABLED, VENDORS } from "@/lib/consent/config";

import { SUBMISSION_ENABLED } from "../registration";
import { OWNER, POLICY_UPDATED } from "./owner";

/* Privacy e cookie policy in italiano. Bozza tecnica: va validata dal titolare
   o da un legale prima di accendere i tag (record 2026-10-17). I campi vuoti
   del titolare compaiono come «da completare».
   Google, Meta, banner e registro dei consensi compaiono solo se il fornitore
   è configurato: l'informativa descrive ciò che il sito fa davvero (I6). */

const missing = "[da completare]";
const o = (v: string) => v || missing;
const GOOGLE = TRACKING_ENABLED && Boolean(VENDORS.ga4 || VENDORS.googleAds);
const META = TRACKING_ENABLED && Boolean(VENDORS.metaPixel);
const when = <T>(on: boolean, ...items: T[]): T[] => (on ? items : []);

export type Section = { title: string; paragraphs: string[]; items?: string[] };

export const legalIt = {
  updated: `Ultimo aggiornamento: ${POLICY_UPDATED}`,
  draftNotice: "Bozza in revisione. Alcuni dati del titolare sono ancora da completare.",
  privacy: {
    meta: { title: "Privacy policy · CIS", description: "Come trattiamo i dati personali di chi visita il sito della Colico International School." },
    eyebrow: "Privacy",
    title: "Privacy policy",
    lead: "Qui spieghiamo quali dati raccoglie questo sito, perché, con chi li condividiamo e come puoi esercitare i tuoi diritti.",
    sections: [
      {
        title: "Chi è il titolare",
        paragraphs: [
          `Il titolare del trattamento è ${o(OWNER.name)}, con sede in ${o(OWNER.address)}, P.IVA ${o(OWNER.vatNumber)}.`,
          `Per qualsiasi domanda sulla privacy puoi scrivere a ${o(OWNER.privacyEmail)}.${OWNER.dpoEmail ? ` Il responsabile della protezione dei dati (DPO) risponde a ${OWNER.dpoEmail}.` : ""}`,
        ],
      },
      {
        title: "Quali dati trattiamo",
        paragraphs: [
          "Quando visiti il sito, il server riceve i dati tecnici che ogni browser invia: indirizzo IP, tipo di browser, pagina richiesta, data e ora. Servono a mostrarti le pagine e a proteggere il sito.",
          TRACKING_ENABLED
            ? "Se acconsenti, usiamo anche cookie di statistica e di marketing. Cosa fanno, chi li gestisce e quanto durano è scritto nella cookie policy."
            : "Il sito non usa cookie di statistica né di pubblicità, e il tuo browser non contatta Google né Meta.",
          "Se ci scrivi via email, trattiamo i dati che ci mandi per risponderti.",
          "Se ti iscrivi al Meet & Discover CIS trattiamo i dati descritti nella sezione dedicata qui sotto.",
          SUBMISSION_ENABLED
            ? "Se compili il modulo di pre-registrazione trattiamo i dati descritti nella sezione dedicata qui sotto."
            : "Il modulo di pre-registrazione non è ancora attivo. Aggiorneremo questa pagina prima di attivarlo.",
        ],
      },
      {
        title: "L'iscrizione al Meet & Discover CIS",
        paragraphs: [
          "Se ti iscrivi trattiamo: nome, cognome, email e telefono; quanti adulti e bambini partecipano; per ogni bambino l'anno di nascita, la scuola di interesse e l'anno scolastico di inizio, e il nome solo se scegli di darcelo; come ci avete conosciuto, se ce lo dici. Teniamo anche i parametri del link da cui arrivi (utm), che indicano quale annuncio o email ti ha portato alla pagina. Si leggono dall'indirizzo, senza cookie.",
          "I dati sui bambini li inserisce il genitore. Chiediamo solo quelli che servono a organizzare l'incontro e a capire per quale classe e quale anno vi interessa la scuola.",
          "Nome, cognome, email, telefono, numero di partecipanti e, per ogni bambino, anno di nascita, scuola e anno di inizio sono necessari: senza non possiamo iscriverti. Il nome del bambino e «come ci avete conosciuto» sono facoltativi.",
          "Usiamo questi dati per gestire l'iscrizione che ci chiedi: assegnarti l'orario, mandarti la conferma, il promemoria e gli avvisi sull'evento, gestire la lista d'attesa e rispondere alle tue domande sull'ingresso a scuola (art. 6.1.b GDPR, misure precontrattuali richieste da te). I parametri del link ci servono a sapere, in forma aggregata, quali canali funzionano (legittimo interesse, art. 6.1.f GDPR). Per proteggere il modulo dagli invii automatici usiamo un'impronta cifrata del tuo indirizzo IP, mai l'indirizzo in chiaro (legittimo interesse, art. 6.1.f GDPR).",
          "La casella «Ho letto l'informativa» non è un consenso: conferma solo che hai letto questa pagina. Senza un tuo consenso non ti mandiamo comunicazioni promozionali. Gli aggiornamenti sulla scuola li riceve solo chi spunta la casella facoltativa e poi conferma l'indirizzo dal link che riceve (art. 6.1.a GDPR). In quel caso conserviamo la prova del consenso: data e ora, pagina, browser e l'impronta cifrata dell'indirizzo IP. Dagli aggiornamenti puoi disiscriverti in ogni momento dal link in ciascuna di quelle email. Le email sull'evento (conferma, promemoria, avvisi) contengono invece il link per annullare l'iscrizione.",
          "I dati sui bambini, la risposta a «come ci avete conosciuto» e i parametri del link si cancellano 12 mesi dopo l'incontro. Resta solo il collegamento alla campagna da cui sei arrivato, per le statistiche. Nome, cognome, email e telefono restano nel nostro gestionale finché servono a seguire il tuo interesse per la scuola, e puoi chiederne la cancellazione in qualsiasi momento. Il server del sito tiene una copia tecnica di sicurezza dell'iscrizione, che si svuota 30 giorni dopo che il gestionale l'ha registrata. Se l'iscrizione non va a buon fine, la copia resta finché non abbiamo risolto il problema con te.",
          "Nel gestionale li vedono solo le persone autorizzate dalla scuola.",
        ],
      },
      ...(SUBMISSION_ENABLED
        ? [
            {
              title: "Il modulo di pre-registrazione",
              paragraphs: [
                "Se compili il modulo trattiamo i tuoi dati di contatto (nome, cognome, email, telefono, città) e le informazioni sui tuoi figli che ci dai: età, anno di ingresso, città in cui vivrete, paese della scuola attuale, lingue usate, interesse per il bus. Non chiediamo il nome dei bambini.",
                "Li usiamo per ricontattarti, su tua richiesta, prima dell'iscrizione e per organizzare l'apertura della scuola in forma aggregata (art. 6.1.b GDPR). Il modulo non è un'iscrizione e non assegna un posto.",
                "Ti chiediamo di non scrivere informazioni sulla salute dei bambini. Se arrivano lo stesso, le cancelliamo.",
                "Gli aggiornamenti via email li inviamo solo se li chiedi e confermi l'indirizzo dal link che ricevi (art. 6.1.a GDPR). Puoi disiscriverti da ogni email.",
                "I dati restano nel nostro gestionale per 24 mesi e poi vengono cancellati. Il server del sito ne tiene una copia tecnica di sicurezza, che si cancella 30 giorni dopo che il gestionale ha confermato di averli registrati.",
                "Nel gestionale li vedono solo segreteria e direzione.",
              ],
            },
          ]
        : []),
      {
        title: "Perché e su quale base",
        paragraphs: [],
        items: [
          "Far funzionare il sito e tenerlo sicuro: è necessario per offrirti il servizio che chiedi aprendo la pagina e risponde al nostro legittimo interesse alla sicurezza (art. 6.1.b e 6.1.f GDPR).",
          ...when(TRACKING_ENABLED, "Ricordare la tua scelta sui cookie e conservarne la prova: è un obbligo di legge (art. 6.1.c e art. 7.1 GDPR)."),
          "Gestire la tua iscrizione al Meet & Discover CIS: serve a dare seguito alla tua richiesta (art. 6.1.b GDPR).",
          ...when(Boolean(TRACKING_ENABLED && VENDORS.ga4), "Statistiche di visita: solo con il tuo consenso (art. 6.1.a GDPR)."),
          ...when(Boolean(TRACKING_ENABLED && (VENDORS.googleAds || VENDORS.metaPixel)), "Misurare i nostri annunci e mostrarli a chi ha già visitato il sito (remarketing): solo con il tuo consenso (art. 6.1.a GDPR)."),
          "Mandarti aggiornamenti sulla scuola: solo se li chiedi e confermi l'indirizzo (art. 6.1.a GDPR).",
          "Rispondere alle tue email: serve a dare seguito alla tua richiesta (art. 6.1.b GDPR).",
        ],
      },
      ...when(TRACKING_ENABLED, {
        title: "La prova del tuo consenso",
        paragraphs: [
          "Quando scegli dal banner salviamo un registro della scelta: un codice casuale, data e ora, la versione del banner, le finalità accettate o rifiutate, il browser e un'impronta cifrata del tuo indirizzo IP, troncato prima di essere cifrato. Non contiene il tuo nome né il tuo indirizzo IP in chiaro.",
          `Conserviamo il registro per ${o(OWNER.consentRetention.it)} dall'ultima scelta, per poter dimostrare il consenso se ci viene chiesto.`,
        ],
      }),
      {
        title: "Con chi condividiamo i dati",
        paragraphs: ["Non vendiamo i dati e non li cediamo a nessuno. Arrivano solo ai fornitori che ci servono per far funzionare il sito e mandare le email, che li trattano per nostro conto:"],
        items: [
          "Hetzner Online GmbH (Germania), che ospita i server del sito e del gestionale, come responsabile del trattamento.",
          "Cloudflare, Inc., che protegge e velocizza il sito, come responsabile del trattamento.",
          "Resend, Inc. (Stati Uniti), che invia le email di conferma, promemoria e aggiornamenti, come responsabile del trattamento.",
          ...when(GOOGLE, "Google Ireland Ltd e Google LLC, per Google Analytics e Google Ads, solo se lo accetti dal banner dei cookie."),
          ...when(META, "Meta Platforms Ireland Ltd, per il Meta Pixel, solo se lo accetti dal banner dei cookie. Per la raccolta e la trasmissione dei dati del Pixel siamo contitolari con Meta (art. 26 GDPR). Il contenuto essenziale dell'accordo è disponibile su facebook.com/legal/controller_addendum. Per tutto quello che Meta fa dopo con i dati, il titolare è Meta."),
        ],
      },
      {
        title: "Trasferimenti fuori dall'Unione europea",
        paragraphs: [
          `${[...when(GOOGLE, "Google"), ...when(META, "Meta"), "Cloudflare", "Resend"].join(", ").replace(/, (?=[^,]+$)/, " e ")} possono trattare dati negli Stati Uniti. Il trasferimento si basa sulla decisione di adeguatezza della Commissione europea del 10 luglio 2023 (EU-US Data Privacy Framework), per le società che vi aderiscono, e sulle clausole contrattuali standard.`,
        ],
      },
      {
        title: "Per quanto tempo",
        paragraphs: [
          "I dati tecnici di navigazione restano nei log del server solo per il tempo necessario alla sicurezza del sito.",
          "Per l'iscrizione al Meet & Discover CIS e la pre-registrazione i tempi sono indicati nelle sezioni dedicate.",
          TRACKING_ENABLED
            ? "La durata di ogni cookie è indicata nella cookie policy. Le email restano finché servono a gestire la tua richiesta."
            : "Le email restano finché servono a gestire la tua richiesta.",
        ],
      },
      {
        title: "Minori",
        paragraphs: [
          `Il sito si rivolge ai genitori. Non raccogliamo dati direttamente da minori di 14 anni: le informazioni sui bambini le inserisce il genitore, quando si iscrive all'incontro o si pre-registra.${TRACKING_ENABLED ? " Le nostre campagne pubblicitarie non sono rivolte a minori." : ""}`,
        ],
      },
      {
        title: "I tuoi diritti",
        paragraphs: [
          `Puoi chiedere di accedere ai tuoi dati, correggerli, cancellarli, limitarne il trattamento, riceverli in un formato portabile e opporti al trattamento (artt. 15-22 GDPR). Puoi revocare un consenso in qualsiasi momento${TRACKING_ENABLED ? ": quello sui cookie da «Preferenze cookie», in fondo a ogni pagina, quello agli aggiornamenti dal link in ogni email di aggiornamento" : ", dal link in ogni email di aggiornamento"}. La revoca non cambia ciò che è avvenuto prima. Per esercitare i diritti scrivi a ${o(OWNER.privacyEmail)}.`,
          "Se pensi che il trattamento violi la normativa, puoi presentare reclamo al Garante per la protezione dei dati personali (garanteprivacy.it).",
        ],
      },
      {
        title: "Modifiche",
        paragraphs: ["Se cambiamo questa informativa aggiorniamo la data in alto. Se cambiano le finalità o i fornitori ti chiediamo di nuovo il consenso."],
      },
    ] as Section[],
  },
  cookie: {
    meta: { title: "Cookie policy · CIS", description: "Quali cookie usa il sito della Colico International School e come gestirli." },
    eyebrow: "Cookie",
    title: "Cookie policy",
    lead: "I cookie sono piccoli file che il sito salva nel tuo browser. Alcuni servono al sito per funzionare, altri li usiamo solo se ci dai il permesso.",
    sections: [
      ...(TRACKING_ENABLED
        ? [
            {
              title: "Come funziona il consenso",
              paragraphs: [
                "Alla prima visita un banner ti chiede cosa accettare. Finché non scegli, il sito usa solo cookie tecnici e il tuo browser non contatta Google né Meta. Se chiudi il banner con la X, vale come rifiuto.",
                "Ti richiediamo il consenso dopo 6 mesi, oppure prima se cambiano le finalità o i fornitori. Puoi cambiare idea in qualsiasi momento da «Preferenze cookie», in fondo a ogni pagina.",
              ],
            },
            {
              title: "Tecnici",
              paragraphs: ["Servono a far funzionare il sito e a ricordare la tua scelta sui cookie. Non chiedono consenso."],
            },
          ]
        : [
            {
              title: "Oggi il sito non usa cookie",
              paragraphs: [
                "Il sito non salva cookie nel tuo browser: niente statistiche, niente pubblicità, e il tuo browser non contatta Google né Meta. Per questo non vedi nessun banner: non c'è nulla da accettare.",
                "Se in futuro useremo strumenti di statistica o di pubblicità, aggiorneremo questa pagina e alla prima visita un banner ti chiederà il consenso. Senza il tuo sì non partiranno.",
              ],
            },
          ]),
      ...when(Boolean(TRACKING_ENABLED && VENDORS.ga4), {
        title: "Statistiche",
        paragraphs: [
          "Con il tuo consenso usiamo Google Analytics per contare visite e pagine viste. Usiamo Consent Mode di Google: senza consenso lo script non viene caricato.",
        ],
      }),
      ...when(Boolean(TRACKING_ENABLED && (VENDORS.googleAds || VENDORS.metaPixel)), {
        title: "Marketing e remarketing",
        paragraphs: [
          `Con il tuo consenso usiamo ${[...when(Boolean(VENDORS.googleAds), "Google Ads"), ...when(META, "il Meta Pixel")].join(" e ")} per sapere se una visita arriva da un nostro annuncio e per mostrare i nostri annunci a chi ha già visitato il sito.${META ? " Il Meta Pixel non legge i campi dei moduli e non invia eventi dalle pagine di pre-registrazione e di iscrizione al Meet & Discover CIS." : ""}`,
        ],
      }),
      ...when(TRACKING_ENABLED, {
        title: "Gestire i cookie dal browser",
        paragraphs: [
          "Puoi anche cancellare o bloccare i cookie dalle impostazioni del browser. Se blocchi quelli tecnici, il sito potrebbe richiederti la scelta a ogni visita.",
        ],
      }),
      ...when(GOOGLE || META, {
        title: "Informative dei fornitori",
        paragraphs: [],
        items: [
          ...when(GOOGLE, "Google: policies.google.com/privacy e business.safety.google/adscookies"),
          ...when(META, "Meta: facebook.com/privacy/policy e facebook.com/policies/cookies"),
        ],
      }),
    ] as Section[],
    table: {
      title: "I cookie del sito",
      head: { name: "Nome", provider: "Fornitore", purpose: "Finalità", duration: "Durata" },
      purposes: { necessary: "Tecnico", statistics: "Statistiche", marketing: "Marketing" },
      days: (d: number) => (d === 0 ? "sessione" : d >= 365 ? `${Math.round(d / 365)} ${Math.round(d / 365) === 1 ? "anno" : "anni"}` : d >= 60 ? `${Math.round(d / 30)} mesi` : `${d} giorni`),
      thirdParty: "di terza parte",
    },
  },
};

export type LegalDict = typeof legalIt;
