"use client";

/**
 * Cursor Trail
 * =============================================================================
 * Each dot follows the pointer on a slightly softer spring than the last, so
 * the trail stretches when you move fast and gathers when you stop.
 *
 * Pointer position lives in motion values, so moving the mouse never
 * re-renders React. The trail is purely decorative: hidden from screen
 * readers, off for touch, and off when reduced motion is requested.
 * =============================================================================
 */

import React, { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, type MotionValue } from "framer-motion";

export interface CursorTrailProps {
  /** Number of trail dots. Default 8 */
  count?: number;
  /** Dot size in px. Default 8 */
  size?: number;
  /** Color of the dots. Default "currentColor" (a rainbow). */
  color?: string;
  className?: string;
}

function TrailDot({ x, y, size, color, index, total }: { x: MotionValue<number>; y: MotionValue<number>; size: number; color: string; index: number; total: number }) {
  const config = { stiffness: Math.max(60, 220 - index * 18), damping: 22, mass: 0.25 };
  const sx = useSpring(x, config);
  const sy = useSpring(y, config);
  const s = size * (1 - (index / total) * 0.6);
  const fill = color === "currentColor" ? `hsl(${(index / total) * 360}, 85%, 60%)` : color;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50 rounded-full"
      style={{
        x: sx,
        y: sy,
        width: s,
        height: s,
        marginLeft: -s / 2,
        marginTop: -s / 2,
        opacity: 1 - (index / total) * 0.8,
        backgroundColor: fill,
      }}
    />
  );
}

export function CursorTrail({ count = 8, size = 8, color = "currentColor", className = "" }: CursorTrailProps) {
  const reduced = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    if (reduced) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduced, x, y]);

  if (reduced) return null;

  return (
    <div className={className}>
      {Array.from({ length: count }, (_, i) => (
        <TrailDot key={i} x={x} y={y} size={size} color={color} index={i} total={count} />
      ))}
    </div>
  );
}

export default CursorTrail;
