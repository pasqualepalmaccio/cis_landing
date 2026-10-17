import { COOKIES } from "@/content/legal/cookies";
import type { LegalDict } from "@/content/legal/it";

/* Inventario dei cookie realmente usati: le righe dipendono dai fornitori configurati. */
export function CookieTable({ t }: { t: LegalDict["cookie"]["table"] }) {
  return (
    <section className="max-w-3xl pb-12">
      <h2 className="font-display text-2xl text-gold-300 sm:text-3xl">{t.title}</h2>
      <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="bg-navy-800 text-xs uppercase tracking-[0.12em] text-mist">
            <tr>
              <th className="px-4 py-3 font-semibold">{t.head.name}</th>
              <th className="px-4 py-3 font-semibold">{t.head.provider}</th>
              <th className="px-4 py-3 font-semibold">{t.head.purpose}</th>
              <th className="px-4 py-3 font-semibold">{t.head.duration}</th>
            </tr>
          </thead>
          <tbody>
            {COOKIES.map((c) => (
              <tr key={c.name} className="border-t border-line">
                <td className="px-4 py-3 font-mono text-[13px]">{c.name}</td>
                <td className="px-4 py-3">
                  {c.provider}
                  {!c.firstParty && <span className="block text-xs text-mist">{t.thirdParty}</span>}
                </td>
                <td className="px-4 py-3">{t.purposes[c.purpose]}</td>
                <td className="px-4 py-3">{t.days(c.days)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
