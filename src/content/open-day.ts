import type { Lang } from "./index";

/* La pagina dell'Open Day. Testi dal volantino A5 (versione 2), allineati alle
   affermazioni già usate nel sito: niente nomi di programmi o accreditamenti
   che la scuola non ha ancora ottenuto. Data, ore, luogo e posti NON stanno
   qui: arrivano dal CRM, dove la segreteria li gestisce.

   L'invio resta spento finché non ci sono i presupposti scritti in
   docs/decisioni/2026-10-27-open-day.md (informativa, base giuridica,
   email in uscita, chi riceve gli allarmi). */
export const OPEN_DAY_ENABLED = false;

/** Versione dell'informativa mostrata nel modulo: va nel CRM con ogni iscrizione. */
export const OPEN_DAY_NOTICE_VERSION = "2026-10-27";
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
    title: "Open Day · CIS Colico International School",
    description: "Vieni a conoscere la nuova scuola internazionale di Colico: due sessioni, posti limitati, iscrizione online.",
  },
  eyebrow: "Open Day",
  title: "Vieni a conoscerci",
  titleEm: "di persona",
  lead: "La nuova scuola internazionale sull'alto lago apre a settembre 2027. All'Open Day incontri chi la sta costruendo, vedi gli spazi e fai tutte le domande che vuoi.",
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
    title: "Scegli la sessione",
    sub: "Le due sessioni hanno lo stesso programma. I posti contano adulti e bambini.",
    freeOne: "1 posto libero",
    freeMany: "{n} posti liberi",
    full: "Al completo: puoi iscriverti in lista d'attesa",
    started: "Già iniziata",
    updated: "Posti indicativi, aggiornati alle {time}. Il posto è confermato solo dall'email.",
  },
  form: {
    title: "I tuoi dati",
    sub: "Ti scriviamo solo per questo Open Day.",
    firstName: "Nome",
    lastName: "Cognome",
    email: "Email",
    phone: "Telefono",
    adults: "Adulti",
    children: "Bambini",
    childBand: "Età del bambino {n} (facoltativa)",
    childTitle: "Bambino {n}",
    childName: "Nome (facoltativo)",
    birthYear: "Anno di nascita",
    level: "Scuola di interesse",
    intakeYear: "Anno scolastico di inizio",
    howHeard: "Come ci avete conosciuto? (facoltativo)",
    choose: "Scegli",
    session: "Sessione",
  },
  privacyAck: "Ho letto l'{link} sul trattamento dei dati per l'iscrizione all'Open Day.",
  privacyLink: "informativa privacy",
  updates: "Desidero ricevere via email aggiornamenti in anteprima su Colico International School (apertura, open day, iscrizioni). Facoltativo. Ti chiederemo di confermare l'indirizzo e potrai disiscriverti in ogni momento dal link in ogni email.",
  notice: "Iscrivendoti chiedi di partecipare all'Open Day. Usiamo i tuoi dati per gestire l'iscrizione, mandarti la conferma ed eventuali avvisi sull'evento, non per comunicazioni promozionali senza il tuo consenso. Tempi di conservazione e diritti sono descritti nell'informativa privacy.",
  required: "* Campi obbligatori",
  submit: "Iscriviti all'Open Day",
  states: {
    unpublished: { title: "Le date dell'Open Day arrivano presto.", body: "Nel frattempo puoi lasciarci i tuoi dati con la pre-registrazione: ti avviseremo." },
    unavailable: { title: "Le iscrizioni non sono disponibili in questo momento.", body: "Riprova fra qualche minuto, oppure scrivici." },
    closed: { title: "Le iscrizioni all'Open Day sono chiuse.", body: "Se vuoi conoscerci, scrivici: troviamo un altro momento." },
    disabled: { title: "Le iscrizioni apriranno a breve.", body: "Stiamo completando gli ultimi passaggi. Per informazioni scrivici a" },
  },
  result: {
    sending: "Invio in corso…",
    confirmedTitle: "Il tuo posto è confermato.",
    confirmedBody: "Ti stiamo inviando un'email con data, orario e luogo, e con il link per annullare se non potrai venire.",
    waitlistTitle: "Sei in lista d'attesa.",
    waitlistBody: "La sessione è al completo e il posto non è garantito. Se se ne libera uno, la segreteria ti scrive. Ti stiamo inviando un'email di riepilogo.",
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
    title: "Open Day · CIS Colico International School",
    description: "Come and meet the new international school in Colico: two sessions, limited places, register online.",
  },
  eyebrow: "Open Day",
  title: "Come and meet us",
  titleEm: "in person",
  lead: "The new international school on the north lake opens in September 2027. At the Open Day you'll meet the people building it, see the spaces and ask all your questions.",
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
    title: "Choose your session",
    sub: "Both sessions follow the same programme. Places count adults and children.",
    freeOne: "1 place left",
    freeMany: "{n} places left",
    full: "Full: you can join the waiting list",
    started: "Already started",
    updated: "Places are indicative, updated at {time}. Your place is confirmed only by email.",
  },
  form: {
    title: "Your details",
    sub: "We'll only write to you about this Open Day.",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    adults: "Adults",
    children: "Children",
    childBand: "Age of child {n} (optional)",
    childTitle: "Child {n}",
    childName: "First name (optional)",
    birthYear: "Year of birth",
    level: "School of interest",
    intakeYear: "Starting school year",
    howHeard: "How did you hear about us? (optional)",
    choose: "Choose",
    session: "Session",
  },
  privacyAck: "I have read the {link} on how my data is processed for the Open Day registration.",
  privacyLink: "privacy notice",
  updates: "I'd like to receive early email updates about Colico International School (opening, open days, enrolment). Optional. We'll ask you to confirm your address, and you can unsubscribe at any time via the link in every email.",
  notice: "By registering you ask to attend the Open Day. We use your data to manage your registration, send you the confirmation and any notices about the event, not for promotional communications without your consent. Retention periods and your rights are described in the privacy notice.",
  required: "* Required fields",
  submit: "Register for the Open Day",
  states: {
    unpublished: { title: "Open Day dates are coming soon.", body: "Meanwhile you can leave your details with the pre-registration: we'll let you know." },
    unavailable: { title: "Registration isn't available right now.", body: "Please try again in a few minutes, or write to us." },
    closed: { title: "Open Day registration is closed.", body: "If you'd like to meet us, write to us and we'll find another time." },
    disabled: { title: "Registration opens soon.", body: "We're completing the last steps. For information write to" },
  },
  result: {
    sending: "Sending…",
    confirmedTitle: "Your place is confirmed.",
    confirmedBody: "We're sending you an email with the date, time and place, and a link to cancel if you can't come.",
    waitlistTitle: "You're on the waiting list.",
    waitlistBody: "The session is full and your place is not guaranteed. If one becomes available, the school office will write to you. We're sending you a summary email.",
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
