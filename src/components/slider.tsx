"use client";

import React, { useState, useRef, useCallback, useEffect, forwardRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// =============================================================================
// SPRING PHYSICS
// =============================================================================
// "snappy" — stiffness 500, damping 30, mass 0.5
//   Used for the thumb snap when clicking a position on the track.
//   The thumb needs to feel like it's "pulled" to the click point
//   with a satisfying settle.
//
// "quick" — stiffness 500, damping 40, mass 0.3
//   Used for the thumb press squish. Ultra-fast feedback on press,
//   making the thumb feel physically graspable.
// =============================================================================

const springs = {
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
  quick: { type: "spring" as const, stiffness: 500, damping: 40, mass: 0.3 },
};

// =============================================================================
// TYPES
// =============================================================================

export interface SliderProps {
  /** Current value */
  value?: number;
  /** Default value for uncontrolled usage */
  defaultValue?: number;
  /** Change callback — fires continuously while dragging */
  onChange?: (value: number) => void;
  /** Change callback — fires when dragging ends */
  onChangeEnd?: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment. 0 for continuous. */
  step?: number;
  /** Disable the slider */
  disabled?: boolean;
  /** Show value tooltip while dragging */
  showTooltip?: boolean;
  /** Format the display value */
  formatValue?: (value: number) => string;
  /** Track color */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

// =============================================================================
// SLIDER
// =============================================================================

export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(
  {
    value: controlledValue,
    defaultValue = 50,
    onChange,
    onChangeEnd,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    showTooltip = true,
    formatValue = (v) => String(Math.round(v)),
    color = "bg-neutral-900 dark:bg-white",
    className = "",
  },
  ref
) {
  const prefersReducedMotion = useReducedMotion();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const percentage = ((value - min) / (max - min)) * 100;

  const snapToStep = useCallback(
    (val: number) => {
      if (step <= 0) return Math.max(min, Math.min(max, val));
      const snapped = Math.round((val - min) / step) * step + min;
      return Math.max(min, Math.min(max, snapped));
    },
    [min, max, step]
  );

  const getValueFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return value;
      const rect = trackRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return snapToStep(min + percent * (max - min));
    },
    [min, max, value, snapToStep]
  );

  const updateValue = useCallback(
    (newValue: number) => {
      if (controlledValue === undefined) setInternalValue(newValue);
      onChange?.(newValue);
    },
    [controlledValue, onChange]
  );

  // Mouse/touch drag handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      setIsDragging(true);
      const newValue = getValueFromPosition(e.clientX);
      updateValue(newValue);
    },
    [disabled, getValueFromPosition, updateValue]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || disabled) return;
      const newValue = getValueFromPosition(e.clientX);
      updateValue(newValue);
    },
    [isDragging, disabled, getValueFromPosition, updateValue]
  );

  const handlePointerUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      onChangeEnd?.(value);
    }
  }, [isDragging, onChangeEnd, value]);

  // Keyboard
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      const s = step || (max - min) / 100;
      let newValue = value;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault();
          newValue = snapToStep(value + s);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault();
          newValue = snapToStep(value - s);
          break;
        case "Home":
          e.preventDefault();
          newValue = min;
          break;
        case "End":
          e.preventDefault();
          newValue = max;
          break;
        default:
          return;
      }

      updateValue(newValue);
      onChangeEnd?.(newValue);
    },
    [disabled, value, step, min, max, snapToStep, updateValue, onChangeEnd]
  );

  const showTooltipNow = showTooltip && (isDragging || isHovering);

  return (
    <div
      ref={ref}
      className={`relative w-full ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Track */}
      <div
        ref={trackRef}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
        className={`relative h-6 flex items-center ${disabled ? "" : "cursor-pointer"}`}
      >
        {/* Background track */}
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700" />

        {/* Filled track */}
        <motion.div
          className={`absolute h-1.5 rounded-full ${color}`}
          style={{ left: 0, width: `${percentage}%` }}
          transition={isDragging ? { duration: 0 } : springs.snappy}
        />

        {/* Thumb */}
        <motion.div
          className={`absolute w-5 h-5 rounded-full ${color} shadow-md ring-2 ring-white dark:ring-neutral-900`}
          style={{ left: `calc(${percentage}% - 10px)` }}
          animate={{
            scale: isDragging ? 1.2 : 1,
          }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.15 }}
          transition={isDragging ? springs.quick : springs.snappy}
        />

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltipNow && (
            <motion.div
              className="absolute -top-9 px-2 py-1 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-medium pointer-events-none"
              style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.9 }}
              transition={springs.snappy}
            >
              {formatValue(value)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});


