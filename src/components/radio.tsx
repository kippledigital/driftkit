"use client";

import React, { useState, createContext, useContext, forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

// =============================================================================
// SPRING PHYSICS
// =============================================================================
// "snappy" — stiffness 500, damping 30, mass 0.5
//   Used for the inner dot entrance. The selection dot should pop in
//   with a subtle scale overshoot — like a bubble forming.
//
// "quick" — stiffness 500, damping 40, mass 0.3
//   Used for the press squish on the outer ring. Instant tactile
//   feedback when clicking.
// =============================================================================

const springs = {
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
  quick: { type: "spring" as const, stiffness: 500, damping: 40, mass: 0.3 },
};

// =============================================================================
// TYPES
// =============================================================================

export interface RadioGroupProps {
  /** Controlled value */
  value?: string;
  /** Default value for uncontrolled usage */
  defaultValue?: string;
  /** Change callback */
  onChange?: (value: string) => void;
  /** Disable all radios */
  disabled?: boolean;
  /** Layout direction */
  orientation?: "horizontal" | "vertical";
  /** Additional CSS classes */
  className?: string;
  children: React.ReactNode;
}

export interface RadioProps {
  /** Value for this option */
  value: string;
  /** Label text */
  label?: string;
  /** Description text below label */
  description?: string;
  /** Disable this radio */
  disabled?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes */
  className?: string;
}

// =============================================================================
// CONTEXT
// =============================================================================

interface RadioContextValue {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const RadioContext = createContext<RadioContextValue | null>(null);

// =============================================================================
// CONSTANTS
// =============================================================================

const sizeMap = {
  sm: { ring: "w-4 h-4", dot: "w-1.5 h-1.5", label: "text-sm", desc: "text-xs" },
  md: { ring: "w-5 h-5", dot: "w-2 h-2", label: "text-sm", desc: "text-xs" },
  lg: { ring: "w-6 h-6", dot: "w-2.5 h-2.5", label: "text-base", desc: "text-sm" },
};

// =============================================================================
// RADIO GROUP
// =============================================================================

export function RadioGroup({
  value: controlledValue,
  defaultValue = "",
  onChange,
  disabled = false,
  orientation = "vertical",
  className = "",
  children,
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (newValue: string) => {
    if (controlledValue === undefined) setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <RadioContext.Provider value={{ value, onChange: handleChange, disabled }}>
      <div
        role="radiogroup"
        className={`flex ${
          orientation === "horizontal" ? "flex-row gap-6" : "flex-col gap-3"
        } ${className}`}
      >
        {children}
      </div>
    </RadioContext.Provider>
  );
}

// =============================================================================
// RADIO
// =============================================================================

export const Radio = forwardRef<HTMLButtonElement, RadioProps>(function Radio(
  { value, label, description, disabled: itemDisabled = false, size = "md", className = "" },
  ref
) {
  const prefersReducedMotion = useReducedMotion();
  const context = useContext(RadioContext);

  if (!context) {
    throw new Error("Radio must be used within a RadioGroup");
  }

  const isDisabled = context.disabled || itemDisabled;
  const isSelected = context.value === value;
  const s = sizeMap[size];

  const handleSelect = () => {
    if (isDisabled) return;
    context.onChange(value);
  };

  return (
    <label
      className={`inline-flex items-start gap-3 ${
        isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      <motion.button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={isSelected}
        disabled={isDisabled}
        onClick={handleSelect}
        className={`relative flex items-center justify-center shrink-0 rounded-full border-2 transition-colors
          ${s.ring}
          ${isSelected
            ? "border-neutral-900 dark:border-white"
            : "border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500"
          }`}
        whileTap={isDisabled || prefersReducedMotion ? {} : { scale: 0.85 }}
        transition={springs.quick}
      >
        {/* Inner dot */}
        {isSelected && (
          <motion.div
            className={`rounded-full bg-neutral-900 dark:bg-white ${s.dot}`}
            initial={prefersReducedMotion ? false : { scale: 0 }}
            animate={{ scale: 1 }}
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
