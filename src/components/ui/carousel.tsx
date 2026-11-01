"use client";

import { useReducedMotion } from "motion/react";
import { Children, useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import { Icon } from "./icons";

type Labels = { region: string; prev: string; next: string; goTo: string };

/* Nastro di schede che si scorre di lato. Lo scorrimento è quello nativo
   (dito, rotella, barra), con l'aggancio a ogni scheda; sopra ci sono le
   frecce (da tablet in su: su mobile basta il dito), i punti cliccabili
   sempre allineati alla scheda visibile e le frecce della tastiera quando il
   nastro ha il fuoco. Le schede sono tutte nel markup: senza JavaScript si
   scorrono comunque. */
export function Carousel({ labels, children }: { labels: Labels; children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const slides = Children.toArray(children);
  const [pos, setPos] = useState({ index: 0, atStart: true, atEnd: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const atStart = el.scrollLeft <= 4;
    const atEnd = el.scrollLeft >= max - 4;
    let index = 0;
    let best = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const d = Math.abs((c as HTMLElement).offsetLeft - el.scrollLeft);
      if (d < best) {
        best = d;
        index = i;
      }
    });
    // A fine corsa le ultime schede non arrivano mai al bordo sinistro: vale l'ultima.
    setPos({ index: atEnd ? el.children.length - 1 : index, atStart, atEnd });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const behavior: ScrollBehavior = reduce ? "auto" : "smooth";
  const goTo = (i: number) => {
    const el = track.current;
    const slide = el?.children[i] as HTMLElement | undefined;
    if (el && slide) el.scrollTo({ left: slide.offsetLeft, behavior });
  };
  const step = (dir: 1 | -1) => goTo(Math.min(slides.length - 1, Math.max(0, pos.index + dir)));

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    step(e.key === "ArrowRight" ? 1 : -1);
  };

  return (
    <div>
      <div className="relative">
        <Arrow dir="prev" label={labels.prev} disabled={pos.atStart} onClick={() => step(-1)} />
        <div
          ref={track}
          role="region"
          aria-label={labels.region}
          tabIndex={0}
          onKeyDown={onKey}
          className="relative flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, i) => (
            <div key={i} className="w-[min(18rem,82%)] shrink-0 snap-start sm:w-[18rem]">
              {slide}
            </div>
          ))}
        </div>
        <Arrow dir="next" label={labels.next} disabled={pos.atEnd} onClick={() => step(1)} />
      </div>
      <div className="mt-6 flex justify-center gap-1">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={labels.goTo.replace("{n}", String(i + 1))}
            aria-current={i === pos.index ? "true" : undefined}
            className="grid size-6 place-items-center"
          >
            <span className={`size-2.5 rounded-full transition-[background-color,transform] duration-200 ${i === pos.index ? "scale-125 bg-bordeaux" : "bg-sand-strong"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

function Arrow({ dir, label, disabled, onClick }: { dir: "prev" | "next"; label: string; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`absolute top-[38%] z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-sand bg-white text-navy-900 shadow-lift transition-[background-color,opacity] duration-200 hover:bg-cream disabled:cursor-default disabled:opacity-35 md:grid ${
        dir === "prev" ? "-left-6" : "-right-6"
      }`}
    >
      <Icon name={dir === "prev" ? "chevron-left" : "chevron-right"} className="size-4.5" />
    </button>
  );
}
