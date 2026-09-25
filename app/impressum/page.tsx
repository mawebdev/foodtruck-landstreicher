import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Impressum",
  description: `Impressum von ${site.legalName}, Foodtruck & Streetfood Catering aus Burgkunstadt.`,
  path: "/impressum",
});

export default function ImpressumPage() {
  return (
    <article className="py-16 md:py-24">
      <div className="container-site max-w-3xl">
        <Breadcrumbs items={[{ name: "Impressum", path: "/impressum" }]} className="mb-12" />

        <h1 className="font-display text-[clamp(3rem,9vw,6rem)] uppercase">Impressum</h1>

        <div className="mt-12 space-y-10 leading-relaxed">
          {/* Adresse und Telefon vom Betreiber bestätigt (Sep. 2026).
              TODO: Umsatzsteuer-Identifikationsnummer ergänzen, falls vorhanden. */}
          <section>
            <h2 className="font-display text-2xl uppercase">Angaben gemäß § 5 DDG</h2>
            <p className="mt-4 whitespace-pre-line">
              {site.legalName}
              {"\n"}
              {site.address.street}
              {"\n"}
              {site.address.postalCode} {site.address.city}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl uppercase">Kontakt</h2>
            <p className="mt-4">
              E-Mail:{" "}
              <a href={`mailto:${site.email}`} className="prose-link">
                {site.email}
              </a>
              <br />
              Telefon:{" "}
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="prose-link">
                {site.phoneDisplay}
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl uppercase">Redaktionell verantwortlich</h2>
            <p className="mt-4">
              {site.responsiblePerson}
              <br />
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl uppercase">EU-Streitschlichtung</h2>
            <p className="mt-4">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                className="prose-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl uppercase">Verbraucherstreitbeilegung</h2>
            <p className="mt-4">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}