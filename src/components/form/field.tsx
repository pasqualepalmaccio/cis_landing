import type { ReactNode } from "react";

/* Aspetto condiviso di input, select e textarea: una decisione, un posto. */
export const control =
  "w-full rounded-xl border border-line bg-cream/[0.04] px-4 py-3 text-[15px] text-cream placeholder:text-mist/50 transition-colors focus:border-gold-500 focus:bg-cream/[0.07] focus:outline-none [&>option]:bg-navy-900";

export function Field({ label, htmlFor, required, children, className = "" }: { label: string; htmlFor?: string; required?: boolean; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-mist">
        {label}
        {required && <span className="ml-1 text-gold-500">*</span>}
      </label>
      {children}
    </div>
  );
}

export function Options({ items, lang, placeholder }: { items: ({ v: string } & Record<"it" | "en", string>)[]; lang: "it" | "en"; placeholder: string }) {
  return (
    <>
      <option value="">{placeholder}</option>
      {items.map((o) => (
        <option key={o.v} value={o.v}>
          {o[lang]}
        </option>
      ))}
    </>
  );
}

export function FormSection({ title, sub, children }: { title: string; sub: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-line py-12">
      <legend className="sr-only">{title}</legend>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)]">
        <div aria-hidden>
          <h2 className="font-display text-3xl text-gold-300">{title}</h2>
          <p className="mt-2 text-sm text-mist">{sub}</p>
        </div>
        <div className="space-y-5">{children}</div>
      </div>
    </fieldset>
  );
}
