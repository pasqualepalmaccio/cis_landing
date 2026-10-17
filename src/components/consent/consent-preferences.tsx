"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

import type { Dict, Lang } from "@/content";
import type { Choices, Purpose } from "@/lib/consent/config";
import { decide, useConsentState } from "@/lib/consent/store";

import { ALL, BUTTON, EQUAL_BUTTON, NONE } from "./shared";

const ease = [0.16, 1, 0.3, 1] as const;

/* Scelta per finalità. Si apre dal banner o da «Preferenze cookie» nel footer;
   parte dalle scelte già fatte, oppure da tutto spento. */
export function ConsentPreferences({ lang, t, purposes }: { lang: Lang; t: Dict["consent"]; purposes: { key: Purpose; vendors: string }[] }) {
  const { consent } = useConsentState();
  const [draft, setDraft] = useState<Choices>(consent?.choices ?? NONE);

  return (
    <motion.div
      className="fixed inset-0 z-[90] grid place-items-end bg-navy-950/70 p-3 backdrop-blur-sm sm:place-items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-preferences-title"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45, ease }}
        className="relative max-h-[90svh] w-full overflow-y-auto rounded-3xl border border-line bg-navy-900 p-6 sm:max-w-lg sm:p-8"
      >
        <button
          type="button"
          onClick={() => decide(consent?.choices ?? NONE, consent ? "custom" : "close")}
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-mist transition-colors hover:text-cta"
          aria-label={t.close}
        >
          ✕
        </button>
        <h2 id="consent-preferences-title" className="pr-10 font-display text-2xl">
          {t.preferencesTitle}
        </h2>
        <ul className="mt-6 space-y-3">
          <li className="rounded-2xl border border-line p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="font-semibold">{t.purposes.necessary.title}</p>
              <span className="text-xs uppercase tracking-[0.14em] text-mist">{t.always}</span>
            </div>
            <p className="mt-1.5 text-sm text-cream/75">{t.purposes.necessary.body}</p>
          </li>
          {purposes.map(({ key, vendors }) => (
            <li key={key} className="rounded-2xl border border-line p-4">
              <label className="flex cursor-pointer items-center justify-between gap-4">
                <span className="font-semibold">{t.purposes[key].title}</span>
                <input type="checkbox" checked={draft[key]} onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.checked }))} className="peer sr-only" />
                <span
                  aria-hidden
                  className="relative h-6 w-11 shrink-0 rounded-full bg-navy-700 transition-colors peer-checked:bg-gold-500 peer-focus-visible:outline-2 peer-focus-visible:outline-gold-300 after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-cream after:transition-transform peer-checked:after:translate-x-5"
                />
              </label>
              <p className="mt-1.5 text-sm text-cream/75">{t.purposes[key].body.replace("{vendors}", vendors)}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
          <button type="button" onClick={() => decide(NONE, "reject_all")} className={EQUAL_BUTTON}>
            {t.reject}
          </button>
          <button type="button" onClick={() => decide(draft, "custom")} className={`${BUTTON} border border-line hover:border-cta`}>
            {t.save}
          </button>
          <button type="button" onClick={() => decide(ALL, "accept_all")} className={EQUAL_BUTTON}>
            {t.accept}
          </button>
        </div>
        <Link href={`/${lang}/cookie`} className="mt-5 inline-block text-sm text-gold-300 underline underline-offset-2">
          {t.policy}
        </Link>
      </motion.div>
    </motion.div>
  );
}
