"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import type { Dict } from "@/content";

import { Container } from "../layout/container";
import { Reveal } from "../motion/reveal";
import { SectionHead } from "../section-head";

export function Campus({ t }: { t: Dict["campus"] }) {
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  /* La fotografia si apre mentre entra nella vista e scorre al suo interno. */
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "center center"] });
  const inset = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [48, 24]);
  const clipPath = useTransform([inset, radius], ([i, r]) => `inset(${i}% ${i}% ${i}% ${i}% round ${r}px)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);

  return (
    <section id="campus" className="relative overflow-hidden bg-navy-800 py-28 sm:py-40">
      <Container>
        <SectionHead eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      </Container>

      <div ref={frame} className="px-3 sm:px-6">
        <motion.figure style={reduce ? undefined : { clipPath }} className="relative aspect-[16/9] overflow-hidden sm:aspect-[31/10]">
          <motion.div className="absolute inset-0" style={reduce ? undefined : { scale }}>
            <Image src="/images/sede-ingresso.jpg" alt={t.hero.alt} fill sizes="100vw" className="object-cover" />
          </motion.div>
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/90 to-transparent px-6 pb-5 pt-16 text-sm font-semibold text-gold-300 sm:px-10">
            {t.hero.caption}
          </figcaption>
        </motion.figure>
      </div>

      <Container>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {t.gallery.map((g, i) => (
            <Reveal key={g.src} as="figure" delay={i * 0.12} className="group overflow-hidden rounded-3xl border border-line bg-navy-900">
              <div className="relative aspect-[384/354] overflow-hidden">
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110"
                />
              </div>
              <figcaption className="flex items-center justify-between px-5 py-4 text-sm font-semibold text-gold-300">
                {g.caption}
                <span className="text-mist transition-transform duration-500 group-hover:translate-x-1">→</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-sm text-mist">{t.note}</p>
      </Container>
    </section>
  );
}
