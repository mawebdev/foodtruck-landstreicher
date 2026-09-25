import type { ReactNode } from "react";

/** Kleines Versal-Label mit rotem Punkt – LICHTENFELS / FRANKEN */
export function Label({ children, className = "", as: Tag = "p" }: { children: ReactNode; className?: string; as?: "p" | "span" | "div" }) {
  return (
    <Tag className={`label inline-flex items-center gap-2.5 ${className}`}>
      <span aria-hidden className="inline-block size-1.5 rounded-full bg-red" />
      {children}
    </Tag>
  );
}

/** Label mit Schrägstrich-Trennern */
export function SlashLabel({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <p className={`label flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}>
      {items.map((item, i) => (
        <span key={item} className="inline-flex items-center gap-3">
          {i > 0 && <span aria-hidden className="text-red">/</span>}
          {item}
        </span>
      ))}
    </p>
  );
}
