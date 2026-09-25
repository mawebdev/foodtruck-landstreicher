import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { EventList } from "@/components/EventList";
import { FAQ } from "@/components/FAQ";
import { FoodCard, type FoodCategoryTeaser } from "@/components/FoodCard";
import { JsonLd } from "@/components/JsonLd";
import { Label, SlashLabel } from "@/components/Label";
import { Marquee } from "@/components/Marquee";
import { Parallax } from "@/components/motion/Parallax";
import { ImageReveal, Reveal } from "@/components/motion/Reveal";
import { ProcessRoute } from "@/components/ProcessRoute";
import { RegionMap } from "@/components/RegionMap";
import { SectionHeading } from "@/components/SectionHeading";
import { StaggerLines } from "@/components/StaggerLines";
import { eventTypes } from "@/content/events";
import { generalFaq } from "@/content/faq";
import { images } from "@/content/images";
import { locationPages } from "@/content/locations";
import { signatureDishes } from "@/content/menu";
import { businessJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { bookingHref, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Foodtruck „Der Landstreicher“ | Streetfood & Catering",
  description:
    "Der Landstreicher bringt frische Burger, BBQ und Streetfood direkt zu eurem Event. Foodtruck-Catering für Hochzeiten, Firmenfeiern und Veranstaltungen in Franken, der Oberpfalz und Thüringen.",
  path: "/",
});

const facts = [
  { title: "Frisch vor Ort", text: "Gekocht wird im Truck, direkt bei eurem Event." },
  { title: "Burger & Smoker American BBQ", text: "180 g Rind auf dem Burger, Brisket bis zu 14 Stunden im Smoker." },
  { title: "Vegetarisch", text: "Ein eigener Veggie-Burger – nicht nur Beilagen." },
  { title: "Pommes von Hand", text: "Hausgemacht und handgeschnitten, auch als Süßkartoffel." },
  { title: "Autark", text: "Kein Stromanschluss nötig – eine normale Steckdose hilft, ist aber kein Muss." },
  { title: "Klein bis groß", text: "Vom Geburtstag im Garten bis zum Stadtfest." },
];

