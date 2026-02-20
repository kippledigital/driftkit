"use client";

import React, { useEffect, useRef, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

// =============================================================================
// NUMBER TICKER
// =============================================================================
// WHY: Individual digit animations create a "slot machine" effect that makes
// number changes feel meaningful and celebratory. Dashboard counters, pricing,
// stats — anywhere a number changing IS the event, not a side effect.
//
// HOW: We split the number into individual characters (digits, commas, decimals).
// Each digit gets its own AnimatePresence with direction-aware enter/exit.
// Digits that didn't change stay put (no animation). Changed digits roll
// up or down based on whether the value increased or decreased.
//
// WHY direction-aware: If a counter goes from 100 to 200, digits should roll
// UP (new value enters from below). If it goes from 200 to 100, they roll
// DOWN. This creates a natural "counting" metaphor.
// =============================================================================

// Spring for individual digit transitions — snappy so digits feel crisp
const DIGIT_SPRING = { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 };

export interface NumberTickerProps {
  /** The numeric value to display */
  value: number;
  /** Prefix string (e.g. "$", "€") */
  prefix?: string;
  /** Suffix string (e.g. "%", " pts") */
  suffix?: string;
  /** Number of decimal places. Default 0 */
  decimals?: number;
  /** Use comma separators for thousands. Default true */
  commas?: boolean;
  /** Extra CSS classes */
  className?: string;
  /** Font size class override */
  fontSize?: string;
}

/**
 * Format a number into displayable characters
 */
function formatNumber(value: number, decimals: number, commas: boolean): string {
  const fixed = Math.abs(value).toFixed(decimals);
  if (!commas) return value < 0 ? `-${fixed}` : fixed;

  const [intPart, decPart] = fixed.split(".");
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const result = decPart ? `${withCommas}.${decPart}` : withCommas;
  return value < 0 ? `-${result}` : result;
}

/**
 * Single animated digit — rolls up or down based on direction
 */
function AnimatedChar({
  char,
  direction,
  reducedMotion,
}: {
  char: string;
  direction: "up" | "down";
  reducedMotion: boolean | null;
}) {
  // WHY 0.7em for offset: Full em would be too dramatic. 0.7em creates
  // a tight roll that feels like a mechanical counter, not a slot machine.
  const yOffset = direction === "up" ? "0.7em" : "-0.7em";

  if (reducedMotion) {
    return <span>{char}</span>;
  }

  return (
    <motion.span
      key={char}
      initial={{ y: yOffset, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: direction === "up" ? "-0.7em" : "0.7em", opacity: 0 }}
      transition={DIGIT_SPRING}
      style={{ display: "inline-block" }}
    >
      {char}
    </motion.span>
  );
}

export function NumberTicker({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  commas = true,
  className = "",
  fontSize,
}: NumberTickerProps) {
  const prefersReducedMotion = useReducedMotion();
  const prevValueRef = useRef(value);

  // Determine direction based on value change
  const direction = value >= prevValueRef.current ? "up" : "down";

  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  const formatted = useMemo(
    () => formatNumber(value, decimals, commas),
    [value, decimals, commas]
  );

  // Split into individual characters for per-digit animation
  const chars = formatted.split("");

  return (
    <span
      className={`inline-flex items-baseline ${fontSize || ""} ${className}`}
      style={{ fontVariantNumeric: "tabular-nums" }}
      aria-label={`${prefix}${formatted}${suffix}`}
      role="status"
    >
      {/* Prefix — not animated, just static text */}
      {prefix && <span>{prefix}</span>}

      {/* Each character gets its own animation slot.
          WHY indexed key with char: We use position + char as key so that
          AnimatePresence knows when a specific position's digit changed.
          Static characters (commas, decimals) at the same position won't re-animate. */}
      {chars.map((char, i) => {
        const isDigit = /\d/.test(char);
        if (!isDigit) {
          // Commas, decimals, minus signs — render static
          return <span key={`sep-${i}`}>{char}</span>;
        }
        return (
          <span
            key={`pos-${i}`}
            style={{ 
              display: "inline-block", 
              position: "relative", 
              overflow: "hidden",
              width: "1ch",
              textAlign: "center"
            }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <AnimatedChar
                key={`${i}-${char}`}
                char={char}
                direction={direction}
                reducedMotion={prefersReducedMotion}
              />
            </AnimatePresence>
          </span>
        );
      })}

      {/* Suffix — not animated */}
      {suffix && <span>{suffix}</span>}
    </span>
  );
}

export default NumberTicker;
