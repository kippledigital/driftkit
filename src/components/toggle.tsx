"use client";

import React, { forwardRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

// =============================================================================
// SPRING PHYSICS
// =============================================================================
// "snappy" — stiffness 500, damping 30, mass 0.5
//   Used for the thumb slide. The toggle thumb needs to feel responsive and
//   tactile, landing with a tiny bounce that says "I'm physical." Low mass
//   keeps it nimble for a small element.
//
// "smooth" — stiffness 300, damping 30, mass 1
//   Used for background color morphing. The color transition should feel
//   like a dye spreading, not a hard swap. Slightly slower settling creates
//   a premium feel as the track fills/empties.
//
// "quick" — stiffness 500, damping 40, mass 0.3
//   Used for the press squish. Ultra-fast, no bounce — the horizontal
//   compression should feel instant-tactile like pressing a physical switch.
// =============================================================================

const springs = {
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
  smooth: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
  quick: { type: "spring" as const, stiffness: 500, damping: 40, mass: 0.3 },
};

// =============================================================================
// TYPES
// =============================================================================

export type ToggleSize = "sm" | "md" | "lg";

export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: ToggleSize;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

// =============================================================================
// SIZE CONFIGS
// =============================================================================

const sizeConfig: Record<
  ToggleSize,
  {
    track: { width: number; height: number };
    thumb: number;
    padding: number;
  }
> = {
  sm: { track: { width: 36, height: 20 }, thumb: 14, padding: 3 },
  md: { track: { width: 44, height: 24 }, thumb: 18, padding: 3 },
  lg: { track: { width: 56, height: 30 }, thumb: 22, padding: 4 },
};

// =============================================================================
// COMPONENT
// =============================================================================

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      size = "md",
      disabled = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const isControlled = controlledChecked !== undefined;
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const checked = isControlled ? controlledChecked : internalChecked;

    const config = sizeConfig[size];
    const thumbTravel =
      config.track.width - config.thumb - config.padding * 2;

    const handleClick = useCallback(() => {
      if (disabled) return;
      const next = !checked;
      if (!isControlled) setInternalChecked(next);
      onChange?.(next);
    }, [checked, disabled, isControlled, onChange]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          handleClick();
        }
      },
      [handleClick]
    );

    // Track colors — these animate via Framer Motion's spring interpolation
    const trackBgOff = "rgb(212, 212, 212)"; // neutral-300
    const trackBgOn = "rgb(34, 197, 94)"; // green-500
    const trackBgOffDark = "rgb(64, 64, 64)"; // neutral-700
    const trackBgOnDark = "rgb(34, 197, 94)";

    // We use CSS media query to pick dark/light, then animate between off/on
    // Framer Motion animates backgroundColor as a spring-interpolated value
    const isDark =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches;

    const trackBg = checked
      ? isDark
        ? trackBgOnDark
        : trackBgOn
      : isDark
        ? trackBgOffDark
        : trackBgOff;

    return (
      <motion.button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`relative inline-flex items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900 ${
          disabled ? "opacity-50 cursor-default" : "cursor-pointer"
        } ${className}`}
        style={{
          width: config.track.width,
          height: config.track.height,
          padding: config.padding,
        }}
        animate={{
          backgroundColor: trackBg,
        }}
        transition={springs.smooth}
        {...props}
      >
        {/* Thumb — slides with snappy spring, squishes on press */}
        <motion.span
          className="block rounded-full bg-white shadow-sm"
          style={{
            width: config.thumb,
            height: config.thumb,
          }}
          animate={{
            x: checked ? thumbTravel : 0,
            // Subtle scale bounce on landing — the thumb slightly overshoots
            // then settles, giving it that iOS-like physicality
            scale: 1,
          }}
          // Press squish: compress horizontally like iOS toggle.
          // scaleX shrinks while scaleY stays ~1, mimicking a rubber thumb
          // being pressed down against the track surface.
          whileTap={
            disabled || prefersReducedMotion
              ? undefined
              : { scaleX: 0.85, scaleY: 1.05 }
          }
          transition={{
            x: springs.snappy,
            scale: springs.snappy,
            scaleX: springs.quick,
            scaleY: springs.quick,
          }}
          aria-hidden
        />
      </motion.button>
    );
  }
);

Toggle.displayName = "Toggle";

export default Toggle;
