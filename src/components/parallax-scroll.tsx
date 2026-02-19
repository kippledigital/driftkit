"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

interface ParallaxScrollProps {
  children?: React.ReactNode;
  className?: string;
}

interface ParallaxItemProps {
  children: React.ReactNode;
  speed?: number; // negative = slower, positive = faster
  className?: string;
}

export function ParallaxScroll({ children, className = "" }: ParallaxScrollProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function ParallaxItem({ children, speed = 0.5, className = "" }: ParallaxItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  const y = useSpring(rawY, { stiffness: 100, damping: 20 });

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
