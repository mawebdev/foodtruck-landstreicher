import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { GalleryGrid } from "@/components/GalleryGrid";
import { CTASection } from "@/components/CTASection";
import { galleryOrder, images } from "@/content/images";
import { businessJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Galerie – Truck, Food & Events in Bildern",
  description:
    "Bilder vom Landstreicher: der schwarze Truck mit Burger-Graffiti, frische Burger, Patties auf der Grillplatte und Events am Abend.",
  path: "/galerie",
  image: "/images/truck-landstreicher-front.jpg",
});

const crumbs = [{ name: "Galerie", path: "/galerie" }];

export default function GaleriePage() {
  const items = galleryOrder.map((key) => images[key]);

  return (
    <>
      <PageHero
        breadcrumbs={crumbs}
        label="Galerie"
        h1="Bilder vom Truck"
        display={["Zum", "Anschauen.", "Zum", <span key="rot" className="text-red">Hungrigwerden.</span>]}
        lead={
          <>
            Der Truck, die Küche und die Events, bei denen wir stehen. Am besten groß anschauen: Ein Klick öffnet das
            Bild.
          </>
        }
      />

      <section className="py-16 md:py-24">
        <div className="container-site">
          <GalleryGrid items={items} />
        </div>
      </section>

      <CTASection
        title={["So sieht's", "live aus."]}
        text="Bilder zeigen, wie es aussieht. Anfragen, wie es schmeckt."
        cta="Foodtruck anfragen"
        secondary={{ href: "/speisekarte", label: "Speisekarte ansehen" }}
      />

      <JsonLd data={businessJsonLd()} />
    </>
  );
}