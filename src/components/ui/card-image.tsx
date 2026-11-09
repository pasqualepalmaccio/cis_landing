import Image from "next/image";

export type CardImageData = { src: string; alt: string; position: string };

/* La fotografia in testa a una scheda: angoli arrotondati, ritaglio scelto
   per ogni immagine (position), altezza decisa da chi la usa. La usano la
   filosofia e la sicurezza. */
export function CardImage({ image, className = "h-56", sizes }: { image: CardImageData; className?: string; sizes: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-sand ${className}`}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" style={{ objectPosition: image.position }} />
    </div>
  );
}
