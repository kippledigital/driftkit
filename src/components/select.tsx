"use client";

import React, { useState, useRef, useEffect, useCallback, forwardRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// =============================================================================
// SPRING PHYSICS
// =============================================================================
// "snappy" — stiffness 500, damping 30, mass 0.5
//   Used for the dropdown open/close. The menu should snap open with authority
//   and close decisively. Low mass keeps it feeling lightweight.
//
// "quick" — stiffness 500, damping: 40, mass 0.3
//   Used for the focus highlight moving between options. Near-instant tracking
//   as the user moves through the list — no perceptible delay.
// =============================================================================

const springs = {
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
  quick: { type: "spring" as const, stiffness: 500, damping: 40, mass: 0.3 },
};

// =============================================================================
// TYPES
// =============================================================================

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface SelectProps {
  /** Available options */
  options: SelectOption[];
  /** Controlled value */
  value?: string;
  /** Default value for uncontrolled usage */
  defaultValue?: string;
  /** Change callback */
  onChange?: (value: string) => void;
  /** Placeholder when no value selected */
  placeholder?: string;
  /** Disable the entire select */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Additional CSS classes */
  className?: string;
}

// =============================================================================
// SELECT
// =============================================================================

export const Select = forwardRef<HTMLDivElement, SelectProps>(function Select(
  {
    options,
    value: controlledValue,
    defaultValue,
    onChange,
    placeholder = "Select...",
    disabled = false,
    error = false,
    className = "",
  },
  ref
) {
  const prefersReducedMotion = useReducedMotion();
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const selectedOption = options.find((o) => o.value === value);

  const handleSelect = useCallback(
    (optionValue: string) => {
      if (controlledValue === undefined) setInternalValue(optionValue);
      onChange?.(optionValue);
      setOpen(false);
    },
    [controlledValue, onChange]
  );

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
      e.preventDefault();
      setOpen(true);
      setFocusedIndex(options.findIndex((o) => o.value === value));
      return;
    }

    if (!open) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => {
          let next = prev + 1;
          while (next < options.length && options[next].disabled) next++;
          return next < options.length ? next : prev;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => {
          let next = prev - 1;
          while (next >= 0 && options[next].disabled) next--;
          return next >= 0 ? next : prev;
        });
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (focusedIndex >= 0 && !options[focusedIndex].disabled) {
          handleSelect(options[focusedIndex].value);
        }
        break;
    }
  };

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIndex >= 0 && listRef.current) {
      const el = listRef.current.children[focusedIndex] as HTMLElement;
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger */}
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={disabled}
        onClick={() => !disabled && setOpen(!open)}
        onKeyDown={handleKeyDown}
        className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border-2 text-sm text-left transition-colors
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${error
            ? "border-red-500"
            : open
            ? "border-neutral-900 dark:border-white"
            : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600"
          }
          bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white`}
        whileTap={disabled || prefersReducedMotion ? {} : { scale: 0.99 }}
        transition={springs.quick}
      >
        <span className={selectedOption ? "" : "text-neutral-400"}>
          {selectedOption ? (
            <span className="flex items-center gap-2">
              {selectedOption.icon}
              {selectedOption.label}
            </span>
          ) : (
            placeholder
          )}
        </span>

        {/* Chevron */}
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="shrink-0 text-neutral-400"
          animate={{ rotate: open ? 180 : 0 }}
          transition={springs.snappy}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={listRef}
            role="listbox"
            className="absolute z-50 w-full mt-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-lg overflow-hidden max-h-60 overflow-y-auto"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, scaleY: 0.95 }}
            transition={springs.snappy}
            style={{ originY: 0 }}
          >
            {options.map((option, i) => {
              const isSelected = option.value === value;
              const isFocused = i === focusedIndex;

              return (
                <button
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  disabled={option.disabled}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  onMouseEnter={() => setFocusedIndex(i)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors relative
                    ${option.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
                    ${isSelected ? "text-neutral-900 dark:text-white font-medium" : "text-neutral-600 dark:text-neutral-400"}
                  `}
                >
                  {/* Focus/hover highlight */}
                  {isFocused && !option.disabled && (
                    <motion.div
                      className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800"
                      layoutId="select-focus"
                      transition={springs.quick}
                      style={{ zIndex: -1 }}
                    />
                  )}

                  {option.icon && <span className="shrink-0">{option.icon}</span>}
                  <span className="flex-1">{option.label}</span>

                  {/* Check mark */}
                  {isSelected && (
                    <motion.svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="shrink-0 text-neutral-900 dark:text-white"
                      initial={prefersReducedMotion ? false : { scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={springs.snappy}
                    >
                      <path
                        d="M3 7L6 10L11 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
