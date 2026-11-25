"use client";

import React, { useState, useCallback, type ReactNode, type MouseEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { spring } from "./motion";

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
  /**
   * Background and text color classes. Replaces the default neutral colors
   * entirely. Use this rather than className for colors: Tailwind classes that
   * set the same property don't override by order in className, so a color in
   * className can lose to the default (white text on a white button).
   */
  colorClassName?: string;
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
  colorClassName = "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200",
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
    },
    [disabled, onClick, prefersReduced]
  );

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      className={`relative overflow-hidden rounded-[8px] px-5 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${colorClassName} ${className}`}
      whileTap={!disabled && !prefersReduced ? { scale: 0.95 } : {}}
      transition={spring.bouncy}
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
            onAnimationComplete={() => setRipples((prev) => prev.filter((r) => r.id !== ripple.id))}
            exit={{ opacity: 0 }}
            transition={{
              scale: spring.bouncy,
              opacity: { duration: 0.5, ease: "easeOut" },
            }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
}
