"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Abstand, aus dem das Element nach oben gleitet */
  y?: number;
  as?: "div" | "li" | "span";
};

/** Fade-Up beim Hereinscrollen. Einmalig, kurz, ohne Theater. */
export function Reveal({ children, delay = 0, className, y = 24, as = "div" }: RevealProps) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </Comp>
  );
}

/** Bild wird wie ein Vorhang von unten aufgedeckt, mit leichtem Scale-in. */
export function ImageReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <m.div
      className={className}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.05, delay, ease }}
    >
      <m.div
        className="h-full w-full"
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.4, delay, ease }}
      >
        {children}
      </m.div>
    </m.div>
  );
}
