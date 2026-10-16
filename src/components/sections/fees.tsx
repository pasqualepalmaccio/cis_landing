import type { Dict, Lang } from "@/content";
import { euro, localeOf } from "@/lib/format";

import { Container } from "../layout/container";
import { Counter } from "../motion/counter";
import { Reveal } from "../motion/reveal";
import { SectionHead } from "../section-head";

export function Fees({ lang, t }: { lang: Lang; t: Dict["fees"] }) {
  const locale = localeOf(lang);
  const totals = t.schedule.rows.reduce((acc, r) => ({ prek: acc.prek + r.prek, grade: acc.grade + r.grade }), { prek: 0, grade: 0 });

  return (
    <section id="rette" className="relative py-28 sm:py-40">
      <Container>
        <SectionHead eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

        <div className="grid gap-6 lg:grid-cols-2">
          {t.tiers.map((tier, i) => {
            const rows = [
              { label: t.labels.nsaf, note: t.labels.nsafNote, value: tier.nsaf },
              { label: t.labels.tuition, note: null, value: tier.tuition },
              { label: t.labels.registration, note: null, value: tier.registration },
            ];
            return (
              <Reveal key={tier.name} delay={i * 0.15}>
                <article className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-b from-navy-800 to-navy-900 p-8 sm:p-10">
                  <div aria-hidden className="absolute -right-20 -top-20 size-56 rounded-full bg-gold-500/10 blur-3xl" />
                  <h3 className="relative font-display text-3xl text-gold-300">
                    {tier.name} <span className="font-sans text-sm text-mist">({tier.ages})</span>
                  </h3>
                  <ul className="relative mt-8">
                    {rows.map((r) => (
                      <li key={r.label} className="flex items-baseline justify-between gap-4 border-t border-line py-4">
                        <span className="text-[15px]">
                          {r.label}
                          {r.note && <span className="block text-xs text-mist">{r.note}</span>}
                        </span>
                        <span className="font-display text-xl text-gold-300">{euro(r.value, lang)}</span>
                      </li>
                    ))}
                    <li className="flex items-end justify-between gap-4 border-t border-gold-500 pt-6">
                      <span className="text-[15px] font-bold">
                        {t.labels.total}
                        <span className="block text-xs font-normal text-mist">{t.labels.totalNote}</span>
                      </span>
                      <Counter to={tier.tuition + tier.registration} locale={locale} prefix="€" className="font-display text-4xl text-cream sm:text-5xl" />
                    </li>
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-20">
          <h3 className="font-display text-2xl text-gold-300 sm:text-3xl">{t.schedule.title}</h3>
          <p className="mt-3 text-mist">{t.schedule.lead}</p>
        </Reveal>

        <Reveal className="mt-8 overflow-x-auto rounded-3xl border border-line">
          <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b border-gold-500 text-xs uppercase tracking-[0.12em] text-mist">
                <th className="px-5 py-4 font-semibold">{t.schedule.head.instalment}</th>
                <th className="px-5 py-4 font-semibold">{t.schedule.head.due}</th>
                <th className="px-5 py-4 text-right font-semibold">{t.tiers[0]?.name}</th>
                <th className="px-5 py-4 text-right font-semibold">{t.tiers[1]?.name}</th>
              </tr>
            </thead>
            <tbody>
              {t.schedule.rows.map((r) => (
                <tr key={r.id} className="border-b border-line transition-colors hover:bg-navy-800/60">
                  <td className="px-5 py-4 font-display text-gold-300">{r.id}</td>
                  <td className="px-5 py-4">
                    {r.due} <span className="text-xs text-mist">({r.what})</span>
                  </td>
                  <td className="px-5 py-4 text-right tabular-nums">{euro(r.prek, lang)}</td>
                  <td className="px-5 py-4 text-right tabular-nums">{euro(r.grade, lang)}</td>
                </tr>
              ))}
              <tr className="bg-gold-500/10 font-bold text-gold-300">
                <td colSpan={2} className="px-5 py-5">{t.schedule.total}</td>
                <td className="px-5 py-5 text-right text-lg tabular-nums">{euro(totals.prek, lang)}</td>
                <td className="px-5 py-5 text-right text-lg tabular-nums">{euro(totals.grade, lang)}</td>
              </tr>
            </tbody>
          </table>
        </Reveal>

        <div className="mt-6 space-y-2 text-sm text-mist">
          {t.notes.map((n) => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}
