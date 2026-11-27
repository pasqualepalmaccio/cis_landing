import type { Lang } from "./index";

/* Termini e condizioni early bird: testo della bozza della scuola del
   13/11/2026, con gli importi presi dalla fonte unica (EARLY_BIRD e rette)
   invece che scritti a mano. Il modulo si accende solo con TERMS_APPROVED e
   l'email per il recesso (guardia in src/lib/early-bird/switch.ts). Ogni
   modifica del testo alza TERMS_VERSION: la versione e l'impronta del testo
   mostrato restano sulla prenotazione come prova dell'accettazione. */

/* 2026-11-27: la clausola «Griglia delle rette» segue la nuova griglia
   (passaggio di fascia in Year 3 invece che in Year 2), decisione della scuola
   del 27/11. Le prenotazioni precedenti restano con la versione 2026-11-16. */
export const TERMS_VERSION = "2026-11-27";
/** Pubblicazione autorizzata il 16/11/2026 con il testo della bozza della
 *  scuola del 13/11, senza revisione legale scritta: rischio accettato e
 *  registrato in docs/decisioni/2026-11-16-early-bird.md. Quando arriva il
 *  testo rivisto dal legale si sostituisce qui e si alza TERMS_VERSION. */
export const TERMS_APPROVED = true;
/** Indirizzo per il recesso: il contatto della scuola già in uso sul sito. */
export const WITHDRAWAL_EMAIL: string | null = "info@cis-colico.com";

