import { CONSENT_COOKIE, CONSENT_MAX_AGE_DAYS, CONSENT_VERSION, PURPOSES, type Choices, type ConsentAction } from "./config";

/* Il cookie tecnico che ricorda la scelta. «sent» resta false finché il
   registro lato server non ha confermato: la pagina successiva ritenta. */
export type StoredConsent = {
  id: string;
  version: string;
  choices: Choices;
  /** Come è stata fatta la scelta: il reinvio al registro deve riportarla uguale. */
  action: ConsentAction;
  /** Momento della scelta, ms dall'epoca. */
  at: number;
  sent: boolean;
};

export function readConsent(): StoredConsent | null {
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
    ?.slice(CONSENT_COOKIE.length + 1);
  if (!raw) return null;
  try {
    const value = JSON.parse(decodeURIComponent(raw)) as StoredConsent;
    const expired = Date.now() - value.at > CONSENT_MAX_AGE_DAYS * 864e5;
    const valid = typeof value.id === "string" && PURPOSES.every((p) => typeof value.choices?.[p] === "boolean");
    if (!valid || expired || value.version !== CONSENT_VERSION) return null;
    return value;
  } catch {
    return null;
  }
}

export function writeConsent(value: StoredConsent) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Path=/; Max-Age=${CONSENT_MAX_AGE_DAYS * 86400}; SameSite=Lax${secure}`;
}
