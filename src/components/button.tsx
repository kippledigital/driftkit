"use client";

import React, { forwardRef, useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  type HTMLMotionProps,
  useReducedMotion,
} from "framer-motion";

// =============================================================================
// SPRING PHYSICS
// =============================================================================
// Why springs instead of bezier curves? Springs have no fixed duration — they
// respond to velocity and can be interrupted at any point, naturally blending
// into a new target. This makes hover→press→release feel alive instead of
// queued-up and robotic.
//
// "snappy" — stiffness 500, damping 30, mass 0.5
//   High stiffness + high damping = fast response with no overshoot.
//   Used for press/tap because tactile feedback needs to feel immediate.
//   The low mass (0.5) makes it feel nimble — small UI elements should
//   respond quicker than heavy panels.
//
// "smooth" — stiffness 300, damping 30, mass 1
//   Balanced stiffness with firm damping. Slight settling, no bounce.
//   Used for hover lift because it should feel natural and premium —
//   like something physically rising, not snapping into place.
//
// "quick" — stiffness 500, damping 40, mass 0.3
//   Ultra-fast, no bounce. Used for focus ring and subtle state changes
//   where you want "instant but not harsh."
// =============================================================================

const springs = {
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
  smooth: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
  quick: { type: "spring" as const, stiffness: 500, damping: 40, mass: 0.3 },
};

// =============================================================================
// TYPES
// =============================================================================

export type ButtonVariant = "default" | "secondary" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export interface DriftButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  success?: boolean;
  children: React.ReactNode;
}

// =============================================================================
// STYLES
// =============================================================================

const baseClasses =
  "relative inline-flex items-center justify-center font-medium rounded-[8px] focus:outline-none select-none overflow-hidden";

// No Tailwind hover: classes — Framer Motion handles all hover states.
// Mixing CSS transitions with spring animations causes visual glitches.
const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
  secondary:
    "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100",
  ghost:
    "bg-transparent text-neutral-700 dark:text-neutral-300",
  destructive:
    "bg-red-600 text-white dark:bg-red-500",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-sm px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2 gap-2",
  lg: "text-base px-6 py-2.5 gap-2.5",
};

// Shadow values — the hover "lift" is communicated through shadow depth.
// Press "sink" flattens the shadow. This is a micro-skeuomorphic cue
// that makes the button feel physical without any 3D transforms.
const shadowIdle = "0 1px 2px 0 rgba(0,0,0,0.05)";
const shadowHover = "0 4px 12px -2px rgba(0,0,0,0.12)";
const shadowPress = "0 1px 1px 0 rgba(0,0,0,0.04)";

// =============================================================================
// ICONS (inline SVGs to keep the component self-contained)
// =============================================================================

const Spinner = () => (
  <motion.svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1, rotate: 360 }}
    exit={{ opacity: 0, scale: 0.5 }}
    transition={{
      opacity: { duration: 0.15 },
      scale: springs.snappy,
      rotate: { duration: 0.8, repeat: Infinity, ease: "linear" },
    }}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="3"
      fill="none"
      strokeDasharray="32 32"
      strokeLinecap="round"
    />
  </motion.svg>
);

const Checkmark = () => (
  <motion.svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5 }}
    transition={springs.snappy}
  >
    <motion.path
      d="M5 13l4 4L19 7"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    />
  </motion.svg>
);

// =============================================================================
// COMPONENT
// =============================================================================

export const Button = forwardRef<HTMLButtonElement, DriftButtonProps>(
  (
    {
      variant = "default",
      size = "md",
      loading = false,
      success = false,
      disabled,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const [isFocusVisible, setIsFocusVisible] = useState(false);

    const handleFocus = useCallback((e: React.FocusEvent<HTMLButtonElement>) => {
      // Only show focus ring for keyboard navigation
      if (e.target.matches(":focus-visible")) setIsFocusVisible(true);
    }, []);
    const handleBlur = useCallback(() => setIsFocusVisible(false), []);

    const isDisabled = disabled || loading;

    // When prefers-reduced-motion is on, we skip scale/shadow animations
    // but keep opacity transitions so state changes are still communicated.
    const hoverAnimation = prefersReducedMotion
      ? {}
      : { scale: 1.02, boxShadow: shadowHover };

    const tapAnimation = prefersReducedMotion
      ? {}
      : { scale: 0.97, boxShadow: shadowPress };

    return (
      <motion.button
        ref={ref}
        disabled={isDisabled}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
          isDisabled ? "opacity-60 cursor-default" : "cursor-pointer"
        } ${className}`}
        // Idle state — layout animation smooths width changes during state transitions
        layout
        initial={false}
        animate={{
          boxShadow: variant === "ghost" ? "none" : shadowIdle,
        }}
        // Gesture animations — springs make these interruptible.
        // If you hover and immediately press, the scale spring blends
        // from 1.02 → 0.97 using the current velocity, not from scratch.
        whileHover={isDisabled ? undefined : hoverAnimation}
        whileTap={isDisabled ? undefined : tapAnimation}
        transition={{
          ...springs.smooth,
          boxShadow: { type: "tween", duration: 0.15, ease: "easeOut" },
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        {/* Focus ring — animated with quick spring for snappy keyboard nav feedback */}
        <AnimatePresence>
          {isFocusVisible && (
            <motion.span
              className="absolute inset-0 rounded-[8px] ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-neutral-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={springs.quick}
              aria-hidden
            />
          )}
        </AnimatePresence>

        {/* Content — AnimatePresence handles loading/success/default transitions.
            We use layout + min-width on the button to prevent size jumps when
            text changes between states (Submit → Loading… → Done). */}
        <AnimatePresence mode="popLayout" initial={false}>
          {loading ? (
            <motion.span
              key="loading"
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Spinner />
              <span>Loading…</span>
            </motion.span>
          ) : success ? (
            <motion.span
              key="success"
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Checkmark />
              <span>Done</span>
            </motion.span>
          ) : (
            <motion.span
              key="default"
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
