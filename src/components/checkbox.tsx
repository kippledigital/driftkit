"use client";

import React, { useState, forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

// =============================================================================
// SPRING PHYSICS
// =============================================================================
// "snappy" — stiffness 500, damping 30, mass 0.5
//   Used for the check mark entrance. The checkmark should pop into
//   existence with a satisfying bounce — like stamping a seal.
//
// "quick" — stiffness 500, damping 40, mass 0.3
//   Used for the press squish. The box compresses slightly on click
//   to give tactile feedback before the check appears.
// =============================================================================

const springs = {
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
  quick: { type: "spring" as const, stiffness: 500, damping: 40, mass: 0.3 },
};

// =============================================================================
// TYPES
// =============================================================================

export interface CheckboxProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Default checked for uncontrolled usage */
  defaultChecked?: boolean;
  /** Change callback */
  onChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Description text below label */
  description?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Indeterminate state (overrides checked visually) */
  indeterminate?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes */
  className?: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const sizeMap = {
  sm: { box: "w-4 h-4", icon: 10, label: "text-sm", desc: "text-xs" },
  md: { box: "w-5 h-5", icon: 12, label: "text-sm", desc: "text-xs" },
  lg: { box: "w-6 h-6", icon: 14, label: "text-base", desc: "text-sm" },
};

// =============================================================================
// CHECKBOX
// =============================================================================

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  {
    checked: controlledChecked,
    defaultChecked = false,
    onChange,
    label,
    description,
    disabled = false,
    indeterminate = false,
    size = "md",
    className = "",
  },
  ref
) {
  const prefersReducedMotion = useReducedMotion();
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const checked = controlledChecked !== undefined ? controlledChecked : internalChecked;
  const isActive = indeterminate || checked;
  const s = sizeMap[size];

  const handleToggle = () => {
    if (disabled) return;
    const next = !checked;
    if (controlledChecked === undefined) setInternalChecked(next);
    onChange?.(next);
  };

  // Checkmark path animation
  const checkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1 },
  };

  const indeterminateVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: { scaleX: 1, opacity: 1 },
  };

  return (
    <label
      className={`inline-flex items-start gap-3 ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      <motion.button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={indeterminate ? "mixed" : checked}
        disabled={disabled}
        onClick={handleToggle}
        className={`relative flex items-center justify-center shrink-0 rounded-md border-2 transition-colors
          ${s.box}
          ${isActive
            ? "bg-neutral-900 dark:bg-white border-neutral-900 dark:border-white"
            : "bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500"
          }`}
        whileTap={disabled || prefersReducedMotion ? {} : { scale: 0.85 }}
        transition={springs.quick}
      >
        {/* Checkmark */}
        {checked && !indeterminate && (
          <motion.svg
            width={s.icon}
            height={s.icon}
            viewBox="0 0 14 14"
            fill="none"
            className="text-white dark:text-neutral-900"
            initial={prefersReducedMotion ? "visible" : "hidden"}
            animate="visible"
          >
            <motion.path
              d="M3 7L6 10L11 4"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={checkVariants}
              transition={springs.snappy}
            />
          </motion.svg>
        )}

        {/* Indeterminate dash */}
        {indeterminate && (
          <motion.div
            className="w-2/3 h-0.5 rounded-full bg-white dark:bg-neutral-900"
            initial={prefersReducedMotion ? "visible" : "hidden"}
            animate="visible"
            variants={indeterminateVariants}
            transition={springs.snappy}
          />
        )}
      </motion.button>

      {/* Label + description */}
      {(label || description) && (
        <div className="pt-0.5">
          {label && (
            <span className={`block font-medium text-neutral-900 dark:text-white ${s.label}`}>
              {label}
            </span>
          )}
          {description && (
            <span className={`block text-neutral-500 dark:text-neutral-400 mt-0.5 ${s.desc}`}>
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
});
