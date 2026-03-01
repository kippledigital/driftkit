"use client";

import React, { useState, forwardRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// =============================================================================
// SPRING PHYSICS
// =============================================================================
// "smooth" — stiffness 300, damping 30, mass 1
//   Used for the alert entrance/exit. Alerts slide in from the top
//   with a natural settle — not too fast (would feel aggressive),
//   not too slow (would miss the urgency).
//
// "snappy" — stiffness 500, damping 30, mass 0.5
//   Used for the dismiss button hover and the icon entrance.
// =============================================================================

const springs = {
  smooth: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
};

// =============================================================================
// TYPES
// =============================================================================

export interface AlertProps {
  /** Alert variant */
  variant?: "info" | "success" | "warning" | "error";
  /** Title text */
  title?: string;
  /** Body content */
  children: React.ReactNode;
  /** Show dismiss button */
  dismissible?: boolean;
  /** Callback when dismissed */
  onDismiss?: () => void;
  /** Custom icon (overrides default) */
  icon?: React.ReactNode;
  /** Action button */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Additional CSS classes */
  className?: string;
}

// =============================================================================
// VARIANT CONFIG
// =============================================================================

const variants = {
  info: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    icon: "text-blue-500",
    title: "text-blue-900 dark:text-blue-100",
    text: "text-blue-700 dark:text-blue-300",
    button: "text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50",
    dismiss: "text-blue-400 hover:text-blue-600 dark:hover:text-blue-500 dark:hover:text-blue-300",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    ),
  },
  success: {
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-200 dark:border-green-800",
    icon: "text-green-500",
    title: "text-green-900 dark:text-green-100",
    text: "text-green-700 dark:text-green-300",
    button: "text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50",
    dismiss: "text-green-400 hover:text-green-600 dark:hover:text-green-500 dark:hover:text-green-300",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  warning: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    icon: "text-amber-500",
    title: "text-amber-900 dark:text-amber-100",
    text: "text-amber-700 dark:text-amber-300",
    button: "text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/50",
    dismiss: "text-amber-400 hover:text-amber-600 dark:hover:text-amber-500 dark:hover:text-amber-300",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  error: {
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
    icon: "text-red-500",
    title: "text-red-900 dark:text-red-100",
    text: "text-red-700 dark:text-red-300",
    button: "text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50",
    dismiss: "text-red-400 hover:text-red-600 dark:hover:text-red-500 dark:hover:text-red-300",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
  },
};

// =============================================================================
// ALERT
// =============================================================================

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    variant = "info",
    title,
    children,
    dismissible = false,
    onDismiss,
    icon,
    action,
    className = "",
  },
  ref
) {
  const prefersReducedMotion = useReducedMotion();
  const [dismissed, setDismissed] = useState(false);
  const v = variants[variant];

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          ref={ref}
          role="alert"
          className={`flex gap-3 p-4 rounded-lg border ${v.bg} ${v.border} ${className}`}
          initial={prefersReducedMotion ? false : { opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98, height: 0, marginBottom: 0, padding: 0 }}
          transition={springs.smooth}
        >
          {/* Icon */}
          <motion.div
            className={`shrink-0 mt-0.5 ${v.icon}`}
            initial={prefersReducedMotion ? false : { scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ ...springs.snappy, delay: 0.1 }}
          >
            {icon || v.svg}
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {title && (
              <h3 className={`text-sm font-semibold mb-1 ${v.title}`}>
                {title}
              </h3>
            )}
            <div className={`text-sm ${v.text}`}>
              {children}
            </div>

            {/* Action button */}
            {action && (
              <motion.button
                onClick={action.onClick}
                className={`mt-2 text-sm font-medium px-3 py-1 rounded-md transition-colors ${v.button}`}
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                transition={springs.snappy}
              >
                {action.label}
              </motion.button>
            )}
          </div>

          {/* Dismiss button */}
          {dismissible && (
            <motion.button
              onClick={handleDismiss}
              className={`shrink-0 p-1 rounded-md transition-colors ${v.dismiss}`}
              whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
              transition={springs.snappy}
              aria-label="Dismiss"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
});
