import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { EventList } from "@/components/EventList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { eventTypes } from "@/content/events";
import { images } from "@/content/images";
import { businessJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Foodtruck für Events – Hochzeit, Firmenfeier & mehr",
  description:
    "Der Landstreicher für euer Event: Hochzeit, Firmenfeier, Geburtstag, Vereinsfest, Stadtfest oder Festival – frisch gekocht im Truck, autark vor Ort, eine normale Steckdose genügt.",
  path: "/events",
  image: "/images/event-lange-tafel-abend.jpg",
});

const crumbs = [{ name: "Events", path: "/events" }];

/** Events mit eigener Seite – werden als große Karten gezeigt. */
const featured = ["hochzeit", "firmenfeier"];
const featuredEvents = eventTypes.filter((e) => featured.includes(e.id));
const otherEvents = eventTypes.filter((e) => !featured.includes(e.id));

export default function EventsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={crumbs}
        label="Events"
        h1="Foodtruck für Hochzeiten, Firmenfeiern & mehr"
        display={["Euer Fest.", <span key="rot" className="text-red">Unser</span>, <span key="rot2" className="text-red">Truck.</span>]}
        lead={
          <>
            Ob Hochzeit in der Scheune, Sommerfest auf dem Hof oder Stadtfest in der Altstadt: Wir rollen an,
            stellen den Truck hin und kochen vor Ort – autark, mitten im Geschehen. Eine normale Steckdose genügt.
          </>
        }
        image={images.eventTafel}
        note="da, wo gefeiert wird"
      />

      {/* Die zwei großen Anlässe mit eigener Seite */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <SectionHeading
            label="Die großen Anlässe"
            title={<>Zwei Events, <span className="text-red">eigene Seiten.</span></>}
            size="md"
          />
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-10">
            {featuredEvents.map((event, i) => {
              const img = images[event.image];
              return (
                <Link key={event.id} href={event.href} className={`group block ${i === 1 ? "md:mt-16" : ""}`}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xs">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="label mt-6 text-red">{String(i + 1).padStart(2, "0")} / {event.short}</p>
                  <p className="font-display mt-2 text-4xl uppercase transition-colors group-hover:text-red md:text-5xl">
                    {event.title}
                  </p>
                  <p className="mt-3 max-w-md leading-relaxed opacity-80">{event.text}</p>
                  <p className="mt-4 inline-flex items-center gap-2 font-semibold">
                    {event.cta}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Alle weiteren Anlässe */}
      <section className="bg-paper py-16 md:py-24">
        <div className="container-site">
          <div className="mb-12 grid gap-8 lg:grid-cols-12">
            <SectionHeading
              className="lg:col-span-8"
              label="Und sonst?"
              title={<>Geburtstag, Vereinsfest, <span className="text-red">Stadtfest …</span></>}
              size="md"
            />
            <div className="lg:col-span-4 lg:self-end">
              <p className="text-lg leading-relaxed text-ink/80">
                Für alle anderen Anlässe gilt dasselbe Prinzip: Truck hinstellen, vor Ort kochen, Gäste glücklich
                machen. Alle Details zum Ablauf findet ihr beim{" "}
                <Link href="/foodtruck-catering" className="prose-link">Catering</Link>.
              </p>
            </div>
          </div>
          <EventList items={otherEvents} />
          <p className="mt-10 max-w-2xl leading-relaxed text-ink/70">
            Alles, was auf der Karte steht, gibt es auch als Buffet – für Feste, bei denen der Truck zwar liefert,
            aber nicht vor Ort stehen kann.
            {/* TODO: Betreiber bestätigen, ob Liefer-/Buffet-Service ohne Truck real angeboten wird. */}
          </p>
        </div>
      </section>

      <CTASection
        title={["Euer Event.", "Unser Truck."]}
        text="Sagt uns, was ihr feiert – wir sagen euch, wie der Truck dorthin kommt. Datum, Ort und ungefähre Gästezahl reichen für die erste Rückmeldung."
        secondary={{ href: "/foodtruck-hochzeit", label: "Hochzeitscatering ansehen" }}
      />

      <JsonLd
        data={[
          businessJsonLd(),
          serviceJsonLd({
            name: "Foodtruck für Events",
            description:
              "Foodtruck-Catering für Hochzeiten, Firmenfeiern, Geburtstage, Vereinsfeste, Stadtfeste und Festivals in Franken, der Oberpfalz und Thüringen.",
            path: "/events",
          }),
        ]}
      />
    </>
  );
}