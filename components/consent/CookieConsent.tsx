"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import {
  CONSENT_MAX_AGE_DAYS,
  consentCategories,
  consentServices,
  hasOptionalServices,
  type ConsentCategoryId,
  type ConsentService,
} from "@/content/consent";
import {
  acceptAll,
  isGranted,
  needsDecision,
  onOpenConsentSettings,
  rejectAll,
  saveConsent,
  useConsentRecord,
} from "@/lib/consent";

/*
 * Banner + Einstellungsdialog. Regeln, die hier bewusst eingehalten werden:
 * - „Alle akzeptieren“ und „Alle ablehnen“ sind gleich groß und gleich auffällig
 *   (kein Nudging, Orientierungshilfe der DSK).
 * - Nichts ist vorausgewählt; ohne Entscheidung lädt kein Dienst.
 * - Der Banner blockiert die Seite nicht – Impressum und Datenschutz bleiben lesbar.
 * - Widerruf jederzeit über „Cookie-Einstellungen“ im Footer, genauso einfach wie die Zustimmung.
 */

const choiceButton =
  "inline-flex min-h-12 flex-1 items-center justify-center rounded-xs px-5 py-3 text-[0.95rem] font-bold tracking-tight transition-[background-color,color,border-color,transform] duration-300 ease-out-soft active:translate-y-px";

const categoryOrder = Object.keys(consentCategories) as ConsentCategoryId[];

// Vorschau per ?cookie-vorschau: zeigt den Banner auch ohne eingetragene
// Dienste, speichert nichts und lädt nichts – nur zum Ansehen des Designs.
const noop = () => () => {};
const isPreviewUrl = () => new URLSearchParams(window.location.search).has("cookie-vorschau");

export function CookieConsent() {
  const record = useConsentRecord();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [previewDismissed, setPreviewDismissed] = useState(false);
  const preview = useSyncExternalStore(noop, isPreviewUrl, () => false) && !previewDismissed;
  const showBanner = (preview || needsDecision(record)) && !settingsOpen;

  useEffect(() => onOpenConsentSettings(() => setSettingsOpen(true)), []);

  return (
    <>
      {showBanner && (
        <ConsentBanner
          onSettings={() => setSettingsOpen(true)}
          onPreviewClose={preview ? () => setPreviewDismissed(true) : undefined}
        />
      )}
      {settingsOpen && <ConsentSettings onClose={() => setSettingsOpen(false)} />}
    </>
  );
}

function ConsentBanner({ onSettings, onPreviewClose }: { onSettings: () => void; onPreviewClose?: () => void }) {
  const titleId = useId();
  const onAccept = onPreviewClose ?? acceptAll;
  const onReject = onPreviewClose ?? rejectAll;
  return (
    <section
      aria-labelledby={titleId}
      className="consent-in on-dark grain grain-light fixed inset-x-3 bottom-3 z-[60] max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-xs border border-cream/15 bg-ink p-6 text-cream shadow-print sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-[28rem] sm:p-8"
    >
      <p className="label flex items-center gap-2.5 text-cream/60">
        <span aria-hidden className="inline-block size-1.5 rounded-full bg-red" />
        Cookies & Datenschutz
        {onPreviewClose && <span className="rounded-xs bg-red px-2 py-1 text-cream">Vorschau</span>}
      </p>
      <h2 id={titleId} className="font-display mt-4 text-[2.4rem] uppercase sm:text-5xl">
        Erst fragen, <span className="text-red">dann laden.</span>
      </h2>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-cream/80">
        {hasOptionalServices
          ? `Wir möchten optionale Dienste nutzen (${serviceNames()}).`
          : "Unsere Website kommt ohne Tracking und ohne Werbe-Cookies aus."}{" "}
        Optionale Dienste laden nur mit eurer Zustimmung, die ihr jederzeit widerrufen könnt. Mehr in der{" "}
        <Link href="/datenschutz" className="prose-link">
          Datenschutzerklärung
        </Link>
        .
      </p>
      <div className="mt-6 flex flex-col gap-3 xs:flex-row">
        <button type="button" onClick={onAccept} className={`${choiceButton} bg-cream text-ink hover:bg-paper`}>
          Alle akzeptieren
        </button>
        <button type="button" onClick={onReject} className={`${choiceButton} bg-cream text-ink hover:bg-paper`}>
          Alle ablehnen
        </button>
      </div>
      <button
        type="button"
        onClick={onSettings}
        className="link-underline mt-4 inline-block py-1 text-sm font-semibold text-cream/80 hover:text-cream"
      >
        Einstellungen anpassen
      </button>
    </section>
  );
}

function serviceNames() {
  return consentServices.map((s) => s.name).join(", ");
}

