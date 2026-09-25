import type { ReactNode } from "react";
import { Label } from "./Label";
import { Reveal } from "./motion/Reveal";

type Props = {
  label?: string;
  /** semantische Überschrift (SEO) – wird klein über der Display-Zeile gezeigt */
  eyebrow?: string;
  title: ReactNode;
  as?: "h1" | "h2" | "h3";
  intro?: ReactNode;
  className?: string;
  size?: "md" | "lg" | "xl";
};

const sizes = {
  md: "text-[clamp(2.4rem,6vw,4.5rem)]",
  lg: "text-[clamp(2.8rem,8vw,6.5rem)]",
  xl: "text-[clamp(3.2rem,11vw,9.5rem)]",
};

/**
 * Überschrift mit optionalem Label. Wenn `eyebrow` gesetzt ist, steckt sie
 * mit im Heading-Element – so bleibt die SEO-Struktur sauber, obwohl die
 * große Zeile emotional formuliert ist.
 */
export function SectionHeading({ label, eyebrow, title, as: Tag = "h2", intro, className = "", size = "lg" }: Props) {
  return (
    <div className={className}>
      {label && (
        <Reveal>
          <Label className="mb-6">{label}</Label>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <Tag>
          {eyebrow && <span className="label mb-4 block opacity-70">{eyebrow}</span>}
          <span className={`font-display block uppercase ${sizes[size]}`}>{title}</span>
        </Tag>
      </Reveal>
      {intro && (
        <Reveal delay={0.12}>
          <div className="mt-7 max-w-prose text-lg leading-relaxed opacity-85">{intro}</div>
        </Reveal>
      )}
    </div>
  );
}
