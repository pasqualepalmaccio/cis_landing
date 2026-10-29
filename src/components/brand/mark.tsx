import Image from "next/image";

/* Marchio V2 della grafica (brand/CIS_LOGO_V2), versioni «fondo blu» senza
   sfondo: scritte bianche per le pagine scure, riquadro stretto sul segno
   (l'area di rispetto la dà il layout). */
const MARKS = {
  horizontal: { src: "/brand/orizzontale.svg", width: 770, height: 225 },
  crest: { src: "/brand/stemma.svg", width: 298, height: 373 },
} as const;

type Props = {
  variant: keyof typeof MARKS;
  className?: string;
  priority?: boolean;
  /** Testo alternativo: vuoto quando il nome è già detto accanto (es. aria-label del link). */
  alt?: string;
};

export function Mark({ variant, className, priority, alt = "" }: Props) {
  const m = MARKS[variant];
  return <Image src={m.src} alt={alt} width={m.width} height={m.height} className={className} priority={priority} unoptimized />;
}
