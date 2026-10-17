"use client";

import { motion } from "motion/react";
import { useState } from "react";

import type { Lang } from "@/content";
import { CITIES, COUNTRIES, ENTRY_YEARS, EXTRA_LANGS, GENDERS, USAGE, type RegistrationCopy } from "@/content/registration";

import { control, Field, optionsOf } from "./field";
import { Select } from "./select";

export function ChildBlock({ n, lang, t, choose }: { n: number; lang: Lang; t: RegistrationCopy["children"]; choose: string }) {
  const [futureCity, setFutureCity] = useState("");
  const id = (f: string) => `child_${n}_${f}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl border border-line bg-navy-800/60 p-6 sm:p-8"
    >
      <h3 className="mb-6 flex items-center gap-3 font-display text-xl">
        <span className="grid size-8 place-items-center rounded-full bg-gold-500 font-sans text-sm font-bold text-navy-900">{n}</span>
        {t.child} {n}
      </h3>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.age} htmlFor={id("age")} required>
          <input id={id("age")} name={id("age")} type="number" inputMode="numeric" min={1} max={18} required className={control} />
        </Field>
        <Field label={t.gender} htmlFor={id("gender")}>
          <Select id={id("gender")} name={id("gender")} placeholder={choose} options={optionsOf(GENDERS, lang)} />
        </Field>
        <Field label={t.entryYear} htmlFor={id("entry_year")} required>
          <Select id={id("entry_year")} name={id("entry_year")} required placeholder={choose} options={optionsOf(ENTRY_YEARS, lang)} />
        </Field>
        <Field label={t.futureCity} htmlFor={id("future_city")} required>
          <Select
            id={id("future_city")}
            name={id("future_city")}
            required
            placeholder={choose}
            options={[
              ...CITIES.map((c) => ({ value: c, label: c })),
              { value: "undecided", label: t.futureUndecided },
              { value: "other", label: t.futureOther },
            ]}
            value={futureCity}
            onChange={setFutureCity}
          />
        </Field>
        {futureCity === "other" && (
          <Field label={t.futureOtherDetail} htmlFor={id("future_city_other")} required className="sm:col-span-2">
            <input id={id("future_city_other")} name={id("future_city_other")} required maxLength={100} className={control} />
          </Field>
        )}
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        <Field label={t.currentSchool} htmlFor={id("school")}>
          <input id={id("school")} name={id("school")} maxLength={120} placeholder={t.currentSchoolPlaceholder} className={control} />
        </Field>
        <Field label={t.currentSchoolCity} htmlFor={id("school_city")}>
          <input id={id("school_city")} name={id("school_city")} maxLength={100} className={control} />
        </Field>
        <Field label={t.currentSchoolCountry} htmlFor={id("school_country")}>
          <Select
            id={id("school_country")}
            name={id("school_country")}
            placeholder={choose}
            options={COUNTRIES.map((c) => ({ value: c.code, label: c[lang], icon: c.flag }))}
          />
        </Field>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field label={t.itUsage} htmlFor={id("it_usage")}>
          <Select id={id("it_usage")} name={id("it_usage")} placeholder={choose} options={optionsOf(USAGE, lang)} />
        </Field>
        <Field label={t.enUsage} htmlFor={id("en_usage")}>
          <Select id={id("en_usage")} name={id("en_usage")} placeholder={choose} options={optionsOf(USAGE, lang)} />
        </Field>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-mist">{t.extraLangs}</p>
        <div className="flex flex-wrap gap-2">
          {EXTRA_LANGS.map((l) => (
            <label key={l.v} className="cursor-pointer">
              <input type="checkbox" name={id("extra_lang")} value={l.v} className="peer sr-only" />
              <span className="inline-flex rounded-full border border-line px-4 py-2 text-sm text-mist transition-colors peer-checked:border-gold-500 peer-checked:bg-gold-500 peer-checked:text-navy-900 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-gold-300">
                {l[lang]}
              </span>
            </label>
          ))}
        </div>
      </div>
      <Field label={t.extraUsage} htmlFor={id("extra_usage")} className="mt-5">
        <Select id={id("extra_usage")} name={id("extra_usage")} placeholder={choose} options={optionsOf(USAGE, lang)} />
      </Field>
    </motion.div>
  );
}
