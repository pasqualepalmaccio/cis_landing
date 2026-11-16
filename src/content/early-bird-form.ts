import type { Lang } from "./index";

/* Testi del modulo di pre-prenotazione early bird. Campi ridotti a ciò che
   serve per pre-prenotare (revisione R3 del 16/11): niente codice fiscale,
   indirizzo, genere, nazionalità o dati bancari, che la segreteria raccoglie
   quando verifica il bonifico. Gli esiti dicono solo ciò che è vero: il
   modulo non assegna un posto, lo assegna il bonifico. */

export const earlyBirdFormCopy = {
  it: {
    title: "Pre-prenota il tuo posto",
    lead: "Compila il modulo: ti mandiamo subito una mail con la causale e i dati per il bonifico. Il posto è tuo quando l'accredito arriva sul nostro conto, in ordine di pagamento.",
    parent: { title: "Genitore", firstName: "Nome", lastName: "Cognome", email: "Email", phone: "Telefono" },
    children: { title: "Figli", sub: "Uno per ogni bambino che vuoi pre-prenotare, con ingresso a settembre 2027.", child: "Figlio {n}", firstName: "Nome", lastName: "Cognome", birthDate: "Data di nascita", add: "Aggiungi un figlio", remove: "Togli" },
    extra: { title: "Altre informazioni", bus: "Ti interessa il servizio bus?", busOptions: [{ v: "", label: "Non indicato" }, { v: "yes", label: "Sì" }, { v: "no", label: "No" }, { v: "unsure", label: "Non so ancora" }], city: "In che città vivrete all'ingresso?", message: "Messaggio", messageHint: "Facoltativo. Non scrivere qui informazioni sulla salute dei bambini: ne parliamo a voce." },
    terms: { show: "Leggi i termini e condizioni early bird", accept: "Ho letto e accetto i termini e condizioni early bird.", privacyBefore: "Ho letto l'", privacyLink: "informativa privacy", privacyAfter: ".", updates: "Vorrei ricevere aggiornamenti sulla scuola via email (facoltativo, puoi annullare quando vuoi)." },
    required: "I campi con * sono obbligatori.",
    submit: "Invia la pre-prenotazione",
    sending: "Invio in corso…",
    result: {
      deliveredTitle: "Richiesta registrata",
      deliveredBody: "Il tuo codice è {code}. Ti abbiamo mandato una mail con i dati per il bonifico e la causale completa, che inizia con {code}. Il posto è tuo quando l'accredito arriva sul nostro conto, entro il 14 dicembre.",
      queuedTitle: "Richiesta ricevuta, la stiamo registrando",
      queuedBody: "Non serve inviarla di nuovo. Entro poco ti arriva la mail con la causale e i dati per il bonifico; se non arriva entro un'ora, scrivici.",
      rejectedTitle: "Non siamo riusciti a registrare la richiesta",
      rejectedBody: "I tuoi dati sono salvati: ti contattiamo noi. Se preferisci, scrivici.",
      invalidTitle: "Alcuni campi vanno controllati",
      invalidBody: "Controlla i campi segnalati e riprova.",
      errorTitle: "Invio non riuscito",
      errorBody: "La richiesta non è partita: riprova fra poco oppure scrivici.",
      contact: "Per qualsiasi dubbio:",
    },
    disabledNotice: "Anteprima del modulo: non è attivo e non invia nulla.",
  },
  en: {
    title: "Pre-book your place",
    lead: "Fill in the form: we will email you right away with your reference and the bank transfer details. The place is yours when the payment reaches our account, in order of payment.",
    parent: { title: "Parent", firstName: "First name", lastName: "Last name", email: "Email", phone: "Phone" },
    children: { title: "Children", sub: "One for each child you want to pre-book, for entry in September 2027.", child: "Child {n}", firstName: "First name", lastName: "Last name", birthDate: "Date of birth", add: "Add a child", remove: "Remove" },
    extra: { title: "Other information", bus: "Are you interested in the bus service?", busOptions: [{ v: "", label: "Not specified" }, { v: "yes", label: "Yes" }, { v: "no", label: "No" }, { v: "unsure", label: "Not sure yet" }], city: "Which town will you live in at entry?", message: "Message", messageHint: "Optional. Please do not write about your children's health here: we will talk about it in person." },
    terms: { show: "Read the early-bird terms and conditions", accept: "I have read and accept the early-bird terms and conditions.", privacyBefore: "I have read the ", privacyLink: "privacy notice", privacyAfter: ".", updates: "I would like to receive email updates about the school (optional, you can unsubscribe at any time)." },
    required: "Fields marked * are required.",
    submit: "Send the pre-booking",
    sending: "Sending…",
    result: {
      deliveredTitle: "Request recorded",
      deliveredBody: "Your code is {code}. We have emailed you the bank transfer details and the full reference, which starts with {code}. The place is yours when the payment reaches our account, by 14 December.",
      queuedTitle: "Request received, we are recording it",
      queuedBody: "No need to send it again. You will shortly receive an email with your reference and the bank transfer details; if it does not arrive within an hour, write to us.",
      rejectedTitle: "We could not record your request",
      rejectedBody: "Your details are saved: we will contact you. If you prefer, write to us.",
      invalidTitle: "Some fields need checking",
      invalidBody: "Please check the highlighted fields and try again.",
      errorTitle: "Sending failed",
      errorBody: "The request was not sent: please try again shortly or write to us.",
      contact: "For any question:",
    },
    disabledNotice: "Form preview: it is not active and sends nothing.",
  },
} satisfies Record<Lang, unknown>;

export type EarlyBirdFormCopy = (typeof earlyBirdFormCopy)[Lang];
