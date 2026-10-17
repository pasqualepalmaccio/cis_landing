import type { Lang } from "./index";

/* Il modulo di pre-registrazione. I valori delle opzioni sono codici stabili,
   indipendenti dalla lingua: cambiare lingua non cambia ciò che è stato scelto.

   L'invio è spento finché non esistono i presupposti scritti in
   docs/decisioni/2026-10-16-landing-modulo-preregistrazione.md: informativa del
   titolare, posto nel CRM per il questionario, presidi sul collegamento. */
export const SUBMISSION_ENABLED = false;

/** Versione del testo del consenso agli aggiornamenti: va nel registro del CRM
 *  con ogni consenso. Si cambia quando cambia il testo di «updates». */
export const UPDATES_TEXT_VERSION = "2026-10-17";

type L = Record<Lang, string>;
type Option = { v: string } & L;

export const COUNTRIES: { code: string; dial: string; flag: string; it: string; en: string }[] = [
  { code: "IT", dial: "+39", flag: "🇮🇹", it: "Italia", en: "Italy" },
  { code: "CH", dial: "+41", flag: "🇨🇭", it: "Svizzera", en: "Switzerland" },
  { code: "FR", dial: "+33", flag: "🇫🇷", it: "Francia", en: "France" },
  { code: "DE", dial: "+49", flag: "🇩🇪", it: "Germania", en: "Germany" },
  { code: "GB", dial: "+44", flag: "🇬🇧", it: "Regno Unito", en: "United Kingdom" },
  { code: "ES", dial: "+34", flag: "🇪🇸", it: "Spagna", en: "Spain" },
  { code: "PT", dial: "+351", flag: "🇵🇹", it: "Portogallo", en: "Portugal" },
  { code: "NL", dial: "+31", flag: "🇳🇱", it: "Paesi Bassi", en: "Netherlands" },
  { code: "BE", dial: "+32", flag: "🇧🇪", it: "Belgio", en: "Belgium" },
  { code: "AT", dial: "+43", flag: "🇦🇹", it: "Austria", en: "Austria" },
  { code: "GR", dial: "+30", flag: "🇬🇷", it: "Grecia", en: "Greece" },
  { code: "DK", dial: "+45", flag: "🇩🇰", it: "Danimarca", en: "Denmark" },
  { code: "SE", dial: "+46", flag: "🇸🇪", it: "Svezia", en: "Sweden" },
  { code: "NO", dial: "+47", flag: "🇳🇴", it: "Norvegia", en: "Norway" },
  { code: "FI", dial: "+358", flag: "🇫🇮", it: "Finlandia", en: "Finland" },
  { code: "IE", dial: "+353", flag: "🇮🇪", it: "Irlanda", en: "Ireland" },
  { code: "PL", dial: "+48", flag: "🇵🇱", it: "Polonia", en: "Poland" },
  { code: "CZ", dial: "+420", flag: "🇨🇿", it: "Repubblica Ceca", en: "Czech Republic" },
  { code: "HU", dial: "+36", flag: "🇭🇺", it: "Ungheria", en: "Hungary" },
  { code: "RO", dial: "+40", flag: "🇷🇴", it: "Romania", en: "Romania" },
  { code: "HR", dial: "+385", flag: "🇭🇷", it: "Croazia", en: "Croatia" },
  { code: "RU", dial: "+7", flag: "🇷🇺", it: "Russia", en: "Russia" },
  { code: "UA", dial: "+380", flag: "🇺🇦", it: "Ucraina", en: "Ukraine" },
  { code: "TR", dial: "+90", flag: "🇹🇷", it: "Turchia", en: "Turkey" },
  { code: "US", dial: "+1", flag: "🇺🇸", it: "Stati Uniti", en: "United States" },
  { code: "CA", dial: "+1", flag: "🇨🇦", it: "Canada", en: "Canada" },
  { code: "MX", dial: "+52", flag: "🇲🇽", it: "Messico", en: "Mexico" },
  { code: "BR", dial: "+55", flag: "🇧🇷", it: "Brasile", en: "Brazil" },
  { code: "AR", dial: "+54", flag: "🇦🇷", it: "Argentina", en: "Argentina" },
  { code: "AU", dial: "+61", flag: "🇦🇺", it: "Australia", en: "Australia" },
  { code: "NZ", dial: "+64", flag: "🇳🇿", it: "Nuova Zelanda", en: "New Zealand" },
  { code: "ZA", dial: "+27", flag: "🇿🇦", it: "Sudafrica", en: "South Africa" },
  { code: "EG", dial: "+20", flag: "🇪🇬", it: "Egitto", en: "Egypt" },
  { code: "AE", dial: "+971", flag: "🇦🇪", it: "Emirati Arabi Uniti", en: "United Arab Emirates" },
  { code: "SA", dial: "+966", flag: "🇸🇦", it: "Arabia Saudita", en: "Saudi Arabia" },
  { code: "IL", dial: "+972", flag: "🇮🇱", it: "Israele", en: "Israel" },
  { code: "IN", dial: "+91", flag: "🇮🇳", it: "India", en: "India" },
  { code: "CN", dial: "+86", flag: "🇨🇳", it: "Cina", en: "China" },
  { code: "JP", dial: "+81", flag: "🇯🇵", it: "Giappone", en: "Japan" },
  { code: "KR", dial: "+82", flag: "🇰🇷", it: "Corea del Sud", en: "South Korea" },
  { code: "SG", dial: "+65", flag: "🇸🇬", it: "Singapore", en: "Singapore" },
  { code: "HK", dial: "+852", flag: "🇭🇰", it: "Hong Kong", en: "Hong Kong" },
  /* Paese o prefisso fuori elenco: si scrive nel campo di dettaglio. */
  { code: "OTHER", dial: "", flag: "🌐", it: "Altro", en: "Other" },
];

