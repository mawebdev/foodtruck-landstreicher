import Image from "next/image";
import type { ReactNode } from "react";
import { images } from "@/content/images";
import { bookingHref, site } from "@/lib/site";
import { ButtonLink } from "./Button";
import { Label } from "./Label";
import { Reveal } from "./motion/Reveal";

type Props = {
  title?: ReactNode[];
  text?: string;
  cta?: string;
  /** Überschreibt das Standard-Buchungsziel, z. B. mit vorab gewählter Eventart */
  href?: string;
  secondary?: { href: string; label: string };
  /** "paper" = helle Variante, z. B. wenn davor/danach schon dunkle Flächen liegen */
  tone?: "dark" | "paper";
};

export function CTASection({
  title = ["Euer Event.", "Unser Truck."],
  text = "Schickt uns Datum, Ort und ungefähre Gästezahl. Den Rest besprechen wir – persönlich und ohne Formularschlacht.",
  cta = "Foodtruck für mein Event anfragen",
  href = bookingHref,
  secondary = { href: "/speisekarte", label: "Speisekarte ansehen" },
  tone = "dark",
}: Props) {
  const dark = tone === "dark";
  return (
    <section
      aria-labelledby="cta-heading"
      className={`grain relative overflow-hidden py-24 md:py-36 ${dark ? "on-dark grain-light bg-ink text-cream" : "bg-paper text-ink"}`}
    >
      <div className="container-site grid items-end gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <Label className={`mb-8 ${dark ? "text-cream/70" : "text-ink/70"}`}>Buchungsanfrage</Label>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="cta-heading" className="font-display text-[clamp(3.4rem,12vw,10rem)] uppercase">
              {title.map((line, i) => (
                <span key={i} className={`block ${i === title.length - 1 ? "text-red" : ""}`}>
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={`mt-8 max-w-xl text-lg leading-relaxed ${dark ? "text-cream/80" : "text-ink/80"}`}>{text}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={href}>{cta}</ButtonLink>
              {secondary && (
                <ButtonLink href={secondary.href} variant={dark ? "outline-light" : "outline"}>
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
            <p className={`mt-8 text-sm ${dark ? "text-cream/60" : "text-ink/60"}`}>
              Lieber direkt? <a href={`mailto:${site.email}`} className="prose-link">{site.email}</a>
            </p>
          </Reveal>
        </div>
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xs">
            <Image src={images.truckKies.src} alt={images.truckKies.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <p className={`hand absolute -left-16 hidden lg:block -top-10 rotate-[-8deg] text-3xl ${dark ? "text-cream/90" : "text-ink/90"}`}>
            startklar
            <svg aria-hidden viewBox="0 0 60 40" className="ml-2 inline h-8 w-12 text-red" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M2 6c18 0 38 8 50 26M52 32l-10-2M52 32l1-10" />
            </svg>
          </p>
        </div>
      </div>
    </section>
  );
}
