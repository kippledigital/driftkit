"use client";

import React, { useState, forwardRef, type ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";

// =============================================================================
// SPRING PHYSICS
// =============================================================================
// Hover lift uses "smooth" spring — stiffness 300, damping 30, mass 1.
// WHY: The card should rise gently on hover, like a physical card being picked
// up. translateY -2px + increased shadow creates a convincing elevation change.
// Smooth spring gives it weight — not bouncy, just deliberate.
//
// Press sink uses "snappy" spring — stiffness 500, damping 30, mass 0.5.
// WHY: Press feedback should be immediate and tactile. The card sinks back to
// its resting position (y: 0, shadow flattened) to communicate "you're pressing
// this." Low mass makes it responsive.
//
// Flip uses "smooth" spring for rotateY.
// WHY: Card flips should feel weighty and satisfying — like actually turning
// a card over. The smooth spring's mass (1) gives it inertia, and the damping
// prevents oscillation that would make text hard to read.
// =============================================================================

const springs = {
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
  smooth: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
};

// =============================================================================
// SHADOW VALUES
// =============================================================================
// WHY shadow progression: Idle → Hover → Press maps to a physical elevation
// metaphor. Idle has minimal shadow (resting on surface). Hover lifts it
// (deeper, softer shadow). Press pushes it back down (flattened shadow).
const shadowIdle = "0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.08)";
const shadowHover = "0 8px 24px -4px rgba(0,0,0,0.12), 0 2px 6px -2px rgba(0,0,0,0.06)";
const shadowPress = "0 1px 2px 0 rgba(0,0,0,0.05)";

// =============================================================================
// TYPES
// =============================================================================

export type CardVariant = "interactive" | "static";

export interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  variant?: CardVariant;
  children: ReactNode;
  className?: string;
}

export interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  /** Controlled flip state. If omitted, click toggles. */
  flipped?: boolean;
  onFlip?: (flipped: boolean) => void;
  className?: string;
}

// =============================================================================
// CARD COMPONENT
// =============================================================================

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "static", children, className = "", ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const isInteractive = variant === "interactive";

    // WHY conditional animations: Static cards shouldn't have hover/press —
    // they're for layout/display only. Interactive cards get the full physics
    // treatment. This keeps the API explicit about intent.
    const hoverAnimation =
      isInteractive && !prefersReducedMotion
        ? { y: -2, boxShadow: shadowHover }
        : {};

    const tapAnimation =
      isInteractive && !prefersReducedMotion
        ? { y: 0, boxShadow: shadowPress }
        : {};

    return (
      <motion.div
        ref={ref}
        className={`rounded-[8px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden ${
          isInteractive ? "cursor-pointer" : ""
        } ${className}`}
        initial={false}
        animate={{ boxShadow: shadowIdle }}
        whileHover={hoverAnimation}
        whileTap={isInteractive ? tapAnimation : undefined}
        transition={{
          ...springs.smooth,
          boxShadow: { type: "tween", duration: 0.2, ease: "easeOut" },
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

// =============================================================================
// SUB-COMPONENTS
// =============================================================================
// WHY composable sub-components: Card is a layout primitive. Users need to
// structure content (header, body, footer) without fighting the component.
// Each sub-component handles its own padding/spacing so the parent Card
// stays clean — just border + radius + shadow.

export function CardHeader({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-6 pt-6 pb-2 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-6 py-2 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-6 pt-2 pb-6 ${className}`}>
      {children}
    </div>
  );
}

// =============================================================================
// FLIP CARD
// =============================================================================
// WHY separate FlipCard: The flip animation requires a fundamentally different
// DOM structure (two faces with backface-visibility) and interaction model.
// Composing it into the base Card would bloat the simple case. Instead, FlipCard
// is a sibling component that can use Card internally for each face.

export function FlipCard({
  front,
  back,
  flipped: controlledFlipped,
  onFlip,
  className = "",
}: FlipCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [internalFlipped, setInternalFlipped] = useState(false);
  const isFlipped = controlledFlipped ?? internalFlipped;

  const handleClick = () => {
    const next = !isFlipped;
    setInternalFlipped(next);
    onFlip?.(next);
  };

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      onClick={handleClick}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative w-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : springs.smooth}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front face */}
        <div
          className="rounded-[8px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {front}
        </div>

        {/* Back face — rotated 180° so it's hidden when front is showing */}
        <div
          className="absolute inset-0 rounded-[8px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}

export default Card;
