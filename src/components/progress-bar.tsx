"use client";

import React, { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

// =============================================================================
// SPRING PHYSICS
// =============================================================================
// "smooth" — stiffness 300, damping 30, mass 1
//   Used for the fill bar width animation. Progress bars update frequently
//   (file uploads, loading states) and need smooth interpolation between
//   values without jitter. The spring creates satisfying overshoot on
//   completion (hitting 100%).
//
// "snappy" — stiffness 500, damping 30, mass 0.5
//   Used for the label/percentage counter entrance and stripe pattern.
// =============================================================================

const springs = {
  smooth: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
};

// =============================================================================
// TYPES
// =============================================================================

export interface ProgressBarProps {
  /** Progress value from 0 to 100 */
  value: number;
  /** Show percentage label */
  showLabel?: boolean;
  /** Custom label format */
  formatLabel?: (value: number) => string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Color variant */
  variant?: "default" | "success" | "warning" | "error" | "indigo";
  /** Animated stripe pattern (for indeterminate-like feel) */
  striped?: boolean;
  /** Indeterminate mode — ignores value, shows infinite animation */
  indeterminate?: boolean;
  /** Additional CSS classes */
  className?: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const sizeMap = {
  sm: { track: "h-1", label: "text-xs" },
  md: { track: "h-2", label: "text-sm" },
  lg: { track: "h-3", label: "text-sm" },
};

const variantColors: Record<string, string> = {
  default: "bg-neutral-900 dark:bg-white",
  success: "bg-green-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
  indigo: "bg-indigo-500",
};

// =============================================================================
// PROGRESS BAR
// =============================================================================

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(
  {
    value,
    showLabel = false,
    formatLabel = (v) => `${Math.round(v)}%`,
    size = "md",
    variant = "default",
    striped = false,
    indeterminate = false,
    className = "",
  },
  ref
) {
  const prefersReducedMotion = useReducedMotion();
  const s = sizeMap[size];
  const clampedValue = Math.max(0, Math.min(100, value));
  const color = variantColors[variant];

  // Auto-switch to success color at 100%
  const fillColor = clampedValue >= 100 && variant === "default" ? "bg-green-500" : color;

  return (
    <div ref={ref} className={`w-full ${className}`}>
      {/* Label */}
      {showLabel && !indeterminate && (
        <div className="flex items-center justify-between mb-1.5">
          <motion.span
            className={`font-medium text-neutral-900 dark:text-white ${s.label}`}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={springs.snappy}
          >
            {formatLabel(clampedValue)}
          </motion.span>
        </div>
      )}

      {/* Track */}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        className={`relative w-full rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden ${s.track}`}
      >
        {indeterminate ? (
          /* Indeterminate animation */
          <motion.div
            className={`absolute inset-y-0 rounded-full ${fillColor}`}
            style={{ width: "40%" }}
            animate={
              prefersReducedMotion
                ? {}
                : { left: ["-40%", "100%"] }
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ) : (
          /* Determinate fill */
          <motion.div
            className={`h-full rounded-full ${fillColor} ${
              striped && !prefersReducedMotion
                ? "bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:20px_100%] animate-[stripe_1s_linear_infinite]"
                : ""
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${clampedValue}%` }}
            transition={prefersReducedMotion ? { duration: 0 } : springs.smooth}
          />
        )}
      </div>
    </div>
  );
});
