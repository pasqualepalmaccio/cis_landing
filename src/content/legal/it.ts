import { OWNER, POLICY_UPDATED } from "./owner";

/* Privacy e cookie policy in italiano. Bozza tecnica: va validata dal titolare
   o da un legale prima di accendere i tag (record 2026-10-17). I campi vuoti
   del titolare compaiono come «da completare». */

const missing = "[da completare]";
const o = (v: string) => v || missing;

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
          "Se acconsenti, usiamo anche cookie di statistica e di marketing. Cosa fanno, chi li gestisce e quanto durano è scritto nella cookie policy.",
          "Se ci scrivi via email, trattiamo i dati che ci mandi per risponderti.",
          "Il modulo di pre-registrazione non è ancora attivo: oggi il sito non raccoglie dati tramite moduli. Aggiorneremo questa pagina prima di attivarlo.",
        ],
      },
      {
        title: "Perché e su quale base",
        paragraphs: [],
        items: [
          "Far funzionare il sito e tenerlo sicuro: è necessario per offrirti il servizio che chiedi aprendo la pagina e risponde al nostro legittimo interesse alla sicurezza (art. 6.1.b e 6.1.f GDPR).",
          "Ricordare la tua scelta sui cookie e conservarne la prova: è un obbligo di legge (art. 6.1.c e art. 7.1 GDPR).",
          "Statistiche di visita: solo con il tuo consenso (art. 6.1.a GDPR).",
          "Misurare i nostri annunci e mostrarli a chi ha già visitato il sito (remarketing): solo con il tuo consenso (art. 6.1.a GDPR).",
          "Rispondere alle tue email: serve a dare seguito alla tua richiesta (art. 6.1.b GDPR).",
        ],
      },
      {
        title: "La prova del tuo consenso",
        paragraphs: [
          "Quando scegli dal banner salviamo un registro della scelta: un codice casuale, data e ora, la versione del banner, le finalità accettate o rifiutate, il browser e un'impronta cifrata del tuo indirizzo IP, troncato prima di essere cifrato. Non contiene il tuo nome né il tuo indirizzo IP in chiaro.",
          `Conserviamo il registro per ${o(OWNER.consentRetention.it)} dall'ultima scelta, per poter dimostrare il consenso se ci viene chiesto.`,
        ],
      },
      {
        title: "Con chi condividiamo i dati",
        paragraphs: ["I dati arrivano solo a chi ci serve per far funzionare il sito o per le finalità che hai accettato:"],
        items: [
          "Hetzner Online GmbH (Germania), che ospita il server del sito, come responsabile del trattamento.",
          "Cloudflare, Inc., che protegge e velocizza il sito, come responsabile del trattamento.",
          "Google Ireland Ltd e Google LLC, per Google Analytics e Google Ads, solo con il tuo consenso.",
          "Meta Platforms Ireland Ltd, per il Meta Pixel, solo con il tuo consenso. Per la raccolta e la trasmissione dei dati del Pixel siamo contitolari con Meta (art. 26 GDPR). Il contenuto essenziale dell'accordo è disponibile su facebook.com/legal/controller_addendum. Per tutto quello che Meta fa dopo con i dati, il titolare è Meta.",
        ],
      },
      {
        title: "Trasferimenti fuori dall'Unione europea",
        paragraphs: [
          "Google, Meta e Cloudflare possono trattare dati negli Stati Uniti. Il trasferimento si basa sulla decisione di adeguatezza della Commissione europea del 10 luglio 2023 (EU-US Data Privacy Framework), a cui queste società aderiscono, e sulle clausole contrattuali standard.",
        ],
      },
      {
        title: "Per quanto tempo",
        paragraphs: [
          "I dati tecnici di navigazione restano nei log del server solo per il tempo necessario alla sicurezza del sito.",
          "La durata di ogni cookie è indicata nella cookie policy. Le email restano finché servono a gestire la tua richiesta.",
        ],
      },
      {
        title: "Minori",
        paragraphs: [
          "Il sito si rivolge ai genitori. Non raccogliamo consapevolmente dati direttamente da minori di 14 anni e le nostre campagne pubblicitarie non sono rivolte a minori.",
        ],
      },
      {
        title: "I tuoi diritti",
        paragraphs: [
          `Puoi chiedere di accedere ai tuoi dati, correggerli, cancellarli, limitarne il trattamento, riceverli in un formato portabile e opporti al trattamento (artt. 15-22 GDPR). Puoi revocare il consenso in qualsiasi momento da «Preferenze cookie», in fondo a ogni pagina: la revoca non cambia ciò che è avvenuto prima. Per esercitare i diritti scrivi a ${o(OWNER.privacyEmail)}.`,
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
      {
        title: "Statistiche",
        paragraphs: [
          "Con il tuo consenso usiamo Google Analytics per contare visite e pagine viste. Usiamo Consent Mode di Google: senza consenso lo script non viene caricato.",
        ],
      },
      {
        title: "Marketing e remarketing",
        paragraphs: [
          "Con il tuo consenso usiamo Google Ads e il Meta Pixel per sapere se una visita arriva da un nostro annuncio e per mostrare i nostri annunci a chi ha già visitato il sito. Il Meta Pixel non legge i campi dei moduli e non invia eventi dalla pagina di pre-registrazione.",
        ],
      },
      {
        title: "Gestire i cookie dal browser",
        paragraphs: [
          "Puoi anche cancellare o bloccare i cookie dalle impostazioni del browser. Se blocchi quelli tecnici, il sito potrebbe richiederti la scelta a ogni visita.",
        ],
      },
      {
        title: "Informative dei fornitori",
        paragraphs: [],
        items: ["Google: policies.google.com/privacy e business.safety.google/adscookies", "Meta: facebook.com/privacy/policy e facebook.com/policies/cookies"],
      },
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
