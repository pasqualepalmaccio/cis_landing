"use client";

import Link from "next/link";
import { useState, useSyncExternalStore, type FormEvent } from "react";

import type { Lang } from "@/content";
import { BIRTH_YEARS, fill, HOW_HEARD, INTAKE_YEARS, MAX_ADULTS, MAX_CHILDREN, OPEN_DAY_ENABLED, SCHOOL_LEVELS, type OpenDayCopy } from "@/content/open-day";
import type { PublicSession } from "@/lib/open-day/event";

import { control, Field, FormSection, optionsOf } from "./field";
import { Select } from "./select";

type State = "idle" | "sending" | "confirmed" | "waitlist" | "queued" | "closed" | "error" | "invalid";
const noop = () => () => {};

const when = (lang: Lang, s: PublicSession) => {
  const f = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(lang === "it" ? "it-IT" : "en-GB", { timeZone: "Europe/Rome", ...o });
  const t = f({ hour: "2-digit", minute: "2-digit" });
  return `${f({ weekday: "long", day: "numeric", month: "long" }).format(new Date(s.startsAt))} · ${t.format(new Date(s.startsAt))}–${t.format(new Date(s.endsAt))}`;
};

/* Il modulo manda alla landing, mai al CRM. Lo stato mostrato viene solo
   dalla risposta del server: «confermato» e «lista d'attesa» arrivano dal
   CRM, mai dai posti indicativi della pagina. */
export function OpenDayForm({ lang, t, sessions }: { lang: Lang; t: OpenDayCopy; sessions: PublicSession[] }) {
  const [state, setState] = useState<State>("idle");
  const [children, setChildren] = useState(1);
  const ready = useSyncExternalStore(noop, () => true, () => false);
  const done = state === "confirmed" || state === "waitlist" || state === "queued" || state === "closed";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending" || done) return;
    const fd = new FormData(e.currentTarget);
    const s = (k: string) => String(fd.get(k) ?? "").trim();
    const payload = {
      sessionId: s("session"),
      parent: { firstName: s("first_name"), lastName: s("last_name"), email: s("email"), phone: s("phone") },
      lang,
      adults: Number(s("adults") || "1"),
      children,
      childrenInfo: Array.from({ length: children }, (_, i) => ({
        ...(s(`child_name_${i + 1}`) ? { firstName: s(`child_name_${i + 1}`) } : {}),
        birthYear: Number(s(`birth_year_${i + 1}`)),
        level: s(`level_${i + 1}`),
        intakeYear: Number(s(`intake_year_${i + 1}`)),
      })),
      ...(s("how_heard") ? { howHeard: s("how_heard") } : {}),
      privacyAck: fd.get("privacy_ack") === "on",
      attribution: utmFromUrl(),
      wantsUpdates: fd.get("updates_consent") === "on",
      ...(s("website") ? { website: s("website") } : {}),
    };
    setState("sending");
    try {
      const res = await fetch("/api/open-day", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const json = (await res.json().catch(() => ({}))) as { result?: string };
      if (res.status === 201 && (json.result === "confirmed" || json.result === "waitlist")) setState(json.result);
      else if (res.status === 202) setState("queued");
      else if (res.status === 409) setState("closed");
      else if (res.status === 422 || res.status === 400) setState("invalid");
      else setState("error");
    } catch (error) {
      console.warn("[open-day] invio non riuscito", error);
      setState("error");
    }
  }

  return (
    <form method="post" onSubmit={onSubmit} className="pb-24">
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <FormSection title={t.sessions.title} sub={t.sessions.sub}>
        <div role="radiogroup" aria-label={t.form.session} className="grid gap-3 sm:grid-cols-2">
          {sessions.map((s, i) => (
            <label key={s.id} className={`cursor-pointer ${s.started ? "pointer-events-none opacity-40" : ""}`}>
              <input type="radio" name="session" value={s.id} required={i === 0} disabled={s.started} className="peer sr-only" />
              <span className="block rounded-2xl border border-line p-5 transition-colors peer-checked:border-gold-500 peer-checked:bg-gold-500/10 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-gold-300">
                <span className="block font-display text-xl text-cream first-letter:uppercase">{when(lang, s)}</span>
                <span className={`mt-1 block text-sm ${s.free > 0 ? "text-gold-300" : "text-mist"}`}>
                  {s.started ? t.sessions.started : s.free > 0 ? (s.free === 1 ? t.sessions.freeOne : fill(t.sessions.freeMany, { n: s.free })) : t.sessions.full}
                </span>
              </span>
            </label>
          ))}
        </div>
      </FormSection>

      <FormSection title={t.form.title} sub={t.form.sub}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={t.form.firstName} htmlFor="od_first" required><input id="od_first" name="first_name" autoComplete="given-name" required maxLength={100} className={control} /></Field>
          <Field label={t.form.lastName} htmlFor="od_last" required><input id="od_last" name="last_name" autoComplete="family-name" required maxLength={100} className={control} /></Field>
          <Field label={t.form.email} htmlFor="od_email" required><input id="od_email" name="email" type="email" autoComplete="email" required maxLength={254} className={control} /></Field>
          <Field label={t.form.phone} htmlFor="od_phone" required><input id="od_phone" name="phone" type="tel" autoComplete="tel" required minLength={4} maxLength={40} placeholder="+39 333 1234567" className={control} /></Field>
          <Field label={t.form.adults} htmlFor="od_adults" required>
            <Select id="od_adults" name="adults" options={Array.from({ length: MAX_ADULTS }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }))} />
          </Field>
          <Field label={t.form.children} htmlFor="od_children" required>
            <Select id="od_children" name="children" value={String(children)} onChange={(v) => setChildren(Number(v))} options={Array.from({ length: MAX_CHILDREN }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }))} />
          </Field>
        </div>
        {Array.from({ length: children }, (_, i) => (
          <ChildFields key={i} n={i + 1} lang={lang} t={t} />
        ))}
        <Field label={t.form.howHeard} htmlFor="od_how_heard">
          <Select id="od_how_heard" name="how_heard" placeholder={t.form.choose} options={optionsOf([...HOW_HEARD], lang)} />
        </Field>
      </FormSection>

      <div className="space-y-6 border-t border-line pt-12">
        <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-line p-5 transition-colors hover:border-gold-500/60">
          <input type="checkbox" name="updates_consent" className="mt-1 size-5 shrink-0 accent-gold-500" />
          <span className="text-sm leading-relaxed text-mist">{t.updates}</span>
        </label>
        <p className="text-sm leading-relaxed text-mist">{t.notice}</p>
        <PrivacyAck lang={lang} t={t} />
        <p className="text-xs text-mist">{t.required}</p>
        <OpenDayResult state={state} t={t} />
        <button
          type="submit"
          disabled={!OPEN_DAY_ENABLED || !ready || state === "sending" || done}
          className="w-full rounded-full bg-cta px-8 py-4 text-lg font-bold text-navy-900 transition-colors hover:bg-cta-hover disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
        >
          {state === "sending" ? t.result.sending : t.submit}
        </button>
      </div>
    </form>
  );
}

