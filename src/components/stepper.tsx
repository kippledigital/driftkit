"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// =============================================================================
// SPRING PHYSICS
// =============================================================================
const springs = {
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
  smooth: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
  quick: { type: "spring" as const, stiffness: 500, damping: 40, mass: 0.3 },
};

// =============================================================================
// TYPES
// =============================================================================

export interface StepperStep {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export interface StepperProps {
  steps: StepperStep[];
  activeStep?: number;
  defaultStep?: number;
  onChange?: (step: number) => void;
  className?: string;
  /** Show next/prev buttons */
  showControls?: boolean;
  /** Called when last step's "Finish" is clicked */
  onFinish?: () => void;
}

// =============================================================================
// STEP INDICATOR
// =============================================================================

function StepIndicator({
  index,
  label,
  status,
  reduced,
}: {
  index: number;
  label: string;
  status: "complete" | "active" | "upcoming";
  reduced: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors
          ${status === "complete" ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900" : ""}
          ${status === "active" ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 ring-2 ring-neutral-900/20 dark:ring-white/20" : ""}
          ${status === "upcoming" ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500" : ""}
        `}
        animate={{
          scale: status === "active" ? 1 : 1,
        }}
        transition={springs.snappy}
      >
        {status === "complete" ? (
          <motion.svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            initial={reduced ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={springs.smooth}
          >
            <motion.path
              d="M3 7l3 3 5-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={springs.smooth}
            />
          </motion.svg>
        ) : (
          index + 1
        )}
      </motion.div>
      <span
        className={`text-xs font-medium hidden sm:block transition-colors
          ${status === "active" ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-400 dark:text-neutral-500"}
        `}
      >
        {label}
      </span>
    </div>
  );
}

// =============================================================================
// PROGRESS BAR
// =============================================================================

function ProgressBar({
  current,
  total,
  reduced,
  direction,
}: {
  current: number;
  total: number;
  reduced: boolean;
  direction: number;
}) {
  const progress = total <= 1 ? (current === total - 1 ? 1 : 0) : current / (total - 1);

  // Gentler transitions - less bounce, especially when going backwards
  const progressTransition = reduced 
    ? { duration: 0.1 } 
    : direction < 0 
      ? {
          type: "spring" as const,
          stiffness: 250,
          damping: 40,
          mass: 1.2,
        }
      : {
          type: "spring" as const,
          stiffness: 280,
          damping: 35,
          mass: 1,
        };

  return (
    <div className="h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-neutral-900 dark:bg-white rounded-full"
        animate={{ width: `${progress * 100}%` }}
        transition={progressTransition}
      />
    </div>
  );
}

// =============================================================================
// STEPPER
// =============================================================================

export function Stepper({
  steps,
  activeStep: controlledStep,
  defaultStep = 0,
  onChange,
  className = "",
  showControls = true,
  onFinish,
}: StepperProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isControlled = controlledStep !== undefined;
  const [internalStep, setInternalStep] = useState(defaultStep);
  const [direction, setDirection] = useState(0);
  const current = isControlled ? controlledStep : internalStep;

  const goTo = useCallback(
    (step: number) => {
      if (step < 0 || step >= steps.length) return;
      setDirection(step > current ? 1 : -1);
      if (!isControlled) setInternalStep(step);
      onChange?.(step);
    },
    [current, steps.length, isControlled, onChange]
  );

  const slideVariants = useMemo(
    () => ({
      enter: (dir: number) => ({
        x: dir > 0 ? 200 : -200,
        opacity: 0,
      }),
      center: {
        x: 0,
        opacity: 1,
      },
      exit: (dir: number) => ({
        x: dir > 0 ? -200 : 200,
        opacity: 0,
      }),
    }),
    []
  );

  const isLast = current === steps.length - 1;
  const isFirst = current === 0;

  return (
    <motion.div
      className={`flex flex-col gap-4 ${className}`}
      style={{ fontFamily: "Satoshi, sans-serif" }}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springs.smooth}
    >
      {/* Step indicators */}
      <div className="flex items-center justify-between gap-2">
        {steps.map((step, i) => {
          const status = i < current ? "complete" : i === current ? "active" : "upcoming";
          return (
            <React.Fragment key={step.id}>
              <StepIndicator
                index={i}
                label={step.label}
                status={status}
                reduced={prefersReducedMotion}
              />
              {i < steps.length - 1 && (
                <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Progress bar */}
      <ProgressBar current={current} total={steps.length} reduced={prefersReducedMotion} direction={direction} />

      {/* Content area */}
      <div className="relative overflow-hidden min-h-[120px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={
              prefersReducedMotion
                ? { duration: 0.1 }
                : {
                    x: {
                      type: "spring" as const,
                      stiffness: 300,
                      damping: 30,
                      mass: 1.2,
                    },
                    opacity: { 
                      duration: 0.25, 
                      ease: [0.25, 0.1, 0.25, 1] // Custom eased curve
                    },
                  }
            }
          >
            {steps[current]?.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      {showControls && (
        <div className="flex items-center justify-between pt-2">
          <motion.button
            type="button"
            onClick={() => goTo(current - 1)}
            disabled={isFirst}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer
              ${isFirst ? "opacity-30 cursor-default" : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"}
            `}
            whileTap={isFirst || prefersReducedMotion ? undefined : { scale: 0.97 }}
            transition={springs.quick}
          >
            ← Back
          </motion.button>
          <motion.button
            type="button"
            onClick={() => {
              if (isLast) {
                onFinish?.();
              } else {
                goTo(current + 1);
              }
            }}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors cursor-pointer"
            whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            transition={springs.quick}
          >
            {isLast ? "Finish ✓" : "Next →"}
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

Stepper.displayName = "Stepper";
export default Stepper;
