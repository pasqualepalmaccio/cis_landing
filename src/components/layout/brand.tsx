import Link from "next/link";

import type { Lang } from "@/content";

import { Mark } from "../brand/mark";

/* Nella barra va lo stemma: il nome per esteso sta nel footer (marchio
   orizzontale), mai ricomposto con altri caratteri. */
export function Brand({ lang, href }: { lang: Lang; href?: string }) {
  return (
    <Link href={href ?? `/${lang}`} className="group block shrink-0" aria-label={href ? "CIS Colico International School" : "CIS Colico International School, home"}>
      <Mark variant="crest" priority className="h-12 w-auto transition-transform duration-500 ease-out-expo group-hover:scale-[1.04]" />
    </Link>
  );
}
