import Image from "next/image";
import Link from "next/link";
import { footerNav, legalNav } from "@/content/navigation";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark grain grain-light bg-ink pb-28 pt-20 text-cream lg:pb-12">
      <div className="container-site">
        <div className="grid gap-12 border-b border-cream/15 pb-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image src="/brand/logo-landstreicher.png" alt={`Logo ${site.name}`} width={600} height={606} className="h-28 w-auto" />
            <p className="font-display mt-8 text-4xl uppercase">{site.name}</p>
            <p className="mt-2 max-w-xs text-cream/70">{site.tagline}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-4">
            <p className="label mb-5 text-cream/50">Seiten</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline inline-block py-1 text-cream/85 hover:text-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="label mb-5 text-cream/50">Kontakt</p>
            <address className="space-y-2 not-italic text-cream/85">
              <p>
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="link-underline inline-block py-1">
                  {site.email}
                </a>
              </p>
              <p>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="link-underline inline-block py-1">
                  {site.phoneDisplay}
                </a>
              </p>
            </address>
            {site.social.length > 0 && (
              <ul className="mt-6 flex gap-4">
                {site.social.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} className="link-underline" rel="noopener">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-sm text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name} · Burgkunstadt / Franken
          </p>
          <ul className="flex gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline inline-block py-2 hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
