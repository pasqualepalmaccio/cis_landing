import type { Lang } from "./index";

/* Le condizioni early bird (bozza del committente, 13/11/2026).

   La pagina è il sito principale con un'apertura early bird, la sezione
   delle condizioni e un banner prima delle rette.

   ANTEPRIMA: la pagina non è collegata dal sito ed è fuori dai motori di
   ricerca finché PREVIEW è true.

   Pre-prenotazione €1.500 confermata dalla scuola il 16/11/2026. Il totale
   di NSAF + iscrizione su cui vale lo sconto non si scrive qui: si calcola
   dalle rette (src/lib/early-bird/vars.ts), così segue il listino. */
export const EARLY_BIRD = {
  PREVIEW: true,
  /** Pre-prenotazione per bambino. */
  prebooking: 1500,
  places: 20,
  /** Fine dell'offerta: il 14 dicembre 2026 compreso, ora di Roma. */
  deadline: "2026-12-14T23:59:59+01:00",
} as const;

/** Dove portano tutte le azioni della pagina early bird: la sezione di
 *  prenotazione (il modulo quando è acceso, altrimenti la mail a info@). */
export const EARLY_BIRD_PATH = "/early-bird";
export const BOOKING_ANCHOR = "#prenota";

/* I segnaposto fra graffe ({prebooking}, {combined}, {places}) si
   riempiono con gli importi qui sopra, nel formato della lingua. */
