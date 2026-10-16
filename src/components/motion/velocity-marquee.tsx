"use client";

import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity, wrap } from "motion/react";
import { useRef } from "react";

/* Nastro infinito che accelera e inverte con la velocità di scorrimento. */
export function VelocityMarquee({ items, baseVelocity = -2.2 }: { items: string[]; baseVelocity?: number }) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(base, (v) => `${wrap(-25, -50, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    base.set(base.get() + move);
  });

  const row = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden whitespace-nowrap" aria-hidden>
      <motion.div className="flex shrink-0 gap-0" style={{ x }}>
        {[0, 1, 2, 3].map((copy) => (
          <span key={copy} className="flex shrink-0 items-center">
            {row.map((word, i) => (
              <span key={i} className="flex items-center font-display text-[clamp(2.6rem,7vw,6.5rem)] leading-none tracking-tight">
                <span className={i % 2 ? "text-transparent [-webkit-text-stroke:1px_rgb(232_196_106/0.55)]" : "text-cream"}>{word}</span>
                <span className="mx-[0.45em] text-[0.4em] text-gold-500">✦</span>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
