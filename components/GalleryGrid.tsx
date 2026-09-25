"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SiteImage } from "@/content/images";

/**
 * Editorial-Masonry über CSS-Columns, Lightbox mit nativem <dialog>
 * (Fokusfalle, Escape und Backdrop gibt es damit gratis).
 */
export function GalleryGrid({ items, columns = "sm:columns-2 lg:columns-3" }: { items: SiteImage[]; columns?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setIndex(null);
    d.addEventListener("keydown", onKey);
    d.addEventListener("close", onClose);
    return () => {
      d.removeEventListener("keydown", onKey);
      d.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = index !== null ? items[index] : null;

  return (
    <>
      <ul className={`gap-4 [column-fill:_balance] md:gap-5 ${columns}`}>
        {items.map((img, i) => (
          <li key={img.src} className="mb-4 break-inside-avoid md:mb-5">
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block w-full overflow-hidden rounded-xs bg-ink"
              aria-label={`Bild vergrößern: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                className={`h-auto w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03] ${
                  i % 5 === 1 ? "aspect-[4/5]" : i % 5 === 3 ? "aspect-square" : ""
                }`}
              />
              <span className="label absolute left-3 top-3 rounded-xs bg-ink/80 px-2 py-1 text-[0.6rem] text-cream opacity-0 transition-opacity group-hover:opacity-100">
                {img.tag}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Bildansicht"
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 text-cream backdrop:bg-ink/80 open:flex open:flex-col"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {current && (
          <>
            <div className="flex items-center justify-between px-4 py-3 md:px-8">
              <p className="label text-cream/60">
                {String(index! + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </p>
              <button type="button" onClick={close} className="inline-flex min-h-11 items-center gap-2 px-2 font-semibold" autoFocus>
                Schließen <span aria-hidden>✕</span>
              </button>
            </div>
            <figure className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-4 md:px-20">
              <div className="relative h-full w-full">
                <Image key={current.src} src={current.src} alt={current.alt} fill sizes="100vw" className="fade-in object-contain" />
              </div>
              <figcaption className="mt-4 max-w-2xl text-center text-sm text-cream/75">{current.alt}</figcaption>
            </figure>
            <div className="flex justify-center gap-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <button type="button" onClick={() => step(-1)} className="min-h-11 rounded-xs border border-cream/30 px-5 hover:bg-cream hover:text-ink">
                <span aria-hidden>←</span> Zurück
              </button>
              <button type="button" onClick={() => step(1)} className="min-h-11 rounded-xs border border-cream/30 px-5 hover:bg-cream hover:text-ink">
                Weiter <span aria-hidden>→</span>
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
