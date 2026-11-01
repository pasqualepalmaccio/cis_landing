import type { OpenDayCopy } from "@/content/open-day";

import { Section } from "../layout/section";
import { Reveal } from "../motion/reveal";
import { Eyebrow } from "../section-head";
import { CARD } from "../ui/card";

/* «Comunicatori globali»: le lingue in pillole Cremisi su una scheda bianca
   che galleggia sul Blu Lario. */
export function Languages({ t }: { t: OpenDayCopy }) {
  return (
    <Section tone="navy">
      <Reveal>
        <div className={`flex flex-col items-center p-8 text-center sm:p-10 ${CARD}`}>
          <Eyebrow>{t.languagesTitle}</Eyebrow>
          <ul className="mt-6 flex flex-wrap justify-center gap-4">
            {t.languages.map((l) => (
              <li key={l} className="rounded-full border-2 border-bordeaux px-5.5 py-2.5 font-display text-lg font-semibold text-bordeaux">
                {l}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
