"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type Props = { to: number; locale?: string; prefix?: string; duration?: number; className?: string };

/* Numero che corre fino al valore quando entra nella vista. Il valore finale
   è già nel markup: senza JavaScript, o con movimento ridotto, si legge subito. */
export function Counter({ to, locale = "it-IT", prefix = "", duration = 1.6, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const format = (n: number) => prefix + new Intl.NumberFormat(locale, { maximumFractionDigits: 0, useGrouping: "always" }).format(Math.round(n));

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduce) return;
    const fmt = new Intl.NumberFormat(locale, { maximumFractionDigits: 0, useGrouping: "always" });
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = prefix + fmt.format(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration, locale, prefix]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {format(to)}
    </span>
  );
}
