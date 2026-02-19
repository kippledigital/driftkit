"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const shapes = {
  circle: "M 50,10 C 71.5,10 90,28.5 90,50 C 90,71.5 71.5,90 50,90 C 28.5,90 10,71.5 10,50 C 10,28.5 28.5,10 50,10 Z",
  square: "M 15,15 C 15,15 85,15 85,15 C 85,15 85,85 85,85 C 85,85 15,85 15,85 C 15,85 15,15 15,15 Z",
  triangle: "M 50,10 C 50,10 90,85 90,85 C 90,85 10,85 10,85 C 10,85 50,10 50,10 Z",
  star: "M 50,5 C 50,5 61,35 61,35 C 61,35 95,35 95,35 C 95,35 68,55 68,55 C 68,55 79,90 79,90 C 79,90 50,68 50,68 C 50,68 21,90 21,90 C 21,90 32,55 32,55 C 32,55 5,35 5,35 C 5,35 39,35 39,35 Z",
  diamond: "M 50,5 C 50,5 90,50 90,50 C 90,50 50,95 50,95 C 50,95 10,50 10,50 C 10,50 50,5 50,5 Z",
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
        className="cursor-pointer bg-transparent border-none p-0"
        aria-label="Morph to next shape"
      >
        <svg width={size} height={size} viewBox="0 0 100 100">
          <AnimatePresence mode="wait">
            <motion.path
              key={currentShape}
              d={shapes[currentShape]}
              fill={color}
              stroke={strokeColor}
              strokeWidth={1.5}
              initial={{ d: shapes[shapeNames[(shapeIndex - 1 + shapeNames.length) % shapeNames.length]] }}
              animate={{ d: shapes[currentShape] }}
              transition={{ type: "spring", stiffness: 80, damping: 12, mass: 0.8 }}
            />
          </AnimatePresence>
        </svg>
      </button>
      <span className="text-xs text-neutral-400 capitalize">{currentShape} — click to morph</span>
    </div>
  );
}
