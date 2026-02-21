"use client";

import React, { forwardRef, useState, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// =============================================================================
// SPRING PHYSICS — matching button.tsx system
// =============================================================================
const springs = {
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
  smooth: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
  quick: { type: "spring" as const, stiffness: 500, damping: 40, mass: 0.3 },
};

// Error shake — spring-based oscillation feels more natural than CSS keyframes.
// High stiffness + low damping = quick oscillations that die out naturally.
const shakeVariants = {
  idle: { x: 0 },
  shake: {
    x: [0, -6, 6, -4, 4, -2, 0],
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

// =============================================================================
// TYPES
// =============================================================================

export type InputSize = "sm" | "md" | "lg";
export type InputState = "default" | "error" | "success";

export interface DriftInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  size?: InputSize;
  state?: InputState;
  errorMessage?: string;
}

// =============================================================================
// STYLES
// =============================================================================

const sizeClasses: Record<InputSize, { input: string; label: string }> = {
  sm: { input: "text-sm px-3 pt-4 pb-1.5", label: "text-xs left-3" },
  md: { input: "text-sm px-4 pt-5 pb-2", label: "text-xs left-4" },
  lg: { input: "text-base px-4 pt-6 pb-2.5", label: "text-sm left-4" },
};

const borderColors: Record<InputState, string> = {
  default: "border-neutral-300 dark:border-neutral-700",
  error: "border-red-500 dark:border-red-400",
  success: "border-emerald-500 dark:border-emerald-400",
};

// =============================================================================
// COMPONENT
// =============================================================================

export const Input = forwardRef<HTMLInputElement, DriftInputProps>(
  (
    {
      label,
      size = "md",
      state = "default",
      errorMessage,
      className = "",
      onFocus,
      onBlur,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(
      !!(value || defaultValue || props.placeholder)
    );
    const id = useId();
    const inputId = props.id || id;

    const isFloated = isFocused || hasValue;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    return (
      <div className="flex flex-col gap-1">
        <motion.div
          className="relative"
          variants={shakeVariants}
          animate={state === "error" ? "shake" : "idle"}
        >
          {/* Animated focus ring — springs in for snappy keyboard feedback */}
          <AnimatePresence>
            {isFocused && (
              <motion.div
                className={`absolute -inset-[3px] rounded-[11px] ${
                  state === "error"
                    ? "bg-red-500/10"
                    : state === "success"
                    ? "bg-emerald-500/10"
                    : "bg-blue-500/10"
                }`}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={springs.quick}
              />
            )}
          </AnimatePresence>

          {/* Floating label */}
          {label && (
            <motion.label
              htmlFor={inputId}
              className={`absolute ${sizeClasses[size].label} pointer-events-none text-neutral-500 dark:text-neutral-400 origin-left`}
              animate={{
                y: isFloated ? 4 : size === "lg" ? 14 : size === "md" ? 10 : 6,
                scale: isFloated ? 0.75 : 1,
                color: isFocused
                  ? state === "error"
                    ? "rgb(239 68 68)"
                    : state === "success"
                    ? "rgb(16 185 129)"
                    : "rgb(59 130 246)"
                  : "",
              }}
              transition={prefersReducedMotion ? { duration: 0 } : springs.smooth}
            >
              {label}
            </motion.label>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`
              relative w-full rounded-[8px] border bg-white dark:bg-neutral-900
              text-neutral-900 dark:text-neutral-100
              outline-none leading-tight
              placeholder:text-neutral-400 dark:placeholder:text-neutral-500
              ${sizeClasses[size].input}
              ${borderColors[state]}
              ${props.disabled ? "opacity-60 cursor-default" : ""}
              ${className}
            `}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            value={value}
            defaultValue={defaultValue}
            {...props}
          />

          {/* Success checkmark */}
          <AnimatePresence>
            {state === "success" && (
              <motion.div
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={springs.snappy}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Error message */}
        <AnimatePresence>
          {state === "error" && errorMessage && (
            <motion.p
              className="text-xs text-red-500 dark:text-red-400 px-1"
              initial={{ opacity: 0, y: -4, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -4, height: 0 }}
              transition={springs.quick}
            >
              {errorMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
