"use client";

import { motion, useReducedMotion } from "framer-motion";
import { spring } from "./motion";
import { useState } from "react";

// All paths now have exactly 10 points with same command structure for smooth morphing
/**
 * Shapes are generated, not hand-typed. Each outline is sampled at the same
 * number of points, spaced evenly by distance along its edge and starting from
 * the top, so point 1 of a circle morphs to point 1 of a star, and so on.
 * Hand-typed paths with a few uneven points look lumpy and morph unevenly.
 */
const POINTS = 64;
type Pt = [number, number];

/** Evenly spaced points along a closed polygon, starting at its first vertex. */
function sample(vertices: Pt[]): Pt[] {
  const edges = vertices.map((v, i) => [v, vertices[(i + 1) % vertices.length]] as const);
  const lengths = edges.map(([p, q]) => Math.hypot(q[0] - p[0], q[1] - p[1]));
  const total = lengths.reduce((a, b) => a + b, 0);
  const out: Pt[] = [];
  for (let k = 0; k < POINTS; k++) {
    let d = (k / POINTS) * total;
    let e = 0;
    while (d > lengths[e]) d -= lengths[e++];
    const [p, q] = edges[e];
    const t = d / lengths[e];
    out.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]);
  }
  return out;
}

/** Regular polygon (or star, with an inner radius) centered at 50,50, first point at the top. */
function polygon(sides: number, r: number, inner?: number): Pt[] {
  const n = inner ? sides * 2 : sides;
  return Array.from({ length: n }, (_, i) => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
    const rr = inner && i % 2 ? inner : r;
    return [50 + rr * Math.cos(a), 50 + rr * Math.sin(a)] as Pt;
  });
}

const toPath = (pts: Pt[]) => "M " + pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" L ") + " Z";

const shapes = {
  circle: toPath(Array.from({ length: POINTS }, (_, i) => {
    const a = -Math.PI / 2 + (i / POINTS) * Math.PI * 2;
    return [50 + 36 * Math.cos(a), 50 + 36 * Math.sin(a)] as Pt;
  })),
  // Start the square at the middle of its top edge, so it lines up with the others' top point.
  square: toPath(sample([[50, 18], [82, 18], [82, 82], [18, 82], [18, 18]])),
  // Nudged down so the triangle looks centered (its visual center sits below its centroid).
  triangle: toPath(sample(polygon(3, 40).map(([x, y]) => [x, y + 6] as Pt))),
  star: toPath(sample(polygon(5, 40, 17))),
  diamond: toPath(sample(polygon(4, 38))),
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
  const reduced = useReducedMotion();
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
            transition={reduced ? { duration: 0 } : spring.smooth}
          />
        </svg>
      </button>
      <span className="text-xs text-neutral-400 capitalize">{currentShape} — click to morph</span>
    </div>
  );
}