/* Segnaposto: {prebooking} {combined} {places} {email}. */
export const earlyBirdTerms: Record<Lang, { title: string; clauses: { title: string; body: string }[]; precontract: { title: string; lines: string[] } }> = {
  it: {
    title: "Termini e condizioni early bird",
    clauses: [
      { title: "Parti e offerta", body: "I presenti termini regolano il rapporto tra la famiglia e Athena Education S.r.l. («Athena»), gestore di Colico International School («CIS»). Con l'invio di questo modulo si conclude con Athena un unico contratto che riguarda la pre-prenotazione e, come indicato sotto, l'iscrizione definitiva. Un versamento di pre-prenotazione di {prebooking} per bambino/a, ricevuto entro il 14 dicembre 2026, garantisce: 15% di sconto sulla retta del primo anno scolastico; 50% di sconto su NSAF e quota annuale di iscrizione ({combined} in totale); listino congelato per i primi cinque anni scolastici. Valida solo per l'ingresso a settembre 2027." },
      { title: "Posti limitati", body: "L'offerta early bird è limitata a {places} posti in totale, assegnati in ordine di pagamento della pre-prenotazione ricevuto. Esauriti i {places} posti, non si accettano altre pre-prenotazioni early bird e ogni bonifico successivo viene restituito." },
      { title: "Natura del versamento", body: "I {prebooking} costituiscono un acconto sulle quote NSAF e iscrizione dovute per il/la bambino/a, e nient'altro. Non sono un deposito cauzionale né una caparra (artt. 1385 e 1386 del Codice Civile). Non producono interessi, sia che restino presso Athena, siano restituiti o siano imputati alle quote, e non è dovuto alcun interesse, penale o indennizzo di alcun genere." },
      { title: "Rimborso", body: "La pre-prenotazione è completamente rimborsabile su richiesta, senza indicarne il motivo, fino al 15 gennaio 2027. Il rimborso avviene tramite bonifico sul conto utilizzato per il pagamento, per l'importo versato, senza interessi." },
      { title: "Diritto di recesso", body: "In qualità di consumatore hai il diritto di recedere da questo contratto entro 14 giorni dall'invio di questo modulo, senza indicare il motivo e senza penali (artt. 52 e ss. del Codice del Consumo). Athena estende contrattualmente questo termine al 15 gennaio 2027. Per recedere, invia una dichiarazione chiara (ad esempio il modulo tipo qui sotto) via email a {email}. Athena rimborsa l'intero importo versato, sul conto utilizzato per il pagamento, entro 14 giorni dal ricevimento della richiesta, senza interessi." },
      { title: "Trattenimento e iscrizione definitiva", body: "Se entro la data indicata non è stato richiesto il rimborso, dal 16 gennaio 2027 i {prebooking} non sono più rimborsabili. Vengono trattenuti e imputati per intero a NSAF e iscrizione, con lo sconto del 50%, e ciò rende automaticamente definitiva l'iscrizione del/della bambino/a, fatto salvo il punto 8." },
      { title: "Griglia delle rette", body: "Il congelamento del listino per cinque anni mantiene invariata la griglia delle rette pubblicata. Un bambino che passa dalla fascia Nursery–Year 2 alla fascia Year 3 passa al prezzo della fascia corrispondente." },
      { title: "Nessuna garanzia di posto", body: "Fino alla scadenza del rimborso la pre-prenotazione non è un contratto di iscrizione e può essere ritirata. I criteri di ammissione sono ancora in definizione e il posto è subordinato ad essi e all'apertura della scuola. L'iscrizione definitiva segue automaticamente in base a questo stesso contratto, come descritto al punto 6, senza che sia concluso online un nuovo contratto; eventuali ulteriori documenti di iscrizione sono forniti a titolo informativo o firmati di persona. Se Athena non offre un posto, o la scuola non apre come previsto, la pre-prenotazione viene rimborsata per intero." },
      { title: "Pagamento", body: "Il pagamento avviene tramite bonifico sul conto indicato, riportando la causale comunicata dopo l'invio del modulo. La pre-prenotazione si considera ricevuta quando i fondi arrivano sul conto." },
      { title: "Dati personali", body: "I dati forniti in questo modulo sono usati per gestire la pre-prenotazione e per contattare la famiglia riguardo alla scuola, come descritto nell'informativa privacy." },
    ],
    precontract: {
      title: "Informazioni precontrattuali e modulo tipo di recesso",
      lines: [
        "Venditore: Athena Education S.r.l., Via Costituzione 7, 23823 Colico (LC), P.IVA / C.F. 04326810134, email {email}.",
        "Servizio e prezzo: pre-prenotazione early bird presso Colico International School, ingresso settembre 2027. Importo dovuto: {prebooking} per bambino/a (acconto su NSAF e iscrizione, {combined} in totale, con sconto del 50%). Non è applicata IVA (servizio educativo). Pagamento con bonifico bancario.",
        "Recesso: vedi la clausola «Diritto di recesso». Reclami: scrivere all'indirizzo email sopra.",
        "Modulo tipo di recesso (da inviare via email solo se desideri recedere): A Athena Education S.r.l., {email}. Con la presente notifico/notifichiamo il recesso dal contratto di pre-prenotazione early bird presso Colico International School per il/la bambino/a: [nome e cognome]. Data dell'invio / del versamento: [data]. Importo versato: {prebooking}. Nome del/i consumatore/i: [ ]. Indirizzo: [ ]. Rimborso sul conto IBAN: [ ]. Data: [ ].",
      ],
    },
  },
  en: {
    title: "Early-bird terms and conditions",
    clauses: [
      { title: "Parties and offer", body: "These terms are between the family and Athena Education S.r.l. (“Athena”), operator of Colico International School (“CIS”). By submitting this form you conclude a single contract with Athena covering the pre-booking and, as set out below, the final enrolment. A pre-booking payment of {prebooking} per child, received by 14 December 2026, secures: 15% off tuition for the child's first school year; 50% off the NSAF and the annual registration fee ({combined} combined); and a price list frozen for the child's first five school years. Valid only for entry in September 2027." },
      { title: "Limited places", body: "The early-bird offer is limited to {places} places in total, allocated in order of pre-booking payments received. Once the {places} places are taken, no further early-bird pre-bookings are accepted and any later transfer is returned." },
      { title: "Legal nature of the payment", body: "The {prebooking} is an advance payment (acconto) on the NSAF and registration fee due for the child, and nothing else. It is not a security deposit (deposito cauzionale) and it is not a caparra (Articles 1385 and 1386 of the Italian Civil Code). It does not bear interest, whether it is held by Athena, refunded, or applied to the fees, and no interest, penalty or compensation of any kind is due on it." },
      { title: "Refund", body: "The pre-booking is fully refundable on request, without giving any reason, until 15 January 2027. Refunds are made by bank transfer to the account used for payment, for the amount paid, without interest." },
      { title: "Right of withdrawal", body: "As a consumer you have the right to withdraw from this contract within 14 days of submitting this form, without giving a reason and without penalty (Articles 52 ff. of the Italian Consumer Code). Athena extends this period contractually to 15 January 2027. To withdraw, send a clear statement (for example the model form below) by email to {email}. Athena refunds the full amount paid, to the account used for payment, within 14 days of receiving your request, without interest." },
      { title: "Retention and final enrolment", body: "If no refund has been requested by the date above, then from 16 January 2027 the {prebooking} is no longer refundable. It is retained and applied in full to the NSAF and registration fee, at the 50% discount, and this automatically makes your child's enrolment final, subject to clause 8." },
      { title: "Tuition grid", body: "The five-year price freeze keeps the published tuition grid unchanged. A child moving from the Nursery–Year 2 band to the Year 3 band moves to the corresponding band price." },
      { title: "No guarantee of a place", body: "Until the refund deadline the pre-booking is not an enrolment contract and can be withdrawn. Admissions criteria are still being finalised, and the place is subject to the admissions criteria and to the school opening. Final enrolment follows automatically under this same contract, as described in clause 6, without a new contract being concluded online; any further enrolment documents are provided for information or signed in person. If Athena does not offer a place, or the school does not open as planned, the pre-booking is refunded in full." },
      { title: "Payment", body: "Payment is made by bank transfer to the account indicated, quoting the reference given after you submit this form. The pre-booking is considered received when the funds reach that account." },
      { title: "Personal data", body: "Data supplied in this form is used to manage the pre-booking and to contact the family about the school, as described in the privacy notice." },
    ],
    precontract: {
      title: "Pre-contract information and model withdrawal form",
      lines: [
        "Seller: Athena Education S.r.l., Via Costituzione 7, 23823 Colico (LC), VAT no. / Tax code 04326810134, email {email}.",
        "Service and price: early-bird pre-booking at Colico International School, September 2027 entry. Amount payable: {prebooking} per child (advance on the NSAF and registration fee, {combined} combined, at 50% off). No VAT is charged (educational service). Payment by bank transfer.",
        "Withdrawal: see the “Right of withdrawal” clause. Complaints: write to the email above.",
        "Model withdrawal form (send by email only if you wish to withdraw): To Athena Education S.r.l., {email}. I/We hereby give notice that I/we withdraw from the contract for the early-bird pre-booking at Colico International School for the child: [full name]. Submitted on / paid on: [date]. Amount paid: {prebooking}. Name of consumer(s): [ ]. Address: [ ]. Refund to account IBAN: [ ]. Date: [ ].",
      ],
    },
  },
};
