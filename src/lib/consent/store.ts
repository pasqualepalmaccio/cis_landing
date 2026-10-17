"use client";

import { useSyncExternalStore } from "react";

import { CONSENT_VERSION, PURPOSES, type Choices, type ConsentAction } from "./config";
import { readConsent, writeConsent, type StoredConsent } from "./cookie";

/* Stato del consenso condiviso fra banner, preferenze e caricamento dei tag. */
type State = { ready: boolean; consent: StoredConsent | null; panel: "closed" | "banner" | "preferences" };

let state: State = { ready: false, consent: null, panel: "closed" };
const listeners = new Set<() => void>();

function set(next: Partial<State>) {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
}

const SERVER_STATE: State = { ready: false, consent: null, panel: "closed" };

export function useConsentState(): State {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => SERVER_STATE,
  );
}

/** Legge il cookie una volta e, se l'ultima scelta non è arrivata al registro, la rimanda. */
export function initConsent() {
  if (state.ready) return;
  const consent = readConsent();
  set({ ready: true, consent, panel: consent ? "closed" : "banner" });
  if (consent && !consent.sent) void record(consent);
}

export function openPreferences() {
  set({ panel: "preferences" });
}

export function decide(choices: Choices, action: ConsentAction) {
  const previous = state.consent;
  const consent: StoredConsent = {
    id: previous?.id ?? crypto.randomUUID(),
    version: CONSENT_VERSION,
    choices,
    action,
    at: Date.now(),
    sent: false,
  };
  writeConsent(consent);
  set({ consent, panel: "closed" });
  void record(consent).finally(() => {
    // Revoca: i tag già caricati non si possono scaricare. Si cancellano i loro
    // cookie di prima parte e si ricarica la pagina, che riparte senza tag.
    const revoked = previous && PURPOSES.some((p) => previous.choices[p] && !choices[p]);
    if (revoked) {
      clearTrackingCookies();
      location.reload();
    }
  });
}

/* Il registro misura e non decide: se non risponde la scelta vale lo stesso,
   resta marcata «da inviare» nel cookie e la pagina successiva ritenta. */
async function record(consent: StoredConsent) {
  try {
    const res = await fetch("/api/consent", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: consent.id,
        version: consent.version,
        choices: consent.choices,
        action: consent.action,
        at: consent.at,
        lang: document.documentElement.lang,
        path: location.pathname,
      }),
      keepalive: true,
    });
    if (res.status !== 201) {
      console.warn(`[consenso] registro non disponibile (${res.status}): ritento al prossimo caricamento`);
      return;
    }
    const sent = { ...consent, sent: true };
    writeConsent(sent);
    if (state.consent?.id === sent.id && state.consent.at === sent.at) set({ consent: sent });
  } catch (error) {
    // sg-ok: la scelta resta nel cookie con sent=false e viene rinviata; il lato server registra i propri guasti
    console.warn("[consenso] invio al registro fallito, ritento al prossimo caricamento", error);
  }
}

function clearTrackingCookies() {
  const host = location.hostname;
  const parent = host.split(".").slice(-2).join(".");
  for (const name of document.cookie.split("; ").map((c) => c.split("=")[0] ?? "")) {
    if (!/^(_ga|_gid|_gcl|_fbp|_fbc)/.test(name)) continue;
    for (const domain of ["", `; Domain=${host}`, `; Domain=.${parent}`]) {
      document.cookie = `${name}=; Path=/; Max-Age=0${domain}`;
    }
  }
}
