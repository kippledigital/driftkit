"use client";

import React, { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

// =============================================================================
// SPOTLIGHT / BEAM EFFECT
// =============================================================================
// Animated light beam that sweeps across text or cards. Creates a premium
// "shine" effect like light reflecting off metal. Pure CSS + motion values.

interface SpotlightProps {
  children: ReactNode;
  className?: string;
  /** Sweep duration in seconds */
  duration?: number;
  /** Delay between sweeps */
  delay?: number;
  /** Beam color */
  color?: string;
  /** Beam width as percentage */
  beamWidth?: number;
}

export function Spotlight({
  children,
  className = "",
  duration = 1.5,
  delay = 3,
  color = "rgba(255,255,255,0.15)",
  beamWidth = 30,
}: SpotlightProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      {!prefersReduced && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(105deg, transparent 0%, transparent ${50 - beamWidth / 2}%, ${color} 50%, transparent ${50 + beamWidth / 2}%, transparent 100%)`,
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["200% 0%", "-200% 0%"],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            repeatDelay: delay,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
}
