import Image from "next/image";
import Link from "next/link";
import type { EventType } from "@/content/events";
import { images } from "@/content/images";
import { Arrow } from "./Button";

/**
 * Eventarten als große typografische Zeilen. Auf Desktop blendet beim Hover
 * ein Foto ein (reines CSS). Auf Mobile steht das Foto als kleines Thumbnail.
 */
export function EventList({ items, tone = "light" }: { items: EventType[]; tone?: "light" | "dark" }) {
  const border = tone === "dark" ? "border-cream/15" : "border-ink/15";
  return (
    <ul className={`border-t ${border}`}>
      {items.map((event, i) => {
        const img = images[event.image];
        return (
          <li key={event.id} className={`border-b ${border}`}>
            <Link href={event.href} className="group relative grid grid-cols-[1fr_auto] items-center gap-x-5 gap-y-2 py-6 md:grid-cols-[4rem_1fr_1.2fr_16rem] md:py-8">
              <span className="label hidden opacity-50 md:block">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-[clamp(2.4rem,6vw,4.75rem)] uppercase transition-[color,transform] duration-500 ease-out-soft group-hover:translate-x-2 group-hover:text-red">
                {event.title}
              </span>
              <span className="relative col-span-2 row-start-2 max-w-md text-[0.97rem] leading-relaxed md:col-span-1 md:row-start-auto">
                {/* Kurztext – blendet beim Hover aus, damit das Foto frei liegt */}
                <span className="block opacity-75 transition-opacity duration-500 md:group-hover:opacity-0">
                  {event.short}
                  <span className="mt-1 block font-semibold opacity-100 md:hidden">
                    {event.cta} <span aria-hidden>→</span>
                  </span>
                </span>
                {/* Hover-Bild, nur Desktop: blendet anstelle des Kurztexts ein –
                    überdeckt nie Titel, CTA oder Nachbarzeilen. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-1/2 z-10 hidden aspect-[4/3] w-64 -translate-y-1/2 rotate-2 scale-95 overflow-hidden rounded-xs opacity-0 shadow-print transition-[opacity,transform] duration-500 ease-out-soft group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100 md:block"
                >
                  <Image src={img.src} alt="" fill sizes="256px" className="object-cover" />
                </span>
              </span>
              <span className="relative size-16 overflow-hidden rounded-xs md:hidden">
                <Image src={img.src} alt="" fill sizes="64px" className="object-cover" />
              </span>
              <span className="hidden items-center gap-3 text-sm font-semibold md:flex md:w-full md:justify-end">
                <span className="sr-only md:not-sr-only">{event.cta}</span>
                <span className="flex size-10 items-center justify-center rounded-full border border-current/30 transition-colors group-hover:border-red group-hover:bg-red group-hover:text-cream">
                  <Arrow className="w-4" />
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
