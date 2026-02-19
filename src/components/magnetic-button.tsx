"use client";

import React, { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

// =============================================================================
// MAGNETIC BUTTON
// =============================================================================
// WHY: Magnetic buttons create a sense of "aliveness" — the UI reaches out to
// meet the user's cursor. This is a common pattern in award-winning sites
// (Apple, Linear, Stripe) because it communicates interactivity before click.
//
// HOW: We track the cursor position relative to the button center. When the
// cursor enters a ~100px radius, we apply a spring-driven x/y offset that
// pulls the button toward the cursor. Max displacement is 8px — subtle enough
// to feel elegant, not gimmicky.
//
// WHY useMotionValue instead of useState: Motion values update outside React's
// render cycle. Mouse events fire 60+ times/second — useState would cause
// 60+ re-renders/second. Motion values are GPU-friendly and zero-rerender.
// =============================================================================

const MAGNETIC_RADIUS = 100; // px — detection zone around the button
const MAX_DISPLACEMENT = 8; // px — maximum pull distance (keeps it elegant)

// Smooth spring — balanced feel for the magnetic pull
// Not too snappy (would feel twitchy), not too slow (would feel laggy)
const SPRING_CONFIG = { stiffness: 300, damping: 30, mass: 1 };

export interface MagneticButtonProps {
  children: React.ReactNode;
  /** Magnetic pull strength multiplier. Default 1. Set to 0.5 for subtler effect. */
  intensity?: number;
  /** Extra CSS classes on the wrapper */
  className?: string;
  /** Disable the magnetic effect (still renders children normally) */
  disabled?: boolean;
  as?: "button" | "div" | "a";
  [key: string]: unknown;
}

export function MagneticButton({
  children,
  intensity = 1,
  className = "",
  disabled = false,
  as = "div",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Raw motion values — these won't cause re-renders
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring-smoothed values — the actual transform applied to the element.
  // WHY spring instead of direct set: Springs create natural deceleration.
  // Without them the button would track the cursor 1:1 which feels mechanical.
  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || prefersReducedMotion || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < MAGNETIC_RADIUS) {
        // WHY this formula: We want the pull to increase as the cursor gets
        // closer, but cap at MAX_DISPLACEMENT. The (1 - distance/radius)
        // gives us a 0→1 range that's strongest at the center.
        const pull = (1 - distance / MAGNETIC_RADIUS) * MAX_DISPLACEMENT * intensity;
        const angle = Math.atan2(deltaY, deltaX);
        x.set(Math.cos(angle) * pull);
        y.set(Math.sin(angle) * pull);
      } else {
        x.set(0);
        y.set(0);
      }
    },
    [disabled, prefersReducedMotion, intensity, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    // WHY we set to 0 instead of animating: The spring on springX/springY
    // handles the animation back to center automatically. Setting the raw
    // value to 0 lets the spring naturally decelerate to rest.
    x.set(0);
    y.set(0);
  }, [x, y]);

  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Component>
  );
}

export default MagneticButton;
