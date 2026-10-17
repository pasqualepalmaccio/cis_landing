"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect } from "react";

import type { Dict, Lang } from "@/content";
import { decide, initConsent, openPreferences, useConsentState } from "@/lib/consent/store";

import { ConsentPreferences } from "./consent-preferences";
import { activePurposes, ALL, EQUAL_BUTTON, NONE } from "./shared";

const ease = [0.16, 1, 0.3, 1] as const;

/* Linee guida del Garante (10/06/2021): «Rifiuta» e «Accetta» con lo stesso
   peso, la X vale come rifiuto, nessuna casella preselezionata. */
export function ConsentBanner({ lang, t }: { lang: Lang; t: Dict["consent"] }) {
  const { ready, panel } = useConsentState();
  useEffect(() => initConsent(), []);

  if (!ready) return null;

  return (
    <AnimatePresence>
      {panel === "banner" && (
        <motion.section
          key="banner"
          role="region"
          aria-label={t.label}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          className="fixed inset-x-3 bottom-3 z-[80] rounded-3xl border border-line bg-navy-950/95 p-5 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-md sm:p-6"
        >
          <button
            type="button"
            onClick={() => decide(NONE, "close")}
            className="absolute right-3 top-3 grid size-9 place-items-center rounded-full text-mist transition-colors hover:text-cta"
            aria-label={t.close}
          >
            ✕
          </button>
          <h2 className="pr-10 font-display text-xl">{t.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-cream/85">
            {t.body}{" "}
            <Link href={`/${lang}/cookie`} className="text-gold-300 underline underline-offset-2">
              {t.policy}
            </Link>
          </p>
          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <button type="button" onClick={() => decide(NONE, "reject_all")} className={EQUAL_BUTTON}>
              {t.reject}
            </button>
            <button type="button" onClick={() => decide(ALL, "accept_all")} className={EQUAL_BUTTON}>
              {t.accept}
            </button>
          </div>
          <button
            type="button"
            onClick={openPreferences}
            className="mt-3 w-full text-center text-sm font-semibold text-cream/80 underline underline-offset-2 hover:text-cta"
          >
            {t.customize}
          </button>
        </motion.section>
      )}

      {panel === "preferences" && <ConsentPreferences key="preferences" lang={lang} t={t} purposes={activePurposes(lang === "it" ? "e" : "and")} />}
    </AnimatePresence>
  );
}
