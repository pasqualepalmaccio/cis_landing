"use client";

import { motion, useReducedMotion } from "motion/react";

type Props = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  /* Su richiesta parte subito (titolo dell'apertura), altrimenti all'ingresso nella vista. */
  immediate?: boolean;
};

/* Ogni parola sale da dietro una maschera, una dopo l'altra. Il testo resta
   leggibile dagli screen reader come frase intera. */
export function SplitWords({ lines, className, lineClassName = "", delay = 0, immediate = false }: Props) {
  const reduce = useReducedMotion();
  let index = 0;
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };
  return (
    <motion.span className={className} initial={reduce ? false : "hidden"} {...trigger}>
      <span className="sr-only">{lines.join(" ")}</span>
      {lines.map((line, l) => (
        <span key={l} aria-hidden className={`block ${lineClassName}`}>
          {line.split(" ").map((word, w) => {
            const i = index++;
            return (
              <span key={w} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                <motion.span
                  className="inline-block will-change-transform"
                  variants={{
                    hidden: { y: "110%", rotate: 4 },
                    show: { y: "0%", rotate: 0, transition: { duration: 1.05, delay: delay + i * 0.065, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  {word}
                </motion.span>
                {" "}
              </span>
            );
          })}
        </span>
      ))}
    </motion.span>
  );
}
