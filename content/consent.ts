/**
 * Einwilligungspflichtige Dienste (Cookie-Consent).
 *
 * Alles, was Cookies setzt, auf dem Gerät speichert oder Daten an Dritte
 * überträgt und nicht technisch zwingend nötig ist, MUSS hier eingetragen und
 * im Code über <ConsentScript> bzw. <ConsentGate> eingebunden werden.
 *
 * Der Banner erscheint auf Wunsch des Betreibers auch, solange die Liste leer
 * ist – dann mit dem Hinweis, dass nichts getrackt wird. Mit dem ersten Eintrag
 * nennt der Banner den Dienst, die Datenschutzerklärung listet ihn auf und
 * bereits getroffene Entscheidungen werden neu abgefragt.
 */

export type ConsentCategoryId = "statistics" | "marketing" | "media";

export const consentCategories: Record<ConsentCategoryId, { label: string; description: string }> = {
  statistics: {
    label: "Statistik",
    description: "Hilft uns zu verstehen, welche Seiten gelesen werden – anonym ausgewertet, ohne Werbung.",
  },
  marketing: {
    label: "Marketing",
    description: "Misst, ob unsere Anzeigen funktionieren, und kann euch auf anderen Seiten wiedererkennen.",
  },
  media: {
    label: "Externe Medien",
    description: "Inhalte von anderen Plattformen wie Karten, Videos oder Social-Media-Beiträge.",
  },
};

export type ConsentCookie = {
  name: string;
  /** true: alle Cookies, deren Name so beginnt (z. B. "_ga" → _ga, _ga_ABC123) */
  prefix?: boolean;
  duration: string;
};

export type ConsentService = {
  /** stabile ID – nie umbenennen, sonst gelten alte Einwilligungen nicht mehr */
  id: string;
  name: string;
  provider: string;
  category: ConsentCategoryId;
  purpose: string;
  privacyPolicyUrl: string;
  /** Cookies des Dienstes – werden beim Widerruf gelöscht */
  cookies: readonly ConsentCookie[];
  /** localStorage-Schlüssel des Dienstes – werden beim Widerruf gelöscht */
  storageKeys?: readonly string[];
  /** Drittland, in das Daten übertragen werden, z. B. "USA" */
  thirdCountry?: string;
};

/*
 * Beispiel für einen Eintrag:
 *
 * {
 *   id: "google-analytics",
 *   name: "Google Analytics",
 *   provider: "Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland",
 *   category: "statistics",
 *   purpose: "Anonyme Auswertung der Seitenaufrufe, um die Website zu verbessern.",
 *   privacyPolicyUrl: "https://policies.google.com/privacy",
 *   cookies: [
 *     { name: "_ga", prefix: true, duration: "2 Jahre" },
 *   ],
 *   thirdCountry: "USA",
 * },
 *
 * Eingebunden wird das Skript dann z. B. im Root-Layout mit
 *   <ConsentScript service="google-analytics" src="https://…" />
 * und eingebettete Inhalte (Karten, Videos) mit
 *   <ConsentGate service="google-maps">…iframe…</ConsentGate>
 */
export const consentServices: readonly ConsentService[] = [];

/**
 * Bei wesentlichen Änderungen (neuer Zweck, anderer Anbieter) erhöhen –
 * dann werden alle Besucher erneut gefragt. Neue Dienste lösen die Abfrage
 * auch ohne Versionssprung aus.
 */
export const CONSENT_VERSION = 1;

/** Nach dieser Zeit wird erneut gefragt (Empfehlung der Aufsichtsbehörden: max. 12 Monate). */
export const CONSENT_MAX_AGE_DAYS = 365;

/** Schlüssel im localStorage, unter dem die Entscheidung gespeichert wird. */
export const CONSENT_STORAGE_KEY = "landstreicher-consent";

export const hasOptionalServices = consentServices.length > 0;
