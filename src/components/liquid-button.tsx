"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useCallback, useId } from "react";

interface LiquidButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  color?: string;
}

export function LiquidButton({
  children,
  className = "",
  onClick,
  color = "#3b82f6",
}: LiquidButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const isHovered = useMotionValue(0);
  const filterId = useId();

  const hoverSpring = useSpring(isHovered, { stiffness: 300, damping: 20 });
  const xSpring = useSpring(mouseX, { stiffness: 200, damping: 15 });
  const ySpring = useSpring(mouseY, { stiffness: 200, damping: 15 });

  // Simpler, more reliable blob path that stays within bounds
  const blobPath = useTransform(
    [xSpring, ySpring, hoverSpring],
    ([x, y, h]: number[]) => {
      const stretch = h * 8; // reduced stretch amount
      const dx = (x - 0.5) * stretch * 0.5;
      const dy = (y - 0.5) * stretch * 0.5;
      
      // Clamp values to ensure they stay within viewBox
      const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));
      
      const x1 = clamp(50 + dx, 10, 90);
      const y1 = clamp(15 + dy, 5, 25);
      const x2 = clamp(85 + stretch * 0.3, 70, 95);
      const y2 = clamp(50, 25, 75);
      const x3 = clamp(50 + dx, 10, 90);
      const y3 = clamp(85 - dy, 75, 95);
      const x4 = clamp(15 - stretch * 0.3, 5, 30);
      const y4 = clamp(50, 25, 75);
      
      return `M ${x1},${y1} C ${x2},${y1} ${x2},${y2} ${x2},${y2} C ${x2},${y3} ${x3},${y3} ${x3},${y3} C ${x4},${y3} ${x4},${y4} ${x4},${y4} C ${x4},${y1} ${x1},${y1} ${x1},${y1} Z`;
    }
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => isHovered.set(1)}
      onMouseLeave={() => {
        isHovered.set(0);
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
      onMouseMove={handleMouseMove}
      className={`relative inline-flex items-center justify-center px-6 py-3 cursor-pointer border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors ${className}`}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ filter: `url(#goo-${filterId})` }}
      >
        <defs>
          <filter id={`goo-${filterId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
        <motion.path 
          d={blobPath} 
          fill={color} 
          opacity={0.3}
          style={{
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
          }}
        />
        <motion.path 
          d={blobPath} 
          fill="none" 
          stroke={color} 
          strokeWidth={2}
          opacity={0.8}
        />
      </svg>
      <span className="relative z-10 text-sm font-medium">{children}</span>
    </button>
  );
}
