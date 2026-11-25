"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView, useMotionValue, useTransform, type AnimationPlaybackControls } from "framer-motion";
import { spring, useMotionPrefs } from "./motion";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  showReplayButton?: boolean;
}

export function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2,
  className = "",
  showReplayButton = false,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: !showReplayButton, margin: "-50px" });
  const m = useMotionPrefs();
  const value = useMotionValue(0);
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [runs, setRuns] = useState(0);

  const display = useTransform(value, (v: number) => `${prefix}${v.toFixed(decimals)}${suffix}`);

  // A spring with a fixed duration and no bounce: counts fast, then eases into
  // the final number without overshooting it (a counter that passes its target
  // and comes back reads as a glitch).
  useEffect(() => {
    if (!isInView) return;
    controls.current?.stop();
    if (m.reduced) {
      value.set(target);
      return;
    }
    value.set(0);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reflects a running animation
    setIsAnimating(true);
    controls.current = animate(value, target, {
      type: "spring",
      duration,
      bounce: 0,
      onComplete: () => setIsAnimating(false),
    });
    return () => controls.current?.stop();
  }, [isInView, target, duration, m.reduced, value, runs]);

  return (
    <div className="inline-flex items-center gap-3">
      <motion.span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums", minWidth: "max-content" }}>
        {display}
      </motion.span>
      {showReplayButton && (
        <button
          type="button"
          onClick={() => setRuns((n) => n + 1)}
          disabled={isAnimating}
          className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        >
          {isAnimating ? "Counting…" : "↻ Replay"}
        </button>
      )}
    </div>
  );
}

interface StatCardProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  icon?: string;
  showReplayButton?: boolean;
}

export function StatCard({
  value,
  label,
  prefix = "",
  suffix = "",
  decimals = 0,
  icon,
  showReplayButton = false,
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={spring.gentle}
      className="p-5 rounded-[8px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
    >
      {icon && <span className="text-2xl mb-2 block">{icon}</span>}
      <div className="text-3xl font-bold tabular-nums">
        <AnimatedCounter
          target={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          showReplayButton={showReplayButton}
        />
      </div>
      <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 block">
        {label}
      </span>
    </motion.div>
  );
}
