"use client";

import React, { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

// =============================================================================
// PARALLAX TILT CARD
// =============================================================================
// 3D perspective tilt on hover. Layers move at different parallax speeds.
// A light reflection glides across the surface. Pure motion values — zero
// re-renders during interaction.

interface ParallaxTiltCardProps {
  children?: ReactNode;
  className?: string;
  /** Max tilt angle in degrees */
  maxTilt?: number;
  /** Spring config */
  springConfig?: { stiffness: number; damping: number };
  /** Show light reflection */
  glare?: boolean;
}

export function ParallaxTiltCard({
  children,
  className = "",
  maxTilt = 15,
  springConfig = { stiffness: 300, damping: 20 },
  glare = true,
}: ParallaxTiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [maxTilt, -maxTilt]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-maxTilt, maxTilt]),
    springConfig
  );

  const glareX = useTransform(mouseX, [0, 1], [0, 100]);
  const glareY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMove = (e: React.MouseEvent) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: prefersReduced ? 0 : rotateX,
        rotateY: prefersReduced ? 0 : rotateY,
        transformPerspective: 800,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-[8px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden ${className}`}
    >
      {children}
      {glare && !prefersReduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[8px]"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.25) 0%, transparent 60%)`
            ),
          }}
        />
      )}
    </motion.div>
  );
}

/** Parallax layer — children shift based on depth factor */
export function ParallaxLayer({
  children,
  depth = 1,
  className = "",
}: {
  children: ReactNode;
  depth?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{ transform: `translateZ(${depth * 30}px)`, transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
