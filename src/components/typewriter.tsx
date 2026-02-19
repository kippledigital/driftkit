"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const CHAR_SPRING = { type: "spring" as const, stiffness: 600, damping: 35, mass: 0.3 };

export interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  persistCursor?: boolean;
  onComplete?: () => void;
  loop?: string[];
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
  const [phase, setPhase] = useState<"idle" | "typing" | "pausing" | "deleting">("idle");
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const texts = loop && loop.length > 0 ? loop : [text];
  const currentText = texts[currentTextIndex];

  // Reset on text prop change (non-loop mode)
  useEffect(() => {
    if (!loop) {
      setDisplayedCount(0);
      setIsComplete(false);
      setPhase("idle");
    }
  }, [text, loop]);

  // Single effect drives the entire state machine
  useEffect(() => {
    // Clear any existing timer on every phase/count change
    clearTimeout(timerRef.current);

    if (prefersReducedMotion) {
      setDisplayedCount(currentText.length);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    if (phase === "idle") {
      // Start typing after initial delay
      timerRef.current = setTimeout(() => setPhase("typing"), delay || 0);
      return () => clearTimeout(timerRef.current);
    }

    if (phase === "typing") {
      if (displayedCount >= currentText.length) {
        // Done typing
        if (loop) {
          setPhase("pausing");
        } else {
          setIsComplete(true);
          onComplete?.();
        }
        return;
      }
      const jitter = speed * (0.7 + Math.random() * 0.6);
      timerRef.current = setTimeout(() => {
        setDisplayedCount((c) => c + 1);
      }, jitter);
      return () => clearTimeout(timerRef.current);
    }

    if (phase === "pausing") {
      timerRef.current = setTimeout(() => setPhase("deleting"), loopPause);
      return () => clearTimeout(timerRef.current);
    }

    if (phase === "deleting") {
      if (displayedCount <= 0) {
        // Move to next text and start typing
        setCurrentTextIndex((i) => (i + 1) % texts.length);
        setPhase("typing");
        return;
      }
      timerRef.current = setTimeout(() => {
        setDisplayedCount((c) => c - 1);
      }, speed * 0.4);
      return () => clearTimeout(timerRef.current);
    }
  }, [phase, displayedCount, currentText, currentTextIndex, delay, loop, loopPause, speed, texts.length, onComplete, prefersReducedMotion]);

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
