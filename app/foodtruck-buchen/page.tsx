import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { BookingForm } from "@/components/BookingForm";
import { SlashLabel } from "@/components/Label";
import { images } from "@/content/images";
import { site } from "@/lib/site";
import { businessJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Foodtruck buchen – Anfrage für euer Event",
  description:
    "Den Landstreicher für euer Event anfragen: Datum, Ort, Gästezahl – mehr braucht es nicht. Wir melden uns mit Verfügbarkeit, Menüvorschlag und Preis.",
  path: "/foodtruck-buchen",
  image: "/images/truck-landstreicher-front.jpg",
});

const crumbs = [{ name: "Foodtruck buchen", path: "/foodtruck-buchen" }];

export default function BuchenPage() {
  return (
    <>
      <PageHero
        breadcrumbs={crumbs}
        label="Buchungsanfrage"
        h1="Foodtruck für euer Event anfragen"
        display={["Wann", "kommt der", <span key="rot" className="text-red">Truck?</span>]}
        lead={
          <>
            Fünf kurze Schritte, kein Kleingedrucktes: Datum, Ort, Gästezahl, Anlass und wie ihr uns erreicht. Danach
            melden wir uns persönlich mit Verfügbarkeit und einem Angebot.
          </>
        }
        image={images.truckFront}
        imagePosition="center 40%"
        note="der Truck wartet schon"
      />

      <section className="py-16 md:py-24">
        <div id="anfrage" className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Formular */}
          <div className="lg:col-span-7">
            <BookingForm />
          </div>

          {/* Info-Spalte */}
          <aside className="space-y-10 lg:col-span-5">
            <div className="grain border-2 border-ink p-8">
              <p className="label mb-4 text-red">Gut zu wissen</p>
              <ul className="space-y-4 leading-relaxed">
                <li className="flex gap-3">
                  <span aria-hidden className="text-red">—</span>
                  <span>Exklusiv-Catering: Der Mindestumsatz richtet sich nach Einsatzort und Aufwand – im Angebot steht er verbindlich.</span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="text-red">—</span>
                  <span>Der Truck arbeitet autark – alles Nötige ist an Bord. Für die Dunstabzugshaube genügt eine normale Steckdose.</span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="text-red">—</span>
                  <span>Platzbedarf: rund {site.footprint} auf festem, befahrbarem Untergrund.</span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="text-red">—</span>
                  <span>Menü und Preis stellen wir individuell zusammen, es gibt keine Pauschalen von der Stange.</span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="text-red">—</span>
                  <span>Auch kurzfristige Anfragen lohnen sich – mit drei Trucks sind wir flexibel. Für Samstage in der Saison gilt trotzdem: je früher, desto besser.</span>
                </li>
              </ul>
            </div>

            <div className="border-t-2 border-red pt-6">
              <p className="label mb-4">Lieber persönlich?</p>
              <address className="space-y-2 not-italic leading-relaxed">
                <p>
                  <a href={`mailto:${site.email}`} className="prose-link font-semibold">
                    {site.email}
                  </a>
                </p>
                <p>
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="prose-link font-semibold">
                    {site.phoneDisplay}
                  </a>
                </p>
              </address>
              <div className="mt-4">
                <SlashLabel items={["Lichtenfels", "Franken", "Oberpfalz", "Thüringen"]} className="opacity-70" />
              </div>
            </div>

            <div className="border-t border-ink/15 pt-6">
              <p className="label mb-3">Was danach passiert</p>
              <ol className="space-y-3 leading-relaxed">
                <li className="flex gap-3">
                  <span className="label text-red">01</span>
                  <span>Wir prüfen Verfügbarkeit und melden uns mit einer ersten Einschätzung.</span>
                </li>
                <li className="flex gap-3">
                  <span className="label text-red">02</span>
                  <span>Gemeinsam stellen wir Menü und Ablauf zusammen.</span>
                </li>
                <li className="flex gap-3">
                  <span className="label text-red">03</span>
                  <span>Ihr bekommt ein Angebot mit allen Kosten – erst eure Zusage macht den Termin fest.</span>
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </section>

      <JsonLd
        data={[
          businessJsonLd(),
          serviceJsonLd({
            name: "Foodtruck buchen",
            description:
              "Buchungsanfrage für den Foodtruck Der Landstreicher: Burger, BBQ und Streetfood für Hochzeiten, Firmenfeiern und Events in Franken, der Oberpfalz und Thüringen.",
            path: "/foodtruck-buchen",
          }),
        ]}
      />
    </>
  );
}