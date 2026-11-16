"use client";

import Link from "next/link";
import { type FormEvent, type ReactNode, useRef, useState } from "react";

import type { Lang } from "@/content";
import type { EarlyBirdFormCopy } from "@/content/early-bird-form";
import { earlyBirdFromForm, MAX_CHILDREN } from "@/lib/early-bird/payload";

import { control, Field, FormSection } from "../form/field";

type State = "idle" | "sending" | "delivered" | "queued" | "rejected" | "invalid" | "error";

/* Il modulo di pre-prenotazione early bird. Parla solo con la landing
   (/api/early-bird), mai con il CRM. La chiave nasce una volta per modulo:
   un doppio clic o un nuovo invio dopo un errore di rete non crea una seconda
   prenotazione. L'esito mostrato è quello confermato dal server. */
export function BookingForm({ lang, t, terms, preview }: { lang: Lang; t: EarlyBirdFormCopy; terms: ReactNode; preview: boolean }) {
  const [children, setChildren] = useState(1);
  const [state, setState] = useState<State>("idle");
  const [code, setCode] = useState<string | null>(null);
  const [bad, setBad] = useState<string[]>([]);
  const key = useRef<string | null>(null);
  const locked = state === "sending" || state === "delivered" || state === "queued";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (locked) return;
    key.current ??= crypto.randomUUID();
    setState("sending");
    try {
      const res = await fetch("/api/early-bird", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(earlyBirdFromForm(new FormData(e.currentTarget), lang, key.current, children)),
      });
      const json = (await res.json().catch(() => ({}))) as { code?: string | null; fields?: string[] };
      setCode(json.code ?? null);
      setBad(json.fields ?? []);
      setState(res.status === 201 ? "delivered" : res.status === 202 ? "queued" : res.status === 502 ? "rejected" : res.status === 422 || res.status === 400 ? "invalid" : "error");
    } catch (error) {
      console.warn("[early-bird] invio non riuscito", error);
      setState("error");
    }
  }

  const err = (path: string) => (bad.includes(path) ? "border-bordeaux" : "");
  const f = (name: string, path: string, label: string, opts: { type?: string; required?: boolean; auto?: string } = {}) => (
    <Field label={label} htmlFor={name} required={opts.required}>
      <input id={name} name={name} type={opts.type ?? "text"} required={opts.required} autoComplete={opts.auto} className={`${control} ${err(path)}`} />
    </Field>
  );

  return (
    <form onSubmit={onSubmit} noValidate={false} className="text-cream">
      {preview ? <p role="note" className="mb-6 rounded-xl border border-gold-500/60 bg-gold-500/10 px-4 py-3 text-sm text-gold-300">{t.disabledNotice}</p> : null}
      <FormSection title={t.parent.title} sub={t.required}>
        <div className="grid gap-5 sm:grid-cols-2">
          {f("firstName", "parent.firstName", t.parent.firstName, { required: true, auto: "given-name" })}
          {f("lastName", "parent.lastName", t.parent.lastName, { required: true, auto: "family-name" })}
          {f("email", "parent.email", t.parent.email, { type: "email", required: true, auto: "email" })}
          {f("phone", "parent.phone", t.parent.phone, { type: "tel", auto: "tel" })}
        </div>
      </FormSection>

      <FormSection title={t.children.title} sub={t.children.sub}>
        {Array.from({ length: children }, (_, i) => (
          <div key={i} className="rounded-2xl border border-line p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-xl text-gold-300">{t.children.child.replace("{n}", String(i + 1))}</p>
              {i === children - 1 && i > 0 ? <button type="button" onClick={() => setChildren(i)} className="text-sm text-mist underline underline-offset-4">{t.children.remove}</button> : null}
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {f(`child${i}FirstName`, `children.${i}.firstName`, t.children.firstName, { required: true })}
              {f(`child${i}LastName`, `children.${i}.lastName`, t.children.lastName)}
              {f(`child${i}BirthDate`, `children.${i}.birthDate`, t.children.birthDate, { type: "date" })}
            </div>
          </div>
        ))}
        {children < MAX_CHILDREN ? (
          <button type="button" onClick={() => setChildren(children + 1)} className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-gold-300 hover:border-gold-500">+ {t.children.add}</button>
        ) : null}
      </FormSection>

      <FormSection title={t.extra.title} sub="">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={t.extra.bus} htmlFor="busInterest">
            <select id="busInterest" name="busInterest" className={control} defaultValue="">
              {t.extra.busOptions.map((o) => <option key={o.v} value={o.v} className="text-navy-900">{o.label}</option>)}
            </select>
          </Field>
          {f("futureCity", "futureCity", t.extra.city, { auto: "address-level2" })}
        </div>
        <Field label={t.extra.message} htmlFor="message">
          <textarea id="message" name="message" rows={3} maxLength={1000} className={control} />
          <p className="mt-2 text-xs text-mist">{t.extra.messageHint}</p>
        </Field>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      </FormSection>

      <div className="space-y-5 border-t border-line pt-12">
        {terms}
        <label className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-5 ${bad.includes("termsAccepted") ? "border-bordeaux" : "border-line"}`}>
          <input type="checkbox" name="termsAccepted" required className="mt-1 size-5 shrink-0 accent-gold-500" />
          <span className="text-sm leading-relaxed">{t.terms.accept} <span className="text-gold-500">*</span></span>
        </label>
        <label className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-5 ${bad.includes("privacyRead") ? "border-bordeaux" : "border-line"}`}>
          <input type="checkbox" name="privacyRead" required className="mt-1 size-5 shrink-0 accent-gold-500" />
          <span className="text-sm leading-relaxed">
            {t.terms.privacyBefore}<Link href={`/${lang}/privacy`} target="_blank" className="font-semibold text-gold-300 underline underline-offset-4">{t.terms.privacyLink}</Link>{t.terms.privacyAfter} <span className="text-gold-500">*</span>
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-line p-5">
          <input type="checkbox" name="wantsUpdates" className="mt-1 size-5 shrink-0 accent-gold-500" />
          <span className="text-sm leading-relaxed text-mist">{t.terms.updates}</span>
        </label>

        <Result state={state} code={code} t={t.result} />

        <button type="submit" disabled={locked} className="w-full rounded-full bg-cta px-8 py-4 text-lg font-bold text-navy-900 transition-colors hover:bg-cta-hover disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto">
          {state === "sending" ? t.sending : t.submit}
        </button>
      </div>
    </form>
  );
}

function Result({ state, code, t }: { state: State; code: string | null; t: EarlyBirdFormCopy["result"] }) {
  if (state === "idle" || state === "sending") return null;
  const good = state === "delivered" || state === "queued";
  const [title, body] = {
    delivered: [t.deliveredTitle, t.deliveredBody.replace("{code}", code ?? "")],
    queued: [t.queuedTitle, t.queuedBody],
    rejected: [t.rejectedTitle, t.rejectedBody],
    invalid: [t.invalidTitle, t.invalidBody],
    error: [t.errorTitle, t.errorBody],
  }[state];
  return (
    <div role={good ? "status" : "alert"} className={`rounded-2xl border p-5 text-sm ${good ? "border-gold-500 bg-gold-500/10" : "border-bordeaux bg-bordeaux/25"}`}>
      <p className="font-semibold text-gold-300">{title}</p>
      <p className="mt-1 text-cream/90">
        {body} {t.contact} <a href="mailto:info@cis-colico.com" className="font-semibold text-gold-300 underline underline-offset-4">info@cis-colico.com</a>.
      </p>
    </div>
  );
}
