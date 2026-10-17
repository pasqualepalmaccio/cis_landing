import { z } from "zod";

import { COUNTRIES, EXTRA_LANGS, LANG_LEVELS, BUS, ENTRY_YEARS, USAGE, MAX_CHILDREN, MESSAGE_MAX } from "@/content/registration";

/* Ciò che il modulo manda al server della landing. È lo specchio stretto del
   contratto del CRM (crm/src/lib/preregistration.ts): gli stessi elenchi di
   valori, gli stessi limiti. Un valore nuovo va aggiunto PRIMA nel CRM,
   altrimenti il CRM risponde 422 e il tentativo finisce «respinto». */

const values = <T extends { v: string }>(items: readonly T[]) => items.map((i) => i.v) as [string, ...string[]];
const optionalOf = (items: readonly { v: string }[]) => z.enum(values(items)).nullable().optional();

export const childPayload = z.strictObject({
  age: z.number().int().min(1).max(18),
  entryYear: z.enum(values(ENTRY_YEARS)),
  futureCity: z.string().trim().min(1).max(100),
  futureCityOther: z.string().trim().max(100).nullable().optional(),
  schoolCountry: z.string().trim().min(2).max(10).nullable().optional(),
  itUsage: optionalOf(USAGE),
  enUsage: optionalOf(USAGE),
  extraLangs: z.array(z.enum(values(EXTRA_LANGS))).max(EXTRA_LANGS.length),
  extraUsage: optionalOf(USAGE),
});

export const formPayload = z.strictObject({
  parent: z.strictObject({
    firstName: z.string().trim().min(1).max(100),
    lastName: z.string().trim().min(1).max(100),
    email: z.email().max(254),
    phone: z.string().trim().min(4).max(40),
    city: z.string().trim().min(1).max(100),
  }),
  lang: z.enum(["it", "en"]),
  parentLevelIt: optionalOf(LANG_LEVELS),
  parentLevelEn: optionalOf(LANG_LEVELS),
  busInterest: z.enum(values(BUS)),
  message: z.string().trim().max(MESSAGE_MAX).nullable().optional(),
  children: z.array(childPayload).min(1).max(MAX_CHILDREN),
  wantsUpdates: z.boolean(),
  /** Campo esca: un umano non lo vede e non lo compila. Marca, non scarta. */
  website: z.string().max(200).optional(),
});
export type FormPayload = z.infer<typeof formPayload>;

const str = (fd: FormData, name: string) => {
  const v = fd.get(name);
  return typeof v === "string" && v.trim() !== "" ? v.trim() : null;
};

/** Dal FormData del modulo al payload: nessuna logica di dominio, solo forma. */
export function payloadFromForm(fd: FormData, lang: "it" | "en"): unknown {
  const country = str(fd, "parent_phone_country");
  const dial = country === "OTHER" ? str(fd, "parent_phone_prefix_other") : COUNTRIES.find((c) => c.code === country)?.dial;
  const number = str(fd, "parent_phone_number");
  const count = Number(str(fd, "children_count") ?? "1");
  const children = Array.from({ length: count }, (_, i) => {
    const id = (f: string) => `child_${i + 1}_${f}`;
    const age = str(fd, id("age"));
    return {
      age: age === null ? NaN : Number(age),
      entryYear: str(fd, id("entry_year")),
      futureCity: str(fd, id("future_city")),
      futureCityOther: str(fd, id("future_city_other")),
      schoolCountry: str(fd, id("school_country")),
      itUsage: str(fd, id("it_usage")),
      enUsage: str(fd, id("en_usage")),
      extraLangs: fd.getAll(id("extra_lang")).filter((v): v is string => typeof v === "string"),
      extraUsage: str(fd, id("extra_usage")),
    };
  });
  return {
    parent: {
      firstName: str(fd, "parent_first_name"),
      lastName: str(fd, "parent_last_name"),
      email: str(fd, "parent_email"),
      phone: [dial, number].filter(Boolean).join(" "),
      city: str(fd, "parent_city"),
    },
    lang,
    parentLevelIt: str(fd, "parent_level_it"),
    parentLevelEn: str(fd, "parent_level_en"),
    busInterest: str(fd, "bus_interest"),
    message: str(fd, "message"),
    children,
    wantsUpdates: fd.get("updates_consent") === "on",
    website: str(fd, "website") ?? undefined,
  };
}
