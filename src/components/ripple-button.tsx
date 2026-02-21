"use client";

import React, { useState, useCallback, type ReactNode, type MouseEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// =============================================================================
// RIPPLE BUTTON
// =============================================================================
// Material-style click ripple but with spring physics. The ripple expands with
// overshoot then fades. Multiple concurrent ripples supported.

interface RippleButtonProps {
  children: ReactNode;
  className?: string;
  /** Ripple color (CSS value) */
  rippleColor?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

let rippleId = 0;

export function RippleButton({
  children,
  className = "",
  rippleColor = "rgba(255,255,255,0.35)",
  onClick,
  disabled = false,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const prefersReduced = useReducedMotion();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      onClick?.(e);
      if (prefersReduced) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2.5;

      const newRipple = { id: ++rippleId, x, y, size };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);
    },
    [disabled, onClick, prefersReduced]
  );

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      className={`relative overflow-hidden rounded-[8px] bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      whileTap={!disabled && !prefersReduced ? { scale: 0.95 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <span className="relative z-10">{children}</span>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x - ripple.size / 2,
              top: ripple.y - ripple.size / 2,
              width: ripple.size,
              height: ripple.size,
              backgroundColor: rippleColor,
            }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              scale: { type: "spring", stiffness: 200, damping: 15 },
              opacity: { duration: 0.5, ease: "easeOut" },
            }}
          />
        ))}
      </AnimatePresence>
    </button>
  );
}
