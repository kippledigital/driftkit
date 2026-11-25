"use client";

/**
 * Magnetic Dock
 * =============================================================================
 * A real fisheye: icons grow in width, not just scale, so their neighbors make
 * room instead of being overlapped, like the macOS dock. Size follows pointer
 * distance through a cosine falloff (smooth at the edges, no visible "edge" to
 * the effect), then a `bouncy` spring adds just enough life.
 *
 * Works with keyboard too: the focused icon grows as if the pointer were on it.
 * Labels sit above the grown icon, and reduced motion turns magnification off.
 *
 * Needs: ./motion.ts
 * =============================================================================
 */

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { springValue, useMotionPrefs } from "./motion";

export interface DockItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export interface MagneticDockProps {
  items: DockItem[];
  /** Largest size as a multiple of the base size. Default 1.6. */
  maxScale?: number;
  /** How far (px) the effect reaches from the pointer. Default 110. */
  magneticRange?: number;
  /** Base icon size in px. Default 44. */
  size?: number;
  className?: string;
}

function DockIcon({
  item,
  pointerX,
  base,
  max,
  range,
  reduced,
}: {
  item: DockItem;
  pointerX: MotionValue<number>;
  base: number;
  max: number;
  range: number;
  reduced: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const focused = useMotionValue(0);

  const target = useTransform([pointerX, focused], ([x, f]: number[]) => {
    if (reduced) return base;
    if (f) return max;
    const el = ref.current;
    if (!el || !Number.isFinite(x)) return base;
    const r = el.getBoundingClientRect();
    const d = Math.abs(x - (r.left + r.width / 2));
    if (d >= range) return base;
    // Cosine falloff: 1 at the pointer, easing smoothly to 0 at the edge of range.
    const t = (Math.cos((d / range) * Math.PI) + 1) / 2;
    return base + (max - base) * t;
  });
  const width = useSpring(target, springValue.bouncy);
  const iconScale = useTransform(width, [base, max], [1, 1.18]);

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={item.onClick}
      onFocus={(e) => e.currentTarget.matches(":focus-visible") && focused.set(1)}
      onBlur={() => focused.set(0)}
      aria-label={item.label}
      style={{ width, height: width }}
      className="group relative flex shrink-0 items-center justify-center self-end rounded-[12px] border border-neutral-200 bg-neutral-100 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800"
      whileTap={reduced ? undefined : { scale: 0.92 }}
    >
      <motion.span className="pointer-events-none text-xl leading-none" style={{ scale: iconScale }}>
        {item.icon}
      </motion.span>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-[6px] bg-neutral-900 px-2 py-1 text-xs text-white opacity-0 transition duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 dark:bg-neutral-100 dark:text-neutral-900"
      >
        {item.label}
      </span>
    </motion.button>
  );
}

export function MagneticDock({ items, maxScale = 1.6, magneticRange = 110, size = 44, className = "" }: MagneticDockProps) {
  const m = useMotionPrefs();
  const pointerX = useMotionValue(Number.POSITIVE_INFINITY);
  const max = size * maxScale;

  return (
    <nav
      aria-label="Dock"
      onPointerMove={(e) => e.pointerType === "mouse" && pointerX.set(e.clientX)}
      onPointerLeave={() => pointerX.set(Number.POSITIVE_INFINITY)}
      className={`inline-flex items-end gap-2 rounded-[18px] border border-neutral-200 bg-white/80 px-2.5 pb-2.5 pt-2.5 shadow-lg backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/80 ${className}`}
      style={{ height: max + 20 }}
    >
      {items.map((item) => (
        <DockIcon key={item.id} item={item} pointerX={pointerX} base={size} max={max} range={magneticRange} reduced={m.reduced} />
      ))}
    </nav>
  );
}

export default MagneticDock;
