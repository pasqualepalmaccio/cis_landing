import type { Lang } from "./index";

/* La pagina dell'Open Day. Testi dal volantino A5 (versione 2), allineati alle
   affermazioni già usate nel sito: niente nomi di programmi o accreditamenti
   che la scuola non ha ancora ottenuto. Data, ore, luogo e posti NON stanno
   qui: arrivano dal CRM, dove la segreteria li gestisce.

   Iscrizioni aperte o chiuse le decide lo stato dell'evento nel CRM
   (Apri/Chiudi iscrizioni): nessun interruttore nel codice. */

/** Versione dell'informativa mostrata nel modulo: va nel CRM con ogni iscrizione. */
export const OPEN_DAY_NOTICE_VERSION = "2026-11-09";
/** Versione del testo del consenso agli aggiornamenti (stesso testo della pre-registrazione). */
export { UPDATES_TEXT_VERSION } from "./registration";

export const MAX_ADULTS = 4;
export const MAX_CHILDREN = 4;
/** Stessi codici del CRM (crm/src/lib/event-registration.ts). */
export const SCHOOL_LEVELS = [
  { v: "INFANT", it: "Scuola dell'infanzia", en: "Early years (3–5)" },
  { v: "PRIMARY", it: "Scuola primaria", en: "Primary (6–10)" },
] as const;
export const HOW_HEARD = [
  { v: "word-of-mouth", it: "Passaparola", en: "Word of mouth" },
  { v: "social", it: "Social", en: "Social media" },
  { v: "search", it: "Ricerca su Google", en: "Google search" },
  { v: "email", it: "Email della scuola", en: "Email from the school" },
  { v: "flyer", it: "Volantino o manifesto", en: "Flyer or poster" },
  { v: "event", it: "Evento o incontro", en: "Event or meeting" },
  { v: "other", it: "Altro", en: "Other" },
] as const;
/** Primo anno scolastico possibile (la scuola apre a settembre 2027) e i due dopo. */
export const INTAKE_YEARS = [2027, 2028, 2029] as const;
/** Anni di nascita proponibili, dal più recente: copre infanzia e primaria
 *  per tutti gli anni di INTAKE_YEARS. Il livello lo verifica la segreteria. */
export const BIRTH_YEARS = Array.from({ length: 12 }, (_, i) => 2027 - i);

/** Fasce d'età: non più chieste dal modulo, restano per i tentativi già registrati. */
export const AGE_BANDS = [
  { v: "0-2", it: "0–2 anni", en: "0–2 years" },
  { v: "3-5", it: "3–5 anni (infanzia)", en: "3–5 years (early years)" },
  { v: "6-10", it: "6–10 anni (primaria)", en: "6–10 years (primary)" },
  { v: "11-14", it: "11–14 anni (media)", en: "11–14 years (lower secondary)" },
] as const;

