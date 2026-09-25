import Link from "next/link";
import { serviceAreas, type Region } from "@/content/locations";

/**
 * Schematische Karte: Städte an ihrer echten Lage (einfache Projektion aus
 * Längen-/Breitengrad), keine erfundenen Grenzen. Lichtenfels als Startpunkt,
 * Städte mit eigener Seite rot und verlinkt.
 *
 * Die SVG ist für Screenreader ausgeblendet – dieselben Informationen stehen
 * als Liste im HTML darunter.
 */

const S = 500;
const LON0 = 9.55;
const LAT0 = 50.82;
const COS = Math.cos((50 * Math.PI) / 180);
const project = (lat: number, lon: number) => ({ x: (lon - LON0) * COS * S + 10, y: (LAT0 - lat) * S + 10 });

const leftLabels = new Set(["Fürth", "Erlangen", "Würzburg", "Weiden i. d. OPf.", "Regensburg", "Ilmenau"]);
const shortNames: Record<string, string> = {
  "Rothenburg ob der Tauber": "Rothenburg o. d. T.",
};

const regionLabels: { name: Region; lat: number; lon: number }[] = [
  { name: "Thüringen", lat: 50.74, lon: 9.62 },
  { name: "Franken", lat: 49.12, lon: 9.62 },
  { name: "Oberpfalz", lat: 48.98, lon: 10.95 },
];

export function RegionMap({ tone = "light", highlight }: { tone?: "light" | "dark"; highlight?: string }) {
  const home = serviceAreas.find((a) => a.home)!;
  const h = project(home.lat, home.lon);
  const ink = tone === "dark" ? "var(--color-cream)" : "var(--color-ink)";

  return (
    <svg viewBox="0 0 900 1000" className="h-auto w-full" aria-hidden focusable="false">
      <defs>
        <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0v40" fill="none" stroke={ink} strokeOpacity="0.06" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="900" height="1000" fill="url(#map-grid)" />

      {regionLabels.map((r) => {
        const p = project(r.lat, r.lon);
        return (
          <text
            key={r.name}
            x={p.x}
            y={p.y}
            fill={ink}
            fillOpacity="0.13"
            style={{ font: "800 64px var(--font-display)", fontVariationSettings: '"wdth" 75', textTransform: "uppercase", letterSpacing: "-0.01em" }}
          >
            {r.name.toUpperCase()}
          </text>
        );
      })}

      {/* Routen von Lichtenfels zu den Städten mit eigener Seite */}
      {serviceAreas
        .filter((a) => a.slug)
        .map((a) => {
          const p = project(a.lat, a.lon);
          const active = !highlight || highlight === a.name;
          return (
            <path
              key={`route-${a.name}`}
              d={`M${h.x} ${h.y} Q ${(h.x + p.x) / 2 + 30} ${(h.y + p.y) / 2 - 20} ${p.x} ${p.y}`}
              fill="none"
              stroke="var(--color-red)"
              strokeWidth={active ? 2.5 : 1.5}
              strokeOpacity={active ? 0.9 : 0.35}
              strokeDasharray="6 7"
              strokeLinecap="round"
            />
          );
        })}

      {serviceAreas.map((a) => {
        const p = project(a.lat, a.lon);
        const left = leftLabels.has(a.name);
        const name = shortNames[a.name] ?? a.name;
        const isHighlight = highlight === a.name;
        const label = (
          <g>
            {a.home ? (
              <>
                <circle cx={p.x} cy={p.y} r="16" fill="var(--color-red)" fillOpacity="0.18" />
                <circle cx={p.x} cy={p.y} r="8" fill="var(--color-red)" />
              </>
            ) : (
              <circle
                cx={p.x}
                cy={p.y}
                r={a.slug ? 7 : 4.5}
                fill={a.slug ? "var(--color-red)" : ink}
                fillOpacity={a.slug ? 1 : 0.65}
                stroke={isHighlight ? ink : "none"}
                strokeWidth="2"
              />
            )}
            <text
              x={p.x + (left ? -14 : 14)}
              y={p.y + 7}
              textAnchor={left ? "end" : "start"}
              fill={a.slug || a.home ? ink : ink}
              fillOpacity={a.slug || a.home ? 1 : 0.6}
              style={{
                font: `${a.slug || a.home ? 700 : 500} ${a.home ? 26 : 21}px var(--font-sans)`,
                textDecoration: a.slug ? "underline" : undefined,
                textDecorationColor: "var(--color-red)",
              }}
            >
              {name}
            </text>
            {a.home && (
              <text x={p.x - 16} y={p.y + 40} textAnchor="end" fill="var(--color-red)" style={{ font: "400 28px var(--font-hand)" }}>
                hier starten wir
              </text>
            )}
          </g>
        );
        return a.slug ? (
          <Link key={a.name} href={`/${a.slug}`} tabIndex={-1} className="transition-opacity hover:opacity-70">
            {label}
          </Link>
        ) : (
          <g key={a.name}>{label}</g>
        );
      })}
    </svg>
  );
}
