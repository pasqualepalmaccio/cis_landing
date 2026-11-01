import type { Dict, Lang } from "@/content";
import { euro } from "@/lib/format";

import { Section } from "../layout/section";
import { Reveal } from "../motion/reveal";
import { SectionHead } from "../section-head";
import { CARD } from "../ui/card";
import { IconBadge } from "../ui/icon-badge";
import type { IconName } from "../ui/icons";
import { STACK } from "../ui/stack-table";

type Tier = Dict["fees"]["tiers"][number];

/* Pre-K col fiore dello stemma, Grade 1–5 col tocco. */
const ICONS: IconName[] = ["flower", "mortarboard"];

/* Le rette su fondo Blu Lario: due schede di prezzo e, sotto, il piano delle
   cinque rate, che resta una tabella perché è un dato a due dimensioni. I
   totali si calcolano dalle righe: non c'è un numero scritto due volte. */
export function Fees({ lang, t }: { lang: Lang; t: Dict["fees"] }) {
  const totals = t.schedule.rows.reduce((acc, r) => ({ prek: acc.prek + r.prek, grade: acc.grade + r.grade }), { prek: 0, grade: 0 });
  const [prek, grade] = t.tiers;
  const head = t.schedule.head;

  return (
    <Section id="rette" tone="navy">
      <SectionHead eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <div className="grid gap-6 md:grid-cols-2">
        {t.tiers.map((tier, i) => (
          <Reveal key={tier.name} delay={i * 0.12}>
            <PriceCard lang={lang} t={t} tier={tier} icon={ICONS[i] ?? "flower"} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8">
        <div className={`rounded-[20px] p-6 shadow-float sm:p-8 ${CARD}`}>
          <h3 className="font-display text-2xl font-semibold text-heading">{t.schedule.title}</h3>
          <p className="mb-5 mt-2 text-[15px] text-fg-muted">{t.schedule.lead}</p>
          <div className="overflow-hidden rounded-xl border border-sand">
            <table className={STACK.table}>
              <thead className={STACK.head}>
                <tr className="bg-navy-900 font-label text-[11px] uppercase tracking-[0.05em] text-white">
                  <th className="px-4.5 py-3.5 font-semibold">{head.instalment}</th>
                  <th className="px-4.5 py-3.5 font-semibold">{head.due}</th>
                  <th className="px-4.5 py-3.5 text-right font-semibold">{prek?.name}</th>
                  <th className="px-4.5 py-3.5 text-right font-semibold">{grade?.name}</th>
                </tr>
              </thead>
              <tbody className={STACK.body}>
                {t.schedule.rows.map((r) => (
                  <tr key={r.id} className={`border-b border-sand ${STACK.row}`}>
                    <td data-label={head.instalment} className={`px-4.5 py-3.5 font-display text-lg font-semibold text-heading ${STACK.cell}`}>{r.id}</td>
                    <td data-label={head.due} className={`px-4.5 py-3.5 ${STACK.cell}`}>
                      <span>
                        {r.due} <span className="text-xs text-ink-faint">({r.what})</span>
                      </span>
                    </td>
                    <td data-label={prek?.name} className={`px-4.5 py-3.5 text-right tabular-nums ${STACK.cell}`}>{euro(r.prek, lang)}</td>
                    <td data-label={grade?.name} className={`px-4.5 py-3.5 text-right tabular-nums ${STACK.cell}`}>{euro(r.grade, lang)}</td>
                  </tr>
                ))}
                <tr className={`bg-cream font-bold text-heading ${STACK.row}`}>
                  <td colSpan={2} className="px-4.5 py-4 max-sm:block max-sm:px-0 max-sm:pb-2">{t.schedule.total}</td>
                  <td data-label={prek?.name} className={`px-4.5 py-4 text-right text-lg tabular-nums ${STACK.cell}`}>{euro(totals.prek, lang)}</td>
                  <td data-label={grade?.name} className={`px-4.5 py-4 text-right text-lg tabular-nums ${STACK.cell}`}>{euro(totals.grade, lang)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      <div className="mt-6 space-y-1.5 text-[13px] text-fg-muted">
        {t.notes.map((n) => (
          <p key={n}>{n}</p>
        ))}
      </div>
    </Section>
  );
}

function PriceCard({ lang, t, tier, icon }: { lang: Lang; t: Dict["fees"]; tier: Tier; icon: IconName }) {
  const rows = [
    { label: t.labels.nsaf, note: t.labels.nsafNote, value: tier.nsaf },
    { label: t.labels.tuition, note: null, value: tier.tuition },
    { label: t.labels.registration, note: null, value: tier.registration },
  ];
  return (
    <article className={`h-full rounded-[20px] border-t-4 border-t-gold-500 p-8 shadow-float ${CARD}`}>
      <IconBadge name={icon} />
      <h3 className="mb-5 mt-5 font-display text-2xl font-semibold text-heading">
        {tier.name} <span className="font-sans text-base font-normal text-ink-faint">({tier.ages})</span>
      </h3>
      <ul>
        {rows.map((r) => (
          <li key={r.label} className="flex items-baseline justify-between gap-4 border-b border-sand py-2.5 text-[15px]">
            <span>
              {r.label}
              {r.note && <small className="mt-0.5 block text-[11.5px] text-ink-faint">{r.note}</small>}
            </span>
            <span className="whitespace-nowrap font-display text-lg font-semibold">{euro(r.value, lang)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 flex items-baseline justify-between gap-4 rounded-md bg-cream px-4 py-3.5 font-semibold text-heading">
        <span>
          {t.labels.total}
          <small className="mt-0.5 block text-[11.5px] font-normal text-ink-faint">{t.labels.totalNote}</small>
        </span>
        <span className="whitespace-nowrap font-display text-xl font-bold">{euro(tier.tuition + tier.registration, lang)}</span>
      </p>
    </article>
  );
}
