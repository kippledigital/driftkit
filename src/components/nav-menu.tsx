"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// =============================================================================
// NAVIGATION MENU
// =============================================================================
// The star here is the sliding indicator — a shared layout animation (layoutId)
// that follows your mouse between nav items with spring physics. This is the
// same technique Linear and Vercel use for their nav hovers.
//
// Why layoutId instead of manual position calculation? Framer's layout system
// automatically interpolates position AND size between elements, handling
// variable-width nav items gracefully. Springs make the follow feel physical.
// =============================================================================

const springs = {
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
  smooth: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
};

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface DriftNavMenuProps {
  items: NavItem[];
  activeId?: string;
  onActiveChange?: (id: string) => void;
  className?: string;
}

export function NavMenu({
  items,
  activeId,
  onActiveChange,
  className = "",
}: DriftNavMenuProps) {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <nav
      className={`flex items-center gap-1 p-1 rounded-[8px] bg-neutral-100 dark:bg-neutral-900 ${className}`}
      onMouseLeave={() => setHoveredId(null)}
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        const isHovered = item.id === hoveredId;

        return (
          <button
            key={item.id}
            className={`
              relative px-4 py-2 text-sm font-medium rounded-[6px]
              transition-none outline-none
              ${
                isActive
                  ? "text-neutral-900 dark:text-neutral-100"
                  : "text-neutral-500 dark:text-neutral-400"
              }
            `}
            onMouseEnter={() => setHoveredId(item.id)}
            onClick={() => {
              onActiveChange?.(item.id);
              item.onClick?.();
            }}
          >
            {/* Hover indicator — follows mouse between items via layoutId */}
            {isHovered && !isActive && (
              <motion.div
                layoutId="nav-hover"
                className="absolute inset-0 rounded-[6px] bg-neutral-200/60 dark:bg-neutral-800/60"
                transition={prefersReducedMotion ? { duration: 0 } : springs.smooth}
              />
            )}

            {/* Active indicator — persists, separate layoutId from hover */}
            {isActive && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 rounded-[6px] bg-white dark:bg-neutral-800 shadow-sm"
                transition={prefersReducedMotion ? { duration: 0 } : springs.snappy}
              />
            )}

            <span className="relative z-10">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default NavMenu;
