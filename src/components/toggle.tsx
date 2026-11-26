"use client";

/**
 * Toggle
 * =============================================================================
 * The thumb slides on the `snappy` spring. While pressed it stretches toward
 * the side it's about to travel to, like the iOS switch: it previews the
 * outcome before you let go.
 *
 * Track color is a CSS transition on classes, so it follows your app's dark
 * mode (class or media query) and never mismatches on server render.
 *
 * It's a native <button role="switch">, so Space and Enter work without any
 * key handling of our own.
 *
 * Needs: ./motion.ts
 * =============================================================================
 */

import React, { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { useMotionPrefs } from "./motion";

export type ToggleSize = "sm" | "md" | "lg";

export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: ToggleSize;
  disabled?: boolean;
  className?: string;
  /** Tailwind background class for the "on" track. Default bg-green-500. */
  onClassName?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

const sizes: Record<ToggleSize, { w: number; h: number; thumb: number; pad: number; stretch: number }> = {
  sm: { w: 36, h: 20, thumb: 14, pad: 3, stretch: 4 },
  md: { w: 44, h: 24, thumb: 18, pad: 3, stretch: 5 },
  lg: { w: 56, h: 30, thumb: 22, pad: 4, stretch: 6 },
};

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  { checked: controlled, defaultChecked = false, onChange, size = "md", disabled = false, className = "", onClassName = "bg-green-500", ...aria },
  ref
) {
  const m = useMotionPrefs();
  const [internal, setInternal] = useState(defaultChecked);
  const [pressed, setPressed] = useState(false);
  const checked = controlled ?? internal;
  const s = sizes[size];
  const travel = s.w - s.thumb - s.pad * 2;
  const stretch = pressed && !m.reduced ? s.stretch : 0;

  const flip = () => {
    if (disabled) return;
    const next = !checked;
    if (controlled === undefined) setInternal(next);
    onChange?.(next);
  };

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={flip}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      className={`relative inline-flex shrink-0 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900 ${
        checked ? onClassName : "bg-neutral-300 dark:bg-neutral-700"
      } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${className}`}
      style={{ width: s.w, height: s.h, padding: s.pad }}
      {...aria}
    >
      <motion.span
        aria-hidden
        className="block rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
        style={{ height: s.thumb }}
        initial={false}
        animate={{
          width: s.thumb + stretch,
          // When on, grow leftward so the thumb stays pinned to the right edge.
          x: checked ? travel - stretch : 0,
        }}
        transition={m.spring("snappy")}
      />
    </button>
  );
});

export default Toggle;
