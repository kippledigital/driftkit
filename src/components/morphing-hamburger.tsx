"use client";

import React, { useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

// =============================================================================
// MORPHING HAMBURGER
// =============================================================================
// WHY: The humble hamburger icon is a missed opportunity. Most toggle to an X
// via CSS rotation — boring. This one morphs each line individually using
// spring physics: the top/bottom lines rotate into an X while the middle line
// fades and scales to zero. The result feels like the icon is *folding* into
// the X, not being replaced.
//
// HOW: Three SVG lines, each with independent spring-animated transforms.
// Top line: translates down + rotates 45°. Bottom: translates up + rotates -45°.
// Middle: scales to 0 horizontally (collapses to center). The whole icon gets
// a subtle rotation too, adding organic feel.
// =============================================================================

const LINE_SPRING = { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.8 };

export interface MorphingHamburgerProps {
  /** Controlled open state */
  open?: boolean;
  /** Callback when toggled */
  onToggle?: (open: boolean) => void;
  /** Size in px. Default 40 */
  size?: number;
  className?: string;
}

export function MorphingHamburger({
  open: controlledOpen,
  onToggle,
  size = 40,
  className = "",
}: MorphingHamburgerProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isOpen = controlledOpen ?? internalOpen;

  const toggle = useCallback(() => {
    const next = !isOpen;
    setInternalOpen(next);
    onToggle?.(next);
  }, [isOpen, onToggle]);

  const strokeWidth = 2;
  // Lines at y=7, y=12, y=17 in a 24x24 viewBox
  const topY = 7;
  const midY = 12;
  const botY = 17;

  return (
    <motion.button
      type="button"
      onClick={toggle}
      className={`inline-flex items-center justify-center rounded-[8px] cursor-pointer
        bg-neutral-100 dark:bg-neutral-800 
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        ${className}`}
      style={{ width: size, height: size }}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
      transition={LINE_SPRING}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <motion.svg
        viewBox="0 0 24 24"
        width={size * 0.5}
        height={size * 0.5}
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={LINE_SPRING}
      >
        {/* Top line → rotates 45° and moves to center */}
        <motion.line
          x1={5} x2={19}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-neutral-800 dark:text-neutral-100"
          animate={{
            y1: isOpen ? midY : topY,
            y2: isOpen ? midY : topY,
            rotate: isOpen ? 45 : 0,
          }}
          style={{ transformOrigin: "center" }}
          transition={LINE_SPRING}
        />
        {/* Middle line → collapses to nothing */}
        <motion.line
          x1={5} x2={19}
          y1={midY} y2={midY}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-neutral-800 dark:text-neutral-100"
          animate={{
            opacity: isOpen ? 0 : 1,
            scaleX: isOpen ? 0 : 1,
          }}
          style={{ transformOrigin: "center" }}
          transition={LINE_SPRING}
        />
        {/* Bottom line → rotates -45° and moves to center */}
        <motion.line
          x1={5} x2={19}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-neutral-800 dark:text-neutral-100"
          animate={{
            y1: isOpen ? midY : botY,
            y2: isOpen ? midY : botY,
            rotate: isOpen ? -45 : 0,
          }}
          style={{ transformOrigin: "center" }}
          transition={LINE_SPRING}
        />
      </motion.svg>
    </motion.button>
  );
}

export default MorphingHamburger;
