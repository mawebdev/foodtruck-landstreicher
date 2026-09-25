"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav } from "@/content/navigation";
import { bookingHref, site } from "@/lib/site";
import { Arrow, buttonClasses } from "./Button";

function isActive(pathname: string, item: (typeof mainNav)[number]) {
  const targets = "match" in item ? (item.match ?? [item.href]) : [item.href];
  return targets.some((t) => pathname === t || pathname.startsWith(`${t}/`));
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [menuTop, setMenuTop] = useState(72);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menü bei Navigation schließen – ereignisbasiert statt im Effect:
  // ein Klick auf einen Menüpunkt (Maus oder Tastatur) schließt das Menü.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setMenuTop(headerRef.current?.getBoundingClientRect().bottom ?? 72);
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={`on-dark sticky top-0 z-50 bg-ink text-cream transition-[padding,box-shadow] duration-300 ${
        scrolled ? "py-2 shadow-[0_1px_0_0_rgba(244,240,232,0.08)]" : "py-3 md:py-4"
      }`}
    >
      <div className="container-site flex items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={`${site.name} – zur Startseite`}>
          <Image
            src="/brand/logo-landstreicher.png"
            alt=""
            width={600}
            height={606}
            preload
            className={`w-auto transition-[height] duration-300 ${scrolled ? "h-11" : "h-12 md:h-16"}`}
          />
          <span className="hidden leading-none sm:block">
            <span className="font-display block text-[1.35rem] uppercase">Der Landstreicher</span>
            <span className="label mt-1 block text-[0.62rem] text-cream/60">Foodtruck · Catering</span>
          </span>
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-9">
            {mainNav.map((item) => {
              const active = isActive(pathname, item);
              return (
                <li key={item.href} className="group/nav relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative whitespace-nowrap py-2 text-[0.92rem] font-semibold transition-colors hover:text-cream ${
                      active ? "text-cream" : "text-cream/70"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-red transition-transform duration-300 ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                  {/* Dropdown: per CSS bei Hover und Fokus (group-focus-within),
                      damit der Punkt auch per Tastatur erreichbar bleibt. */}
                  {item.children && (
                    <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-[opacity,visibility] duration-200 group-focus-within/nav:visible group-focus-within/nav:opacity-100 group-hover/nav:visible group-hover/nav:opacity-100">
                      <ul className="grain grain-light min-w-48 rounded-xs border border-cream/15 bg-ink p-2 shadow-print">
                        {item.children
                          .filter((sub) => !sub.hideInDropdown)
                          .map((sub) => (
                            <li key={sub.href}>
                              <Link
                                href={sub.href}
                                aria-current={pathname === sub.href ? "page" : undefined}
                                className="block rounded-xs px-3 py-2.5 text-sm font-semibold text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream aria-[current=page]:text-red"
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Wrapper statt hidden/lg:inline-flex am Link: die Base-Klasse bringt
              bereits inline-flex mit und würde `hidden` sonst überschreiben. */}
          <div className="hidden lg:block">
            <Link href={bookingHref} className={buttonClasses("primary", "min-h-11 whitespace-nowrap px-5")}>
              <span>Foodtruck buchen</span>
              <Arrow />
            </Link>
          </div>
          <Link
            href={bookingHref}
            className="inline-flex min-h-11 items-center rounded-xs bg-red px-4 text-sm font-bold text-cream lg:hidden"
          >
            Buchen
          </Link>
          <button
            ref={menuButton}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-xs border border-cream/25 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Menü schließen" : "Menü öffnen"}</span>
            <span aria-hidden className="relative block h-3 w-5">
              <span className={`absolute left-0 top-0 h-0.5 w-5 bg-cream transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 w-5 bg-cream transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        hidden={!open}
        style={{ top: menuTop }}
        className="grain grain-light fixed inset-x-0 bottom-0 overflow-y-auto bg-ink lg:hidden"
      >
        <nav
          aria-label="Mobile Navigation"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
          className="container-site flex min-h-full flex-col pb-10 pt-8"
        >
          <ul className="border-t border-cream/15">
            {mainNav.map((item, i) => (
              <li key={item.href} className="border-b border-cream/15">
                <Link
                  ref={i === 0 ? firstLink : undefined}
                  href={item.href}
                  aria-current={isActive(pathname, item) ? "page" : undefined}
                  className="font-display flex min-h-16 items-center justify-between py-3 text-[2.4rem] uppercase aria-[current=page]:text-red"
                >
                  {item.label}
                  <span aria-hidden className="font-sans text-sm text-cream/40">0{i + 1}</span>
                </Link>
                {item.children && (
                  <ul className="flex flex-wrap gap-x-6 gap-y-1 pb-4">
                    {item.children
                      .filter((sub) => !sub.hideInDropdown)
                      .map((sub) => (
                      <li key={sub.href}>
                        <Link href={sub.href} className="link-underline text-cream/75">
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <Link href={bookingHref} className={buttonClasses("primary", "w-full")}>
              <span>Foodtruck für mein Event anfragen</span>
              <Arrow />
            </Link>
            <p className="mt-6 text-sm text-cream/60">
              <a href={`mailto:${site.email}`} className="link-underline">{site.email}</a>
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}
