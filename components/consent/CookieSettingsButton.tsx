"use client";

import { openConsentSettings } from "@/lib/consent";

/** Öffnet den Einstellungsdialog – Widerruf muss genauso leicht sein wie die Zustimmung. */
export function CookieSettingsButton({ className = "", children = "Cookie-Einstellungen" }: { className?: string; children?: string }) {
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      {children}
    </button>
  );
}
