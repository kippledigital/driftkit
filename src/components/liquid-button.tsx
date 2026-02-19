"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useCallback } from "react";

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
  color = "currentColor",
}: LiquidButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const isHovered = useMotionValue(0);

  const hoverSpring = useSpring(isHovered, { stiffness: 300, damping: 20 });
  const xSpring = useSpring(mouseX, { stiffness: 200, damping: 15 });
  const ySpring = useSpring(mouseY, { stiffness: 200, damping: 15 });

  // Morph the blob based on cursor position
  const blobPath = useTransform(
    [xSpring, ySpring, hoverSpring],
    ([x, y, h]: number[]) => {
      const s = h * 12; // stretch amount
      const dx = (x - 0.5) * s;
      const dy = (y - 0.5) * s;
      // Organic blob with cursor-influenced control points
      return `M ${50 + dx},${5 - dy + s * 0.3} C ${75 + s + dx * 0.5},${5 - dy} ${95 + s},${25 - dy * 0.5} ${95 + s},${50 + dy} C ${95 + s},${75 + dy * 0.5} ${75 + s + dx * 0.5},${95 + dy} ${50 + dx},${95 + dy - s * 0.3} C ${25 - s + dx * 0.5},${95 + dy} ${5 - s},${75 + dy * 0.5} ${5 - s},${50 + dy} C ${5 - s},${25 - dy * 0.5} ${25 - s + dx * 0.5},${5 - dy} ${50 + dx},${5 - dy + s * 0.3} Z`;
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
      className={`relative inline-flex items-center justify-center px-6 py-3 cursor-pointer bg-transparent border-none ${className}`}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ filter: "url(#goo)" }}
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
        <motion.path d={blobPath} fill={color} opacity={0.15} />
        <motion.path d={blobPath} fill="none" stroke={color} strokeWidth={1.5} />
      </svg>
      <span className="relative z-10 text-sm font-medium">{children}</span>
    </button>
  );
}
