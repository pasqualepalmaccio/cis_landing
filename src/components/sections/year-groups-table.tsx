import type { Dict, Lang } from "@/content";
import { SCHOOL_YEAR_START, YEAR_GROUPS, type YearStatus } from "@/content/school-year";

import { STACK } from "../ui/stack-table";

const STATUS_STYLE: Record<YearStatus, string> = {
  open: "bg-gold-500 text-navy-950",
  gradual: "border border-gold-500 text-heading",
  later: "border border-sand text-fg-muted",
};

/* Età e classi a confronto fra il sistema inglese e quello italiano, con lo
   stato di ogni classe all'apertura. Tabella su schermo largo, schede su mobile. */
export function YearGroupsTable({ lang, t }: { lang: Lang; t: Dict["curriculum"]["compare"] }) {
  const h = t.head;
  return (
    <div className="overflow-hidden rounded-xl border border-sand bg-white">
      <table className={STACK.table}>
        <thead className={STACK.head}>
          <tr className="bg-navy-900 font-label text-[11px] uppercase tracking-[0.05em] text-white">
            <th className="px-4 py-3 font-semibold">{h.stage}</th>
            <th className="px-4 py-3 font-semibold">{h.england}</th>
            <th className="px-4 py-3 font-semibold">{h.ages}</th>
            <th className="px-4 py-3 font-semibold">{h.born}</th>
            <th className="px-4 py-3 font-semibold">{h.italy}</th>
            <th className="px-4 py-3 font-semibold">{h.status}</th>
          </tr>
        </thead>
        <tbody className={STACK.body}>
          {YEAR_GROUPS.map((g) => {
            const from = SCHOOL_YEAR_START - g.age - 1;
            return (
              <tr key={g.year} className={`border-b border-sand last:border-b-0 ${STACK.row}`}>
                <td data-label={h.stage} className={`px-4 py-3 text-fg-muted ${STACK.cell}`}>{g.stage}</td>
                <td data-label={h.england} className={`px-4 py-3 font-semibold text-heading ${STACK.cell}`}>{g.year}</td>
                <td data-label={h.ages} className={`px-4 py-3 tabular-nums ${STACK.cell}`}>
                  {g.age}–{g.age + 1}
                </td>
                <td data-label={h.born} className={`px-4 py-3 tabular-nums text-fg-muted ${STACK.cell}`}>
                  {t.born.replace("{from}", String(from)).replace("{to}", String(from + 1))}
                </td>
                <td data-label={h.italy} className={`px-4 py-3 ${STACK.cell}`}>{g.italy[lang]}</td>
                <td data-label={h.status} className={`px-4 py-3 ${STACK.cell}`}>
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLE[g.status]}`}>{t.status[g.status]}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
