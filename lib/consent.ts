"use client";

import { useSyncExternalStore } from "react";
import {
  CONSENT_MAX_AGE_DAYS,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  consentServices,
  type ConsentService,
} from "@/content/consent";

/**
 * Einwilligungs-Speicher. Einzige Quelle der Wahrheit dafür, ob ein Dienst
 * laden darf. Gespeichert wird nur die Entscheidung selbst (technisch
 * notwendig, § 25 Abs. 2 Nr. 2 TDDDG) – im localStorage, damit sie nicht
 * bei jedem Request mit an den Server geht.
 */

export type ConsentRecord = {
  version: number;
  /** ISO-Zeitpunkt der Entscheidung – Nachweis nach Art. 7 Abs. 1 DSGVO */
  timestamp: string;
  services: Record<string, boolean>;
};

const listeners = new Set<() => void>();
const OPEN_EVENT = "landstreicher:consent-open";

// Fallback, falls localStorage blockiert ist (z. B. Safari privat, Cookies
// gesperrt): Die Entscheidung gilt dann wenigstens bis zum Neuladen.
let memoryRecord: string | null = null;
let cachedRaw: string | null | undefined;
let cachedRecord: ConsentRecord | null = null;

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? memoryRecord;
  } catch {
    return memoryRecord;
  }
}

function parse(raw: string | null): ConsentRecord | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as Partial<ConsentRecord>;
    if (typeof data.version !== "number" || typeof data.timestamp !== "string") return null;
    if (!data.services || typeof data.services !== "object") return null;
    return { version: data.version, timestamp: data.timestamp, services: data.services };
  } catch {
    return null;
  }
}

function getSnapshot(): ConsentRecord | null {
  const raw = readRaw();
  // Referenz stabil halten, solange sich der gespeicherte Wert nicht ändert.
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedRecord = parse(raw);
  }
  return cachedRecord;
}

// Auf dem Server ist nichts bekannt: undefined = "noch nicht gelesen".
const getServerSnapshot = () => undefined;

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Entscheidung in einem anderen Tab übernehmen.
  const onStorage = (e: StorageEvent) => {
    if (e.key === CONSENT_STORAGE_KEY || e.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Gültig = aktuelle Version und nicht älter als CONSENT_MAX_AGE_DAYS. */
export function isRecordValid(record: ConsentRecord | null | undefined): record is ConsentRecord {
  if (!record || record.version !== CONSENT_VERSION) return false;
  const age = Date.now() - new Date(record.timestamp).getTime();
  return Number.isFinite(age) && age >= 0 && age < CONSENT_MAX_AGE_DAYS * 86_400_000;
}

/**
 * Banner nötig ohne gültige Entscheidung oder wenn für einen Dienst noch keine
 * vorliegt. Erscheint bewusst auch, solange keine Dienste eingetragen sind.
 */
export function needsDecision(record: ConsentRecord | null | undefined) {
  if (record === undefined) return false;
  if (!isRecordValid(record)) return true;
  return consentServices.some((s) => !(s.id in record.services));
}

export function isGranted(record: ConsentRecord | null | undefined, serviceId: string) {
  return isRecordValid(record) && record.services[serviceId] === true;
}

/** Aktuelle Entscheidung (undefined während SSR und vor der Hydration). */
export function useConsentRecord() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Darf dieser Dienst laden? false, solange keine Einwilligung vorliegt. */
export function useConsent(serviceId: string) {
  return isGranted(useConsentRecord(), serviceId);
}

function cookieDomains() {
  // Cookies können auf der Host- oder einer Elterndomain liegen
  // (_ga z. B. auf .foodtruck-landstreicher.de) – alle Varianten löschen.
  const parts = window.location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < parts.length - 1; i++) domains.push(`; domain=.${parts.slice(i).join(".")}`);
  return domains;
}

function removeServiceData(service: ConsentService) {
  const existing = document.cookie
    .split(";")
    .map((c) => c.split("=")[0]?.trim())
    .filter(Boolean);
  const names = new Set<string>();
  for (const c of service.cookies) {
    if (c.prefix) existing.filter((n) => n.startsWith(c.name)).forEach((n) => names.add(n));
    else names.add(c.name);
  }
  const domains = cookieDomains();
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    }
  }
  for (const key of service.storageKeys ?? []) {
    try {
      window.localStorage.removeItem(key);
      window.sessionStorage.removeItem(key);
    } catch {
      // Speicher nicht verfügbar – dann gibt es auch nichts zu löschen.
    }
  }
}

/**
 * Entscheidung speichern. Nicht genannte Dienste gelten als abgelehnt.
 * Wurde eine bestehende Einwilligung widerrufen, werden die Cookies des
 * Dienstes gelöscht und die Seite neu geladen – bereits ausgeführte Skripte
 * lassen sich anders nicht zuverlässig stoppen.
 */
export function saveConsent(choices: Record<string, boolean>) {
  const previous = getSnapshot();
  const services: Record<string, boolean> = {};
  for (const s of consentServices) services[s.id] = choices[s.id] === true;

  const record: ConsentRecord = { version: CONSENT_VERSION, timestamp: new Date().toISOString(), services };
  const raw = JSON.stringify(record);
  memoryRecord = raw;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, raw);
  } catch {
    // memoryRecord übernimmt.
  }

  const revoked = consentServices.filter((s) => isGranted(previous, s.id) && !services[s.id]);
  revoked.forEach(removeServiceData);
  emit();
  if (revoked.length > 0) window.location.reload();
}

export function acceptAll() {
  saveConsent(Object.fromEntries(consentServices.map((s) => [s.id, true])));
}

export function rejectAll() {
  saveConsent({});
}

/** Einzelnen Dienst erlauben, z. B. aus einem Platzhalter heraus – übrige Auswahl bleibt. */
export function grantService(serviceId: string) {
  const current = getSnapshot();
  const base = isRecordValid(current) ? current.services : {};
  saveConsent({ ...base, [serviceId]: true });
}

/** Öffnet die Cookie-Einstellungen (z. B. aus Footer oder Datenschutzerklärung). */
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenConsentSettings(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
