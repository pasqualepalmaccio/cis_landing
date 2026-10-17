/* Titolare del trattamento: compare in privacy e cookie policy. Finché un campo
   obbligatorio è vuoto le policy mostrano «da completare» e nessun tag parte
   (TRACKING_ENABLED in src/lib/consent/config.ts). */
export const OWNER = {
  name: "",
  address: "",
  vatNumber: "",
  privacyEmail: "",
  /** Facoltativo: vuoto se il DPO non è nominato. */
  dpoEmail: "",
  /** Quanto si conserva il registro dei consensi dall'ultima scelta (proposta: «6 anni»). */
  consentRetention: { it: "", en: "" },
};

export const OWNER_READY = Boolean(OWNER.name && OWNER.address && OWNER.vatNumber && OWNER.privacyEmail);

/** Data dell'ultima revisione dei testi delle policy. */
export const POLICY_UPDATED = "2026-10-17";
