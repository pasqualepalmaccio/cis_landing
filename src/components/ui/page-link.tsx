"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

type Props = Omit<ComponentProps<"a">, "href"> & { href: string };

/* Un collegamento della landing. Le ancore nella stessa pagina («#rette»)
   scorrono qui: Link di Next ignora il clic quando l'indirizzo finisce già
   con quell'ancora, e un <a> semplice viene riportato in cima dal router.
   Il comando sembrava rotto al secondo uso (segnalazione del 16/11).
   Se la sezione non c'è, il clic prosegue come un collegamento normale. */
export function PageLink({ href, onClick, ...props }: Props) {
  if (!href.startsWith("#")) return <Link href={href} onClick={onClick} {...props} />;
  const jump = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    const target = document.getElementById(href.slice(1));
    if (!target || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(history.state, "", href);
  };
  return <a href={href} onClick={jump} {...props} />;
}
