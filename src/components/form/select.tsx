"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

import { control } from "./field";

export type SelectOption = { value: string; label: string; icon?: string };

type Props = {
  id: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Nome accessibile quando manca una <label htmlFor>. */
  ariaLabel?: string;
  /** Testo mostrato chiuso, se diverso dall'etichetta (es. solo il prefisso). */
  renderValue?: (option: SelectOption) => string;
  /** Larghezza della lista quando il campo chiuso è stretto (es. prefisso). */
  listClassName?: string;
};

/* Select nello stile del sito, pattern combobox + listbox (WAI-ARIA APG).
   Il valore arriva al form tramite un input nascosto con lo stesso name;
   «required» è garantito da un input sr-only che il browser valida. */
export function Select({
  id,
  name,
  options,
  placeholder,
  required,
  value,
  defaultValue = "",
  onChange,
  ariaLabel,
  renderValue,
  listClassName = "inset-x-0",
}: Props) {
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const typed = useRef({ text: "", at: 0 });
  const listId = useId();

  const all: SelectOption[] = placeholder !== undefined ? [{ value: "", label: placeholder }, ...options] : options;
  const selected = all.find((o) => o.value === current);

  const choose = (v: string) => {
    if (value === undefined) setInner(v);
    onChange?.(v);
    setOpen(false);
  };

  const openList = () => {
    setActive(
      Math.max(
        0,
        all.findIndex((o) => o.value === current),
      ),
    );
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  useEffect(() => {
    if (open) list.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = all.length - 1;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return openList();
      setActive((a) => Math.min(last, Math.max(0, a + (e.key === "ArrowDown" ? 1 : -1))));
    } else if (e.key === "Home" || e.key === "End") {
      if (!open) return;
      e.preventDefault();
      setActive(e.key === "Home" ? 0 : last);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open) choose(all[active]!.value);
      else openList();
    } else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
    } else if (e.key.length === 1 && /\S/.test(e.key)) {
      // Ricerca per lettere: «it» porta a Italia, come nelle select native.
      const now = Date.now();
      typed.current = { text: now - typed.current.at < 700 ? typed.current.text + e.key.toLowerCase() : e.key.toLowerCase(), at: now };
      const hit = all.findIndex((o) => o.label.toLowerCase().startsWith(typed.current.text));
      if (hit >= 0) {
        if (!open) openList();
        setActive(hit);
      }
    }
  };

  return (
    <div ref={root} className="relative">
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-label={ariaLabel}
        aria-required={required || undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKey}
        onBlur={(e) => !root.current?.contains(e.relatedTarget as Node | null) && setOpen(false)}
        className={`${control} flex items-center gap-2 pr-11 text-left`}
      >
        {selected?.icon && <span aria-hidden>{selected.icon}</span>}
        <span className={`truncate ${selected && selected.value !== "" ? "" : "text-mist/70"}`}>
          {selected ? (renderValue && selected.value ? renderValue(selected) : selected.label) : (placeholder ?? "")}
        </span>
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={`pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-gold-300 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <path d="M3.5 6l4.5 4.5L12.5 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <input type="hidden" name={name} value={current} />
      {required && (
        <input
          tabIndex={-1}
          aria-hidden
          required
          value={current}
          onChange={() => {}}
          onFocus={() => document.getElementById(id)?.focus()}
          className="pointer-events-none absolute bottom-0 left-1/2 size-px opacity-0"
        />
      )}
      <AnimatePresence>
        {open && (
          <motion.ul
            ref={list}
            id={listId}
            role="listbox"
            aria-labelledby={id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className={`absolute left-0 top-full z-40 mt-2 max-h-72 min-w-full ${listClassName} overflow-y-auto overscroll-contain rounded-xl border border-line bg-navy-900 p-1.5 shadow-2xl`}
          >
            {all.map((o, i) => (
              <li
                key={o.value || "__empty"}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={o.value === current}
                onPointerEnter={() => setActive(i)}
                onPointerDown={(e) => e.preventDefault()}
                onClick={() => choose(o.value)}
                className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-[15px] ${i === active ? "bg-cream/[0.08]" : ""} ${o.value === "" ? "text-mist" : "text-cream"}`}
              >
                {o.icon && <span aria-hidden>{o.icon}</span>}
                <span className="flex-1 truncate">{o.label}</span>
                {o.value === current && o.value !== "" && (
                  <svg aria-hidden viewBox="0 0 16 16" className="size-4 text-gold-300">
                    <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
