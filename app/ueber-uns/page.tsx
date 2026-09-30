import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Testimonials } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";
import { Label } from "@/components/Label";
import { images } from "@/content/images";
import { site } from "@/lib/site";
import { businessJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Über den Landstreicher – Foodtruck & Streetfood aus Lichtenfels",
  description:
    "Wer hinter dem Landstreicher steckt: ein Foodtruck-Betrieb aus Lichtenfels mit zwei Trucks, einem Offset-Smoker und einer Karte aus Burgern, American BBQ und Streetfood. Der Truck selbst: ein echter Amerikaner, aus den USA importiert und zur mobilen Küche umgebaut.",
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
            Ein Foodtruck-Betrieb aus Lichtenfels – mit zwei Trucks, einem Offset-Smoker und einer Karte, die aus
            echtem Handwerk besteht statt aus Katalogware. Und mit einem echten Amerikaner als Truck: aus den USA
            importiert und von uns selbst zur mobilen Küche umgebaut.
          </>
        }
        image={images.teamImTruck}
        wideImage
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
                  Angefangen hat alles als kleines Karibisches Eck. Über die Jahre ist daraus mehr geworden: Zum
                  Karibischen Eck kam der Landstreicher dazu – ein Foodtruck mit eigenem Stil und einer ziemlich
                  langen Liste hungriger Gäste.
                </p>
                <p>
                  Unser Truck hat dabei seine ganz eigene Geschichte: {site.truckAge} Jahre auf dem Buckel, aus den USA
                  nach Deutschland geholt und von uns zur mobilen Küche umgebaut. Ein echter Amerikaner mit Charakter
                  und einem Auftritt, den man nicht verwechselt.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xs">
                <Image
                  src={images.karibischesEck.src}
                  alt={images.karibischesEck.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="hand mt-2 rotate-[-2deg] text-2xl leading-none opacity-70">damit hat alles angefangen</p>
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
              Zwei Trucks, <span className="text-red">ein Smoker</span>
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-cream/70">
              Der Landstreicher ist einer davon – der schwarze Truck mit dem Burger-Graffiti. Und weil es mehrere
              sind, geht auch mal was kurzfristig.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            <article>
              <div className="relative aspect-[16/10] overflow-hidden rounded-xs">
                <Image src={images.truckSeiteV2.src} alt={images.truckSeiteV2.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
              </div>
              <h3 className="font-display mt-6 text-4xl uppercase">Der Landstreicher</h3>
              <p className="mt-3 max-w-lg leading-relaxed text-cream/80">
                Der schwarze Truck mit dem Burger-Graffiti. Hier kommen Homemade Burger, hausgemachte
                Pommes und echtes American BBQ aus dem Offset-Smoker her.
              </p>
            </article>
            <article>
              <div className="relative aspect-[16/10] overflow-hidden rounded-xs">
                <Image src={images.offsetSmoker.src} alt={images.offsetSmoker.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
              </div>
              <h3 className="font-display mt-6 text-4xl uppercase">Der Offset-Smoker</h3>
              <p className="mt-3 max-w-lg leading-relaxed text-cream/80">
                Unser Smoker auf Anhänger, befeuert mit Holz. Darin garen Brisket, Pulled Pork, Pulled Beef und
                Beef Cheeks langsam im Rauch – echtes American BBQ, direkt bei euch vor Ort.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Stimmen */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <SectionHeading label="Stimmen" title="Das sagen unsere Gäste" size="md" className="mb-12" />
          <Testimonials />
          {/* TODO: Betreiber bestätigen, von welchen Events die Zitate stammen. */}
        </div>
      </section>

      <CTASection
        title={["Jetzt", "kennenlernen."]}
        text="Ob Anfrage oder einfach eine Frage per Mail: Wir antworten persönlich."
        cta="Anfrage starten"
        secondary={{ href: "/galerie", label: "Galerie ansehen" }}
        tone="paper"
      />

      <JsonLd data={businessJsonLd()} />
    </>
  );
}