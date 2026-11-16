"use client";

import { useEffect, useState } from "react";

import type { EarlyBirdCopy } from "@/content/early-bird";

type Parts = { days: number; hours: number; minutes: number; seconds: number };
const UNITS = ["days", "hours", "minutes", "seconds"] as const;

function partsUntil(deadline: number, now: number): Parts | null {
  const left = Math.floor((deadline - now) / 1000);
  if (left <= 0) return null;
  return { days: Math.floor(left / 86400), hours: Math.floor((left % 86400) / 3600), minutes: Math.floor((left % 3600) / 60), seconds: left % 60 };
}

/* Il conto alla rovescia verso la fine dell'offerta, nei colori della
   scuola. L'ora è quella del visitatore, calcolata sul suo dispositivo:
   prima che la pagina sia attiva mostra dei trattini, così server e
   browser non disegnano due numeri diversi. Finita l'offerta, lo dice. */
export function Countdown({ deadline, t }: { deadline: string; t: EarlyBirdCopy["countdown"] }) {
  const end = new Date(deadline).getTime();
  const [parts, setParts] = useState<Parts | null | undefined>(undefined);

  useEffect(() => {
    const tick = () => setParts(partsUntil(end, Date.now()));
    const first = setTimeout(tick, 0);
    const timer = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, [end]);

  if (parts === null) {
    return <p className="font-label text-xs font-semibold uppercase tracking-[0.14em] text-gold-300">{t.ended}</p>;
  }

  return (
    <div role="timer" aria-label={t.label} className="inline-flex flex-col items-center gap-2 rounded-2xl border border-white/25 bg-navy-950/55 px-5 py-3 backdrop-blur-md sm:flex-row sm:gap-5 sm:px-6">
      <p className="font-label text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-300">{t.label}</p>
      <dl className="flex items-center divide-x divide-gold-500/40">
        {UNITS.map((u) => {
          const n = parts?.[u];
          const [one, many] = t.units[u];
          return (
            <div key={u} className="flex flex-col-reverse items-center px-3 first:pl-0 last:pr-0 sm:px-4">
              {/* Nel codice prima il nome dell'unità, a schermo sotto il numero. */}
              <dt className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/70">{n === 1 ? one : many}</dt>
              <dd className="font-display text-2xl font-semibold leading-none text-white tabular-nums sm:text-3xl">
                {n === undefined ? "--" : String(n).padStart(u === "days" ? 1 : 2, "0")}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
