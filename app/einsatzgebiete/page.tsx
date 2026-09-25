import type { Metadata } from "next";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RegionMap } from "@/components/RegionMap";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { images } from "@/content/images";
import { regionTexts, serviceAreas, type Region } from "@/content/locations";
import { generalFaq } from "@/content/faq";
import { site } from "@/lib/site";
import { businessJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Einsatzgebiete – Foodtruck-Catering in Franken, Oberpfalz & Thüringen",
  description:
    "Der Landstreicher kommt mit dem Foodtruck nach Bamberg, Coburg, Bayreuth, Nürnberg und in ganz Franken, die Oberpfalz und Teile Thüringens. Startpunkt: Lichtenfels.",
  path: "/einsatzgebiete",
  image: "/images/truck-landstreicher-front.jpg",
});

const crumbs = [{ name: "Einsatzgebiete", path: "/einsatzgebiete" }];

const regions: Region[] = ["Franken", "Oberpfalz", "Thüringen"];

export default function EinsatzgebietePage() {
  return (
    <>
      <PageHero
        breadcrumbs={crumbs}
        label="Einsatzgebiete"
        h1="Wo der Landstreicher hinfährt"
        display={["Franken.", "Oberpfalz.", "Thüringen."]}
        lead={
          <>
            Unser Truck startet in Lichtenfels und ist in Franken, der Oberpfalz und Teilen Thüringens unterwegs. Kurze
            Wege sind Bamberg, Coburg und Kronach – aber auch nach Bayreuth, Nürnberg oder über die Landesgrenze nach
            Sonneberg und Saalfeld lassen wir uns gern bestellen.
          </>
        }
        image={images.truckFront}
        note="und wo sonst ihr uns haben wollt"
      />

      {/* Karte */}
      <section className="py-16 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                label="Die Karte"
                title={<>Start in <span className="text-red">Lichtenfels</span></>}
                size="md"
                intro="Rot markiert sind die Städte mit eigener Seite. Alle anderen Orte unten in der Liste sind genauso erreichbar – die Liste ist die Wahrheit, die Karte nur ein Überblick."
              />
              <div className="mt-10">
                <RegionMap />
              </div>
            </div>
          </div>

          {/* Regionen & Städte */}
          <div className="space-y-16 lg:col-span-6 lg:col-start-7">
            {regions.map((region) => {
              const cities = serviceAreas.filter((a) => a.region === region && !a.home);
              return (
                <section key={region} aria-labelledby={`r-${region}`}>
                  <h2 id={`r-${region}`} className="font-display border-b-2 border-ink pb-4 text-[clamp(2.2rem,5vw,3.6rem)] uppercase">
                    {region}
                  </h2>
                  <p className="mt-5 max-w-2xl leading-relaxed opacity-85">{regionTexts[region]}</p>
                  <ul className="mt-7 grid grid-cols-2 gap-x-8 gap-y-2.5 sm:grid-cols-3">
                    {cities.map((city) => (
                      <li key={city.name} className="text-[0.97rem]">
                        {city.slug ? (
                          <Link href={`/${city.slug}`} className="prose-link font-semibold">
                            {city.name}
                          </Link>
                        ) : (
                          <span className="opacity-75">{city.name}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm opacity-60">
                    {cities.filter((c) => c.slug).length > 0 && (
                      <>
                        Unterstrichene Städte haben eine eigene Seite.{" "}
                      </>
                    )}
                    Für alle Orte gilt: {region === "Oberpfalz" ? "längere Anfahrt" : "Nahbereich"} –{" "}
                    <Link href="/foodtruck-buchen" className="prose-link">
                      fragt einfach an
                    </Link>
                    .
                  </p>
                </section>
              );
            })}

            <div className="grain border-2 border-ink p-8">
              <p className="label mb-3 text-red">Und darüber hinaus?</p>
              <p className="max-w-xl leading-relaxed">
                Wenn euer Event ein Stück außerhalb der Liste liegt, sprecht uns trotzdem an. Wir sagen euch ehrlich,
                ob sich die Anfahrt machen lässt – und was sie im Angebot kostet.
              </p>
              {/* TODO: Betreiber bestätigen, ob es einen maximalen Radius gibt (alte Seite: „150 km“, aber mal ab Nürnberg, mal ohne Bezugspunkt). */}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ – nur die regional relevanten Fragen */}
      <section className="bg-paper py-16 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading label="Fragen" title="Zur Anfahrt" size="md" />
          </div>
          <div className="lg:col-span-8">
            <FAQ
              items={[
                generalFaq[8],
                generalFaq[6],
                generalFaq[9],
                {
                  q: "Warum steht Frankfurt nicht in der Liste?",
                  a: [
                    "Unsere Heimat ist Lichtenfels in Oberfranken – von dort aus sind unsere regelmäßigen Einsatzgebiete Franken, die Oberpfalz und Südthüringen. Orte, die wir nicht sicher anfahren können, versprechen wir lieber erst gar nicht.",
                  ],
                  // TODO: Betreiber bestätigen – auf der alten Seite tauchten Frankfurt und München in FAQ-Texten auf, ohne dass dort eine Anfahrt plausibel war.
                },
              ]}
            />
          </div>
        </div>
      </section>

      <CTASection
        title={["Euer Ort.", "Unser Truck."]}
        text="Nennt uns Ort und Datum. Wir sagen euch, ob wir kommen können – und was die Anfahrt kostet."
        cta="Anfrage starten"
        secondary={{ href: "/foodtruck-catering", label: "So läuft's ab" }}
      />

      <JsonLd
        data={[
          businessJsonLd(),
          serviceJsonLd({
            name: "Foodtruck-Catering in Franken, der Oberpfalz und Thüringen",
            description:
              "Der Foodtruck Der Landstreicher aus Lichtenfels fährt Einsatzgebiete in Franken (u. a. Bamberg, Coburg, Bayreuth, Nürnberg), der Oberpfalz (u. a. Regensburg, Amberg, Weiden) und Südthüringen (u. a. Sonneberg, Saalfeld, Suhl) an.",
            path: "/einsatzgebiete",
            areaServed: [...site.regions],
          }),
          faqJsonLd([generalFaq[8], generalFaq[6]]),
        ]}
      />
    </>
  );
}