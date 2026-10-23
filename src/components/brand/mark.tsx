import Image from "next/image";

/* Marchio definitivo della grafica (brand/CIS_LOGO_DEFINITIVO), versioni
   «fondo blu» senza sfondo: stesso disegno e stessi colori, con il riquadro
   stretto sul segno (l'area di rispetto la dà il layout). */
const MARKS = {
  horizontal: { src: "/brand/orizzontale.svg", width: 871, height: 273 },
  compact: { src: "/brand/compatto.svg", width: 595, height: 180 },
  crest: { src: "/brand/stemma.svg", width: 442, height: 438 },
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
