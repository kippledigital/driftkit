"use client";

import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export interface WobbleCardProps {
  children: React.ReactNode;
  className?: string;
}

const SPRING = { stiffness: 300, damping: 8, mass: 0.5 };

export function WobbleCard({ children, className = "" }: WobbleCardProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, SPRING);
  const springY = useSpring(rotateY, SPRING);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 20);
    rotateY.set(x * 20);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      className={`rounded-[8px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden ${className}`}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 600 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}

export default WobbleCard;
