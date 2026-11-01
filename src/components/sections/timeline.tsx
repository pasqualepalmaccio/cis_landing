"use client";

import { motion, useReducedMotion } from "motion/react";

import type { Dict } from "@/content";

import { Section } from "../layout/section";
import { SectionHead } from "../section-head";

const view = { once: true, margin: "0px 0px -15% 0px" } as const;

/* Il percorso si racconta scorrendo: la linea Cremisi→Oro si disegna
   dall'alto quando la sezione entra in vista, ogni tappa arriva poco dopo la
   precedente con il suo numero, che entra con un piccolo rimbalzo e poi
   pulsa. Con il movimento ridotto è tutto già al suo posto, fermo. */
export function Timeline({ t }: { t: Dict["timeline"] }) {
  const reduce = useReducedMotion();

  return (
    <Section id="percorso" tone="white">
      <SectionHead eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <ol className="relative max-w-3xl pl-[50px] sm:pl-16">
        <span aria-hidden className="absolute bottom-1.5 left-[13px] top-1.5 w-0.5 bg-sand sm:left-[23px]" />
        <motion.span
          aria-hidden
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={view}
          transition={{ duration: 1.8, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          className="absolute bottom-1.5 left-[13px] top-1.5 w-0.5 origin-top bg-gradient-to-b from-bordeaux to-gold-500 sm:left-[23px]"
        />
        {t.steps.map((s, i) => (
          <motion.li
            key={s.when}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={view}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
            className="relative pb-12 last:pb-0"
          >
            <motion.span
              aria-hidden
              initial={reduce ? false : { scale: 0.4, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={view}
              transition={{ type: "spring", stiffness: 320, damping: 14, delay: 0.15 + i * 0.12 }}
              className="absolute -left-[50px] top-0 z-10 grid size-9 place-items-center rounded-full border-2 border-gold-500 bg-white font-display text-[13px] font-bold text-heading shadow-card sm:-left-16 sm:size-12 sm:text-base"
            >
              <span className="absolute -inset-[7px] rounded-full border-[1.5px] border-bordeaux opacity-0 motion-safe:animate-ping-slow" />
              {String(i + 1).padStart(2, "0")}
            </motion.span>
            <p className="pt-1 font-label text-xs font-bold uppercase tracking-[0.07em] text-accent sm:pt-2.5">{s.when}</p>
            <h3 className="mt-1 font-display text-2xl font-semibold text-heading">{s.title}</h3>
            {s.body && <p className="mt-2 leading-relaxed text-fg-muted">{s.body}</p>}
            {s.items.length > 0 && (
              <ul className="mt-3 space-y-2 text-fg-muted">
                {s.items.map((item) => (
                  <li key={item} className="relative pl-5">
                    <span aria-hidden className="absolute left-0 text-gold-500">
                      –
                    </span>
                    {item}
                  </li>
                ))}
                {s.highlight && (
                  <li className="relative pl-5 font-semibold text-bordeaux">
                    <span aria-hidden className="absolute left-0 text-gold-500">
                      –
                    </span>
                    {s.highlight}
                  </li>
                )}
              </ul>
            )}
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
