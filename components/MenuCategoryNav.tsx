"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { MenuCategory } from "@/content/menu";

/**
 * Scroll-Spy für die Speisekarten-Navigation: Hebt die Kategorie hervor,
 * deren Sektion gerade im sichtbaren Bereich ist. Aktive Sektion = die letzte,
 * deren Anfang die Markierungslinie im oberen Bildschirmdrittel passiert hat.
 */
function useActiveCategoryId(categories: MenuCategory[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = categories
      .map((cat) => document.getElementById(cat.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const marker = window.innerHeight * 0.35;
      // Ganz unten auf der Seite: die letzte Sektion aktivieren, auch wenn
      // ihr Anfang die Markierungslinie nie erreicht (kurze letzte Kategorie).
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      let current: string | null = null;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= marker) current = el.id;
      }
      if (atBottom) current = sections[sections.length - 1].id;
      setActiveId(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [categories]);

  return activeId;
}

/** Sticky Kategorie-Leiste oben (mobil + Desktop) */
export function MenuTopNav({ categories }: { categories: MenuCategory[] }) {
  const activeId = useActiveCategoryId(categories);
  const listRef = useRef<HTMLUListElement>(null);

  // Aktive Kategorie im horizontal scrollbaren Menü mittig ziehen –
  // nur die Leiste selbst scrollen, niemals die Seite.
  useEffect(() => {
    const list = listRef.current;
    if (!list || !activeId) return;
    const link = list.querySelector<HTMLAnchorElement>(`a[href="#${CSS.escape(activeId)}"]`);
    if (!link) return;
    const target = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: Math.max(0, target), behavior: reduced ? "auto" : "smooth" });
  }, [activeId]);

  return (
    <nav
      aria-label="Speisekarten-Kategorien"
      className="sticky top-14 z-30 border-b border-ink/10 bg-cream/95 backdrop-blur md:top-16"
    >
      <ul ref={listRef} className="no-scrollbar container-site flex gap-6 overflow-x-auto py-3.5 text-sm font-bold whitespace-nowrap md:justify-center">
        {categories.map((cat) => {
          const isActive = activeId === cat.id;
          return (
            <li key={cat.id}>
              <Link
                href={`#${cat.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`link-underline whitespace-nowrap py-1 uppercase tracking-wide transition-colors ${
                  isActive
                    ? "text-red opacity-100 [background-size:100%_1px]"
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                {cat.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Desktop-Seitenleiste links */
export function MenuSideNav({ categories }: { categories: MenuCategory[] }) {
  const activeId = useActiveCategoryId(categories);

  return (
    <nav aria-label="Kategorien" className="hidden lg:col-span-3 lg:block">
      <ul className="sticky top-36 space-y-1">
        {categories.map((cat, i) => {
          const isActive = activeId === cat.id;
          return (
            <li key={cat.id}>
              <a
                href={`#${cat.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`group flex items-baseline gap-3 py-2 transition-colors ${
                  isActive ? "text-ink" : "text-ink/60 hover:text-ink"
                }`}
              >
                <span className={`label w-6 transition-colors ${isActive ? "text-red" : "text-red/70"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-display text-xl uppercase transition-colors ${
                    isActive ? "text-red" : "group-hover:text-red"
                  }`}
                >
                  {cat.title}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}