const foodTeasers: FoodCategoryTeaser[] = [
  {
    no: "01",
    title: "Burger",
    text: "180 g Rindfleisch, frisch auf der Platte. Vom Klassik bis zum Trüffelschwein – vierzehn Varianten.",
    href: "/speisekarte#burger",
    image: images.burgerHero,
    imagePosition: "50% 60%",
  },
  {
    no: "02",
    title: "Smoker American BBQ",
    text: "Texas Brisket, Pulled Pork, Pulled Beef, Spareribs und Dinosaur Ribs – low & slow aus dem US-Smoker.",
    href: "/speisekarte#smoker",
    image: images.smoker,
  },
  {
    no: "03",
    title: "Streetfood",
    text: "Große Bowls – wahlweise mit Schafskäse, Garnelen, Putenbrust oder Steakstreifen.",
    href: "/speisekarte#vorspeisen",
    image: images.bowl,
    imagePosition: "50% 40%",
  },
  {
    no: "04",
    title: "Vegetarisch",
    text: "Der Veggie-Burger mit Weizenprotein-Patty, getrockneten Tomaten, Heumilchkäse und Rauke.",
    href: "/speisekarte#vegetarisch",
    image: images.veggieBurger,
  },
  {
    no: "05",
    title: "Beilagen & Dessert",
    text: "Pommes und Süßkartoffel-Pommes von Hand geschnitten, Coleslaw, Salat – und zum Schluss Kaiserschmarrn.",
    href: "/speisekarte#beilagen",
    image: images.apfelkuechle,
    imagePosition: "50% 60%",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[businessJsonLd(), faqJsonLd(generalFaq.slice(0, 6))]} />

      {/* ───────────── HERO ───────────── */}
      <section className="on-dark grain grain-light relative overflow-hidden bg-ink text-cream">
        <div className="container-site grid gap-10 pb-16 pt-6 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-20 lg:pt-10">
          {/* Bildkomposition – auf Mobile unter dem Text, auf Desktop rechts */}
          <div className="relative order-last lg:col-span-5 lg:col-start-8">
            <div aria-hidden className="absolute -right-3 top-6 hidden h-[88%] w-[82%] rounded-xs bg-red lg:block" />
            <Parallax offset={30} className="relative h-[46svh] overflow-hidden rounded-xs sm:h-[55svh] lg:h-[72svh] lg:max-h-[46rem]">
              <Image
                src={images.burgerHero.src}
                alt={images.burgerHero.alt}
                fill
                preload
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="scale-110 object-cover object-[50%_58%]"
              />
            </Parallax>
            <div className="absolute -bottom-10 -left-16 hidden w-[52%] overflow-hidden rounded-xs border-[6px] border-ink lg:block xl:-left-24">
              <Image src={images.truckFront.src} alt={images.truckFront.alt} width={960} height={720} sizes="20vw" className="h-auto w-full" />
            </div>
            <p className="hand absolute -top-3 right-2 rotate-[5deg] text-[1.7rem] text-cream drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] sm:right-6 lg:-right-4 lg:-top-8 lg:text-3xl">
              180 g Rind,
              <br />
              frisch auf der Platte
              <svg aria-hidden viewBox="0 0 50 50" className="-mb-8 ml-auto block h-10 w-10 text-red" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M40 2C44 20 34 36 12 44M12 44l10 2M12 44l4-9" />
              </svg>
            </p>
          </div>

          {/* Text */}
          <div className="lg:col-span-7 lg:row-start-1">
            <SlashLabel items={["Foodtruck", "Streetfood", "Catering"]} className="fade-in text-cream/70" />
            <h1 className="fade-in mt-6 text-[0.95rem] font-semibold text-cream/80 [animation-delay:100ms]">
              Foodtruck &amp; Streetfood-Catering aus Lichtenfels
            </h1>
            <p className="mt-5">
              <StaggerLines
                lines={[
                  "Gutes Essen kommt",
                  "nicht von allein.",
                  "Es kommt mit",
                  <>
                    dem <span className="text-red">Landstreicher.</span>
                  </>,
                ]}
                className="font-display block text-[clamp(2.9rem,8.4vw,7.6rem)] uppercase"
              />
            </p>
            <p className="fade-in mt-8 max-w-xl text-lg leading-relaxed text-cream/80 [animation-delay:500ms]">
              Frische Burger, BBQ aus dem Smoker und Streetfood, frisch aus dem Truck. Wir kommen zu Hochzeiten, Firmenfeiern, Geburtstagen und Events.
            </p>
            <div className="fade-in mt-10 flex flex-col gap-3 [animation-delay:600ms] sm:flex-row sm:flex-wrap">
              <ButtonLink href={bookingHref}>Foodtruck für mein Event anfragen</ButtonLink>
              <ButtonLink href="/speisekarte" variant="outline-light">
                Speisekarte ansehen
              </ButtonLink>
            </div>
            <div className="fade-in mt-14 hidden items-center gap-8 border-t border-cream/15 pt-6 [animation-delay:700ms] md:flex">
              <SlashLabel items={["Lichtenfels", "Franken"]} className="text-cream/50" />
              <SlashLabel items={[site.yearsTagline]} className="text-cream/50" />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── TRUST ───────────── */}
      <section aria-label="Erfahrung und Fakten" className="grain bg-paper py-20 md:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Label>Seit Jahrzehnten unterwegs</Label>
            <p className="font-display mt-4 text-[clamp(3.5rem,10vw,8rem)] leading-[0.85] uppercase">
              Tradition<span className="text-red">.</span>
            </p>
            <p className="mt-6 max-w-sm text-xl leading-snug">
              Der Truck selbst hat diese Jahre auf dem Buckel – und genau die Erfahrung steckt in jedem Burger vom Grill.
            </p>
          </Reveal>
          <ul className="grid content-end gap-x-10 sm:grid-cols-2 lg:col-span-7">
            {facts.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 0.05} className="border-t border-ink/20 py-5">
                <p className="flex items-baseline gap-3">
                  <span className="label text-red">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg font-bold">{f.title}</span>
                </p>
                <p className="mt-1.5 pl-9 text-ink/70">{f.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Marquee items={signatureDishes} className="bg-ink text-cream" />

      {/* ───────────── WER IST DER LANDSTREICHER ───────────── */}
      <section aria-labelledby="intro-heading" className="py-24 md:py-36">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <Label>Wer ist der Landstreicher?</Label>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 id="intro-heading" className="font-display mt-6 text-[clamp(2.8rem,7vw,5.8rem)] uppercase">
                  Kein Buffet von gestern.
                  <span className="block text-red">Wir kochen dort, wo gefeiert wird.</span>
                </h2>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <div className="space-y-5 text-lg leading-relaxed">
                <p className="text-2xl font-semibold leading-snug">
                  Burger frisch vom Grill schmecken eben am besten, wenn der Grill direkt daneben steht.
                </p>
                <p>
                  Genau das ist die Idee hinter dem Landstreicher: ein Foodtruck mit eigener Küche, der zu euch kommt. Wir stellen uns auf den Hof, die Wiese oder den Firmenparkplatz, bauen auf und kochen – ohne dass ihr Strom oder Wasser bereitstellen müsst.
                </p>
                <p>
                  Eure Gäste holen sich ihr Essen frisch am Truck. Keine Wärmebehälter, kein Buffet, das seit einer Stunde steht. Dafür Burger, BBQ und Pommes, die gerade eben noch auf der Platte waren.
                </p>
                <p>
                  Ob ihr einen <Link href="/foodtruck-catering" className="prose-link">Foodtruck mieten</Link> wollt für eure{" "}
                  <Link href="/foodtruck-hochzeit" className="prose-link">Hochzeit</Link>, die{" "}
                  <Link href="/foodtruck-firmenfeier" className="prose-link">Firmenfeier</Link> oder den runden Geburtstag: Den Rahmen setzt ihr, wir bringen den Truck.
                </p>
              </div>
            </Reveal>
            <div className="relative mt-14">
              <ImageReveal className="relative aspect-[4/3] overflow-hidden rounded-xs">
                <Image src={images.kochDreiBurger.src} alt={images.kochDreiBurger.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </ImageReveal>
              <p className="hand absolute -bottom-10 right-4 rotate-[-4deg] text-3xl text-red md:-right-8">
                drei Burger, drei Mal frisch
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── FOOD ───────────── */}
      <section aria-labelledby="food-heading" className="border-t border-ink/10 py-24 md:py-32">
        <div className="container-site">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Reveal>
                <h2 id="food-heading">
                  <span className="label mb-5 flex items-center gap-2.5 opacity-80">
                    <span aria-hidden className="inline-block size-1.5 rounded-full bg-red" />
                    Burger, BBQ &amp; Streetfood
                  </span>
                  <span className="font-display block text-[clamp(3rem,9vw,8rem)] uppercase">Was bieten wir an?</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-4">
              <p className="text-lg leading-relaxed text-ink/80">
                Menüs und Preise stellen wir individuell passend zu eurem Event zusammen. Aus unserer Speisekarte könnt
                ihr genau die Gerichte kombinieren, die zu euch und euren Gästen passen.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Mobile: horizontal scrollbar, Desktop: Editorial-Grid */}
        <div className="mt-14 lg:container-site">
          <ul className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:px-10 lg:grid lg:grid-cols-12 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
            {foodTeasers.map((item, i) => (
              <li
                key={item.title}
                className={`w-[82vw] shrink-0 snap-start sm:w-[55vw] lg:w-auto ${
                  i === 0 ? "lg:col-span-7 lg:row-span-2" : i === 1 ? "lg:col-span-5" : i === 2 ? "lg:col-span-5" : "lg:col-span-6"
                }`}
              >
                <Reveal delay={(i % 3) * 0.06} className="h-full">
                  <FoodCard item={item} tall={i === 0} className="h-full" sizes={i === 0 ? "(min-width: 1024px) 55vw, 82vw" : "(min-width: 1024px) 40vw, 82vw"} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="container-site mt-12 flex flex-wrap items-center gap-6">
          <ButtonLink href="/speisekarte" variant="outline">
            Komplette Speisekarte ansehen
          </ButtonLink>
          <p className="hand text-2xl text-muted">oder einfach alles durchprobieren</p>
        </div>
      </section>

      {/* ───────────── FOOD-FOTO / TIMING ───────────── */}
      <section aria-label="Warum wir vor Ort kochen" className="on-dark relative overflow-hidden bg-ink text-cream">
        <Parallax offset={80} className="absolute inset-0 -top-20 -bottom-20">
          <Image src={images.platteAction.src} alt="" fill sizes="100vw" className="object-cover opacity-40 grayscale-[40%]" />
        </Parallax>
        <div aria-hidden className="absolute inset-0 bg-linear-to-r from-ink via-ink/75 to-ink/20" />
        <div className="container-site relative grid min-h-[80svh] items-center py-24 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="font-display text-[clamp(2.6rem,7vw,6.2rem)] uppercase">
                Ein Burger ist kein kompliziertes Gericht.
                <span className="block text-red">Aber ein guter Burger braucht Timing.</span>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 max-w-xl space-y-4 text-lg leading-relaxed text-cream/85">
                <p>
                  Das Fleisch kommt frisch auf die Platte, das Bun wird warm gemacht, Käse drauf, Sauce, Salat, Zwiebeln. Und dann muss er in die Hand, solange alles noch genau so ist, wie es sein soll.
                </p>
                <p className="font-semibold text-cream">Genau deshalb kochen wir bei Events direkt vor Ort.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── EVENTS ───────────── */}
      <section aria-labelledby="events-heading" className="on-dark grain grain-light bg-ink py-24 text-cream md:py-32">
        <div className="container-site">
          <div className="mb-14 grid gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-8">
              <h2 id="events-heading">
                <span className="label mb-5 flex items-center gap-2.5 text-cream/70">
                  <span aria-hidden className="inline-block size-1.5 rounded-full bg-red" />
                  Foodtruck für Hochzeiten, Firmenfeiern &amp; Events
                </span>
                <span className="font-display block text-[clamp(3rem,8.5vw,7.5rem)] uppercase">Ihr stellt die Gäste. Wir bringen den Truck.</span>
              </h2>
            </Reveal>
          </div>
          <EventList items={eventTypes} tone="dark" />
        </div>
      </section>

      {/* ───────────── CATERING-ABLAUF ───────────── */}
      <section aria-labelledby="process-heading" className="grain bg-paper py-24 md:py-32">
        <div className="container-site">
          <div className="mb-16 grid items-end gap-8 lg:grid-cols-12">
            <SectionHeading
              className="lg:col-span-8"
              eyebrow="So läuft das Catering ab"
              title="Von der ersten Mail bis zum letzten Burger."
              size="md"
            />
            <Reveal delay={0.1} className="lg:col-span-4">
              <p className="text-lg leading-relaxed text-ink/80">
                Kein kompliziertes Verfahren. Ihr fragt an, wir melden uns mit Verfügbarkeit und Kosten, und dann wird geplant.
              </p>
            </Reveal>
          </div>
          <ProcessRoute />
          <div className="mt-14">
            <ButtonLink href="/foodtruck-catering" variant="outline">
              Catering planen
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ───────────── REGIONEN ───────────── */}
      <section aria-labelledby="regions-heading" className="py-24 md:py-32">
        <div className="container-site grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 id="regions-heading">
                <span className="label mb-5 flex items-center gap-2.5 opacity-80">
                  <span aria-hidden className="inline-block size-1.5 rounded-full bg-red" />
                  Wo wir unterwegs sind
                </span>
                <span className="font-display block text-[clamp(3rem,8vw,6.5rem)] uppercase">Wir kommen mit dem Truck.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/80">
                Unser Foodtruck startet in Lichtenfels und ist in Franken, der Oberpfalz und Teilen Thüringens unterwegs.
              </p>
              <ul className="mt-10 border-t border-ink/15">
                {locationPages.map((l) => (
                  <li key={l.slug} className="border-b border-ink/15">
                    <Link href={`/${l.slug}`} className="group flex min-h-14 items-center justify-between py-3 text-lg font-semibold">
                      <span>Foodtruck in {l.city}</span>
                      <span aria-hidden className="text-red transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ButtonLink href="/einsatzgebiete" variant="outline">
                  Alle Einsatzgebiete ansehen
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            <RegionMap />
          </Reveal>
        </div>
      </section>

      {/* ───────────── GESCHICHTE ───────────── */}
      <section aria-labelledby="story-heading" className="on-dark grain grain-light overflow-hidden bg-ink py-24 text-cream md:py-36">
        <div className="container-site">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <h2 id="story-heading">
                  <span className="label mb-5 flex items-center gap-2.5 text-cream/70">
                    <span aria-hidden className="inline-block size-1.5 rounded-full bg-red" />
                    Über den Landstreicher
                  </span>
                  <span className="font-display block text-[clamp(3rem,8vw,6.5rem)] uppercase">Nicht gestern entstanden.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-cream/80">
                  <p>
                    Was einmal als klassische Imbissidee begann, ist über die Jahre zu einem mobilen Foodtruck mit eigener Küche, eigenem Stil und einer ziemlich langen Liste hungriger Gäste geworden.
                  </p>
                  <p>
                    {site.yearsTagline} – der Truck selbst ist älter als das heutige Team hinter dem Fenster und wurde
                    übernommen, nicht neu erfunden. Geblieben ist, worauf es ankommt: gutes Essen, frisch gemacht, und
                    Leute, die zufrieden nach Hause gehen.
                  </p>
                </div>
                <div className="mt-10">
                  <ButtonLink href="/ueber-uns" variant="outline-light">
                    Unsere Geschichte
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
            <div className="relative lg:col-span-5 lg:col-start-8">
              <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-xs">
                <Image src={images.kochZweiBurger.src} alt={images.kochZweiBurger.alt} fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
              </ImageReveal>
            </div>
          </div>

          {/* Geschwister-Truck: Das Karibische Eck ist ein eigenständiges Angebot
              mit eigener Website – hier steht bewusst nur der externe Link,
              keine Inhalte und keine Fotos davon. */}
          <div className="mt-24 border-t border-cream/15 pt-12 md:mt-32 md:pt-16 lg:col-span-12">
            <Reveal>
              <p className="max-w-2xl text-lg leading-relaxed text-cream/70">
                Übrigens: {site.karibischesEck.name} ist ein eigener Truck mit eigener Karte und eigener Website.
              </p>
              <a
                href={site.karibischesEck.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-3 inline-flex items-center gap-2 font-semibold text-cream"
              >
                Mehr auf karibischeseck.de <span aria-hidden>↗</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── GALERIE-TEASER ───────────── */}
      <section aria-labelledby="gallery-heading" className="py-24 md:py-32">
        <div className="container-site">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <h2 id="gallery-heading" className="font-display text-[clamp(2.8rem,7vw,5.5rem)] uppercase">
                Eindrücke vom Truck
              </h2>
            </Reveal>
            <Link href="/galerie" className="link-underline text-lg font-semibold">
              Zur Galerie →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5">
            <ImageReveal className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-xs md:col-span-7 md:row-span-2 md:aspect-auto">
              <Image src={images.eventTafel.src} alt={images.eventTafel.alt} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
            </ImageReveal>
            <ImageReveal delay={0.08} className="relative aspect-square overflow-hidden rounded-xs md:col-span-5 md:aspect-[16/10]">
              <Image src={images.burgerDurchreiche.src} alt={images.burgerDurchreiche.alt} fill sizes="(min-width: 768px) 38vw, 50vw" className="object-cover" />
            </ImageReveal>
            <ImageReveal delay={0.16} className="relative aspect-square overflow-hidden rounded-xs md:col-span-5 md:aspect-[16/10]">
              <Image src={images.truckSeite.src} alt={images.truckSeite.alt} fill sizes="(min-width: 768px) 38vw, 50vw" className="object-cover" />
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* ───────────── FAQ ───────────── */}
      <section aria-labelledby="faq-heading" className="grain bg-paper py-24 md:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <h2 id="faq-heading" className="font-display text-[clamp(2.8rem,7vw,5.5rem)] uppercase">
                  Häufige Fragen
                </h2>
              </Reveal>
              <p className="mt-6 max-w-xs text-ink/70">
                Eure Frage ist nicht dabei? Schreibt sie einfach in die{" "}
                <Link href={bookingHref} className="prose-link">Anfrage</Link>.
              </p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <FAQ items={generalFaq.slice(0, 6)} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
