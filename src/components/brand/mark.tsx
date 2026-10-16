import Image from "next/image";

/* Marchio della direzione A, versioni negative per il fondo blu notte. Gli SVG
   in public/brand derivano dai file del brandbook: stesso disegno e stessi
   colori, solo senza il rettangolo di fondo e con il riquadro stretto sul
   segno (l'area di rispetto la dà il layout). Dimensioni minime a schermo:
   orizzontale 180 px di larghezza, stemma 96 px, ridotto 56 px. */
const MARKS = {
  horizontal: { src: "/brand/orizzontale-negativo.svg", width: 372, height: 156 },
  crest: { src: "/brand/stemma-negativo.svg", width: 236, height: 249 },
  reduced: { src: "/brand/ridotto-negativo.svg", width: 176, height: 218 },
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