const it = {
  meta: {
    title: "Meet & Discover CIS · Colico International School",
    description: "Vieni a conoscere CIS Colico International School, la nuova scuola internazionale di Colico sul Lago di Como: posti limitati, iscrizione online.",
  },
  eyebrow: "Meet & Discover CIS",
  /* Due righe sempre: l'invito, poi il nome per intero. */
  title: "Vieni a scoprire",
  titleEm: "CIS Colico International School",
  lead: "La nuova scuola internazionale sull'alto lago apre a settembre 2027. Al Meet & Discover CIS incontri chi la sta costruendo, vedi gli spazi e fai tutte le domande che vuoi.",
  cta: "Prenota il tuo posto",
  /* Data, ore, luogo e posti della striscia vengono dall'evento del CRM. */
  strip: { date: "Data", sessions: "Orario", place: "Luogo", seats: "Posti", limited: "Limitati", waitlist: "Lista d'attesa" },
  pillarsEyebrow: "Perché partecipare",
  pillarsTitle: "Un progetto pensato per ogni bambino, dai 3 ai 14 anni",
  pillars: [
    { title: "Basi solide, futuri sicuri", body: "Un curricolo in inglese che costruisce lettura, scrittura, matematica e comunicazione con metodo." },
    { title: "La curiosità che fa imparare", body: "Si impara facendo domande e collegando le materie, per temi e progetti." },
    { title: "Ogni bambino conosciuto e valorizzato", body: "Un ambiente accogliente, dove ognuno cresce al proprio ritmo e prende fiducia." },
    { title: "Menti in crescita, sguardo sul mondo", body: "Pensatori indipendenti e compagni gentili, pronti per un mondo connesso." },
  ],
  languagesTitle: "Comunicatori globali",
  languages: ["Inglese come prima lingua", "Italiano · 3 ore a settimana", "Terza lingua · 2 ore a settimana"],
  agesTitle: "Dai 3 ai 14 anni",
  agesHead: ["Età", "In Italia", "In Inghilterra"],
  ages: [
    ["3–4", "Infanzia, 1° anno", "Nursery"],
    ["4–5", "Infanzia, 2° anno", "Reception"],
    ["5–6", "Infanzia, 3° anno", "Year 1"],
    ["6–11", "Dalla 1ª alla 5ª primaria", "Year 2–6"],
    ["11–14", "Dalla 1ª alla 3ª media", "Year 7–9"],
  ],
  opening: "Apertura a settembre 2027, soggetta ad autorizzazione.",
  sessions: {
    title: "Orario e posti",
    sub: "I posti contano adulti e bambini. L'orario confermato te lo scriviamo nell'email di conferma.",
    freeOne: "1 posto libero",
    freeMany: "{n} posti liberi",
    full: "Al completo",
    started: "Già iniziata",
    at: "Ore",
    book: "Prenota il tuo posto",
    updated: "Posti indicativi, aggiornati alle {time}. Il posto è confermato solo dall'email.",
  },
  form: {
    title: "I tuoi dati",
    sub: "Ti scriviamo solo per questo incontro.",
    firstName: "Nome",
    lastName: "Cognome",
    email: "Email",
    phone: "Telefono",
    adults: "Adulti",
    children: "Bambini che vengono all'incontro",
    kids: "Figli per cui vi interessa la scuola",
    childBand: "Età del bambino {n} (facoltativa)",
    childTitle: "Figlio {n}",
    childrenNote: "Indica i figli per cui vi interessa la scuola, anche se all'incontro non vengono. I dati li inserisci tu, come genitore: ci servono per organizzare l'incontro e capire quale classe vi interessa.",
    phoneContact: "Potete contattarmi anche per telefono o su WhatsApp a questo numero. Facoltativo.",
    childName: "Nome (facoltativo)",
    birthYear: "Anno di nascita",
    level: "Scuola di interesse",
    intakeYear: "Anno scolastico di inizio",
    howHeard: "Come ci avete conosciuto? (facoltativo)",
    choose: "Scegli",
    session: "Sessione",
  },
  privacyAck: "Ho letto l'{link} sul trattamento dei dati per l'iscrizione al Meet & Discover CIS.",
  privacyLink: "informativa privacy",
  updates: "Desidero ricevere via email aggiornamenti in anteprima su Colico International School (apertura, Meet & Discover, iscrizioni). Facoltativo. Ti chiederemo di confermare l'indirizzo e potrai disiscriverti in ogni momento dal link in ogni email.",
  notice: "Iscrivendoti chiedi di partecipare al Meet & Discover CIS. Usiamo i tuoi dati per gestire l'iscrizione, mandarti la conferma ed eventuali avvisi sull'evento, non per comunicazioni promozionali senza il tuo consenso. Tempi di conservazione e diritti sono descritti nell'informativa privacy.",
  required: "* Campi obbligatori",
  submit: "Iscriviti al Meet & Discover CIS",
  states: {
    unpublished: { title: "Le date del Meet & Discover CIS arrivano presto.", body: "Nel frattempo puoi lasciarci i tuoi dati con la pre-registrazione: ti avviseremo." },
    unavailable: { title: "Le iscrizioni non sono disponibili in questo momento.", body: "Riprova fra qualche minuto, oppure scrivici." },
    closed: { title: "Le iscrizioni al Meet & Discover CIS sono chiuse.", body: "Se vuoi conoscerci, scrivici: troviamo un altro momento." },
  },
  result: {
    sending: "Invio in corso…",
    confirmedTitle: "Il tuo posto è confermato.",
    confirmedBody: "Ti stiamo inviando un'email con data, orario e luogo, e con il link per annullare se non potrai venire. Se l'orario non ti va bene, scrivici.",
    assigned: "Il tuo turno: {when}.",
    waitlistTitle: "Sei in lista d'attesa.",
    waitlistBody: "Al momento non ci sono posti per il tuo gruppo e il posto non è garantito. Se se ne libera uno, la segreteria ti scrive. Ti stiamo inviando un'email di riepilogo.",
    queuedTitle: "Abbiamo ricevuto la tua iscrizione.",
    queuedBody: "La stiamo registrando: riceverai un'email con l'esito. Non serve inviarla di nuovo.",
    closedTitle: "Le iscrizioni si sono chiuse proprio ora.",
    closedBody: "La tua richiesta non è stata registrata.",
    errorTitle: "Non siamo riusciti a registrare l'iscrizione.",
    errorBody: "I tuoi dati sono ancora nel modulo: riprova fra qualche minuto.",
    invalidTitle: "Alcuni dati non sono validi.",
    invalidBody: "Controlla i campi e riprova.",
    contact: "Per qualsiasi dubbio scrivi a",
  },
  preRegistration: "Vai alla pre-registrazione",
};

export type OpenDayCopy = typeof it;

