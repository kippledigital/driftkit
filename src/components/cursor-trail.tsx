"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

export interface CursorTrailProps {
  /** Number of trail dots. Default 8 */
  count?: number;
  /** Dot size in px. Default 8 */
  size?: number;
  /** Color of the dots. Default currentColor */
  color?: string;
  className?: string;
}

interface Dot {
  x: number;
  y: number;
}

const SPRING = { stiffness: 200, damping: 20, mass: 0.2 };

function TrailDot({ x, y, size, color, index, total }: { x: number; y: number; size: number; color: string; index: number; total: number }) {
  const springX = useSpring(x, { ...SPRING, stiffness: SPRING.stiffness - index * 15 });
  const springY = useSpring(y, { ...SPRING, stiffness: SPRING.stiffness - index * 15 });

  useEffect(() => { springX.set(x); }, [x, springX]);
  useEffect(() => { springY.set(y); }, [y, springY]);

  const scale = 1 - (index / total) * 0.6;
  const opacity = 1 - (index / total) * 0.8;

  return (
    <motion.div
      className="fixed pointer-events-none z-50 rounded-full"
      style={{
        x: springX,
        y: springY,
        width: size * scale,
        height: size * scale,
        opacity,
        backgroundColor: color,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
}

export function CursorTrail({ count = 8, size = 8, color = "currentColor", className = "" }: CursorTrailProps) {
  const [pos, setPos] = useState<Dot>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [handleMove]);

  return (
    <div ref={containerRef} className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <TrailDot key={i} x={pos.x} y={pos.y} size={size} color={color} index={i} total={count} />
      ))}
    </div>
  );
}

export default CursorTrail;
