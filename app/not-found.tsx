import Link from "next/link";
import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="on-dark grain grain-light flex min-h-[70vh] items-center bg-ink py-24 text-cream">
      <div className="container-site">
        <p className="label mb-6 text-cream/70">Fehler 404</p>
        <h1 className="font-display text-[clamp(3.5rem,13vw,10rem)] uppercase">
          Der Truck
          <span className="block text-red">ist woanders.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/80">
          Diese Seite existiert nicht (mehr). Aber der Weg zurück ist kurz – und vielleicht findet ihr hier sogar
          etwas Besseres.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Zur Startseite</ButtonLink>
          <ButtonLink href="/speisekarte" variant="outline-light">
            Speisekarte ansehen
          </ButtonLink>
        </div>
        <p className="mt-8 text-sm text-cream/60">
          Oder direkt zum Ziel:{" "}
          <Link href="/foodtruck-catering" className="prose-link text-cream">
            Catering
          </Link>{" "}
          ·{" "}
          <Link href="/einsatzgebiete" className="prose-link text-cream">
            Einsatzgebiete
          </Link>{" "}
          ·{" "}
          <Link href="/foodtruck-buchen" className="prose-link text-cream">
            Foodtruck buchen
          </Link>
        </p>
      </div>
    </section>
  );
}