const en: OpenDayCopy = {
  meta: {
    title: "Meet & Discover CIS · Colico International School",
    description: "Come and meet CIS Colico International School, the new international school in Colico on Lake Como: limited places, register online.",
  },
  eyebrow: "Meet & Discover CIS",
  title: "Come and discover",
  titleEm: "CIS Colico International School",
  lead: "The new international school on the north lake opens in September 2027. At Meet & Discover CIS you'll meet the people building it, see the spaces and ask all your questions.",
  cta: "Book your place",
  strip: { date: "Date", sessions: "Time", place: "Venue", seats: "Places", limited: "Limited", waitlist: "Waiting list" },
  pillarsEyebrow: "Why attend",
  pillarsTitle: "A project designed for every child, aged 3 to 14",
  pillars: [
    { title: "Strong foundations. Confident futures.", body: "An English-language curriculum that builds literacy, numeracy and communication skills with method." },
    { title: "Curiosity that inspires learning.", body: "Enquiry-based learning that encourages questions and connections, through themes and projects." },
    { title: "Every child known. Every child valued.", body: "A warm, supportive place where every child grows at their own pace and builds confidence." },
    { title: "Growing minds. Global outlook.", body: "Independent thinkers and kind collaborators, ready to thrive in an interconnected world." },
  ],
  languagesTitle: "Building global communicators",
  languages: ["English first", "Italian · 3h a week", "3rd language · 2h a week"],
  agesTitle: "Ages 3 to 14",
  agesHead: ["Age", "Italy", "England"],
  ages: [
    ["3–4", "Infanzia, 1st year", "Nursery"],
    ["4–5", "Infanzia, 2nd year", "Reception"],
    ["5–6", "Infanzia, 3rd year", "Year 1"],
    ["6–11", "Primaria, 1st to 5th year", "Year 2–6"],
    ["11–14", "Media, 1st to 3rd year", "Year 7–9"],
  ],
  opening: "Opening September 2027, subject to authorisation.",
  sessions: {
    title: "Time and places",
    sub: "Places count adults and children. We'll confirm your time in the confirmation email.",
    freeOne: "1 place left",
    freeMany: "{n} places left",
    full: "Full",
    started: "Already started",
    at: "At",
    book: "Book your place",
    updated: "Places are indicative, updated at {time}. Your place is confirmed only by email.",
  },
  form: {
    title: "Your details",
    sub: "We'll only write to you about this event.",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    adults: "Adults",
    children: "Children coming to the event",
    kids: "Children you are enquiring about",
    childBand: "Age of child {n} (optional)",
    childTitle: "Child {n}",
    childrenNote: "Tell us about the children you are considering the school for, even if they are not coming to the event. You enter their details as the parent: we use them to organise the meeting and see which class you are interested in.",
    phoneContact: "You may also contact me by phone or WhatsApp on this number. Optional.",
    childName: "First name (optional)",
    birthYear: "Year of birth",
    level: "School of interest",
    intakeYear: "Starting school year",
    howHeard: "How did you hear about us? (optional)",
    choose: "Choose",
    session: "Session",
  },
  privacyAck: "I have read the {link} on how my data is processed for the Meet & Discover CIS registration.",
  privacyLink: "privacy notice",
  updates: "I'd like to receive early email updates about Colico International School (opening, Meet & Discover, enrolment). Optional. We'll ask you to confirm your address, and you can unsubscribe at any time via the link in every email.",
  notice: "By registering you ask to attend Meet & Discover CIS. We use your data to manage your registration, send you the confirmation and any notices about the event, not for promotional communications without your consent. Retention periods and your rights are described in the privacy notice.",
  required: "* Required fields",
  submit: "Register for Meet & Discover CIS",
  states: {
    unpublished: { title: "Meet & Discover CIS dates are coming soon.", body: "Meanwhile you can leave your details with the pre-registration: we'll let you know." },
    unavailable: { title: "Registration isn't available right now.", body: "Please try again in a few minutes, or write to us." },
    closed: { title: "Meet & Discover CIS registration is closed.", body: "If you'd like to meet us, write to us and we'll find another time." },
  },
  result: {
    sending: "Sending…",
    confirmedTitle: "Your place is confirmed.",
    confirmedBody: "We're sending you an email with the date, time and place, and a link to cancel if you can't come. If the time doesn't suit you, write to us.",
    assigned: "Your session: {when}.",
    waitlistTitle: "You're on the waiting list.",
    waitlistBody: "There are no places left for your group right now and your place is not guaranteed. If one becomes available, the school office will write to you. We're sending you a summary email.",
    queuedTitle: "We've received your registration.",
    queuedBody: "We're recording it now: you'll get an email with the outcome. There's no need to send it again.",
    closedTitle: "Registration closed just now.",
    closedBody: "Your request was not recorded.",
    errorTitle: "We couldn't record your registration.",
    errorBody: "Your details are still in the form: please try again in a few minutes.",
    invalidTitle: "Some details aren't valid.",
    invalidBody: "Please check the fields and try again.",
    contact: "For any questions write to",
  },
  preRegistration: "Go to pre-registration",
};

export const openDayCopy: Record<Lang, OpenDayCopy> = { it, en };

/** Solo stringhe nei testi: passano ai componenti client, dove le funzioni
 *  non possono arrivare. I segnaposto {n}, {time} si riempiono qui. */
export const fill = (text: string, vars: Record<string, string | number>) => text.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ""));
