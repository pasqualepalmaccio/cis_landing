import type { ReactNode } from "react";

/* Le icone del sito, tutte qui: 24×24, a tratto da 1,6, angoli arrotondati,
   lo stesso linguaggio lineare della corona e del fiore dello stemma. Il
   colore è quello del testo (currentColor): lo decide chi le usa. */
const PATHS = {
  /* Il fiore dello stemma: unica icona piena. */
  flower: (
    <g fill="currentColor" stroke="none">
      <circle cx="12" cy="12" r="2.3" />
      <circle cx="12" cy="6.2" r="2.3" />
      <circle cx="17" cy="9.1" r="2.3" />
      <circle cx="17" cy="14.9" r="2.3" />
      <circle cx="12" cy="17.8" r="2.3" />
      <circle cx="7" cy="14.9" r="2.3" />
      <circle cx="7" cy="9.1" r="2.3" />
    </g>
  ),
  home: (
    <>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6.5 10.5V20h11v-9.5" />
      <path d="M12 17.2c-2.6-1.6-3.4-3.9-1.9-5.1 1-.8 2.2-.3 1.9.9-.3-1.2.9-1.7 1.9-.9 1.5 1.2.7 3.5-1.9 5.1Z" fill="currentColor" stroke="none" />
    </>
  ),
  book: (
    <>
      <path d="M12 6.2c-1.8-1.2-4.2-1.7-7-1.2v12.6c2.8-.5 5.2 0 7 1.2 1.8-1.2 4.2-1.7 7-1.2V5c-2.8-.5-5.2 0-7 1.2Z" />
      <path d="M12 6.2v12.6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="7.6" />
      <path d="M4.4 12h15.2M12 4.4v15.2" />
      <path d="M6.3 7.4c3.7 2 7.7 2 11.4 0M6.3 16.6c3.7-2 7.7-2 11.4 0" />
    </>
  ),
  network: (
    <>
      <circle cx="6" cy="7" r="2" />
      <circle cx="18" cy="7" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M7.6 8.3 10.6 16M16.4 8.3 13.4 16M8 7h8" />
    </>
  ),
  mortarboard: (
    <>
      <path d="M12 4 2 9l10 5 10-5-10-5Z" />
      <path d="M6 11.5V17c0 1.4 2.7 2.6 6 2.6s6-1.2 6-2.6v-5.5" />
      <path d="M22 9v6" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M15.3 8.7 13 13l-4.3 2.3L11 11l4.3-2.3Z" fill="currentColor" stroke="none" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.6 7-11.8A7 7 0 0 0 5 9.2C5 14.4 12 21 12 21Z" />
      <circle cx="12" cy="9.2" r="2.4" />
    </>
  ),
  car: (
    <>
      <path d="M4.5 16V12l2-5h11l2 5v4" />
      <path d="M4.5 16h15v2.3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V17h-9v1.3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V16Z" />
      <path d="M6.5 7h11" />
      <circle cx="8" cy="13.3" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="13.3" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  train: (
    <>
      <rect x="5.5" y="4.5" width="13" height="13" rx="4" />
      <path d="M5.5 12h13" />
      <circle cx="9" cy="14.6" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="14.6" r="1" fill="currentColor" stroke="none" />
      <path d="M9 20 7 22.3M15 20l2 2.3" />
    </>
  ),
  ferry: (
    <>
      <path d="M5 14.5 3.5 19c2.6 1.6 5.2 1.6 7 .3 1.8 1.3 4.4 1.3 7 0 1.8 1.3 3.2.3 3.2.3L19 14.5Z" />
      <path d="M6.5 14.5V8h11v6.5" />
      <path d="M12 8V4.3h3.2L12 2.2" />
    </>
  ),
  speech: <path d="M4 5.5h16v10H10l-4 3.5v-3.5H4V5.5Z" />,
  "screen-off": (
    <>
      <rect x="3.5" y="5" width="17" height="11" rx="1.8" />
      <path d="M9 20h6M12 16v4" />
      <path d="M4 4.5 20 19.5" />
    </>
  ),
  shirt: <path d="M9 4 5 6.5 6.7 9.8 9 8.5V20h6V8.5l2.3 1.3L19 6.5 15 4c-.6 1.3-1.8 2-3 2s-2.4-.7-3-2Z" />,
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
      <path d="M4 9.5h16M8 3.5v4M16 3.5v4" />
      <g fill="currentColor" stroke="none">
        <circle cx="8.3" cy="13.3" r="1" />
        <circle cx="12" cy="13.3" r="1" />
        <circle cx="15.7" cy="13.3" r="1" />
        <circle cx="8.3" cy="16.8" r="1" />
        <circle cx="12" cy="16.8" r="1" />
      </g>
    </>
  ),
  shield: <path d="M12 3.5 19 6v6.2c0 4.3-3 7-7 8.3-4-1.3-7-4-7-8.3V6l7-2.5Z" />,
  "shield-check": (
    <>
      <path d="M12 3.5 19 6v6.2c0 4.3-3 7-7 8.3-4-1.3-7-4-7-8.3V6l7-2.5Z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S5.8 6 12 6s9.5 6 9.5 6-3.3 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  bus: (
    <>
      <rect x="3.5" y="5.5" width="17" height="11" rx="2.5" />
      <path d="M3.5 11h17" />
      <path d="M7 8h2M15 8h2" />
      <circle cx="7.5" cy="19" r="1.4" />
      <circle cx="16.5" cy="19" r="1.4" />
    </>
  ),
  lock: (
    <>
      <rect x="5.5" y="11" width="13" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15.3" r="1.3" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15 15 20.5 20.5" />
    </>
  ),
  heart: <path d="M12 19.5C6 15.6 3.2 11.8 3.2 8.4 3.2 5.6 5.4 3.5 8 3.5c1.7 0 3.1.9 4 2.3.9-1.4 2.3-2.3 4-2.3 2.6 0 4.8 2.1 4.8 4.9 0 3.4-2.8 7.2-8.8 11.1Z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5V12l3.3 2" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="6" width="17" height="12" rx="2" />
      <path d="M4 7.3l8 6 8-6" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: <path d="M14.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4a21 21 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1v2.1H8.6v3h2.7V21" />,
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M8 10.5V16M8 7.6v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.3-2.6s2.2.8 2.2 2.6V16" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof PATHS;

/** Decorativa: il significato lo porta sempre il testo accanto. */
export function Icon({ name, className = "size-6" }: { name: IconName; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {PATHS[name]}
    </svg>
  );
}
