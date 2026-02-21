"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// =============================================================================
// SKELETON
// =============================================================================
// The shimmer uses CSS animation (ambient, not interactive = no spring needed).
// The important motion moment is the crossfade FROM skeleton TO real content —
// that uses spring physics for a satisfying reveal.
// =============================================================================

const springs = {
  smooth: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
};

export type SkeletonVariant = "text" | "avatar" | "card" | "custom";

export interface DriftSkeletonProps {
  variant?: SkeletonVariant;
  loaded?: boolean;
  children?: React.ReactNode;
  /** Width — only for text/custom variants */
  width?: string | number;
  /** Height — for all variants */
  height?: string | number;
  /** Number of text lines */
  lines?: number;
  /** Use pulse instead of shimmer */
  pulse?: boolean;
  className?: string;
}

// Shimmer gradient — CSS animation for ambient effect
const shimmerClass =
  "before:absolute before:inset-0 before:translate-x-[-100%] before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 dark:before:via-white/30 before:to-transparent";

const pulseClass = "animate-pulse";

function SkeletonBase({
  className = "",
  style,
  pulse,
  rounded = "rounded-[8px]",
}: {
  className?: string;
  style?: React.CSSProperties;
  pulse?: boolean;
  rounded?: string;
}) {
  return (
    <div
      className={`
        relative overflow-hidden
        bg-neutral-300/60 dark:bg-neutral-700/80
        ${rounded}
        ${pulse ? pulseClass : shimmerClass}
        ${className}
      `}
      style={style}
    />
  );
}

export function Skeleton({
  variant = "text",
  loaded = false,
  children,
  width,
  height,
  lines = 3,
  pulse = false,
  className = "",
}: DriftSkeletonProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      {loaded && children ? (
        <motion.div
          key="content"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={springs.smooth}
          className={className}
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          key="skeleton"
          initial={{ opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.15 }}
          className={className}
        >
          {variant === "avatar" && (
            <SkeletonBase
              rounded="rounded-full"
              style={{ width: height || 40, height: height || 40 }}
              pulse={pulse}
            />
          )}

          {variant === "card" && (
            <SkeletonBase
              style={{ width: width || "100%", height: height || 200 }}
              pulse={pulse}
            />
          )}

          {variant === "text" && (
            <div className="flex flex-col gap-2">
              {Array.from({ length: lines }).map((_, i) => (
                <SkeletonBase
                  key={i}
                  style={{
                    width: i === lines - 1 ? "60%" : width || "100%",
                    height: height || 16,
                  }}
                  pulse={pulse}
                />
              ))}
            </div>
          )}

          {variant === "custom" && (
            <SkeletonBase
              style={{ width: width || "100%", height: height || 40 }}
              pulse={pulse}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Skeleton;
