import type { Metadata } from "next";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { MenuSideNav, MenuTopNav } from "@/components/MenuCategoryNav";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { ButtonLink } from "@/components/Button";
import { images } from "@/content/images";
import { generalFaq } from "@/content/faq";
import { menuCategories } from "@/content/menu";
import { businessJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Speisekarte – Burger, BBQ & Streetfood vom Foodtruck",
  description:
    "Die Speisekarte vom Landstreicher: 14 Burger mit 180 g Rindfleisch, BBQ aus dem US-Smoker, hausgemachte Pommes, vegetarische Optionen und Desserts. Menüs werden pro Event zusammengestellt.",
  path: "/speisekarte",
  image: "/images/smoker.jpg",
});

const crumbs = [{ name: "Speisekarte", path: "/speisekarte" }];

export default function SpeisekartePage() {
  return (
    <>
      <PageHero
        breadcrumbs={crumbs}
        label="Speisekarte"
        h1="Unsere Speisekarte"
        display={["Was bieten", <span key="rot" className="text-red">wir an?</span>]}
        lead={
          <>
            Burger mit 180 g Rindfleisch, BBQ aus dem US-Smoker, hausgemachte Pommes und Dessert wie bei Oma. Die Karte
            ist unser Fundament – für euer Event stellen wir daraus das Menü zusammen, das zu euch passt.
          </>
        }
        image={images.smoker}
        note="alles frisch vom Grill"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/foodtruck-buchen">Menü für euer Event anfragen</ButtonLink>
          <ButtonLink href="/foodtruck-catering" variant="outline-light">
            So läuft das Catering
          </ButtonLink>
        </div>
      </PageHero>

      {/* Kategorienavigation – mobil horizontal scrollbar, Desktop sticky in der Seitenleiste.
          Scroll-Spy: die aktive Kategorie wird hervorgehoben. */}
      <MenuTopNav categories={menuCategories} />

      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="mb-16 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                label="Die Karte"
                title={<>Menü statt <span className="text-red">Preisliste</span></>}
                size="md"
              />
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="space-y-5 text-lg leading-relaxed">
                <p>
                  Auf dieser Seite gibt es bewusst keine Preise – und das ist keine Ausweichmanöver. Menüs und Preise
                  stellen wir individuell passend zu eurem Event zusammen. Aus unserer Speisekarte könnt ihr genau die
                  Gerichte kombinieren, die zu euch und euren Gästen passen. Der Mindestumsatz richtet sich nach
                  Einsatzort und Aufwand – in eurem Angebot steht er verbindlich.
                </p>
                <p>
                  Sagt uns in der Anfrage, in welche Richtung es gehen soll – Burger für alle, BBQ aus dem Smoker oder
                  eine Mischung. Wir melden uns mit einem konkreten Vorschlag und einem ehrlichen Preis.
                </p>
                <p className="text-base opacity-70">
                  Kennzeichnung: <span className="font-semibold">V</span> = vegetarisch. Was vegan möglich ist, klären
                  wir direkt in der Anfrage.
                </p>
              </div>
            </div>
          </div>

          {/* Kategorien */}
          <div className="grid gap-x-16 gap-y-20 lg:grid-cols-12">
            {/* Desktop-Seitenleiste */}
            <MenuSideNav categories={menuCategories} />

            <div className="lg:col-span-9">
              {/* scroll-mt summiert sich mit dem globalen scroll-padding-top
                  (6rem in globals.css): 96 + 24 = 120 px – knapp unter der
                  klebenden Kategorienavigation, fast direkt am Titel. */}
              {menuCategories.map((cat, ci) => (
                <section key={cat.id} id={cat.id} aria-labelledby={`h-${cat.id}`} className="mb-20 scroll-mt-6 last:mb-0">
                  <div className="mb-8 border-b-2 border-ink pb-5">
                    <p className="label mb-3 text-red">
                      {String(ci + 1).padStart(2, "0")} · {cat.kicker}
                    </p>
                    <h2 id={`h-${cat.id}`} className="font-display text-[clamp(2.6rem,6vw,4.5rem)] uppercase">
                      {cat.title}
                    </h2>
                    {cat.intro && <p className="mt-4 max-w-2xl leading-relaxed opacity-75">{cat.intro}</p>}
                  </div>

                  <ul className="grid gap-x-12 gap-y-8 md:grid-cols-2">
                    {cat.items.map((item) => (
                      <li key={item.name}>
                        <div className="flex flex-wrap items-baseline gap-x-3">
                          <h3 className="font-display text-2xl uppercase">{item.name}</h3>
                          {(item.vegetarian || item.vegetarianOption) && (
                            <span className="label rounded-full border border-red/50 px-2 py-0.5 text-[0.6rem] text-red">V</span>
                          )}
                        </div>
                        <p className="mt-2 max-w-md leading-relaxed opacity-80">{item.description}</p>
                        {item.note && <p className="mt-1.5 text-sm opacity-60">{item.note}</p>}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}

              <div className="grain border-2 border-ink p-8 md:p-10">
                <p className="label mb-3 text-red">Wichtig zu wissen</p>
                <p className="font-display text-2xl uppercase md:text-3xl">
                  Alles auch als Buffet möglich
                </p>
                <p className="mt-3 max-w-2xl leading-relaxed opacity-80">
                  Viele Gerichte lassen sich statt als Ausgabe am Truck auch als Buffet servieren. Was besser zu eurem
                  Ablauf und eurer Location passt, besprechen wir vor dem Event.
                </p>
                {/* TODO: Betreiber bestätigen, dass Buffet-Catering weiterhin angeboten wird (stand auf der alten Speisekarten-Seite). */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading label="Fragen" title="Häufig gefragt" size="md" />
          </div>
          <div className="lg:col-span-8">
            <FAQ items={generalFaq.slice(2, 8)} />
            <p className="mt-8">
              <Link href="/einsatzgebiete" className="prose-link font-semibold">
                Wir fahren Franken, die Oberpfalz und Teile Thüringens an →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title={["Hunger", "bekommen?"]}
        text="Sagt uns, was auf den Tisch soll. Wir melden uns mit Verfügbarkeit, Menüvorschlag und Preis."
        cta="Anfrage starten"
        secondary={{ href: "/foodtruck-catering", label: "So läuft's ab" }}
      />

      <JsonLd data={[businessJsonLd(), faqJsonLd(generalFaq.slice(2, 8))]} />
    </>
  );
}