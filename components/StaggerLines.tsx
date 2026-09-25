import type { ReactNode } from "react";

/**
 * Zeilenweise gestaffelter Text für große Headlines.
 * Reines CSS: sichtbar auch ohne JavaScript, respektiert prefers-reduced-motion.
 */
export function StaggerLines({ lines, className = "", lineClassName = "" }: { lines: ReactNode[]; className?: string; lineClassName?: string }) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <span className={`rise block ${lineClassName}`} style={{ animationDelay: `${120 + i * 90}ms` }}>
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
