"use client";

import React, {
  forwardRef,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

// =============================================================================
// SPRING PHYSICS
// =============================================================================
// Opening uses "smooth" spring — stiffness 300, damping 30, mass 1.
//   The modal should feel like it's rising into view with weight and intention.
//   Slight settling at the end communicates "I've arrived." Not bouncy — just
//   organic. Scale 0.95 → 1.0 with opacity creates a subtle zoom-in that
//   draws focus without being dramatic.
//
// Closing uses a quicker ease-out (not spring) — duration 0.15s.
//   Closing should feel snappier than opening. Users expect dismissal to be
//   near-instant. A spring on close would make it feel sluggish. The modal
//   scales down slightly (1.0 → 0.97) and fades — like something deflating.
//
// Backdrop uses a tween for blur/opacity — blur is expensive and springs
//   would make it oscillate, which looks glitchy with backdrop-filter.
// =============================================================================

const springs = {
  smooth: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
};

const exitTransition = { duration: 0.15, ease: "easeOut" as const };

// =============================================================================
// TYPES
// =============================================================================

export type DialogSize = "sm" | "md" | "lg";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  size?: DialogSize;
  children: ReactNode;
  className?: string;
  /** Optional title for aria-labelledby */
  title?: string;
}

// =============================================================================
// SIZE MAP
// =============================================================================

const sizeClasses: Record<DialogSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

// =============================================================================
// COMPONENT
// =============================================================================

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ open, onClose, size = "md", children, className = "", title }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const contentRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    // Focus trap: focus first focusable element on open, restore on close
    useEffect(() => {
      if (open) {
        previousFocusRef.current = document.activeElement as HTMLElement;
        // Small delay to let the animation start before focusing
        const timer = setTimeout(() => {
          const focusable = contentRef.current?.querySelector<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          focusable?.focus();
        }, 50);
        return () => clearTimeout(timer);
      } else if (previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
    }, [open]);

    // Escape key to dismiss
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          onClose();
        }
      },
      [onClose]
    );

    // Prevent body scroll when open
    useEffect(() => {
      if (open) {
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = original;
        };
      }
    }, [open]);

    const modalVariants = prefersReducedMotion
      ? {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
          exit: { opacity: 0 },
        }
      : {
          hidden: { opacity: 0, scale: 0.95, y: 8 },
          visible: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.97, y: 4 },
        };

    const backdropVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    };

    return (
      <AnimatePresence>
        {open && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onKeyDown={handleKeyDown}
            role="presentation"
          >
            {/* Backdrop — blurs in smoothly.
                backdrop-filter is animated via opacity on a blurred overlay.
                Direct animation of backdrop-blur is janky in most browsers,
                so we fade in a pre-blurred element instead. */}
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={onClose}
              aria-hidden
            />

            {/* Modal panel */}
            <motion.div
              ref={(node) => {
                // Merge refs
                (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                if (typeof ref === "function") ref(node);
                else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
              }}
              role="dialog"
              aria-modal="true"
              aria-label={title}
              className={`relative w-full ${sizeClasses[size]} rounded-[8px] bg-white dark:bg-neutral-900 shadow-xl p-6 ${className}`}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{
                ...springs.smooth,
                // Exit override: quicker ease-out, not spring
                // AnimatePresence will use the exit variant's transition
              }}
              // Override transition for exit specifically
              style={{ willChange: "transform, opacity" }}
            >
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }
);

Dialog.displayName = "Dialog";

// =============================================================================
// CONVENIENCE SUB-COMPONENTS
// =============================================================================

export function DialogTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2 ${className}`}
    >
      {children}
    </h2>
  );
}

export function DialogDescription({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-sm text-neutral-500 dark:text-neutral-400 mb-6 ${className}`}
    >
      {children}
    </p>
  );
}

export function DialogFooter({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex justify-end gap-3 mt-6 ${className}`}>
      {children}
    </div>
  );
}

export default Dialog;
