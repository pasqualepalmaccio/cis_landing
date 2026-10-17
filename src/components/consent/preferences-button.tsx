"use client";

import { openPreferences } from "@/lib/consent/store";

/* Il link permanente per rivedere la scelta, richiesto dal Garante. */
export function PreferencesButton({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" onClick={openPreferences} className={className}>
      {label}
    </button>
  );
}
