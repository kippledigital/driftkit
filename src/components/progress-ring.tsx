"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

type ProgressRingSize = "sm" | "md" | "lg" | "xl";

interface ProgressRingProps {
  value: number; // 0-100
  size?: number | ProgressRingSize;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  showLabel?: boolean;
  className?: string;
}

// Predefined size configurations for consistent layouts
const sizePresets: Record<ProgressRingSize, { size: number; strokeWidth: number; fontSize: string }> = {
  sm: { size: 80, strokeWidth: 6, fontSize: "text-sm" },
  md: { size: 120, strokeWidth: 8, fontSize: "text-lg" },
  lg: { size: 160, strokeWidth: 10, fontSize: "text-xl" },
  xl: { size: 200, strokeWidth: 12, fontSize: "text-2xl" },
};

export function ProgressRing({
  value,
  size = "md",
  strokeWidth,
  color = "#6366f1",
  trackColor = "currentColor",
  showLabel = true,
  className = "",
}: ProgressRingProps) {
  // Resolve size and strokeWidth from presets or custom values
  const sizeConfig = typeof size === "string" ? sizePresets[size] : null;
  const actualSize = sizeConfig?.size ?? (typeof size === "number" ? size : 120);
  const actualStrokeWidth = strokeWidth ?? sizeConfig?.strokeWidth ?? 8;
  const fontSize = sizeConfig?.fontSize ?? "text-lg";
  
  const radius = (actualSize - actualStrokeWidth) / 2;
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
      <svg width={actualSize} height={actualSize} className="-rotate-90">
        <circle
          cx={actualSize / 2}
          cy={actualSize / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={actualStrokeWidth}
          opacity={0.1}
        />
        <motion.circle
          cx={actualSize / 2}
          cy={actualSize / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={actualStrokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span className={`font-bold tabular-nums ${fontSize}`}>
            {displayValue}
          </motion.span>
          <span className="text-xs text-neutral-400 ml-0.5">%</span>
        </div>
      )}
    </div>
  );
}

// Helper component for creating consistent ring layouts
interface ProgressRingGroupProps {
  variant?: "uniform" | "graduated" | "mixed";
  className?: string;
  children: React.ReactNode;
}

export function ProgressRingGroup({ 
  variant = "uniform", 
  className = "",
  children 
}: ProgressRingGroupProps) {
  const baseClasses = "flex items-center justify-center gap-6";
  const variantClasses = {
    uniform: "flex-row", // all same size, horizontal
    graduated: "flex-row items-end", // different sizes, aligned to bottom
    mixed: "flex-wrap justify-center", // flexible layout
  };
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}

// Export size presets for external use
export { sizePresets };
