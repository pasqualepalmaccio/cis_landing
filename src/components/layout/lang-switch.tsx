"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LANGS, type Lang } from "@/content";

/* Passa alla stessa pagina nell'altra lingua, mantenendo la sezione. */
export function LangSwitch({ lang, label }: { lang: Lang; label: string }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(it|en)(?=\/|$)/, "");
  return (
    <nav aria-label={label} className="flex items-center rounded-full border border-rule p-0.5 text-[11px] font-bold">
      {LANGS.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          aria-current={l === lang ? "true" : undefined}
          className={`rounded-full px-2.5 py-1.5 uppercase tracking-wider transition-colors ${
            l === lang ? "bg-gold-500 text-navy-950" : "text-fg/80 hover:text-fg"
          }`}
        >
          {l}
        </Link>
      ))}
    </nav>
  );
}
