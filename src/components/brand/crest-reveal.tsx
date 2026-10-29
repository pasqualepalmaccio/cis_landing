"use client";

import { motion, useReducedMotion } from "motion/react";

import { Mark } from "./mark";

const ease = [0.16, 1, 0.3, 1] as const;

/* Lo stemma si svela dall'alto come una tela che scende,
   mentre due cerchi d'ottone si allargano dietro. Il segno resta piatto e
   intatto: nessuna rotazione, ombra o effetto oro (brandbook, usi scorretti). */
export function CrestReveal() {
  const reduce = useReducedMotion();
  const view = { once: true, margin: "-15% 0px" } as const;

  return (
    <div className="relative mb-12 flex justify-center sm:mb-16">
      {!reduce &&
        [0, 0.35].map((delay) => (
          <motion.span
            key={delay}
            aria-hidden
            className="absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/50 sm:size-48"
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: [0.6, 1.9], opacity: [0, 0.7, 0] }}
            viewport={view}
            transition={{ duration: 2.2, delay: 0.5 + delay, ease: "easeOut" }}
          />
        ))}
      <motion.div
        initial={reduce ? false : { clipPath: "inset(0% 0% 100% 0%)", y: 24 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)", y: 0 }}
        viewport={view}
        transition={{ duration: 1.4, ease }}
      >
        <Mark variant="crest" alt="Colico International School" className="h-auto w-28 sm:w-36" />
      </motion.div>
    </div>
  );
}
