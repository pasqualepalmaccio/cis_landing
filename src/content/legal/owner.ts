/* Titolare del trattamento: compare in privacy e cookie policy. Finché un campo
   obbligatorio è vuoto le policy mostrano «da completare» e nessun tag parte
   (TRACKING_ENABLED in src/lib/consent/config.ts). */
export const OWNER = {
  name: "Athena Education S.r.l.",
  address: "Via Costituzione 7, Colico (LC)",
  vatNumber: "04326810134",
  privacyEmail: "info@cis-colico.com",
  /** Facoltativo: vuoto se il DPO non è nominato. */
  dpoEmail: "",
  /** Quanto si conserva il registro dei consensi dall'ultima scelta (scelta del committente, 2026-10-17). */
  consentRetention: { it: "6 anni", en: "6 years" },
};

export const OWNER_READY = Boolean(OWNER.name && OWNER.address && OWNER.vatNumber && OWNER.privacyEmail);

/** Data dell'ultima revisione dei testi delle policy. */
export const POLICY_UPDATED = "2026-10-17";
