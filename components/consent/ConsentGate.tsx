"use client";

import Link from "next/link";
import Script, { type ScriptProps } from "next/script";
import type { ReactNode } from "react";
import { consentServices } from "@/content/consent";
import { grantService, openConsentSettings, useConsent } from "@/lib/consent";

/**
 * Lädt ein Drittanbieter-Skript nur mit Einwilligung für den Dienst.
 * Ohne Einwilligung wird das <script> gar nicht erst in die Seite geschrieben.
 */
export function ConsentScript({ service, ...props }: ScriptProps & { service: string }) {
  return useConsent(service) ? <Script {...props} /> : null;
}

/**
 * Hülle für eingebettete Inhalte (Karte, Video, Social-Post): Der Inhalt wird
 * erst mit Einwilligung gerendert, bis dahin steht ein Platzhalter da, über
 * den man direkt zustimmen kann.
 */
export function ConsentGate({
  service,
  children,
  className = "",
}: {
  service: string;
  children: ReactNode;
  className?: string;
}) {
  const granted = useConsent(service);
  const info = consentServices.find((s) => s.id === service);

  if (granted) return <>{children}</>;

  return (
    <div
      className={`grain flex flex-col items-start justify-center gap-4 rounded-xs border border-ink/15 bg-paper p-6 sm:p-8 ${className}`}
    >
      <p className="label flex items-center gap-2.5 text-muted">
        <span aria-hidden className="inline-block size-1.5 rounded-full bg-red" />
        Externer Inhalt
      </p>
      <p className="max-w-prose leading-relaxed text-ink/80">
        Hier steht ein Inhalt von {info?.name ?? "einem Drittanbieter"}. Beim Laden werden Daten (z. B. eure
        IP-Adresse) an {info?.provider.split(",")[0] ?? "den Anbieter"} übertragen
        {info?.thirdCountry ? `, auch in ein Drittland (${info.thirdCountry})` : ""}. Mehr dazu in der{" "}
        <Link href="/datenschutz" className="prose-link">
          Datenschutzerklärung
        </Link>
        .
      </p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="button"
          onClick={() => grantService(service)}
          disabled={!info}
          className="inline-flex min-h-12 items-center rounded-xs bg-red px-6 py-3 text-[0.95rem] font-bold text-cream transition-colors hover:bg-red-dark disabled:opacity-50"
        >
          Inhalt laden
        </button>
        <button type="button" onClick={openConsentSettings} className="link-underline py-1 text-sm font-semibold">
          Cookie-Einstellungen
        </button>
      </div>
    </div>
  );
}
