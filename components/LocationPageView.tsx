import Image from "next/image";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { SlashLabel } from "@/components/Label";
import { images } from "@/content/images";
import { distanceFromHome, getLocationPage, serviceAreas } from "@/content/locations";
import { businessJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

export function locationMetadata(slug: string): Metadata {
  const page = getLocationPage(slug);
  return pageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/${page.slug}`,
    image: images[page.image].src,
  });
}

export function LocationPageView({ slug }: { slug: string }) {
  const page = getLocationPage(slug);
  const heroImage = images[page.image];
  const secondaryImage = images[page.imageSecondary];
  const km = distanceFromHome(page.city);
  const nearbyPages = serviceAreas.filter((a) => a.slug && page.nearby.includes(a.name));

  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Einsatzgebiete", path: "/einsatzgebiete" }, { name: page.city, path: `/${page.slug}` }]}
        label={`Foodtruck in ${page.city}`}
        h1={page.h1}
        display={[<span key="rot" className="text-red">{page.city}.</span>]}
        lead={page.lead}
        image={heroImage}
        note={km ? `ca. ${km} km von uns` : undefined}
      />

      {/* Einsatz in … */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading label={`Einsatz in ${page.city}`} title={page.intro.heading} size="md" />
              <div className="mt-7 space-y-5 text-lg leading-relaxed">
                {page.intro.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xs">
                <Image src={secondaryImage.src} alt={secondaryImage.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
              {km && (
                <div className="mt-4">
                  <SlashLabel items={[`${page.city}`, `ca. ${km} km Luftlinie von Lichtenfels`, "Anfahrt im Angebot enthalten"]} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Typische Anlässe */}
      <section className="bg-paper py-16 md:py-24">
        <div className="container-site">
          <SectionHeading label={`In ${page.city} oft gefeiert`} title="Wo wir gut passen" size="md" className="mb-12" />
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-3">
            {page.occasions.map((occ, i) => (
              <div key={occ.title} className="border-t-2 border-red pt-6">
                <p className="label mb-3 text-red">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-display text-3xl uppercase">{occ.title}</h3>
                <p className="mt-3 leading-relaxed opacity-80">{occ.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Praktisches + Umgebung */}
      <section className="py-16 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading label="Praktisches" title={page.practical.heading} size="md" />
            <div className="mt-7 space-y-5 text-lg leading-relaxed">
              {page.practical.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="grain border-2 border-ink p-8">
              <p className="label mb-4 text-red">Auch in der Umgebung</p>
              <ul className="flex flex-wrap gap-x-3 gap-y-2 text-[0.97rem]">
                {page.nearby.map((city) => {
                  const linked = nearbyPages.find((a) => a.name === city);
                  return (
                    <li key={city}>
                      {linked?.slug ? (
                        <Link href={`/${linked.slug}`} className="prose-link font-semibold">
                          {city}
                        </Link>
                      ) : (
                        <span className="opacity-80">{city}</span>
                      )}
                      <span aria-hidden className="ml-3 text-red last:hidden">·</span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-5 text-sm leading-relaxed opacity-70">
                Alle Orte, die wir anfahren, stehen auf der{" "}
                <Link href="/einsatzgebiete" className="prose-link">
                  Übersicht der Einsatzgebiete
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-16 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading label="Fragen" title={`Gut zu wissen in ${page.city}`} size="md" />
          </div>
          <div className="lg:col-span-8">
            <FAQ items={page.faq} />
          </div>
        </div>
      </section>

      <CTASection
        title={[`${page.city}.`, "Der Truck."]}
        text="Datum, Location und Gästezahl reichen für die erste Rückmeldung."
        cta={`Termin in ${page.city} anfragen`}
        secondary={{ href: "/speisekarte", label: "Speisekarte ansehen" }}
      />

      <JsonLd
        data={[
          businessJsonLd(),
          serviceJsonLd({
            name: `Foodtruck-Catering in ${page.city}`,
            description: page.metaDescription,
            path: `/${page.slug}`,
            areaServed: [page.city, ...page.nearby],
          }),
          faqJsonLd(page.faq),
        ]}
      />
    </>
  );
}