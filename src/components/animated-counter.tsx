"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";

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
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: duration,
  });

  const display = useTransform(spring, (v: number) => {
    return `${prefix}${v.toFixed(decimals)}${suffix}`;
  });

  const startAnimation = () => {
    setIsAnimating(true);
    setHasTriggered(true);
    spring.set(target);
    // Reset animation state after duration
    setTimeout(() => {
      setIsAnimating(false);
    }, duration * 1000);
  };

  const replay = () => {
    spring.set(0);
    setTimeout(() => startAnimation(), 100); // Small delay for visual effect
  };

  useEffect(() => {
    if (isInView && !hasTriggered) {
      startAnimation();
    }
  }, [isInView, hasTriggered, spring, target]);

  return (
    <div className="inline-flex items-center gap-3">
      <motion.span 
        ref={ref} 
        className={className}
        style={{ fontVariantNumeric: "tabular-nums", minWidth: "max-content" }}
      >
        {display}
      </motion.span>
      {showReplayButton && (
        <motion.button
          onClick={replay}
          disabled={isAnimating}
          className="px-3 py-1.5 text-xs font-medium rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isAnimating ? "Animating..." : "↻ Replay"}
        </motion.button>
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
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
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
