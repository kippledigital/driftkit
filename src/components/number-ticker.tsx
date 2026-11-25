"use client";

/**
 * Number Ticker
 * =============================================================================
 * An odometer: each place is a column of 0–9 that rolls to its digit on the
 * `smooth` spring. Because the column physically travels, 3 → 7 rolls through
 * 4, 5, 6, and big jumps read as big jumps.
 *
 * Places are keyed from the right (ones, tens, hundreds), so 999 → 1,000 adds
 * a new place on the left instead of re-animating every digit. Tabular numbers
 * keep the width steady while it rolls.
 *
 * Screen readers get the plain formatted value once; the rolling columns are
 * hidden from them.
 *
 * Needs: ./motion.ts
 * =============================================================================
 */

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMotionPrefs } from "./motion";

export interface NumberTickerProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  commas?: boolean;
  className?: string;
  /** Tailwind text-size class, e.g. "text-4xl". */
  fontSize?: string;
  /** BCP 47 locale for separators. Default "en-US". */
  locale?: string;
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function Column({ digit }: { digit: number }) {
  const m = useMotionPrefs();
  return (
    <span className="relative block h-[1lh] overflow-hidden" style={{ width: "1ch" }}>
      <motion.span
        className="absolute left-0 top-0 flex flex-col"
        initial={false}
        animate={{ y: `${-digit * 10}%` }}
        transition={m.reduced ? { duration: 0 } : m.spring("smooth")}
      >
        {DIGITS.map((d) => (
          <span key={d} className="block h-[1lh] text-center">
            {d}
          </span>
        ))}
      </motion.span>
      <span className="invisible">0</span>
    </span>
  );
}

export function NumberTicker({ value, prefix = "", suffix = "", decimals = 0, commas = true, className = "", fontSize, locale = "en-US" }: NumberTickerProps) {
  const m = useMotionPrefs();
  const formatted = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: commas,
      }).format(value),
    [value, decimals, commas, locale]
  );

  // Key every character by its distance from the right end, so places stay stable.
  const chars = formatted.split("").map((ch, i, all) => ({ ch, place: all.length - 1 - i }));

  return (
    <span className={`inline-flex items-start ${fontSize ?? ""} ${className}`} style={{ fontVariantNumeric: "tabular-nums", lineHeight: 1.1 }}>
      <span className="sr-only">{`${prefix}${formatted}${suffix}`}</span>
      <span aria-hidden className="inline-flex items-start">
        {prefix && <span className="block h-[1lh]">{prefix}</span>}
        <AnimatePresence initial={false} mode="popLayout">
          {chars.map(({ ch, place }) => (
            <motion.span
              key={`p${place}`}
              layout={m.reduced ? false : "position"}
              initial={m.reduced ? false : { opacity: 0, y: "-40%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: m.reduced ? 0 : "40%", transition: { duration: 0.12 } }}
              transition={m.spring("smooth")}
              className="block h-[1lh]"
            >
              {/\d/.test(ch) ? <Column digit={Number(ch)} /> : <span>{ch}</span>}
            </motion.span>
          ))}
        </AnimatePresence>
        {suffix && <span className="block h-[1lh]">{suffix}</span>}
      </span>
    </span>
  );
}

export default NumberTicker;
