"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// =============================================================================
// TYPEWRITER TEXT REVEAL
// =============================================================================
// WHY: Typewriter effects create anticipation. The reader watches text appear
// character by character, which demands attention in a way that instant rendering
// doesn't. Great for hero sections, quotes, terminal-style UIs, or chatbots.
//
// HOW: We reveal characters one at a time using a timer. Each character enters
// with a tiny spring-animated opacity + y offset. The cursor blinks at the end
// using a CSS animation (cheaper than JS for a simple blink). When the text is
// fully typed, the cursor optionally continues blinking or fades out.
//
// WHY per-character spring instead of just showing: The micro-animation on each
// character creates a "settling" effect — each letter appears to land in place
// rather than just popping in. It's subtle but makes the whole thing feel alive.
// =============================================================================

const CHAR_SPRING = { type: "spring" as const, stiffness: 600, damping: 35, mass: 0.3 };

export interface TypewriterProps {
  /** Text to type out */
  text: string;
  /** Typing speed in ms per character. Default 50 */
  speed?: number;
  /** Delay before starting in ms. Default 0 */
  delay?: number;
  /** Show blinking cursor. Default true */
  cursor?: boolean;
  /** Keep cursor visible after typing completes. Default true */
  persistCursor?: boolean;
  /** Callback when typing completes */
  onComplete?: () => void;
  /** Loop: delete and retype. Provide array of strings to cycle through */
  loop?: string[];
  /** Pause between loops in ms. Default 2000 */
  loopPause?: number;
  className?: string;
}

export function Typewriter({
  text,
  speed = 50,
  delay = 0,
  cursor = true,
  persistCursor = true,
  onComplete,
  loop,
  loopPause = 2000,
  className = "",
}: TypewriterProps) {
  const prefersReducedMotion = useReducedMotion();
  const [displayedCount, setDisplayedCount] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const texts = loop && loop.length > 0 ? loop : [text];
  const currentText = texts[currentTextIndex];

  // Reset when text changes
  useEffect(() => {
    if (!loop) {
      setDisplayedCount(0);
      setIsComplete(false);
    }
  }, [text, loop]);

  const tick = useCallback(() => {
    if (prefersReducedMotion) {
      setDisplayedCount(currentText.length);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    if (!isDeleting) {
      // Typing forward
      setDisplayedCount((prev) => {
        const next = prev + 1;
        if (next >= currentText.length) {
          if (loop) {
            // Pause then start deleting
            timerRef.current = setTimeout(() => setIsDeleting(true), loopPause);
          } else {
            setIsComplete(true);
            onComplete?.();
          }
          return currentText.length;
        }
        // Vary speed slightly for natural feel — ±30%
        const jitter = speed * (0.7 + Math.random() * 0.6);
        timerRef.current = setTimeout(tick, jitter);
        return next;
      });
    } else {
      // Deleting (faster)
      setDisplayedCount((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          setIsDeleting(false);
          setCurrentTextIndex((i) => (i + 1) % texts.length);
          timerRef.current = setTimeout(tick, speed);
          return 0;
        }
        timerRef.current = setTimeout(tick, speed * 0.4);
        return next;
      });
    }
  }, [currentText, isDeleting, loop, loopPause, speed, texts.length, onComplete, prefersReducedMotion]);

  // Start typing
  useEffect(() => {
    timerRef.current = setTimeout(tick, delay || speed);
    return () => clearTimeout(timerRef.current);
  }, [tick, delay, speed]);

  // Restart when isDeleting changes
  useEffect(() => {
    if (isDeleting) {
      timerRef.current = setTimeout(tick, speed * 0.4);
      return () => clearTimeout(timerRef.current);
    }
  }, [isDeleting, tick, speed]);

  const showCursor = cursor && (!isComplete || persistCursor || !!loop);

  return (
    <span className={`inline ${className}`} aria-label={currentText} role="status">
      <AnimatePresence mode="popLayout">
        {currentText.slice(0, displayedCount).split("").map((char, i) => (
          <motion.span
            key={`${currentTextIndex}-${i}-${char}`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            transition={CHAR_SPRING}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
      {showCursor && (
        <span
          className="inline-block w-[2px] h-[1em] bg-current ml-[1px] align-text-bottom animate-pulse"
          aria-hidden
        />
      )}
    </span>
  );
}

export default Typewriter;
