"use client";

import React, { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

// =============================================================================
// MARQUEE / INFINITE SCROLL
// =============================================================================
// Smooth infinite horizontal scroll. Pause on hover. Variable speed and direction.
// Uses CSS animation for performance with framer-motion for hover control.

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /** Speed in pixels per second */
  speed?: number;
  /** Scroll direction */
  direction?: "left" | "right";
  /** Pause on hover */
  pauseOnHover?: boolean;
  /** Gap between repeated items */
  gap?: number;
}

export function Marquee({
  children,
  className = "",
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  gap = 24,
}: MarqueeProps) {
  const prefersReduced = useReducedMotion();

  // We measure a rough width; the animation loops by translating 50%
  const directionMultiplier = direction === "left" ? -1 : 1;

  if (prefersReduced) {
    return (
      <div className={`flex overflow-hidden ${className}`} style={{ gap }}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={`group flex overflow-hidden ${className}`}
      style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}
    >
      <motion.div
        className="flex shrink-0"
        style={{ gap }}
        animate={{ x: [`${directionMultiplier === -1 ? "0%" : "-50%"}`, `${directionMultiplier === -1 ? "-50%" : "0%"}`] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 1000 / speed * 20,
            ease: "linear",
          },
        }}
        whileHover={pauseOnHover ? { x: undefined } : undefined}
      >
        {children}
        {/* Duplicate for seamless loop */}
        {children}
      </motion.div>
    </div>
  );
}

/** A convenience wrapper for marquee items */
export function MarqueeItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`shrink-0 ${className}`}>{children}</div>;
}
