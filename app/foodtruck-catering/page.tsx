import type { Metadata } from "next";
import Image from "next/image";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProcessRoute } from "@/components/ProcessRoute";
import { EventList } from "@/components/EventList";
import { SectionHeading } from "@/components/SectionHeading";
import { Testimonials } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";
import { images } from "@/content/images";
import { eventTypes } from "@/content/events";
import { generalFaq } from "@/content/faq";
import { businessJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Foodtruck-Catering für euer Event – frisch, autark, unkompliziert",
  description:
    "Foodtruck-Catering vom Landstreicher: Burger und BBQ frisch vor Ort zubereitet, autark – eine normale Steckdose genügt. Für Hochzeiten, Firmenfeiern, Feste in Franken, der Oberpfalz und Thüringen.",
  path: "/foodtruck-catering",
  image: "/images/event-lange-tafel-abend.jpg",
});

const crumbs = [{ name: "Catering", path: "/foodtruck-catering" }];

export default function CateringPage() {
  return (
    <>
      <PageHero
        breadcrumbs={crumbs}
        label="Foodtruck-Catering"
        h1="Foodtruck-Catering"
        display={["Wir rollen an.", <span key="rot" className="text-red">Ihr feiert.</span>]}
        lead={
          <>
            Der Landstreicher ist keine mobile Wurstbude. Er ist eine Küche auf Rädern – und auf eurem Event kocht er,
            wo eure Gäste stehen: frisch, laut und gut riechend. Ihr braucht dafür weder Strom noch Wasser.
          </>
        }
        image={images.eventTafel}
        note="kein Buffet von gestern"
      >
        <div className="max-w-xl space-y-4 text-base text-cream/70">
          <p>
            Mindestumsatz nach Einsatzort und Aufwand – verbindlich im Angebot · Menü individuell aus der Speisekarte kombinierbar
          </p>
        </div>
      </PageHero>

      {/* Was uns unterscheidet */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                label="Warum ein Truck?"
                title={<>Autark. Frisch. <span className="text-red">Laut.</span></>}
                size="md"
                intro="Ein Truck ändert, wie ein Event klingt: Es sammelt sich dort, wo gekocht wird. Und ihr spart euch die Diskussion über Catering-Container, Stromverteiler und Kaltstellbuffets."
              />
            </div>
            <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:content-start">
              {[
                {
                  title: "Autark",
                  text: "Der Truck braucht keinen festen Strom- oder Wasseranschluss – alles Nötige ist an Bord. Steht eine normale Steckdose, nutzen wir sie für die Dunstabzugshaube.",
                },
                {
                  title: "Frisch vor Ort",
                  text: "Patties auf die Platte, Pommes selbst geschnitten, Brisket aus dem Smoker. Nichts wird angeliefert und warmgehalten.",
                },
                {
                  title: "Menü nach euch",
                  text: "Burger für alle, BBQ für die große Runde, vegetarische Alternative inklusive. Wir stellen die Karte zusammen, nicht der Katalog.",
                },
                {
                  title: "Ihr feiert mit",
                  text: "Kein Küchendienst, kein Abwasch. Ihr steht bei euren Gästen, wir stehen am Grill.",
                },
              ].map((f) => (
                <li key={f.title} className="border-t-2 border-red pt-5">
                  <h3 className="font-display text-2xl uppercase">{f.title}</h3>
                  <p className="mt-2.5 leading-relaxed opacity-80">{f.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Foto-Zwischenstück */}
      <section className="relative">
        <div className="relative h-[55vh] min-h-[26rem] overflow-hidden md:h-[70vh]">
          <Image
            src={images.platteAction.src}
            alt={images.platteAction.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-linear-to-r from-ink via-ink/70 to-ink/15" />
          <div className="container-site absolute inset-0 flex items-center">
            <p className="on-dark max-w-xl font-display text-[clamp(2.2rem,5vw,4.5rem)] uppercase leading-[0.95] text-cream">
              Ein Burger ist kein kompliziertes Gericht. <span className="text-red">Er ist nur ein ehrlicher.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Anlässe */}
      <section id="anlaesse" className="scroll-mt-24 py-16 md:py-24">
        <div className="container-site">
          <SectionHeading
            label="Anlässe"
            title={<>Wofür <span className="text-red">ihr</span> uns bucht</>}
            size="md"
            intro="Von der Hochzeit auf dem Gutshof bis zum Stadtfest mitten in der Fußgängerzone. Für die zwei wichtigsten Anlässe gibt es eigene Seiten, für den Rest reicht eine Anfrage."
          />
          <div className="mt-12">
            <EventList items={eventTypes} />
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section className="bg-paper py-16 md:py-28">
        <div className="container-site">
          <ProcessRoute />
        </div>
      </section>

      {/* Stimmen */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <SectionHeading label="Gäste" title="Was gesagt wurde" size="md" className="mb-12" />
          <Testimonials />
          <p className="mt-10 text-sm opacity-60">
            Zitate von der alten Buchungsseite. {/* TODO: Betreiber bestätigen, von welchen Events die Zitate stammen. */}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-16 md:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading label="Fragen" title="Gut zu wissen" size="md" />
          </div>
          <div className="lg:col-span-8">
            <FAQ items={generalFaq} />
          </div>
        </div>
      </section>

      <CTASection />

      <JsonLd
        data={[
          businessJsonLd(),
          serviceJsonLd({
            name: "Foodtruck-Catering",
            description:
              "Foodtruck-Catering für Hochzeiten, Firmenfeiern, Geburtstage und Events: Burger, BBQ aus dem Smoker und Streetfood, frisch vor Ort zubereitet. Autark – eine normale Steckdose genügt.",
            path: "/foodtruck-catering",
          }),
          faqJsonLd(generalFaq),
        ]}
      />
    </>
  );
}