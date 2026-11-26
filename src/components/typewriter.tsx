"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { spring } from "./motion";

const CHAR_SPRING = spring.snappy;

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

/** Split text into words with their start index; spaces become plain text between them. */
function words(text: string) {
  const out: { word: string; start: number }[] = [];
  const re = /\S+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) out.push({ word: m[0], start: m.index });
  return out.flatMap((w, i) => (i < out.length - 1 || /\s$/.test(text) ? [w, { word: " ", start: w.start + w.word.length }] : [w]));
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

  // Reset when the text prop changes (non-loop mode). Adjusting state during
  // render, rather than in an effect, avoids a wasted render with stale text.
  const [prevText, setPrevText] = useState(text);
  if (!loop && text !== prevText) {
    setPrevText(text);
    setDisplayedCount(0);
    setIsComplete(false);
    setPhase("idle");
  }

  // Reduced motion shows the whole text at once.
  const shownCount = prefersReducedMotion ? currentText.length : displayedCount;
  const complete = prefersReducedMotion || isComplete;

  // The state machine. Every state change happens inside a timer callback,
  // so each step is one render and the effect only schedules the next tick.
  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    const finishTyping = () => {
      if (loop) setPhase("pausing");
      else {
        setIsComplete(true);
        onComplete?.();
      }
    };

    if (phase === "idle") {
      timerRef.current = setTimeout(() => {
        if (currentText.length === 0) finishTyping();
        else setPhase("typing");
      }, delay || 0);
    } else if (phase === "typing") {
      const jitter = speed * (0.7 + Math.random() * 0.6);
      timerRef.current = setTimeout(() => {
        const next = displayedCount + 1;
        setDisplayedCount(next);
        if (next >= currentText.length) finishTyping();
      }, jitter);
    } else if (phase === "pausing") {
      timerRef.current = setTimeout(() => setPhase("deleting"), loopPause);
    } else if (phase === "deleting") {
      timerRef.current = setTimeout(() => {
        const next = displayedCount - 1;
        setDisplayedCount(Math.max(0, next));
        if (next <= 0) {
          setCurrentTextIndex((i) => (i + 1) % texts.length);
          setPhase("typing");
        }
      }, speed * 0.4);
    }
    return () => clearTimeout(timerRef.current);
  }, [phase, displayedCount, currentText, delay, loop, loopPause, speed, texts.length, onComplete, prefersReducedMotion]);

  const showCursor = cursor && (!complete || persistCursor || !!loop);

  return (
    <span className={`inline ${className}`} aria-label={currentText} role="status">
      {/* Letters are grouped into words that can't break internally. Each letter
          is an inline-block (so it can move), and on their own inline-blocks let the
          browser wrap a line mid-word ("com / ponents"). */}
      {words(currentText.slice(0, shownCount)).map(({ word, start }) =>
        word === " " ? (
          <React.Fragment key={`${currentTextIndex}-s${start}`}> </React.Fragment>
        ) : (
        <span key={`${currentTextIndex}-w${start}`} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          <AnimatePresence mode="popLayout">
            {word.split("").map((char, j) => (
              <motion.span
                key={`${currentTextIndex}-${start + j}-${char}`}
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
        </span>
        )
      )}
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
