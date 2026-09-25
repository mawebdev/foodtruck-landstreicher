import { testimonials } from "@/content/testimonials";
import { Reveal } from "./motion/Reveal";

/** Gästestimmen als ruhige Zitatreihe – keine Sterne, keine Karussell-Show. */
export function Testimonials({ limit = 3, className = "" }: { limit?: number; className?: string }) {
  return (
    <ul className={`grid gap-10 md:grid-cols-3 md:gap-8 ${className}`}>
      {testimonials.slice(0, limit).map((t, i) => (
        <Reveal as="li" key={t.author} delay={i * 0.08} className="border-t-2 border-red pt-6">
          <figure>
            <blockquote className="text-lg leading-relaxed">„{t.quote}“</blockquote>
            <figcaption className="label mt-5 opacity-60">
              {t.author}
              {"context" in t && t.context ? ` · ${t.context}` : ""}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </ul>
  );
}
