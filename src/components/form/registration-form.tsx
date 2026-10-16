"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";

import type { Lang } from "@/content";
import { BUS, COUNTRIES, LANG_LEVELS, MAX_CHILDREN, MESSAGE_MAX, SUBMISSION_ENABLED, type RegistrationCopy } from "@/content/registration";

import { ChildBlock } from "./child-block";
import { control, Field, FormSection, Options } from "./field";

export function RegistrationForm({ lang, t }: { lang: Lang; t: RegistrationCopy }) {
  const [children, setChildren] = useState(1);
  const [prefix, setPrefix] = useState("+39");
  const [messageLength, setMessageLength] = useState(0);

  return (
    /* method="post": se il JavaScript non parte, i dati non finiscono mai
       nell'indirizzo della pagina (e quindi nei log dei proxy). */
    <form method="post" noValidate={false} onSubmit={(e) => e.preventDefault()} className="pb-32">
      <FormSection title={t.parent.title} sub={t.parent.sub}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={t.parent.firstName} htmlFor="p_first" required>
            <input id="p_first" name="parent_first_name" autoComplete="given-name" required maxLength={100} className={control} />
          </Field>
          <Field label={t.parent.lastName} htmlFor="p_last" required>
            <input id="p_last" name="parent_last_name" autoComplete="family-name" required maxLength={100} className={control} />
          </Field>
          <Field label={t.parent.email} htmlFor="p_email" required>
            <input id="p_email" name="parent_email" type="email" autoComplete="email" required maxLength={254} className={control} />
          </Field>
          <Field label={t.parent.phone} htmlFor="p_tel" required>
            <div className="flex gap-2">
              <select aria-label={t.parent.phoneOther} name="parent_phone_prefix" value={prefix} onChange={(e) => setPrefix(e.target.value)} className={`${control} w-28 shrink-0 px-3`}>
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.dial || "other"}>
                    {c.flag} {c.dial || c[lang]}
                  </option>
                ))}
              </select>
              {prefix === "other" && <input aria-label={t.parent.phoneOther} name="parent_phone_prefix_other" required maxLength={6} placeholder="+" className={`${control} w-20 shrink-0`} />}
              <input id="p_tel" name="parent_phone_number" type="tel" autoComplete="tel-national" required maxLength={20} placeholder="333 1234567" className={`${control} min-w-0`} />
            </div>
          </Field>
          <Field label={t.parent.nationality} htmlFor="p_nat">
            <select id="p_nat" name="parent_nationality" className={control} defaultValue="">
              <option value="">{t.choose}</option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c[lang]}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t.parent.city} htmlFor="p_city" required>
            <input id="p_city" name="parent_city" autoComplete="address-level2" required maxLength={100} className={control} />
          </Field>
          <Field label={t.parent.levelIt} htmlFor="p_lvl_it">
            <select id="p_lvl_it" name="parent_level_it" className={control} defaultValue="">
              <Options items={LANG_LEVELS} lang={lang} placeholder={t.choose} />
            </select>
          </Field>
          <Field label={t.parent.levelEn} htmlFor="p_lvl_en">
            <select id="p_lvl_en" name="parent_level_en" className={control} defaultValue="">
              <Options items={LANG_LEVELS} lang={lang} placeholder={t.choose} />
            </select>
          </Field>
        </div>
      </FormSection>

      <FormSection title={t.children.title} sub={t.children.sub}>
        <Field label={t.children.count} htmlFor="num_kids" className="max-w-xs">
          <select id="num_kids" name="children_count" value={children} onChange={(e) => setChildren(Number(e.target.value))} className={control}>
            {Array.from({ length: MAX_CHILDREN }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n === MAX_CHILDREN ? `${n}+` : n}
              </option>
            ))}
          </select>
        </Field>
        {children === MAX_CHILDREN && <p className="text-sm text-gold-300">{t.children.moreNote}</p>}
        {/* I blocchi già compilati restano montati quando il numero cresce. */}
        <AnimatePresence initial={false}>
          {Array.from({ length: children }, (_, i) => (
            <ChildBlock key={i + 1} n={i + 1} lang={lang} t={t.children} choose={t.choose} />
          ))}
        </AnimatePresence>
      </FormSection>

      <FormSection title={t.bus.title} sub={t.bus.sub}>
        <div role="radiogroup" aria-label={t.bus.sub} className="flex flex-wrap gap-3">
          {BUS.map((b, i) => (
            <label key={b.v} className="cursor-pointer">
              <input type="radio" name="bus_interest" value={b.v} required={i === 0} className="peer sr-only" />
              <span className="inline-flex rounded-full border border-line px-6 py-3 text-sm font-semibold text-mist transition-colors peer-checked:border-gold-500 peer-checked:bg-gold-500 peer-checked:text-navy-900 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-gold-300">
                {b[lang]}
              </span>
            </label>
          ))}
        </div>
      </FormSection>

      <FormSection title={t.message.title} sub={t.message.sub}>
        <p className="rounded-2xl border border-terracotta/50 bg-terracotta/10 px-5 py-4 text-sm text-cream/90">{t.message.warning}</p>
        <div>
          <textarea name="message" rows={5} maxLength={MESSAGE_MAX} onChange={(e) => setMessageLength(e.target.value.length)} aria-label={t.message.title} className={`${control} resize-y`} />
          <p className="mt-1 text-right text-xs tabular-nums text-mist">
            {messageLength}/{MESSAGE_MAX}
          </p>
        </div>
      </FormSection>

      <div className="space-y-6 border-t border-line pt-12">
        <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-line p-5 transition-colors hover:border-gold-500/60">
          <input type="checkbox" name="updates_consent" className="mt-1 size-5 shrink-0 accent-gold-500" />
          <span className="text-sm leading-relaxed text-mist">{t.updates}</span>
        </label>
        <p className="text-sm leading-relaxed text-mist">{t.notice}</p>
        <p className="text-xs text-mist">{t.required}</p>

        {!SUBMISSION_ENABLED && (
          <div role="status" className="rounded-2xl border border-gold-500 bg-gold-500/10 p-5 text-sm">
            <p className="font-semibold text-gold-300">{t.disabled.title}</p>
            <p className="mt-1 text-cream/90">
              {t.disabled.body}{" "}
              <a href="mailto:info@cis-colico.com" className="font-semibold text-gold-300 underline underline-offset-4">
                info@cis-colico.com
              </a>
              .
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={!SUBMISSION_ENABLED}
          className="w-full rounded-full bg-gold-500 px-8 py-4 text-lg font-bold text-navy-900 transition-colors hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
        >
          {t.submit}
        </button>
      </div>
    </form>
  );
}
