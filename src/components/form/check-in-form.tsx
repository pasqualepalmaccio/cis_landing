"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";

import type { Lang } from "@/content";
import type { CheckInCopy } from "@/content/check-in";

import { control, Field } from "./field";

type State = "idle" | "sending" | "delivered" | "queued" | "error" | "invalid";
const noop = () => () => {};

/* Il modulo manda alla landing, mai al CRM. «Registrata» arriva solo da un
   201 del server; ogni altro esito dice di rivolgersi al personale, perché
   la persona è alla porta e deve poter entrare comunque. */
export function CheckInForm({ lang, t }: { lang: Lang; t: CheckInCopy }) {
  const [state, setState] = useState<State>("idle");
  const form = useRef<HTMLFormElement>(null);
  // Senza JavaScript il pulsante resta disattivato: un POST nativo andrebbe perso.
  const ready = useSyncExternalStore(noop, () => true, () => false);
  const done = state === "delivered" || state === "queued";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending" || done) return;
    const fd = new FormData(e.currentTarget);
    const s = (k: string) => String(fd.get(k) ?? "").trim();
    const payload = {
      person: { firstName: s("first_name"), lastName: s("last_name"), email: s("email"), phone: s("phone") },
      lang,
      privacyAck: fd.get("privacy_ack") === "on",
      ...(s("website") ? { website: s("website") } : {}),
    };
    setState("sending");
    try {
      const res = await fetch("/api/check-in", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      setState(res.status === 201 ? "delivered" : res.status === 202 ? "queued" : res.status === 422 || res.status === 400 ? "invalid" : "error");
      // L'esito sostituisce il modulo, più corto: va mostrato in cima, da far vedere all'ingresso.
      if (res.status === 201 || res.status === 202) window.scrollTo({ top: 0 });
    } catch (error) {
      console.warn("[presenza] invio non riuscito", error);
      setState("error");
    }
  }

  function another() {
    form.current?.reset();
    setState("idle");
    window.scrollTo({ top: 0 });
  }

  if (done) {
    const [title, body] = state === "delivered" ? [t.result.deliveredTitle, t.result.deliveredBody] : [t.result.queuedTitle, t.result.queuedBody];
    return (
      <div role="status" className="rounded-2xl border border-gold-500 bg-gold-500/10 p-6">
        <p className="font-display text-2xl text-gold-300">{title}</p>
        <p className="mt-2 text-cream/90">{body}</p>
        <button type="button" onClick={another} className="mt-6 text-sm font-semibold text-gold-300 underline underline-offset-4">{t.result.again}</button>
      </div>
    );
  }

  return (
    <form ref={form} method="post" onSubmit={onSubmit} className="space-y-5">
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <Field label={t.form.firstName} htmlFor="ci_first" required><input id="ci_first" name="first_name" autoComplete="given-name" required maxLength={100} className={control} /></Field>
      <Field label={t.form.lastName} htmlFor="ci_last" required><input id="ci_last" name="last_name" autoComplete="family-name" required maxLength={100} className={control} /></Field>
      <Field label={t.form.email} htmlFor="ci_email" required><input id="ci_email" name="email" type="email" inputMode="email" autoComplete="email" required maxLength={254} className={control} /></Field>
      <Field label={t.form.phone} htmlFor="ci_phone" required><input id="ci_phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required minLength={4} maxLength={40} placeholder="+39 333 1234567" className={control} /></Field>
      <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-line p-5">
        <input type="checkbox" name="privacy_ack" required className="mt-1 size-5 shrink-0 accent-gold-500" />
        <span className="text-sm leading-relaxed text-mist">
          {t.form.privacy}<Link href={`/${lang}/privacy`} target="_blank" className="font-semibold text-gold-300 underline underline-offset-4">{t.form.privacyLink}</Link>
        </span>
      </label>
      <p className="text-sm leading-relaxed text-mist">{t.form.notice}</p>
      {state === "error" || state === "invalid" ? (
        <div role="alert" className="rounded-2xl border border-bordeaux bg-bordeaux/25 p-5 text-sm">
          <p className="font-semibold text-gold-300">{state === "error" ? t.result.errorTitle : t.result.invalidTitle}</p>
          <p className="mt-1 text-cream/90">{state === "error" ? t.result.errorBody : t.result.invalidBody}</p>
        </div>
      ) : null}
      <button type="submit" disabled={!ready || state === "sending"} className="w-full rounded-full bg-cta px-6 py-4 text-lg font-bold text-navy-900 transition-colors hover:bg-cta-hover disabled:opacity-60">
        {state === "sending" ? t.form.sending : t.form.submit}
      </button>
    </form>
  );
}
