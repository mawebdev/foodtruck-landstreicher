"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { bookingHref } from "@/lib/site";
import { Arrow } from "./Button";

/**
 * Dezente Buchungsleiste auf Mobile. Erscheint erst nach dem Hero,
 * verschwindet auf der Buchungsseite selbst. Kein Popup, kein Blinken.
 */
export function MobileCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith(bookingHref)) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-[transform,opacity] duration-500 ease-out-soft lg:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <Link
        href={bookingHref}
        tabIndex={visible ? 0 : -1}
        className="group/btn flex min-h-13 items-center justify-between rounded-xs border border-cream/10 bg-ink px-5 py-3.5 text-cream shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
      >
        <span className="font-bold">Foodtruck für euer Event buchen</span>
        <span className="flex size-9 items-center justify-center rounded-xs bg-red">
          <Arrow className="w-5" />
        </span>
      </Link>
    </div>
  );
}
