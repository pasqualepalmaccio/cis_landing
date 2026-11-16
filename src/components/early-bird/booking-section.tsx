import type { Lang } from "@/content";
import { earlyBirdFormCopy } from "@/content/early-bird-form";
import type { FormSwitch } from "@/lib/early-bird/switch";
import { filledTerms } from "@/lib/early-bird/terms";

import { Section } from "../layout/section";
import { SectionHead } from "../section-head";
import { BookingForm } from "./booking-form";

/* La sezione del modulo, solo quando l'interruttore è acceso. I termini sono
   resi dal server con gli stessi valori di cui il server calcola l'impronta:
   ciò che la famiglia legge è ciò che resta come prova. */
export function BookingSection({ lang, form }: { lang: Lang; form: FormSwitch }) {
  const t = earlyBirdFormCopy[lang];
  const terms = filledTerms(lang);
  return (
    <Section id="prenota" tone="navy">
      <SectionHead eyebrow="Early bird" title={t.title} lead={t.lead} />
      <BookingForm
        lang={lang}
        t={t}
        preview={form.preview}
        terms={
          <details className="rounded-2xl border border-line p-5 text-sm">
            <summary className="cursor-pointer font-semibold text-gold-300">{t.terms.show}</summary>
            <div className="mt-4 max-h-[28rem] space-y-3 overflow-y-auto pr-2 leading-relaxed text-cream/85">
              <h3 className="font-display text-xl text-cream">{terms.title}</h3>
              <ol className="list-decimal space-y-2 pl-5">
                {terms.clauses.map((c) => (
                  <li key={c.title}><strong className="text-cream">{c.title}.</strong> {c.body}</li>
                ))}
              </ol>
              <h4 className="pt-2 font-semibold text-cream">{terms.precontract.title}</h4>
              {terms.precontract.lines.map((l) => <p key={l}>{l}</p>)}
            </div>
          </details>
        }
      />
    </Section>
  );
}
