import type { Lang } from ".";

/* La pagina che si apre dal QR all'ingresso del Meet & Discover CIS.
   Record: docs/decisioni/2026-11-17-presenze-evento.md */

export const CHECK_IN_PATH = "/presenza";

/** Versione dell'informativa mostrata nella pagina: la sezione sulle presenze
 *  è stata aggiunta il 17/11/2026, nello stesso giorno di un'altra revisione. */
export const CHECK_IN_NOTICE_VERSION = "2026-11-17-presenze";

const it = {
  meta: {
    title: "Registra la tua presenza · Meet & Discover CIS",
    description: "Registra la tua presenza per accedere al Meet & Discover CIS.",
  },
  eyebrow: "Meet & Discover CIS",
  title: "Registra la tua presenza",
  titleEm: "per accedere all'evento",
  lead: "Bastano pochi secondi. Una persona per modulo: se siete in due, compilatelo una volta a testa.",
  form: {
    firstName: "Nome",
    lastName: "Cognome",
    email: "Email",
    phone: "Telefono",
    privacy: "Ho letto l'",
    privacyLink: "informativa sulla privacy",
    notice: "Usiamo questi dati per registrare la tua presenza e, dopo l'evento, per scriverti una volta e chiederti se vuoi essere ricontattato. Se il modulo non funziona, rivolgiti al personale all'ingresso.",
    submit: "Registra la presenza",
    sending: "Invio in corso…",
  },
  result: {
    deliveredTitle: "Presenza registrata. Benvenuto!",
    deliveredBody: "Puoi mostrare questa schermata all'ingresso.",
    queuedTitle: "Presenza ricevuta.",
    queuedBody: "La stiamo registrando. Mostra questa schermata al personale all'ingresso.",
    errorTitle: "Non siamo riusciti a registrare la presenza.",
    errorBody: "Mostra questa schermata al personale all'ingresso: ti registriamo noi.",
    invalidTitle: "Controlla i dati.",
    invalidBody: "Nome, cognome, email e telefono sono necessari e l'email deve essere valida.",
    again: "Registra un'altra persona",
  },
};

export type CheckInCopy = typeof it;

const en: CheckInCopy = {
  meta: {
    title: "Check in · Meet & Discover CIS",
    description: "Check in to access Meet & Discover CIS.",
  },
  eyebrow: "Meet & Discover CIS",
  title: "Check in",
  titleEm: "to access the event",
  lead: "It only takes a few seconds. One person per form: if there are two of you, please fill it in once each.",
  form: {
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    privacy: "I have read the ",
    privacyLink: "privacy notice",
    notice: "We use this data to record your attendance and, after the event, to write to you once to ask whether you would like us to contact you. If the form does not work, please ask the staff at the entrance.",
    submit: "Check in",
    sending: "Sending…",
  },
  result: {
    deliveredTitle: "You're checked in. Welcome!",
    deliveredBody: "You can show this screen at the entrance.",
    queuedTitle: "Check-in received.",
    queuedBody: "We're recording it. Please show this screen to the staff at the entrance.",
    errorTitle: "We couldn't record your check-in.",
    errorBody: "Please show this screen to the staff at the entrance and we'll check you in.",
    invalidTitle: "Please check your details.",
    invalidBody: "First name, last name, email and phone are required, and the email must be valid.",
    again: "Check in another person",
  },
};

export const checkInCopy: Record<Lang, CheckInCopy> = { it, en };
