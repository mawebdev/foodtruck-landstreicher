"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * LazyMotion hält das Bundle klein (nur DOM-Animationen, kein Layout/Drag).
 * reducedMotion="user" schaltet Transform-Animationen ab, wenn das System
 * „Bewegung reduzieren“ meldet – Opacity-Übergänge bleiben dezent erhalten.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
