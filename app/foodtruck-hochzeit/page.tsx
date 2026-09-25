import type { Metadata } from "next";
import Image from "next/image";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProcessRoute } from "@/components/ProcessRoute";
import { SectionHeading } from "@/components/SectionHeading";
import { Testimonials } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";
import { images } from "@/content/images";
import { weddingFaq } from "@/content/faq";
import { businessJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { bookingHrefAnlass } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Foodtruck für eure Hochzeit – Burger & BBQ vom Landstreicher",
  description:
    "Hochzeitscatering mit dem Foodtruck: Burger und BBQ frisch vor der Hochzeitsgesellschaft gegrillt – autark, eine normale Steckdose genügt. In Franken, der Oberpfalz und Thüringen.",
  path: "/foodtruck-hochzeit",
  image: "/images/hochzeitspaar-burger.jpg",
});

const crumbs = [
  { name: "Catering", path: "/foodtruck-catering" },
  { name: "Hochzeit", path: "/foodtruck-hochzeit" },
];

export default function HochzeitPage() {
  return (
    <>
      <PageHero
        breadcrumbs={crumbs}
        label="Hochzeitscatering"
        h1="Foodtruck auf der Hochzeit"
        display={["Ja, ihr", <span key="rot" className="text-red">dürft.</span>]}
        lead={
          <>
            Wer den schönsten Tag feiert, will bei den Gästen sein – nicht am Buffet anstehen. Der Landstreicher stellt
            sich dort hin, wo gefeiert wird, und grillt, bis der letzte Tanz ansteht.
          </>
        }
        image={images.hochzeitspaar}
        imagePosition="center 60%"
        note="so feiern wir mit"
      />

      {/* Warum Truck statt Hochzeitscatering-Klassiker */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                label="Warum der Truck?"
                title={<>Das Beste nach dem <span className="text-red">Ja</span></>}
                size="md"
                intro="Die meisten Hochzeitslocations rund um Lichtenfels, Bamberg und Coburg haben keine Küche, die ein Catering für 100 Leute stemmt. Unser Truck ist seine eigene."
              />
            </div>
            <div className="space-y-8 text-lg leading-relaxed lg:col-span-6 lg:col-start-7">
              <p>
                Er kommt mit eigener Ausstattung und arbeitet autark – alles Nötige ist an Bord, für die
                Dunstabzugshaube genügt eine normale Steckdose. Deshalb funktioniert das auch da, wo viele Hochzeiten
                wirklich stattfinden: in der Scheune, auf dem Gutshof, im Garten der Eltern, auf der Festwiese.
              </p>
              <p>
                Und anders als ein klassisches Buffet wird bei uns vor den Augen der Gäste gekocht. Das gibt dem Nachmittag
                einen Treffpunkt: Man riecht, wann die nächste Runde Patties auf der Platte landet.
              </p>
              <p className="text-base opacity-70">
                Menü und Ablauf stellen wir mit euch zusammen – vom Stehempfang mit Fingerfood bis zur Burger-Ausgabe
                nach der Standesamt-Trauung. Der Mindestumsatz richtet sich nach Einsatzort und Aufwand – im Angebot
                steht er verbindlich.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bild-Duo */}
      <section className="pb-16 md:pb-24">
        <div className="container-site grid gap-6 md:grid-cols-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xs md:col-span-7 md:aspect-[16/10]">
            <Image
              src={images.burgerHero.src}
              alt={images.burgerHero.alt}
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xs md:col-span-5 md:mt-16 md:aspect-[4/5]">
            <Image
              src={images.kochZweiBurger.src}
              alt={images.kochZweiBurger.alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section className="bg-paper py-16 md:py-28">
        <div className="container-site">
          <SectionHeading
            label="Der Ablauf"
            title="Von der Anfrage bis zum letzten Burger"
            size="md"
            className="mb-12"
          />
          <ProcessRoute />
          <p className="mt-12 max-w-2xl text-lg leading-relaxed">
            Besonders wichtig bei Hochzeiten: das Timing. Wir stimmen mit euch ab, wann der Truck fertig aufgebaut
            steht, wann die Ausgabe läuft und was passiert, wenn euer Zeitplan sich um zwei Stunden verschiebt.
          </p>
        </div>
      </section>

      {/* Stimmen */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <SectionHeading label="Gäste" title="Was gesagt wurde" size="md" className="mb-12" />
          <Testimonials />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-16 md:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading label="Fragen" title="Häufig bei Hochzeiten" size="md" />
          </div>
          <div className="lg:col-span-8">
            <FAQ items={weddingFaq} />
          </div>
        </div>
      </section>

      <CTASection
        title={["Eure", "Hochzeit."]}
        text="Schickt uns Datum und Location – wir sagen euch, ob der Termin frei ist und was bei euch auf der Karte stehen kann."
        cta="Hochzeit anfragen"
        href={bookingHrefAnlass("Hochzeit")}
        secondary={{ href: "/speisekarte", label: "Speisekarte ansehen" }}
      />

      <JsonLd
        data={[
          businessJsonLd(),
          serviceJsonLd({
            name: "Hochzeitscatering mit dem Foodtruck",
            description:
              "Foodtruck-Catering für Hochzeiten: Burger, BBQ aus dem Smoker und Streetfood, frisch vor Ort gegrillt. Autark – eine normale Steckdose genügt, auf Wiesen, Höfen und in Scheunen. In Franken, der Oberpfalz und Thüringen.",
            path: "/foodtruck-hochzeit",
          }),
          faqJsonLd(weddingFaq),
        ]}
      />
    </>
  );
}