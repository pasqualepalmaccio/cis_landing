"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";

import type { Lang } from "@/content";
import { payloadFromForm } from "@/lib/preregistration/payload";

const noop = () => () => {};

export type SubmitState = "idle" | "sending" | "delivered" | "queued" | "error" | "invalid";

/* Invio del modulo al server della landing (mai al CRM direttamente). Lo stato
   riflette solo ciò che il server ha confermato: «delivered» arriva solo da
   un 201, «queued» da un 202 con il tentativo salvato. Un errore lascia i
   dati nel modulo. */
export function useSubmit(lang: Lang) {
  const [state, setState] = useState<SubmitState>("idle");
  // Senza JavaScript il pulsante resta disattivato: un POST nativo andrebbe
  // perso in silenzio verso una pagina statica.
  const ready = useSyncExternalStore(noop, () => true, () => false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending" || state === "delivered" || state === "queued") return;
    setState("sending");
    try {
      const res = await fetch("/api/pre-registration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payloadFromForm(new FormData(e.currentTarget), lang)),
      });
      setState(res.status === 201 ? "delivered" : res.status === 202 ? "queued" : res.status === 422 || res.status === 400 ? "invalid" : "error");
    } catch (error) {
      console.warn("[preregistrazione] invio non riuscito", error);
      setState("error");
    }
  }

  return { state, ready, onSubmit };
}
