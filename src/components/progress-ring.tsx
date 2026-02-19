"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

interface ProgressRingProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  showLabel?: boolean;
  className?: string;
}

export function ProgressRing({
  value,
  size = 120,
  strokeWidth = 8,
  color = "#6366f1",
  trackColor = "currentColor",
  showLabel = true,
  className = "",
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const spring = useSpring(0, { stiffness: 60, damping: 15 });
  const strokeDashoffset = useTransform(
    spring,
    (v: number) => circumference - (v / 100) * circumference
  );
  const displayValue = useTransform(spring, (v: number) => Math.round(v));

  useEffect(() => {
    spring.set(Math.min(100, Math.max(0, value)));
  }, [value, spring]);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
          opacity={0.1}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span className="text-lg font-bold tabular-nums">
            {displayValue}
          </motion.span>
          <span className="text-xs text-neutral-400">%</span>
        </div>
      )}
    </div>
  );
}
