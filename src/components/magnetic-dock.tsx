"use client";

import React, { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion";

// =============================================================================
// MAGNETIC DOCK
// =============================================================================
// WHY: The macOS Dock is one of the most satisfying micro-interactions ever
// designed. Items scale up as the cursor approaches, with neighbors scaling
// proportionally less — creating a "fisheye" magnification lens. It communicates
// "you're about to select this" with zero cognitive load.
//
// HOW: A shared mouseX motion value tracks cursor position across the dock.
// Each item calculates its distance from the cursor and derives a scale factor
// using useTransform. Close items scale to ~1.5x, far items stay at 1x.
// Springs smooth the transitions so items don't snap.
//
// WHY useTransform over manual math: useTransform creates a reactive pipeline
// that runs outside React's render cycle. The mouse moves 60fps, and all
// calculations happen in Framer Motion's animation frame — zero re-renders.
// =============================================================================

const DOCK_SPRING = { stiffness: 400, damping: 25, mass: 0.5 };

export interface DockItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export interface MagneticDockProps {
  items: DockItem[];
  /** Max scale for the hovered item. Default 1.5 */
  maxScale?: number;
  /** Distance in px that affects scaling. Default 80 */
  magneticRange?: number;
  className?: string;
}

function DockIcon({
  item,
  mouseX,
  index,
  itemWidth,
  maxScale,
  magneticRange,
}: {
  item: DockItem;
  mouseX: MotionValue<number>;
  index: number;
  itemWidth: number;
  maxScale: number;
  magneticRange: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Distance from cursor to this item's center
  const distance = useTransform(mouseX, (val: number) => {
    if (!ref.current || val === -999) return magneticRange + 1;
    const rect = ref.current.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    return Math.abs(val - center);
  });

  // Map distance → scale: close = maxScale, far = 1
  const rawScale = useTransform(
    distance,
    [0, magneticRange],
    [maxScale, 1]
  );

  const scale = useSpring(rawScale, DOCK_SPRING);

  return (
    <motion.button
      ref={ref}
      onClick={item.onClick}
      className="group relative flex flex-col items-center justify-center cursor-pointer
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-[8px]"
      style={{ width: itemWidth, height: itemWidth }}
      whileTap={prefersReducedMotion ? undefined : { scale: maxScale * 0.85 }}
      transition={DOCK_SPRING}
      aria-label={item.label}
    >
      {/* Icon container */}
      <motion.div
        className="flex items-center justify-center w-full h-full rounded-[8px]
          bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700
          shadow-sm"
        style={{ scale }}
      >
        <span className="text-xl">{item.icon}</span>
      </motion.div>

      {/* Label tooltip — shows on hover */}
      <motion.span
        className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs
          rounded-[6px] bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900
          whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none
          transition-opacity duration-150"
      >
        {item.label}
      </motion.span>
    </motion.button>
  );
}

export function MagneticDock({
  items,
  maxScale = 1.5,
  magneticRange = 80,
  className = "",
}: MagneticDockProps) {
  const mouseX = useMotionValue(-999);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => mouseX.set(e.clientX),
    [mouseX]
  );

  const handleMouseLeave = useCallback(
    () => mouseX.set(-999),
    [mouseX]
  );

  const itemWidth = 48;

  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-2xl
        bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md
        border border-neutral-200 dark:border-neutral-800
        shadow-lg ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {items.map((item, i) => (
        <DockIcon
          key={item.id}
          item={item}
          mouseX={mouseX}
          index={i}
          itemWidth={itemWidth}
          maxScale={maxScale}
          magneticRange={magneticRange}
        />
      ))}
    </motion.div>
  );
}

export default MagneticDock;
