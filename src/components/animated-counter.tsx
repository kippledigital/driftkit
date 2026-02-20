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
}

export function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hasTriggered, setHasTriggered] = useState(false);

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: duration,
  });

  const display = useTransform(spring, (v: number) => {
    return `${prefix}${v.toFixed(decimals)}${suffix}`;
  });

  useEffect(() => {
    if (isInView && !hasTriggered) {
      setHasTriggered(true);
      spring.set(target);
    }
  }, [isInView, hasTriggered, spring, target]);

  return (
    <motion.span 
      ref={ref} 
      className={className}
      style={{ fontVariantNumeric: "tabular-nums", minWidth: "max-content" }}
    >
      {display}
    </motion.span>
  );
}

interface StatCardProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  icon?: string;
}

export function StatCard({
  value,
  label,
  prefix = "",
  suffix = "",
  decimals = 0,
  icon,
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
      <span className="text-3xl font-bold tabular-nums block">
        <AnimatedCounter
          target={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
        />
      </span>
      <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 block">
        {label}
      </span>
    </motion.div>
  );
}