export const CITIES = [
  "Colico", "Dorio", "Dervio", "Bellano", "Varenna", "Perledo", "Lierna",
  "Sorico", "Gera Lario", "Domaso", "Gravedona ed Uniti", "Dongo", "Musso", "Pianello del Lario",
  "Lecco", "Como", "Sondrio", "Chiavenna", "Morbegno", "Lugano",
];

export const LANG_LEVELS: Option[] = [
  { v: "none", it: "Nessuno", en: "None" },
  { v: "basic", it: "Base (A1–A2)", en: "Basic (A1–A2)" },
  { v: "intermediate", it: "Intermedio (B1–B2)", en: "Intermediate (B1–B2)" },
  { v: "advanced", it: "Avanzato (C1–C2)", en: "Advanced (C1–C2)" },
  { v: "native", it: "Madrelingua", en: "Native" },
];

export const EXTRA_LANGS: Option[] = [
  { v: "fr", it: "Francese", en: "French" },
  { v: "de", it: "Tedesco", en: "German" },
  { v: "es", it: "Spagnolo", en: "Spanish" },
  { v: "ru", it: "Russo", en: "Russian" },
  { v: "zh", it: "Mandarino", en: "Mandarin" },
];

export const USAGE: Option[] = [
  { v: "parents", it: "Parla con almeno un genitore", en: "Speaks it with at least one parent" },
  { v: "school", it: "Parla a scuola", en: "Speaks it at the current school" },
  { v: "parents_school", it: "Parla con i genitori e a scuola", en: "Speaks it with parents and at school" },
  { v: "unused", it: "Non la usa oggi", en: "Not used today" },
];

export const ENTRY_YEARS: Option[] = [
  { v: "2027", it: "Settembre 2027 (anno scolastico 2027–28)", en: "September 2027 (2027–28 school year)" },
  { v: "2028", it: "Settembre 2028 (anno scolastico 2028–29)", en: "September 2028 (2028–29 school year)" },
  { v: "2029", it: "Settembre 2029 (anno scolastico 2029–30)", en: "September 2029 (2029–30 school year)" },
];


