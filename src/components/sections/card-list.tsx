import { Rich } from "../rich";

/* Elenco puntato dei contenuti: trattino dorato e testo attenuato. */
export function CardList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-[15px] leading-relaxed text-mist">
      {items.map((item) => (
        <li key={item} className="relative pl-6">
          <span className="absolute left-0 top-[0.7em] h-px w-3 bg-gold-500" />
          <Rich text={item} />
        </li>
      ))}
    </ul>
  );
}
