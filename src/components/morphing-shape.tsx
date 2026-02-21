"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// All paths now have exactly 10 points with same command structure for smooth morphing
const shapes = {
  circle: "M 50,15 L 67,19 L 85,35 L 89,50 L 85,65 L 67,81 L 50,85 L 33,81 L 15,65 L 11,50 Z",
  square: "M 20,20 L 50,20 L 80,20 L 80,35 L 80,50 L 80,65 L 80,80 L 50,80 L 20,80 L 20,50 Z",
  triangle: "M 50,15 L 58,25 L 66,35 L 74,55 L 82,75 L 68,80 L 50,82 L 32,80 L 18,75 L 26,45 Z",
  star: "M 50,10 L 55,30 L 75,30 L 61,45 L 67,65 L 50,55 L 33,65 L 39,45 L 25,30 L 45,30 Z",
  diamond: "M 50,15 L 65,25 L 75,40 L 80,50 L 75,60 L 65,75 L 50,85 L 35,75 L 25,60 L 20,50 Z",
};

type ShapeName = keyof typeof shapes;

const shapeNames: ShapeName[] = ["circle", "square", "triangle", "star", "diamond"];

interface MorphingShapeProps {
  size?: number;
  color?: string;
  strokeColor?: string;
  className?: string;
}

export function MorphingShape({
  size = 200,
  color = "rgba(99, 102, 241, 0.15)",
  strokeColor = "#6366f1",
  className = "",
}: MorphingShapeProps) {
  const [shapeIndex, setShapeIndex] = useState(0);
  const currentShape = shapeNames[shapeIndex];

  const next = () => setShapeIndex((i) => (i + 1) % shapeNames.length);

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <button
        onClick={next}
        className="cursor-pointer bg-transparent border-none p-0 hover:scale-105 transition-transform"
        aria-label="Morph to next shape"
      >
        <svg width={size} height={size} viewBox="0 0 100 100">
          <motion.path
            d={shapes[currentShape]}
            fill={color}
            stroke={strokeColor}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            animate={{ d: shapes[currentShape] }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15, 
              mass: 0.6,
              duration: 0.8 
            }}
          />
        </svg>
      </button>
      <span className="text-xs text-neutral-400 capitalize">{currentShape} — click to morph</span>
    </div>
  );
}
