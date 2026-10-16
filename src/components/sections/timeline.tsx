"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

import type { Dict } from "@/content";

import { Container } from "../layout/container";
import { Reveal } from "../motion/reveal";
import { SectionHead } from "../section-head";

/* La linea dorata si disegna man mano che si scorre il percorso. */
export function Timeline({ t }: { t: Dict["timeline"] }) {
  const list = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="percorso" className="relative bg-navy-800 py-28 sm:py-40">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          </div>

          <ol ref={list} className="relative space-y-14 pl-10 sm:pl-14">
            <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-line sm:left-[11px]" />
            <motion.span
              aria-hidden
              style={reduce ? undefined : { scaleY }}
              className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-gold-300 via-gold-500 to-bordeaux sm:left-[11px]"
            />
            {t.steps.map((s, i) => (
              <Reveal as="li" key={s.when} delay={0.05} className="relative">
                <span aria-hidden className="absolute -left-10 top-1 grid size-[15px] place-items-center rounded-full border-2 border-gold-500 bg-navy-900 sm:-left-14 sm:size-[23px]">
                  <span className="size-1.5 rounded-full bg-gold-300 sm:size-2" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">{s.when}</p>
                <h3 className="mt-2 font-display text-2xl sm:text-3xl">
                  <span className="mr-3 font-sans text-sm text-bordeaux-300">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h3>
                {s.body && <p className="mt-3 leading-relaxed text-mist">{s.body}</p>}
                {s.items.length > 0 && (
                  <ul className="mt-4 space-y-2 text-mist">
                    {s.items.map((item) => (
                      <li key={item} className="relative pl-5">
                        <span className="absolute left-0 text-gold-500">–</span>
                        {item}
                      </li>
                    ))}
                    {s.highlight && (
                      <li className="relative pl-5 font-semibold text-gold-300">
                        <span className="absolute left-0 text-gold-500">–</span>
                        {s.highlight}
                      </li>
                    )}
                  </ul>
                )}
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
