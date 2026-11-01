import type { OpenDayCopy } from "@/content/open-day";

import { Section } from "../layout/section";
import { Reveal } from "../motion/reveal";
import { SECTION_TITLE } from "../section-head";
import { STACK } from "../ui/stack-table";

/* Le fasce d'età messe a confronto: tabella su schermo largo, schede su mobile. */
export function Ages({ t }: { t: OpenDayCopy }) {
  return (
    <Section tone="white">
      <Reveal>
        <h2 className={`mb-8 ${SECTION_TITLE}`}>{t.agesTitle}</h2>
      </Reveal>
      <Reveal>
        <div className="overflow-hidden rounded-[14px] border border-sand shadow-lift">
          <table className={STACK.table}>
            <thead className={STACK.head}>
              <tr className="bg-navy-900 font-label text-[11px] uppercase tracking-[0.08em] text-white">
                {t.agesHead.map((h) => (
                  <th key={h} className="px-4 py-3.5 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={STACK.body}>
              {t.ages.map((row) => (
                <tr key={row[0]} className={`border-b border-sand last:border-b-0 even:bg-cream/60 ${STACK.row}`}>
                  {row.map((c, i) => (
                    <td key={i} data-label={t.agesHead[i]} className={`px-4 py-3 ${STACK.cell}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[13px] text-ink-faint">{t.opening}</p>
      </Reveal>
    </Section>
  );
}