function ConsentSettings({ onClose }: { onClose: () => void }) {
  const record = useConsentRecord();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  // Entwurf: erst „Auswahl speichern“ übernimmt die Änderungen.
  const [draft, setDraft] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(consentServices.map((s) => [s.id, isGranted(record, s.id)])),
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    // Natives Modal: Fokusfalle, Escape und Hintergrund-Inertheit vom Browser.
    if (!dialog.open) dialog.showModal();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const finish = (action: () => void) => {
    action();
    dialogRef.current?.close();
  };

  const grouped = categoryOrder
    .map((id) => ({ id, ...consentCategories[id], services: consentServices.filter((s) => s.category === id) }))
    .filter((c) => c.services.length > 0);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        // Klick auf den Hintergrund schließt (ohne zu speichern).
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
      className="m-auto max-h-[min(90dvh,48rem)] w-[calc(100%-1.5rem)] max-w-2xl overflow-hidden rounded-xs border-0 bg-cream p-0 text-ink shadow-print backdrop:bg-ink/75"
    >
      <div className="flex max-h-[min(90dvh,48rem)] flex-col">
        <div className="flex items-start justify-between gap-6 border-b border-ink/10 px-6 pb-5 pt-6 sm:px-8 sm:pt-8">
          <div>
            <p className="label flex items-center gap-2.5 text-muted">
              <span aria-hidden className="inline-block size-1.5 rounded-full bg-red" />
              Datenschutz
            </p>
            <h2 id={titleId} className="font-display mt-3 text-4xl uppercase sm:text-5xl">
              Cookie-Einstellungen
            </h2>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-xs border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-cream"
          >
            <span className="sr-only">Schließen</span>
            <svg aria-hidden viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2 2l12 12M14 2L2 14" />
            </svg>
          </button>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6 sm:px-8">
          <p className="leading-relaxed text-ink/80">
            {hasOptionalServices
              ? "Hier entscheidet ihr, welche optionalen Dienste laden dürfen. Ohne eure Zustimmung bleibt alles aus. Eine erteilte Einwilligung könnt ihr hier jederzeit wieder zurücknehmen."
              : "Aktuell setzt diese Website keine Cookies und bindet keine Dienste von Drittanbietern ein. Es gibt also nichts, dem ihr zustimmen müsstet. Sobald sich das ändert, fragen wir vorher nach."}
          </p>

          <section className="border-t border-ink/10 pt-6">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h3 className="font-display text-2xl uppercase">Notwendig</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  {`Speichert nur eure Entscheidung in diesem Browser, damit wir nicht bei jedem Besuch erneut fragen (localStorage, ${Math.round(CONSENT_MAX_AGE_DAYS / 30.4)} Monate). Kein Cookie, kein Tracking.`}
                </p>
              </div>
              <span className="label shrink-0 pt-2 text-muted">Immer aktiv</span>
            </div>
          </section>

          {grouped.map((category) => (
            <section key={category.id} className="border-t border-ink/10 pt-6">
              <h3 className="font-display text-2xl uppercase">{category.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{category.description}</p>
              <ul className="mt-4 space-y-3">
                {category.services.map((service) => (
                  <ServiceRow
                    key={service.id}
                    service={service}
                    checked={draft[service.id] === true}
                    onChange={(v) => setDraft((d) => ({ ...d, [service.id]: v }))}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-ink/10 bg-paper/60 px-6 py-5 sm:flex-row sm:px-8">
          <button
            type="button"
            onClick={() => finish(() => saveConsent(draft))}
            className={`${choiceButton} bg-red text-cream hover:bg-red-dark`}
          >
            Auswahl speichern
          </button>
          <button
            type="button"
            onClick={() => finish(acceptAll)}
            className={`${choiceButton} border border-ink/80 hover:bg-ink hover:text-cream`}
          >
            Alle akzeptieren
          </button>
          <button
            type="button"
            onClick={() => finish(rejectAll)}
            className={`${choiceButton} border border-ink/80 hover:bg-ink hover:text-cream`}
          >
            Alle ablehnen
          </button>
        </div>
      </div>
    </dialog>
  );
}

function ServiceRow({
  service,
  checked,
  onChange,
}: {
  service: ConsentService;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  const labelId = useId();
  return (
    <li className="rounded-xs border border-ink/15 bg-cream">
      <div className="flex items-center justify-between gap-4 p-4">
        <div id={labelId}>
          <p className="font-bold">{service.name}</p>
          <p className="text-sm text-ink/60">{service.provider.split(",")[0]}</p>
        </div>
        <Switch labelledBy={labelId} checked={checked} onChange={onChange} />
      </div>
      <details className="group border-t border-ink/10">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-ink/70 hover:text-ink [&::-webkit-details-marker]:hidden">
          Details
          <span aria-hidden className="text-red transition-transform duration-300 group-open:rotate-45">
            +
          </span>
        </summary>
        <dl className="grid gap-x-4 gap-y-2 px-4 pb-4 text-sm sm:grid-cols-[8rem_1fr]">
          <dt className="font-semibold">Anbieter</dt>
          <dd className="text-ink/75">{service.provider}</dd>
          <dt className="font-semibold">Zweck</dt>
          <dd className="text-ink/75">{service.purpose}</dd>
          {service.cookies.length > 0 && (
            <>
              <dt className="font-semibold">Cookies</dt>
              <dd className="text-ink/75">
                {service.cookies.map((c) => `${c.name}${c.prefix ? "*" : ""} (${c.duration})`).join(", ")}
              </dd>
            </>
          )}
          {service.thirdCountry && (
            <>
              <dt className="font-semibold">Drittland</dt>
              <dd className="text-ink/75">{service.thirdCountry}</dd>
            </>
          )}
          <dt className="font-semibold">Datenschutz</dt>
          <dd>
            <a href={service.privacyPolicyUrl} target="_blank" rel="noopener noreferrer" className="prose-link break-all">
              {service.privacyPolicyUrl}
            </a>
          </dd>
        </dl>
      </details>
    </li>
  );
}

function Switch({
  checked,
  onChange,
  labelledBy,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  labelledBy: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelledBy}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full border transition-colors duration-300 ${
        checked ? "border-red bg-red" : "border-ink/30 bg-paper"
      }`}
    >
      <span
        aria-hidden
        className={`inline-block size-6 rounded-full shadow-sm transition-transform duration-300 ease-out-soft ${
          checked ? "translate-x-7 bg-cream" : "translate-x-0.5 bg-ink"
        }`}
      />
    </button>
  );
}
