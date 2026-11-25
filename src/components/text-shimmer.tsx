"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface TextShimmerProps {
  children: string;
  /** Duration of one gradient sweep in seconds. Default 2.5 */
  duration?: number;
  /** Gradient colors. Default: neutral to highlight to neutral */
  className?: string;
}

export function TextShimmer({
  children,
  duration = 2.5,
  className = "",
}: TextShimmerProps) {
  // A looping sweep is exactly what reduced motion asks us not to do.
  const reduced = useReducedMotion();
  if (reduced) return <span className={`text-neutral-600 dark:text-neutral-300 ${className}`}>{children}</span>;
  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent bg-[length:200%_100%] bg-gradient-to-r from-neutral-400 via-neutral-900 to-neutral-400 dark:from-neutral-600 dark:via-neutral-100 dark:to-neutral-600 ${className}`}
      animate={{ backgroundPosition: ["200% center", "-200% center"] }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.span>
  );
}

export default TextShimmer;
