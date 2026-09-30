import { RegionMap } from "@/components/RegionMap";
import { distanceFromHome, serviceAreas } from "@/content/locations";

/**
 * Abstrakte Stadtkarte statt Stadtfoto: Lage auf der Regionskarte plus
 * Eckdaten. Alles kommt aus den Geodaten in content/locations.ts – keine
 * Wahrzeichen-Illustrationen, keine Wappen, keine fremden Fotos.
 */
export function CityCard({ city }: { city: string }) {
  const area = serviceAreas.find((a) => a.name === city);
  if (!area) return null;
  const km = distanceFromHome(city);

  return (
    <figure className="grain border-2 border-ink bg-paper">
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink px-6 py-4">
        <span className="font-display text-3xl uppercase">{city}</span>
        <span className="label text-red">{area.region}</span>
      </div>
      <div className="px-4 pt-4">
        <RegionMap highlight={city} />
      </div>
      <figcaption className="border-t-2 border-ink px-6 py-4 text-sm">
        <p className="label mb-1 opacity-60">Entfernung</p>
        <p className="font-semibold">{km ? `ca. ${km} km Luftlinie von Lichtenfels` : "–"}</p>
      </figcaption>
    </figure>
  );
}
