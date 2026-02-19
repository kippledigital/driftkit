"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";

// =============================================================================
// STAGGERED LIST
// =============================================================================
// WHY: Lists that appear all at once feel lifeless. Staggered entrance — where
// each item enters slightly after the previous one — creates a visual "cascade"
// that draws the eye downward and communicates hierarchy. Used by Linear, Notion,
// and every well-designed dashboard.
//
// HOW: Framer Motion's variant orchestration handles the stagger. The parent
// container uses staggerChildren to delay each child's animation. Each child
// has its own spring-animated entrance. Exit animations reverse the stagger.
//
// WHY spring over duration-based: Spring stagger feels organic. Each item
// overshoots slightly then settles, creating a wave-like motion. Duration-based
// stagger feels robotic — all items move identically, just offset.
// =============================================================================

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
};

const itemVariantsSlideUp: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 25, mass: 0.8 },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.97,
    transition: { type: "spring", stiffness: 500, damping: 30, mass: 0.5 },
  },
};

const itemVariantsFade: Variants = {
  hidden: { opacity: 0, filter: "blur(4px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    opacity: 0,
    filter: "blur(4px)",
    transition: { duration: 0.15 },
  },
};

const itemVariantsSlideLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { type: "spring", stiffness: 500, damping: 30 },
  },
};

const variantMap = {
  "slide-up": itemVariantsSlideUp,
  "fade-blur": itemVariantsFade,
  "slide-left": itemVariantsSlideLeft,
};

export interface StaggeredListProps {
  /** Array of items to render */
  items: { id: string; content: React.ReactNode }[];
  /** Animation variant. Default "slide-up" */
  variant?: "slide-up" | "fade-blur" | "slide-left";
  /** Extra class on each item wrapper */
  itemClassName?: string;
  className?: string;
}

export function StaggeredList({
  items,
  variant = "slide-up",
  itemClassName = "",
  className = "",
}: StaggeredListProps) {
  const prefersReducedMotion = useReducedMotion();
  const itemVariants = variantMap[variant];

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        {items.map((item) => (
          <div key={item.id} className={itemClassName}>
            {item.content}
          </div>
        ))}
      </div>
    );
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        key={items.map((i) => i.id).join(",")}
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            layout
            className={itemClassName}
          >
            {item.content}
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

export default StaggeredList;
