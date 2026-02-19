"use client";

import React, { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

// =============================================================================
// ANIMATED GRADIENT BORDER
// =============================================================================
// Rotating conic gradient border. The gradient spins continuously, creating
// a premium animated outline. Uses a pseudo-element technique for clean corners.

interface GradientBorderProps {
  children: ReactNode;
  className?: string;
  /** Border width in px */
  borderWidth?: number;
  /** Rotation duration in seconds */
  duration?: number;
  /** Gradient colors */
  colors?: string[];
}

export function GradientBorder({
  children,
  className = "",
  borderWidth = 2,
  duration = 3,
  colors = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#6366f1"],
}: GradientBorderProps) {
  const prefersReduced = useReducedMotion();

  const gradientStops = colors
    .map((c, i) => `${c} ${(i / (colors.length - 1)) * 100}%`)
    .join(", ");

  return (
    <div className={`relative rounded-[8px] ${className}`} style={{ padding: borderWidth }}>
      {/* Spinning gradient background */}
      <motion.div
        className="absolute inset-0 rounded-[8px]"
        style={{
          background: `conic-gradient(from 0deg, ${gradientStops})`,
        }}
        animate={prefersReduced ? undefined : { rotate: 360 }}
        transition={
          prefersReduced
            ? undefined
            : {
                duration,
                repeat: Infinity,
                ease: "linear",
              }
        }
      />
      {/* Extra blur layer for glow */}
      <motion.div
        className="absolute inset-0 rounded-[8px] blur-md opacity-40"
        style={{
          background: `conic-gradient(from 0deg, ${gradientStops})`,
        }}
        animate={prefersReduced ? undefined : { rotate: 360 }}
        transition={
          prefersReduced
            ? undefined
            : {
                duration,
                repeat: Infinity,
                ease: "linear",
              }
        }
      />
      {/* Inner content */}
      <div className="relative rounded-[6px] bg-white dark:bg-neutral-950 h-full">
        {children}
      </div>
    </div>
  );
}
