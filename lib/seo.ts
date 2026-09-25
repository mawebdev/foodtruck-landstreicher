import type { Metadata } from "next";
import { absoluteUrl, site } from "./site";
import { serviceAreas } from "@/content/locations";
import type { Faq } from "@/content/faq";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  /** Titel ohne Template-Suffix ausgeben */
  absoluteTitle?: boolean;
  noindex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  image = "/images/burger-heumilchkaese-rauke.jpg",
  absoluteTitle = true,
  noindex,
}: PageMetaInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url: path,
      title,
      description,
      images: [{ url: image, width: 1920, height: 1440, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

/* ------------------------------------------------------------------
   JSON-LD
   Nur echte Angaben. Keine Ratings, kein Review-Markup.
   ------------------------------------------------------------------ */

export const businessId = absoluteUrl("/#business");

export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "@id": businessId,
    name: site.name,
    alternateName: "Foodtruck Der Landstreicher",
    description:
      "Foodtruck und Streetfood-Catering aus Lichtenfels: Burger, BBQ aus dem Smoker und Streetfood für Hochzeiten, Firmenfeiern und Events in Franken, der Oberpfalz und Thüringen.",
    url: site.url,
    logo: absoluteUrl("/brand/logo-landstreicher.jpg"),
    image: [absoluteUrl("/images/truck-landstreicher-seite.jpg"), absoluteUrl("/images/burger-heumilchkaese-rauke.jpg")],
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lon },
    servesCuisine: ["Burger", "Barbecue", "Streetfood"],
    hasMenu: absoluteUrl("/speisekarte"),
    areaServed: [
      ...site.regions.map((name) => ({ "@type": "AdministrativeArea", name })),
      ...serviceAreas.map((a) => ({ "@type": "City", name: a.name })),
    ],
    // Öffnungszeiten gibt es als mobiler Caterer nicht – bewusst weggelassen.
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
  areaServed,
}: {
  name: string;
  description: string;
  path: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType: "Foodtruck-Catering",
    provider: { "@id": businessId, "@type": "FoodEstablishment", name: site.name },
    areaServed: (areaServed ?? [...site.regions]).map((n) => ({ "@type": "Place", name: n })),
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Startseite", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
