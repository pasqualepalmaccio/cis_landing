"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

import type { Dict } from "@/content";

import { Container } from "../layout/container";
import { Reveal } from "../motion/reveal";
import { SectionHead } from "../section-head";

type Card = Dict["philosophy"]["cards"][number];

function PhiloCard({ card, index }: { card: Card; index: number }) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-[2rem] border p-8 sm:p-10 ${
        card.highlight ? "border-gold-500/70 bg-gradient-to-br from-gold-500/15 via-navy-800 to-navy-800" : "border-line bg-navy-800"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-sm italic text-terracotta">{card.tag}</span>
        <span className="font-display text-6xl leading-none text-gold-500/20">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3 className="mt-10 font-display text-3xl leading-tight">{card.title}</h3>
      <p className="mt-5 text-[15px] leading-relaxed text-mist">{card.body}</p>
    </article>
  );
}

/* Su schermo largo la sezione si ferma e le schede scorrono di lato mentre
   si scorre in verticale; su mobile e con movimento ridotto restano impilate. */
export function Philosophy({ t }: { t: Dict["philosophy"] }) {
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const strip = useRef<HTMLDivElement>(null);
  const distance = useMotionValue(0);
  /* Quanto deve scorrere il nastro perché l'ultima scheda arrivi al margine destro. */
  useEffect(() => {
    const measure = () => {
      const el = strip.current;
      if (el) distance.set(Math.max(0, el.scrollWidth - window.innerWidth + 32));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [distance]);
  const x = useTransform(() => -scrollYProgress.get() * distance.get());
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="filosofia" className="relative">
      <div className={reduce ? "hidden" : "hidden lg:block"}>
        <div ref={track} className="relative h-[320vh]">
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
            <Container>
              <SectionHead eyebrow={t.eyebrow} title={t.title} />
            </Container>
            <motion.div ref={strip} style={{ x }} className="flex w-max gap-6 pl-[max(2rem,calc((100vw-1240px)/2+2rem))]">
              {t.cards.map((card, i) => (
                <div key={card.title} className="w-[34rem] shrink-0">
                  <PhiloCard card={card} index={i} />
                </div>
              ))}
            </motion.div>
            <Container className="mt-12">
              <div className="h-px w-full bg-line">
                <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-gold-300" />
              </div>
            </Container>
          </div>
        </div>
      </div>

      <div className={reduce ? "py-28" : "py-28 sm:py-40 lg:hidden"}>
        <Container>
          <SectionHead eyebrow={t.eyebrow} title={t.title} />
          <div className="grid gap-5 md:grid-cols-2">
            {t.cards.map((card, i) => (
              <Reveal key={card.title} delay={(i % 2) * 0.1}>
                <PhiloCard card={card} index={i} />
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