/* Un bambino: anno di nascita, scuola e anno di interesse obbligatori, nome
   facoltativo. Il livello dichiarato non si corregge qui: lo guarda la
   segreteria nel CRM, che vede anche quello che darebbe l'età. */
function ChildFields({ n, lang, t }: { n: number; lang: Lang; t: OpenDayCopy }) {
  const years = (list: readonly number[], label: (y: number) => string) => list.map((y) => ({ value: String(y), label: label(y) }));
  return (
    <div className="rounded-2xl border border-line p-5">
      <p className="mb-4 font-label text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">{fill(t.form.childTitle, { n })}</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.form.childName} htmlFor={`od_child_name_${n}`}><input id={`od_child_name_${n}`} name={`child_name_${n}`} autoComplete="off" maxLength={80} className={control} /></Field>
        <Field label={t.form.birthYear} htmlFor={`od_birth_year_${n}`} required>
          <Select id={`od_birth_year_${n}`} name={`birth_year_${n}`} required placeholder={t.form.choose} options={years(BIRTH_YEARS, String)} />
        </Field>
        <Field label={t.form.level} htmlFor={`od_level_${n}`} required>
          <Select id={`od_level_${n}`} name={`level_${n}`} required placeholder={t.form.choose} options={optionsOf([...SCHOOL_LEVELS], lang)} />
        </Field>
        <Field label={t.form.intakeYear} htmlFor={`od_intake_year_${n}`} required>
          <Select id={`od_intake_year_${n}`} name={`intake_year_${n}`} required placeholder={t.form.choose} options={years(INTAKE_YEARS, (y) => `${y}/${y + 1}`)} />
        </Field>
      </div>
    </div>
  );
}

/** «Ho letto l'informativa»: obbligatoria, e NON è un consenso. */
function PrivacyAck({ lang, t }: { lang: Lang; t: OpenDayCopy }) {
  const [before, after] = t.privacyAck.split("{link}");
  return (
    <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-line p-5 transition-colors hover:border-gold-500/60">
      <input type="checkbox" name="privacy_ack" required className="mt-1 size-5 shrink-0 accent-gold-500" />
      <span className="text-sm leading-relaxed text-mist">
        {before}
        <Link href={`/${lang}/privacy`} target="_blank" className="font-semibold text-gold-300 underline underline-offset-4">{t.privacyLink}</Link>
        {after} <span className="text-gold-500">*</span>
      </span>
    </label>
  );
}

/** Parametri utm dell'indirizzo, letti al momento dell'invio: nessun cookie,
 *  nessuna memoria nel browser. Solo valori di campagna. */
function utmFromUrl(): Record<string, string> | undefined {
  const q = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content"]) {
    const v = q.get(k)?.trim().slice(0, 100);
    if (v) out[k] = v;
  }
  return Object.keys(out).length ? out : undefined;
}

function OpenDayResult({ state, t }: { state: State; t: OpenDayCopy }) {
  if (state === "idle" || state === "sending") return null;
  const r = t.result;
  const [title, body] = {
    confirmed: [r.confirmedTitle, r.confirmedBody],
    waitlist: [r.waitlistTitle, r.waitlistBody],
    queued: [r.queuedTitle, r.queuedBody],
    closed: [r.closedTitle, r.closedBody],
    error: [r.errorTitle, r.errorBody],
    invalid: [r.invalidTitle, r.invalidBody],
  }[state];
  const good = state === "confirmed" || state === "waitlist" || state === "queued";
  return (
    <div role={good ? "status" : "alert"} className={`rounded-2xl border p-5 text-sm ${good ? "border-gold-500 bg-gold-500/10" : "border-bordeaux bg-bordeaux/25"}`}>
      <p className="font-semibold text-gold-300">{title}</p>
      <p className="mt-1 text-cream/90">
        {body} {r.contact}{" "}
        <a href="mailto:info@cis-colico.com" className="font-semibold text-gold-300 underline underline-offset-4">info@cis-colico.com</a>.
      </p>
    </div>
  );
}