export const earlyBirdCopy = {
  it: {
    meta: {
      title: "Condizioni early bird · Colico International School",
      description: "15% sulla retta del primo anno, 50% su NSAF e iscrizione, listino bloccato per cinque anni. Per l'ingresso a settembre 2027.",
    },
    preview: "Anteprima: questa pagina non è ancora pubblica.",
    /* Apertura: sostituisce solo questi testi di quella della home. */
    hero: {
      eyebrow: "Early bird · Solo per i primi {places} posti",
      titleLines: ["Scegli la Colico International School tra i primi", "15% sulla retta del primo anno"],
      sub: "50% su NSAF e iscrizione, listino bloccato per cinque anni. Entro il 14 dicembre 2026.",
      cta: "Prenota il tuo posto",
    },
    countdown: {
      label: "L'offerta early bird termina tra",
      units: { days: ["giorno", "giorni"], hours: ["ora", "ore"], minutes: ["minuto", "minuti"], seconds: ["secondo", "secondi"] },
      ended: "L'offerta early bird è terminata",
    },
    banner: {
      label: "Early bird",
      text: "15% sulla retta del primo anno, 50% su NSAF e iscrizione e listino bloccato per cinque anni. Entro il 14 dicembre 2026, solo per i primi {places} posti.",
      link: "Prenota il tuo posto",
    },
    eyebrow: "Early bird",
    title: "Condizioni early bird",
    lead: "Per le famiglie che scelgono per prime CIS, con ingresso a settembre 2027.",
    offers: [
      { value: "15%", title: "di sconto sulla retta", body: "sul primo anno del tuo bambino, per l'ingresso a settembre 2027" },
      { value: "50%", title: "di sconto su NSAF e iscrizione annuale", body: "la metà di NSAF e iscrizione annuale ({combined} in totale)" },
      { value: "5 anni", title: "protezione dall'inflazione", body: "Il nostro listino resta bloccato per i primi cinque anni del tuo bambino, senza aumenti." },
    ],
    how: {
      eyebrow: "Come assicurarti l'offerta",
      title: "{prebooking} per bambino/a, entro il 14 dicembre 2026",
      points: [
        "**Limitato ai primi {places} posti**, assegnati in ordine di pagamento ricevuto.",
        "Completamente rimborsabile, senza domande, fino al 15 gennaio 2027.",
        "**Dal 16 gennaio i {prebooking} non sono più rimborsabili.** Vengono trattenuti come NSAF e iscrizione (con lo sconto del 50%) e l'iscrizione del tuo bambino diventa definitiva, subordinatamente alla conferma di apertura del 20 gennaio 2027. Se non apriamo, tutto viene rimborsato.",
      ],
    },
    /* Finché il modulo non c'è, la prenotazione parte da una mail a info@:
       la scuola risponde con le istruzioni per il bonifico. */
    book: {
      cta: "Prenota il tuo posto",
      title: "Pre-prenota il tuo posto",
      lead: "Scrivici con nome del genitore, telefono, numero e anno di nascita dei bambini. Ti rispondiamo con la causale e i dati per il bonifico, da fare entro il 14 dicembre 2026.",
      emailCta: "Scrivi a info@cis-colico.com",
      note: "Se cliccando non si apre la posta, copia l'indirizzo qui sopra e scrivici dal tuo account email.",
      subject: "Pre-prenotazione early bird",
      body: "Buongiorno,\nvorrei pre-prenotare un posto early bird per l'ingresso a settembre 2027.\n\nNome e cognome del genitore:\nTelefono:\nNumero di bambini:\nAnno di nascita dei bambini:\n\nGrazie",
    },
  },
  en: {
    meta: {
      title: "Early-bird conditions · Colico International School",
      description: "15% off first-year tuition, 50% off NSAF and registration, price list frozen for five years. For entry in September 2027.",
    },
    preview: "Preview: this page is not public yet.",
    hero: {
      eyebrow: "Early bird · First {places} places only",
      titleLines: ["Be among the first to choose Colico International School", "15% off first-year tuition"],
      sub: "50% off NSAF and registration, price list frozen for five years. By 14 December 2026.",
      cta: "Book your place",
    },
    countdown: {
      label: "The early-bird offer ends in",
      units: { days: ["day", "days"], hours: ["hour", "hours"], minutes: ["minute", "minutes"], seconds: ["second", "seconds"] },
      ended: "The early-bird offer has ended",
    },
    banner: {
      label: "Early bird",
      text: "15% off first-year tuition, 50% off NSAF and registration and a price list frozen for five years. By 14 December 2026, for the first {places} places only.",
      link: "Book your place",
    },
    eyebrow: "Early bird",
    title: "Early-bird conditions",
    lead: "For the families who choose CIS first, for entry in September 2027.",
    offers: [
      { value: "15%", title: "off tuition", body: "on your child's first year, for entry in September 2027" },
      { value: "50%", title: "off NSAF and annual registration", body: "half of the NSAF and annual registration ({combined} combined)" },
      { value: "5 years", title: "inflation protection", body: "Our price list stays frozen for your child's first five years, with no increases." },
    ],
    how: {
      eyebrow: "How to secure it",
      title: "{prebooking} per child, by 14 December 2026",
      points: [
        "**Limited to the first {places} places**, allocated in order of payment received.",
        "Fully refundable, no questions asked, until 15 January 2027.",
        "**From 16 January, the {prebooking} is no longer refundable.** It is retained as your NSAF and registration fee (at 50% off), and your child's enrolment becomes final, subject to the opening being confirmed on 20 January 2027. If we do not open, everything is refunded.",
      ],
    },
    book: {
      cta: "Book your place",
      title: "Pre-book your place",
      lead: "Write to us with the parent's name, phone number, and the number and year of birth of your children. We will reply with your reference and the bank transfer details; the transfer is due by 14 December 2026.",
      emailCta: "Write to info@cis-colico.com",
      note: "If clicking does not open your email, copy the address above and write to us from your email account.",
      subject: "Early-bird pre-booking",
      body: "Hello,\nI would like to pre-book an early-bird place for entry in September 2027.\n\nParent's full name:\nPhone:\nNumber of children:\nChildren's year of birth:\n\nThank you",
    },
  },
} satisfies Record<Lang, unknown>;

export type EarlyBirdCopy = (typeof earlyBirdCopy)[Lang];
