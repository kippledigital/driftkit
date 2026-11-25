"use client";

import React, { useEffect, type ReactNode } from "react";
import { animate, motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";

interface GradientBorderProps {
  children: ReactNode;
  className?: string;
  /** Border width in px */
  borderWidth?: number;
  /** Seconds per full turn */
  duration?: number;
  /** Gradient colors */
  colors?: string[];
}

/**
 * The gradient turns by animating its starting angle, not by rotating an
 * element. Rotating a box only covers a square card: on a wide card the
 * corners of the rotating box sweep past and leave gaps in the border.
 * Animating the angle works for any shape, and it runs on a motion value,
 * so React never re-renders while it spins.
 */
export function GradientBorder({
  children,
  className = "",
  borderWidth = 2,
  duration = 3,
  colors = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#6366f1"],
}: GradientBorderProps) {
  const prefersReduced = useReducedMotion();
  const angle = useMotionValue(0);
  const stops = colors.map((c, i) => `${c} ${(i / (colors.length - 1)) * 100}%`).join(", ");
  const background = useMotionTemplate`conic-gradient(from ${angle}deg, ${stops})`;

  useEffect(() => {
    if (prefersReduced) return;
    const controls = animate(angle, [angle.get(), angle.get() + 360], { duration, ease: "linear", repeat: Infinity });
    return () => controls.stop();
  }, [angle, duration, prefersReduced]);

  return (
    <div className={`relative ${className}`}>
      {/* Soft glow: the same gradient, blurred behind the card. */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[8px] opacity-40 blur-md" style={{ background }} />
      {/* The border is the gradient showing through the padding around the content. */}
      <motion.div className="relative rounded-[8px]" style={{ background, padding: borderWidth }}>
        <div className="relative h-full rounded-[6px] bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">{children}</div>
      </motion.div>
    </div>
  );
}

export default GradientBorder;
