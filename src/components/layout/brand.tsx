import Link from "next/link";

import type { Lang } from "@/content";

import { Mark } from "../brand/mark";

/* Nella barra va lo stemma ridotto, senza nastro: 56 px è la misura minima
   che il brandbook indica per lo schermo. Il nome per esteso sta nel footer
   (marchio orizzontale): il brandbook vieta di ricomporlo con altri caratteri. */
export function Brand({ lang }: { lang: Lang }) {
  return (
    <Link href={`/${lang}`} className="group block shrink-0" aria-label="Colico International School, home">
      <Mark variant="reduced" priority className="h-14 w-auto transition-transform duration-500 ease-out-expo group-hover:scale-[1.04]" />
    </Link>
  );
}
