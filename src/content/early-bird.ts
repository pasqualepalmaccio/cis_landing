import type { Lang } from "./index";

/* Le condizioni early bird (bozza del committente, 13/11/2026).

   ANTEPRIMA: la pagina non è collegata dal sito ed è fuori dai motori di
   ricerca finché PREVIEW è true. Gli importi sono quelli della bozza e vanno
   confermati: la pre-prenotazione era la metà di NSAF + iscrizione quando
   l'iscrizione costava €1.100 (€3.100 in totale); con l'iscrizione a €1.000
   la metà sarebbe €1.500. Si cambiano qui, in un posto solo. */
export const EARLY_BIRD = {
  PREVIEW: true,
  /** Pre-prenotazione per bambino. */
  prebooking: 1550,
  /** NSAF + iscrizione annuale, su cui vale lo sconto del 50%. */
  combined: 3100,
  places: 20,
} as const;

/* I segnaposto fra graffe ({prebooking}, {combined}, {places}) si
   riempiono con gli importi qui sopra, nel formato della lingua. */
export const earlyBirdCopy = {
  it: {
    meta: {
      title: "Condizioni early bird · Colico International School",
      description: "15% sulla retta del primo anno, 50% su NSAF e iscrizione, listino bloccato per cinque anni. Per l'ingresso a settembre 2027.",
    },
    preview: "Anteprima: questa pagina non è ancora pubblica e gli importi sono da confermare.",
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
    soon: "Il modulo di pre-prenotazione sarà disponibile a breve.",
    questions: "Per domande scrivici a",
  },
  en: {
    meta: {
      title: "Early-bird conditions · Colico International School",
      description: "15% off first-year tuition, 50% off NSAF and registration, price list frozen for five years. For entry in September 2027.",
    },
    preview: "Preview: this page is not public yet and the amounts are still to be confirmed.",
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
    soon: "The pre-booking form will be available soon.",
    questions: "Questions? Write to",
  },
} satisfies Record<Lang, unknown>;

export type EarlyBirdCopy = (typeof earlyBirdCopy)[Lang];
