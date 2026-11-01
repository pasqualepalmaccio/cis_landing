/* Tabella che sotto i 640px diventa una pila di schede: ogni riga è una
   scheda, ogni cella mostra a sinistra l'intestazione della sua colonna
   (attributo data-label) e a destra il valore. Sopra i 640px resta una
   tabella vera, e per gli screen reader lo è sempre. Una regola, un posto:
   la usano le rette e le fasce d'età dell'Open Day. */
export const STACK = {
  table: "w-full border-collapse text-left text-[15px] max-sm:block",
  head: "max-sm:hidden",
  body: "max-sm:block",
  row: "max-sm:block max-sm:px-4 max-sm:py-3.5",
  cell: "max-sm:flex max-sm:justify-between max-sm:gap-3 max-sm:px-0 max-sm:py-1 max-sm:text-right max-sm:text-sm max-sm:before:text-left max-sm:before:font-semibold max-sm:before:text-heading max-sm:before:content-[attr(data-label)]",
} as const;
