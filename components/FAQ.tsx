import type { Faq } from "@/content/faq";

/**
 * FAQ mit nativem <details>: tastaturbedienbar, ohne JavaScript,
 * Inhalte sind für Suchmaschinen im HTML vorhanden.
 */
export function FAQ({ items, className = "" }: { items: Faq[]; className?: string }) {
  return (
    <div className={`border-t border-current/15 ${className}`}>
      {items.map((item, i) => (
        <details key={item.q} className="group border-b border-current/15" name="faq" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <h3 className="text-lg font-bold leading-snug md:text-xl">{item.q}</h3>
            <span
              aria-hidden
              className="relative mt-1.5 block size-4 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-0.5 before:w-4 before:-translate-y-1/2 before:bg-red after:absolute after:left-1/2 after:top-0 after:h-4 after:w-0.5 after:-translate-x-1/2 after:bg-red after:transition-transform after:duration-300 group-open:after:scale-y-0"
            />
          </summary>
          <div className="max-w-prose space-y-3 pb-7 leading-relaxed opacity-85">
            {item.a.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
