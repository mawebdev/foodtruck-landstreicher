import type { MetadataRoute } from "next";
import { locationPages } from "@/content/locations";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entry = (path: string, priority: number) => ({
    url: new URL(path, site.url).toString(),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  });

  return [
    entry("/", 1),
    entry("/speisekarte", 0.9),
    entry("/foodtruck-catering", 0.9),
    entry("/foodtruck-hochzeit", 0.8),
    entry("/foodtruck-firmenfeier", 0.8),
    entry("/events", 0.8),
    entry("/einsatzgebiete", 0.8),
    ...locationPages.map((p) => entry(`/${p.slug}`, 0.7)),
    entry("/ueber-uns", 0.6),
    entry("/galerie", 0.6),
    entry("/foodtruck-buchen", 0.9),
    entry("/datenschutz", 0.3),
    entry("/impressum", 0.3),
  ];
}