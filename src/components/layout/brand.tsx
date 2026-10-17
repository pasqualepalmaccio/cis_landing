import Link from "next/link";

import type { Lang } from "@/content";

import { Mark } from "../brand/mark";

/* Il brandbook vieta di ricomporre il nome con altri caratteri e di ruotare
   il marchio: sotto sm, o quando lo spazio è poco, va lo stemma ridotto. */
export function Brand({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  return (
    <Link href={`/${lang}`} className="group block shrink-0" aria-label="Colico International School, home">
      <span className="block transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]">
        <Mark variant="reduced" priority className={`h-14 w-auto ${compact ? "" : "sm:hidden"}`} />
        {!compact && <Mark variant="horizontal" priority className="hidden h-[72px] w-auto sm:block lg:h-20" />}
      </span>
    </Link>
  );
}
