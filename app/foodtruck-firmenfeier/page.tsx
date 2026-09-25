import type { Metadata } from "next";
import Image from "next/image";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProcessRoute } from "@/components/ProcessRoute";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { images } from "@/content/images";
import { companyFaq } from "@/content/faq";
import { site } from "@/lib/site";
import { businessJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Foodtruck für Firmenfeiern – Catering für Sommerfest & Teamevent",
  description:
    "Firmencatering mit dem Foodtruck: Sommerfest, Teamevent, Mitarbeiterfeier oder Jubiläum. Der Truck steht auf eurem Gelände, kocht frisch und kommt mit einer normalen Steckdose aus.",
  path: "/foodtruck-firmenfeier",
  image: "/images/party-wunderkerzen.jpg",
});

const crumbs = [
  { name: "Catering", path: "/foodtruck-catering" },
  { name: "Firmenfeier", path: "/foodtruck-firmenfeier" },
];

export default function FirmenfeierPage() {
  return (
    <>
      <PageHero
        breadcrumbs={crumbs}
        label="Firmencatering"
        h1="Foodtruck auf der Firmenfeier"
        display={["Beste", "Teamevent-", <>küche? <span className="text-red">Unser</span></>, <span key="rot" className="text-red">Truck.</span>]}
        lead={
          <>
            Sommerfest auf dem Parkplatz, Jubiläum im Hof, Teamevent vor der Halle: Der Landstreicher stellt sich aufs
            Firmengelände und kocht, wo eure Leute arbeiten. Ihr stellt nur den Stellplatz – steht eine normale
            Steckdose, nutzen wir sie für die Dunstabzugshaube. Küchenpersonal braucht ihr keins.
          </>
        }
        image={images.partyWunderkerzen}
        note="parkt auf eurem Hof"
      />

      {/* Warum Truck statt Betriebskantine-Order */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                label="Warum der Truck?"
                title={<>Weniger <span className="text-red">Logistik</span>, mehr zusammenstehen</>}
                size="md"
                intro="Bei einer Firmenfeier ist der Truck nicht nur Küche, sondern auch Treffpunkt. Die Leute holen ihr Essen, bleiben stehen, reden miteinander – auch mit der Abteilung, die man sonst nur aus dem Videocall kennt."
              />
            </div>
            <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:content-start">
              {[
                {
                  title: "Ein fester Platz reicht",
                  text: "Der Truck arbeitet autark – alles Nötige ist an Bord. Für die Dunstabzugshaube genügt eine normale Steckdose. Parkplatz, Hof, Wiese zwischen den Hallen – ihr stellt keine Infrastruktur, nur den Stellplatz (rund " + site.footprint + ").",
                },
                {
                  title: "Zügig auch bei vielen Gästen",
                  text: "Bis zu 600 Portionen Burger und Pommes pro Stunde sind drin. Bei großen Gruppen stimmen wir zusätzlich Menü und Ablauf auf Tempo: kompakte Auswahl, BBQ, das sich schnell portionieren lässt.",
                },
                {
                  title: "Angebot für die Firma",
                  text: "Ihr bekommt nach der Anfrage ein individuelles Angebot mit allen Kosten – der Mindestumsatz richtet sich nach Einsatzort und Aufwand und steht darin verbindlich.",
                },
                {
                  title: "Menü nach Anlass",
                  text: "Sommerfest mit Burgern, Weihnachtsfeier mit American BBQ, Eröffnung mit Burger auf die Hand: Wir richten die Karte nach eurem Anlass.",
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

      {/* Typische Anlässe */}
      <section className="bg-paper py-16 md:py-24">
        <div className="container-site">
          <SectionHeading label="Typische Anlässe" title="Wofür Firmen uns buchen" size="md" className="mb-12" />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Sommerfest",
                text: "Das größte Fest des Jahres. Burger vom Grill, Pommes aus der Fritteuse, Dessert zum Schluss – und wir bleiben so lange, wie euer Programm läuft.",
              },
              {
                title: "Teamevent & Mitarbeiterfeier",
                text: "Kleinerer Rahmen, dafür regelmäßiger. Viele Firmen lassen den Truck auch mal für ein Quartals-Event oder einen Arbeitseinsatz kommen.",
                // TODO: Betreiber bestätigen, ob kleinere wiederkehrende Termine angeboten werden.
              },
              {
                title: "Jubiläum & Eröffnung",
                text: "Neue Halle, neues Standort-Jubiläum oder Produktpräsentation: Der Truck ist Anlaufpunkt und Essensversorgung in einem.",
              },
            ].map((item) => (
              <div key={item.title} className="grain border-2 border-ink/15 bg-cream p-7">
                <h3 className="font-display text-3xl uppercase">{item.title}</h3>
                <p className="mt-3 leading-relaxed opacity-80">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bild */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xs md:aspect-[21/9]">
            <Image
              src={images.feierAnstossen.src}
              alt={images.feierAnstossen.alt}
              fill
              sizes="(min-width: 768px) 90vw, 100vw"
              className="object-cover"
            />
          </div>
          <p className="hand mt-4 rotate-[-1deg] text-2xl opacity-70">
            erst anstoßen, dann anstellen – der Grill läuft schon
          </p>
        </div>
      </section>

      {/* Ablauf */}
      <section className="bg-paper py-16 md:py-28">
        <div className="container-site">
          <ProcessRoute />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading label="Fragen" title="Häufig von Firmen" size="md" />
          </div>
          <div className="lg:col-span-8">
            <FAQ items={companyFaq} />
          </div>
        </div>
      </section>

      <CTASection
        title={["Euer", "Sommerfest."]}
        text="Datum, Stellplatz, Gästezahl – mehr brauchen wir für eine erste Einschätzung nicht."
        cta="Firmenfeier anfragen"
        secondary={{ href: "/speisekarte", label: "Speisekarte ansehen" }}
      />

      <JsonLd
        data={[
          businessJsonLd(),
          serviceJsonLd({
            name: "Firmencatering mit dem Foodtruck",
            description:
              "Foodtruck-Catering für Firmenfeiern, Sommerfeste, Teamevents und Jubiläen: Burger, BBQ und Streetfood frisch auf dem Firmengelände zubereitet. Autark – eine normale Steckdose genügt.",
            path: "/foodtruck-firmenfeier",
          }),
          faqJsonLd(companyFaq),
        ]}
      />
    </>
  );
}