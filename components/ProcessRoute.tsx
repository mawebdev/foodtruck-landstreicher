"use client";

import { useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { useRef } from "react";
import { processSteps } from "@/content/process";

function TruckIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 64 34" className={className}>
      <path fill="currentColor" d="M2 4h36v22H2zM40 11h12l8 8v7H40z" />
      <path fill="var(--color-ink)" d="M44 14h7l5 5H44z" />
      <rect x="8" y="9" width="18" height="7" fill="var(--color-red)" />
      <circle cx="14" cy="28" r="5" fill="currentColor" stroke="var(--color-ink)" strokeWidth="2.5" />
      <circle cx="50" cy="28" r="5" fill="currentColor" stroke="var(--color-ink)" strokeWidth="2.5" />
    </svg>
  );
}

/**
 * Der Ablauf als kleine Reise des Trucks: Beim Scrollen fährt der Truck
 * die Route entlang. Auf Mobile vertikal, ab lg horizontal.
 */
export function ProcessRoute({ tone = "light" }: { tone?: "light" | "dark" }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const p = reduce ? scrollYProgress : progress;
  const x = useTransform(p, (v) => `calc(${Math.min(Math.max(v, 0), 1) * 100}% - ${Math.min(Math.max(v, 0), 1) * 64}px)`);

  const line = tone === "dark" ? "bg-cream/20" : "bg-ink/15";
  const muted = tone === "dark" ? "text-cream/70" : "text-ink/70";

  return (
    <div ref={ref} className="relative">
      {/* Desktop: horizontale Route */}
      <div className="relative hidden h-12 lg:block" aria-hidden>
        <div className={`absolute inset-x-0 top-1/2 h-px ${line}`} />
        <m.div className="absolute left-0 top-1/2 h-0.5 w-full origin-left -translate-y-1/2 bg-red" style={{ scaleX: p }} />
        <m.div className={`absolute top-0 ${tone === "dark" ? "text-cream" : "text-ink"}`} style={{ left: x }}>
          <TruckIcon className="h-9 w-16" />
        </m.div>
      </div>

      <div className="relative lg:mt-10">
      {/* Mobile: vertikale Linie */}
      <div aria-hidden className={`absolute bottom-6 left-[1.1rem] top-6 w-px lg:hidden ${line}`}>
        <m.div className="h-full w-0.5 origin-top bg-red" style={{ scaleY: p }} />
      </div>
      <ol className="relative grid gap-0 lg:grid-cols-5 lg:gap-8">
        {processSteps.map((step) => (
          <li key={step.no} className="relative grid grid-cols-[2.25rem_1fr] gap-5 pb-10 lg:block lg:pb-0">
            <span
              className={`relative z-10 flex size-9 items-center justify-center rounded-full border text-xs font-bold lg:mb-6 ${
                tone === "dark" ? "border-cream/30 bg-ink" : "border-ink/20 bg-cream"
              }`}
            >
              {step.no}
            </span>
            <div>
              <h3 className="font-display text-[1.9rem] uppercase leading-[0.95]">{step.title}</h3>
              <p className={`mt-3 leading-relaxed ${muted}`}>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      </div>
    </div>
  );
}