export const BUS: Option[] = [
  { v: "yes", it: "Sì", en: "Yes" },
  { v: "no", it: "No", en: "No" },
  { v: "unsure", it: "Non so ancora", en: "Not sure yet" },
];

export const MAX_CHILDREN = 4;
export const MESSAGE_MAX = 1000;

export const registrationCopy = {
  it: {
    meta: { title: "Pre-registrazione · CIS", description: "Raccontaci della tua famiglia: un primo passo, non un'iscrizione formale." },
    eyebrow: "Pre-registrazione",
    title: "Raccontaci della tua famiglia",
    lead: "Bastano pochi minuti. Ci aiuti a capire chi siete e a organizzare l'apertura. Non ti impegna a nulla e non è un'iscrizione.",
    why: {
      title: "Perché registrarti ora?",
      items: [
        "Aggiornamenti in anteprima, prima dell'apertura della campagna ufficiale, se scegli di riceverli",
        "Sarai tra i primi a sapere quando aprono le iscrizioni",
        "Le vostre risposte contano quando decidiamo bus, lingue e orari",
      ],
      caveat: "La pre-registrazione non garantisce un posto, perché i criteri di ammissione non sono ancora definiti. Però sarai tra i primi a ricevere notizie.",
    },
    required: "I campi con * sono obbligatori.",
    parent: {
      title: "Genitore / Tutore",
      sub: "I tuoi dati di contatto.",
      firstName: "Nome",
      lastName: "Cognome",
      email: "Email",
      phone: "Telefono",
      phoneOther: "Prefisso",
      city: "Città di residenza oggi",
      levelIt: "Livello italiano (genitori)",
      levelEn: "Livello inglese (genitori)",
    },
    children: {
      title: "Figli",
      sub: "Quanti figli sono interessati alla scuola?",
      count: "Numero di figli",
      moreNote: "Se i figli sono più di quattro, indicalo in «Altre informazioni».",
      child: "Figlio/a",
      age: "Età",
      entryYear: "Anno di ingresso desiderato",
      futureCity: "Città di residenza quando andrà a scuola",
      futureUndecided: "Non ancora: stiamo pensando di trasferirci in zona",
      futureOther: "Altro",
      futureOtherDetail: "Quale città?",
      currentSchoolCountry: "Paese della scuola attuale",
      itUsage: "Come usa oggi l'italiano?",
      enUsage: "Come usa oggi l'inglese?",
      extraLangs: "Interesse per lingue extra (oltre italiano/inglese)",
      extraUsage: "Come usa oggi le lingue extra selezionate?",
    },
    bus: { title: "Trasporto", sub: "Ti interesserebbe il servizio bus dedicato?" },
    message: {
      title: "Altre informazioni",
      sub: "Facoltativo. Domande o cose che è utile sapere.",
      warning: "Per favore non inserire informazioni sulla salute, su disabilità o su bisogni educativi speciali dei bambini: ne parleremo con te di persona nella fase di iscrizione.",
    },
    updates: "Desidero ricevere via email aggiornamenti in anteprima su Colico International School (apertura, open day, iscrizioni). Facoltativo. Ti chiederemo di confermare l'indirizzo e potrai disiscriverti in ogni momento dal link in ogni email.",
    notice: "Inviando il modulo chiedi di essere ricontattato/a per la pre-iscrizione. I tuoi dati e quelli dei tuoi figli che ci comunichi sono trattati per gestire questa richiesta e per organizzare l'apertura della scuola, e non sono usati per comunicazioni promozionali senza il tuo consenso. Tempi di conservazione e diritti sono descritti nell'informativa privacy.",
    submit: "Invia la registrazione",
    result: {
      sending: "Invio in corso…",
      deliveredTitle: "Grazie, abbiamo registrato la tua pre-registrazione.",
      deliveredBody: "Ti scriveremo all'indirizzo che ci hai dato. Se hai chiesto gli aggiornamenti, cerca nella posta l'email per confermare l'indirizzo.",
      queuedTitle: "Abbiamo ricevuto i tuoi dati.",
      queuedBody: "Li stiamo registrando: non serve inviare di nuovo il modulo.",
      errorTitle: "Il modulo non è arrivato.",
      errorBody: "I dati che hai inserito sono ancora qui: riprova tra qualche minuto.",
      invalidTitle: "Alcuni dati non sono validi.",
      invalidBody: "Controlla i campi obbligatori e riprova.",
      contact: "Per qualsiasi dubbio scrivi a",
    },
    disabled: {
      title: "Anteprima del nuovo sito",
      body: "In questa anteprima l'invio del modulo è disattivato. Per registrare il tuo interesse scrivi a",
    },
    choose: "Seleziona",
  },
  en: {
    meta: { title: "Pre-registration · CIS", description: "Tell us about your family: a first step, not a formal enrolment." },
    eyebrow: "Pre-registration",
    title: "Tell us about your family",
    lead: "It only takes a few minutes. It helps us understand who you are and plan the opening. It commits you to nothing and isn't an enrolment.",
    why: {
      title: "Why register now?",
      items: [
        "Early updates, ahead of the official campaign, if you choose to receive them",
        "You will be among the first to know when enrolment opens",
        "Your answers count when we decide on buses, languages and hours",
      ],
      caveat: "Pre-registration doesn't guarantee a place, because admission criteria aren't final yet. You will be among the first to hear news, though.",
    },
    required: "Fields marked with * are required.",
    parent: {
      title: "Parent / Guardian",
      sub: "Your contact details.",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      phone: "Phone",
      phoneOther: "Country code",
      city: "Current city of residence",
      levelIt: "Italian level (parents)",
      levelEn: "English level (parents)",
    },
    children: {
      title: "Children",
      sub: "How many children are you interested in enrolling?",
      count: "Number of children",
      moreNote: "If you have more than four children, let us know under “Anything else”.",
      child: "Child",
      age: "Age",
      entryYear: "Desired entry year",
      futureCity: "City of residence when attending school",
      futureUndecided: "Not yet: we're thinking about moving to the area",
      futureOther: "Other",
      futureOtherDetail: "Which city?",
      currentSchoolCountry: "Country of current school",
      itUsage: "How does your child currently use Italian?",
      enUsage: "How does your child currently use English?",
      extraLangs: "Interest in extra languages (beyond Italian/English)",
      extraUsage: "How does your child currently use the selected extra language(s)?",
    },
    bus: { title: "Transport", sub: "Would you be interested in the dedicated bus service?" },
    message: {
      title: "Anything else",
      sub: "Optional. Questions, or anything useful for us to know.",
      warning: "Please do not include information about your children's health, disabilities or special educational needs: we'll discuss these with you in person during enrolment.",
    },
    updates: "I'd like to receive early email updates about Colico International School (opening, open days, enrolment). Optional. We'll ask you to confirm your address, and you can unsubscribe at any time via the link in every email.",
    notice: "By submitting this form you ask to be contacted about pre-registration. Your data, and the data about your children that you share, are processed to handle this request and to plan the school's opening, and are not used for promotional communications without your consent. Retention periods and your rights are described in the privacy notice.",
    submit: "Submit registration",
    result: {
      sending: "Sending…",
      deliveredTitle: "Thank you, your pre-registration is recorded.",
      deliveredBody: "We'll write to the address you gave us. If you asked for updates, look for the email asking you to confirm your address.",
      queuedTitle: "We've received your details.",
      queuedBody: "We're recording them now: there's no need to send the form again.",
      errorTitle: "The form didn't reach us.",
      errorBody: "What you entered is still here: please try again in a few minutes.",
      invalidTitle: "Some details aren't valid.",
      invalidBody: "Check the required fields and try again.",
      contact: "If anything is unclear, write to",
    },
    disabled: {
      title: "Preview of the new website",
      body: "Form submission is disabled in this preview. To register your interest, write to",
    },
    choose: "Select",
  },
} satisfies Record<Lang, unknown>;

export type RegistrationCopy = (typeof registrationCopy)["it"];
