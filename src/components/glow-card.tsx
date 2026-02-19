"use client";

import React, { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

// =============================================================================
// CURSOR GLOW CARD
// =============================================================================
// WHY: A radial gradient that follows the cursor creates a "spotlight" effect
// that makes cards feel premium and interactive. Used by Stripe, Vercel, and
// Linear. It's subtle — just a soft light on the surface, not a rave.
//
// HOW: We track mouse position relative to the card using useMotionValue
// (zero re-renders). A radial gradient is positioned at the cursor coordinates
// using useMotionTemplate to compose the CSS background string reactively.
//
// BORDER GLOW VARIANT: Uses a pseudo-element approach — the glow gradient is
// applied to the card's border area, creating a "light traveling along the edge"
// effect. This is achieved with a background on the outer container and an
// inner div that masks the center, leaving only the border visible.
// =============================================================================

export interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  /** Show glow on the border instead of the surface */
  borderGlow?: boolean;
  /** Glow color. Default is white for dark mode, blue-ish for light */
  glowColor?: string;
  /** Glow radius in px. Default 200 */
  glowSize?: number;
  /** Glow opacity 0-1. Default 0.15 */
  glowOpacity?: number;
}

export function GlowCard({
  children,
  className = "",
  borderGlow = false,
  glowColor,
  glowSize = 200,
  glowOpacity = 0.15,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // WHY useMotionValue: Mouse events fire ~60fps. Using useState would cause
  // 60 React re-renders per second. Motion values bypass React entirely and
  // update the DOM directly through Framer Motion's animation pipeline.
  const mouseX = useMotionValue(-glowSize);
  const mouseY = useMotionValue(-glowSize);

  // WHY useMotionTemplate: It lets us compose a CSS string from motion values
  // reactively. When mouseX/mouseY update, the background string updates
  // automatically without any React re-render.
  const defaultColor = glowColor || "rgba(255,255,255,0.8)";

  const surfaceGlow = useMotionTemplate`radial-gradient(${glowSize}px circle at ${mouseX}px ${mouseY}px, ${defaultColor}, transparent 80%)`;
  const borderGlowBg = useMotionTemplate`radial-gradient(${glowSize}px circle at ${mouseX}px ${mouseY}px, ${defaultColor}, transparent 80%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [prefersReducedMotion, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    // Move glow off-screen so it fades naturally
    mouseX.set(-glowSize);
    mouseY.set(-glowSize);
  }, [mouseX, mouseY, glowSize]);

  if (borderGlow) {
    // BORDER GLOW: Outer container has the glow gradient, inner div masks
    // the center, leaving only a 1px illuminated border visible.
    return (
      <div
        ref={ref}
        className={`relative rounded-[8px] p-[1px] ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Glow layer — sits behind the inner card, only visible at the 1px border */}
        <motion.div
          className="absolute inset-0 rounded-[8px] opacity-0 transition-opacity duration-300"
          style={{
            background: borderGlowBg,
            opacity: glowOpacity,
          }}
          aria-hidden
        />
        {/* Static border fallback */}
        <div className="absolute inset-0 rounded-[8px] border border-neutral-200 dark:border-neutral-800" aria-hidden />
        {/* Inner card — masks the glow to only show at the edges */}
        <div className="relative rounded-[7px] bg-white dark:bg-neutral-950 p-6">
          {children}
        </div>
      </div>
    );
  }

  // SURFACE GLOW: The gradient overlays the card surface directly
  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-[8px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow overlay — pointer-events-none so clicks pass through */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[8px]"
        style={{
          background: surfaceGlow,
          opacity: glowOpacity,
        }}
        aria-hidden
      />
      {/* Content — positioned above the glow layer */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export default GlowCard;
