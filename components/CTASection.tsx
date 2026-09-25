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
  secondary?: { href: string; label: string };
};

export function CTASection({
  title = ["Euer Event.", "Unser Truck."],
  text = "Schickt uns Datum, Ort und ungefähre Gästezahl. Den Rest besprechen wir – persönlich und ohne Formularschlacht.",
  cta = "Foodtruck für mein Event anfragen",
  secondary = { href: "/speisekarte", label: "Speisekarte ansehen" },
}: Props) {
  return (
    <section aria-labelledby="cta-heading" className="on-dark grain grain-light relative overflow-hidden bg-ink py-24 text-cream md:py-36">
      <div className="container-site grid items-end gap-14 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Reveal>
            <Label className="mb-8 text-cream/70">Buchungsanfrage</Label>
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
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/80">{text}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={bookingHref}>{cta}</ButtonLink>
              {secondary && (
                <ButtonLink href={secondary.href} variant="outline-light">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
            <p className="mt-8 text-sm text-cream/60">
              Lieber direkt? <a href={`mailto:${site.email}`} className="prose-link">{site.email}</a>
            </p>
          </Reveal>
        </div>
        <div className="relative hidden lg:col-span-4 lg:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xs">
            <Image src={images.truckSeite.src} alt={images.truckSeite.alt} fill sizes="30vw" className="object-cover object-[35%_center]" />
          </div>
          <p className="hand absolute -left-16 -top-10 rotate-[-8deg] text-3xl text-cream/90">
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
