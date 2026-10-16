"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { ReactNode } from "react";

/* Superficie con un alone dorato che segue il puntatore. */
export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const background = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, color-mix(in oklab, var(--color-gold-500) 16%, transparent), transparent 65%)`;

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-line bg-navy-800/70 ${className}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        mx.set(-400);
        my.set(-400);
      }}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background }} />
      <div className="relative">{children}</div>
    </div>
  );
}
