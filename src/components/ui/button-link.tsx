import Link from "next/link";
import type { ReactNode } from "react";

/* I comandi della landing: Cremisi pieno per l'azione principale, filo
   bianco per quella secondaria sui fondi scuri. Caratteri Cinzel in
   maiuscolo, come nella guida di marca. */
const VARIANT = {
  primary: "bg-action text-white hover:-translate-y-0.5 hover:bg-action-hover hover:shadow-lift",
  ghost: "border-[1.5px] border-white/55 text-white hover:border-white hover:bg-white/10",
} as const;

const SIZE = {
  md: "px-7 py-4 text-[13px]",
  sm: "px-5 py-3 text-xs",
} as const;

type Props = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof VARIANT;
  size?: keyof typeof SIZE;
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
};

export function ButtonLink({ href, children, variant = "primary", size = "md", arrow = false, className = "", onClick }: Props) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group inline-flex items-center gap-2 rounded-[4px] font-label font-semibold uppercase tracking-[0.06em] transition-[transform,background-color,border-color,box-shadow] duration-300 ${VARIANT[variant]} ${SIZE[size]} ${className}`}
    >
      {children}
      {arrow && (
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      )}
    </Link>
  );
}
