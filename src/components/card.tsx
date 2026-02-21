"use client";

import React, { forwardRef, type ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";

// =============================================================================
// SPRING PHYSICS
// =============================================================================
// Card animations use three distinct spring configurations:
//
// "smooth" — stiffness 300, damping 30, mass 1
//   Used for hover lift. The card should rise gracefully like a physical object
//   being picked up. Not bouncy, just deliberate and premium feeling.
//
// "snappy" — stiffness 500, damping 30, mass 0.5  
//   Used for press/tap feedback. Tactile response needs to be immediate.
//   Lower mass makes it feel nimble and responsive.
//
// "gentle" — stiffness 250, damping 35, mass 1.2
//   Used for enter animations. Cards should settle into view naturally,
//   not aggressively. Higher damping prevents overshoot on entry.
// =============================================================================

const springs = {
  smooth: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
  gentle: { type: "spring" as const, stiffness: 250, damping: 35, mass: 1.2 },
};

// =============================================================================
// SHADOW VALUES & ANIMATION STATES
// =============================================================================
// Three-tier shadow system communicates elevation:
// • Idle: Subtle shadow, card rests on surface
// • Hover: Elevated shadow with soft spread
// • Press: Flattened back to surface
//
// Scale transforms are micro (0.02) to avoid feeling cartoony.
// translateY -4px on hover creates convincing elevation illusion.

const shadows = {
  idle: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
  hover: "0 10px 25px -3px rgba(0,0,0,0.15), 0 4px 6px -4px rgba(0,0,0,0.1)",
  press: "0 1px 2px 0 rgba(0,0,0,0.05), 0 1px 1px -1px rgba(0,0,0,0.04)",
};

// Enter animation variants for individual cards and staggered grids
const enterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springs.gentle,
  },
};

// =============================================================================
// TYPES
// =============================================================================

export type CardVariant = "default" | "outlined" | "elevated";
export type CardSize = "sm" | "md" | "lg";

export interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  variant?: CardVariant;
  size?: CardSize;
  children: ReactNode;
  className?: string;
  /** Disable hover and press interactions */
  static?: boolean;
  /** Enable enter animation (use with CardGrid for stagger) */
  animated?: boolean;
  /** Animation delay for staggered entrances */
  delay?: number;
}

export interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export interface CardContentProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export interface CardActionsProps {
  children: ReactNode;
  className?: string;
}

export interface CardGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  staggerDelay?: number;
  className?: string;
}

// =============================================================================
// STYLES
// =============================================================================

const baseClasses =
  "relative overflow-hidden rounded-[8px] select-none";

const variantClasses: Record<CardVariant, string> = {
  default: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800",
  outlined: "bg-transparent border-2 border-neutral-300 dark:border-neutral-700",
  elevated: "bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800",
};

const sizeClasses: Record<CardSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

// =============================================================================
// CARD COMPONENT
// =============================================================================

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      size = "md",
      children,
      className = "",
      static: isStatic = false,
      animated = false,
      delay = 0,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();

    // Determine if this card should have interactions
    const isInteractive = !isStatic;

    // Base shadow varies by variant
    const getBaseShadow = () => {
      if (variant === "elevated") return shadows.hover;
      if (variant === "outlined") return "none";
      return shadows.idle;
    };

    // Hover animation - combines scale, translateY, and shadow
    const hoverAnimation = !prefersReducedMotion && isInteractive
      ? {
          scale: 1.02,
          y: -4,
          boxShadow: variant === "outlined" ? "none" : shadows.hover,
        }
      : {};

    // Press animation - subtle sink back down
    const tapAnimation = !prefersReducedMotion && isInteractive
      ? {
          scale: 0.98,
          y: 0,
          boxShadow: variant === "outlined" ? "none" : shadows.press,
        }
      : {};

    return (
      <motion.div
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
          isInteractive ? "cursor-pointer" : ""
        } ${className}`}
        
        // Initial state
        initial={animated ? "hidden" : false}
        animate={animated ? "visible" : { boxShadow: getBaseShadow() }}
        variants={animated ? enterVariants : undefined}
        
        // Custom delay for staggered entrance
        transition={animated ? { ...springs.gentle, delay } : undefined}
        
        // Interaction states
        whileHover={hoverAnimation}
        whileTap={isInteractive ? tapAnimation : undefined}
        
        // Smooth transitions between states
        style={{
          transition: !prefersReducedMotion 
            ? "box-shadow 0.2s ease-out" 
            : undefined,
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

export const CardImage = ({ src, alt, className = "" }: CardImageProps) => (
  <div className={`relative w-full aspect-[16/10] overflow-hidden ${className}`}>
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
    />
  </div>
);

export const CardContent = ({ title, description, children, className = "" }: CardContentProps) => (
  <div className={`p-6 ${className}`}>
    {title && (
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 leading-tight">
        {title}
      </h3>
    )}
    {description && (
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
        {description}
      </p>
    )}
    {children}
  </div>
);

export const CardActions = ({ children, className = "" }: CardActionsProps) => (
  <div className={`px-6 pb-6 flex items-center gap-3 ${className}`}>
    {children}
  </div>
);

// =============================================================================
// CARD GRID - Staggered entrance animations
// =============================================================================

export const CardGrid = ({ 
  children, 
  columns = 2, 
  gap = "md",
  staggerDelay = 0.1,
  className = "" 
}: CardGridProps) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  const gridGap = {
    sm: "gap-3",
    md: "gap-6",
    lg: "gap-8",
  };

  // Clone children with staggered delays
  const staggeredChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child) && child.type === Card) {
      return React.cloneElement(child as React.ReactElement<CardProps>, {
        animated: true,
        delay: index * staggerDelay,
      });
    }
    return child;
  });

  return (
    <div className={`grid ${gridCols[columns]} ${gridGap[gap]} ${className}`}>
      {staggeredChildren}
    </div>
  );
};

// =============================================================================
// LEGACY SUPPORT - Keep existing components for backward compatibility
// =============================================================================

export const CardHeader = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`px-6 pt-6 pb-2 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`px-6 pt-2 pb-6 ${className}`}>
    {children}
  </div>
);

// FlipCard remains unchanged for now
export function FlipCard({
  front,
  back,
  flipped: controlledFlipped,
  onFlip,
  className = "",
}: {
  front: ReactNode;
  back: ReactNode;
  flipped?: boolean;
  onFlip?: (flipped: boolean) => void;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [internalFlipped, setInternalFlipped] = React.useState(false);
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
        <div
          className="rounded-[8px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {front}
        </div>

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