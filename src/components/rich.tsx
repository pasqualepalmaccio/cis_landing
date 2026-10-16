import { Fragment } from "react";

/* Testi dei contenuti con **grassetto** e *corsivo*, senza HTML nei dizionari. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**")) return <strong key={i} className="font-semibold text-cream">{part.slice(2, -2)}</strong>;
        if (part.startsWith("*")) return <em key={i} className="italic">{part.slice(1, -1)}</em>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
