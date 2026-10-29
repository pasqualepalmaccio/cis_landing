import Image from "next/image";

import horizontal from "@/assets/brand/orizzontale.svg";
import crest from "@/assets/brand/stemma.svg";

/* Marchio V2 della grafica (brand/CIS_LOGO_V2), versioni «fondo blu» senza
   sfondo: scritte bianche per le pagine scure, riquadro stretto sul segno
   (l'area di rispetto la dà il layout). Importati, non serviti da public/:
   l'indirizzo porta l'impronta del file, così un marchio nuovo non resta
   nascosto dalla cache del browser. */
const MARKS = { horizontal, crest } as const;

type Props = {
  variant: keyof typeof MARKS;
  className?: string;
  priority?: boolean;
  /** Testo alternativo: vuoto quando il nome è già detto accanto (es. aria-label del link). */
  alt?: string;
};

export function Mark({ variant, className, priority, alt = "" }: Props) {
  const m = MARKS[variant];
  return <Image src={m} alt={alt} className={className} priority={priority} unoptimized />;
}
