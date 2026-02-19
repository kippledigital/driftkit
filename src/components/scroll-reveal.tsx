"use client";

import React, { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

// =============================================================================
// SCROLL REVEAL
// =============================================================================
// Viewport-triggered entrance animations with spring physics. Supports fade,
// slide, scale, and blur variants. Once-only by default.

type RevealVariant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale" | "blur";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  className?: string;
  /** Delay in seconds */
  delay?: number;
  /** Viewport margin (e.g. "-100px") */
  margin?: string;
  /** Animate only once */
  once?: boolean;
  /** Spring stiffness */
  stiffness?: number;
  /** Spring damping */
  damping?: number;
}

const hiddenVariants: Record<RevealVariant, Record<string, number | string>> = {
  "fade-up": { opacity: 0, y: 40 },
  "fade-down": { opacity: 0, y: -40 },
  "fade-left": { opacity: 0, x: -40 },
  "fade-right": { opacity: 0, x: 40 },
  scale: { opacity: 0, scale: 0.85 },
  blur: { opacity: 0, filter: "blur(10px)" },
};

const visibleVariant = {
  opacity: 1,
  y: 0,
  x: 0,
  scale: 1,
  filter: "blur(0px)",
};

export function ScrollReveal({
  children,
  variant = "fade-up",
  className = "",
  delay = 0,
  margin = "-80px",
  once = true,
  stiffness = 260,
  damping = 20,
}: ScrollRevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={hiddenVariants[variant]}
      whileInView={visibleVariant}
      viewport={{ once, margin }}
      transition={{
        type: "spring",
        stiffness,
        damping,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
