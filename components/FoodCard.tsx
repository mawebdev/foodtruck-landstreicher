import Image from "next/image";
import Link from "next/link";
import type { SiteImage } from "@/content/images";

export type FoodCategoryTeaser = {
  no: string;
  title: string;
  text: string;
  href: string;
  image?: SiteImage;
  /** Typografischer Platzhalter, solange kein echtes Foto existiert */
  placeholderWords?: string[];
  imagePosition?: string;
};

/**
 * Große Food-Kachel. Fast rechteckig, Bild zoomt minimal,
 * rote Linie wächst, Titel rückt ein Stück.
 */
export function FoodCard({ item, className = "", sizes = "(min-width: 1024px) 40vw, 80vw", tall = false }: { item: FoodCategoryTeaser; className?: string; sizes?: string; tall?: boolean }) {
  return (
    <Link href={item.href} className={`group relative flex flex-col overflow-hidden rounded-xs bg-ink text-cream ${className}`}>
      <div className={`relative w-full flex-1 overflow-hidden ${tall ? "min-h-[26rem] lg:min-h-[36rem]" : "min-h-[22rem]"}`}>
        {item.image ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
            style={{ objectPosition: item.imagePosition ?? "center" }}
          />
        ) : (
          // TODO: echtes Foto ersetzen (siehe content/images.ts)
          <div className="grain grain-light absolute inset-0 flex flex-col justify-start gap-0 bg-ink-soft px-7 pt-7 transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]">
            {item.placeholderWords?.map((w, i) => (
              <span
                key={w}
                className={`font-display block text-[clamp(2rem,3.6vw,3.2rem)] uppercase ${i % 2 ? "text-red/80" : "text-cream/15"}`}
              >
                {w}
              </span>
            ))}
          </div>
        )}
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/10 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <span className="label text-cream/60">{item.no}</span>
        <h3 className="font-display mt-2 text-[clamp(2.4rem,4.5vw,3.6rem)] uppercase transition-transform duration-500 ease-out-soft group-hover:translate-x-2">
          {item.title}
        </h3>
        <span aria-hidden className="mt-3 block h-0.5 w-10 bg-red transition-[width] duration-500 ease-out-soft group-hover:w-24" />
        <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-cream/80">{item.text}</p>
      </div>
    </Link>
  );
}
