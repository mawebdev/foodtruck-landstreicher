import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Testimonials } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";
import { ButtonLink } from "@/components/Button";
import { Label } from "@/components/Label";
import { images } from "@/content/images";
import { site } from "@/lib/site";
import { businessJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Über den Landstreicher – Foodtruck & Streetfood aus Lichtenfels",
  description:
    "Wer hinter dem Landstreicher steckt: ein Foodtruck-Betrieb aus Lichtenfels mit drei Trucks und einer Karte aus Burgern, BBQ und Streetfood. Der Truck selbst wurde übernommen.",
  path: "/ueber-uns",
  image: "/images/koch-mit-zwei-burgern.jpg",
});

const crumbs = [{ name: "Über uns", path: "/ueber-uns" }];

export default function UeberUnsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={crumbs}
        label="Über uns"
        h1="Wer hinter dem Truck steht"
        display={["Der", <span key="rot" className="text-red">Landstreicher.</span>]}
        lead={
          <>
            Ein Foodtruck-Betrieb aus Lichtenfels – mit drei Trucks und einer Karte, die aus
            echtem Handwerk besteht statt aus Katalogware. Und mit einem Truck, der schon deutlich
            länger unterwegs ist, als es das heutige Team vermuten lässt.
          </>
        }
        image={images.kochZweiBurger}
        imagePosition="center 30%"
        note="das hier sind wir"
      />

      {/* Geschichte */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading label="Die Geschichte" title={<>Nicht gestern <span className="text-red">entstanden.</span></>} size="md" />
              <div className="mt-7 space-y-5 text-lg leading-relaxed">
                <p>
                  Was einmal als klassische Imbissidee begann, ist über die Jahre zu einem mobilen Foodtruck mit eigener
                  Küche, eigenem Stil und einer ziemlich langen Liste hungriger Gäste geworden.
                </p>
                <p>
                  Der Truck ist älter als das heutige Team hinter dem Fenster: Er wurde übernommen, nicht neu
                  erfunden. {site.yearsTagline} – und im Kern geht es immer um dasselbe: gutes Essen, frisch
                  gemacht, und Leute, die zufrieden nach Hause gehen. Was sich geändert hat, ist der Rahmen – vom
                  festen Standort zum Truck, der zu Hochzeiten, Firmenfeiern und Festen in der Region rollt.
                </p>
                <p>
                  Unter heutiger Führung steht der Betrieb seit {site.foundedYear}. Aus einem Truck sind drei geworden –
                  genug, um auch kurzfristig noch einzuspringen. Offiziell firmieren wir als {site.legalName}. Hinter
                  allem stehen Menschen, die im Truck stehen und Burger belegen, bis die letzte Runde bedient ist.
                </p>
                {/* TODO: Betreiber ergänzen lassen – wie alles begonnen hat,
                    wer im Team ist (Namen/Rollen) und ob das Gründungs-Foto existiert. */}
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xs">
                <Image
                  src={images.kochDreiBurger.src}
                  alt={images.kochDreiBurger.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="hand mt-4 rotate-[-2deg] text-2xl opacity-70">drei Burger, ein Griff, kein Zögern</p>
            </div>
          </div>
        </div>
      </section>

      {/* Die Flotte */}
      <section className="on-dark grain grain-light bg-ink py-20 text-cream md:py-28">
        <div className="container-site">
          <div className="mb-14">
            <Label className="mb-6 text-cream/70">Die Flotte</Label>
            <h2 className="font-display text-[clamp(2.8rem,8vw,6.5rem)] uppercase">
              Drei Trucks, <span className="text-red">eine Küche</span>
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-cream/70">
              Der Landstreicher ist einer davon – der schwarze Truck mit dem Burger-Graffiti. Und weil es mehrere
              sind, geht auch mal was kurzfristig.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            <article>
              <div className="relative aspect-[16/10] overflow-hidden rounded-xs">
                <Image src={images.truckSeite.src} alt={images.truckSeite.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
              </div>
              <h3 className="font-display mt-6 text-4xl uppercase">Der Landstreicher</h3>
              <p className="mt-3 max-w-lg leading-relaxed text-cream/80">
                Der schwarze Truck mit dem Burger-Graffiti. Hier kommen Burger mit 180 g Rindfleisch, hausgemachte
                Pommes und das BBQ aus dem Smoker her.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Stimmen */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <SectionHeading label="Gäste" title="Was gesagt wurde" size="md" className="mb-12" />
          <Testimonials />
          {/* TODO: Betreiber bestätigen, von welchen Events die Zitate stammen. */}
        </div>
      </section>

      {/* CTA im Textstil */}
      <section className="bg-paper py-16 md:py-24">
        <div className="container-site max-w-3xl">
          <SectionHeading
            label="Lernen wir uns kennen"
            title="Schaut hinter die Platte"
            size="md"
            intro="Am besten lernt man uns kennen, wenn es riecht. Fragt den Truck für euer Event an – oder schaut vorher auf der Speisekarte, was euch erwartet."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/foodtruck-buchen#anfrage">Foodtruck anfragen</ButtonLink>
            <ButtonLink href="/speisekarte" variant="outline">
              Speisekarte ansehen
            </ButtonLink>
          </div>
        </div>
      </section>

      <CTASection
        title={["Jetzt", "kennenlernen."]}
        text="Ob Anfrage oder einfach eine Frage per Mail: Wir antworten persönlich."
        cta="Anfrage starten"
        secondary={{ href: "/galerie", label: "Galerie ansehen" }}
      />

      <JsonLd data={businessJsonLd()} />
    </>
  );
}