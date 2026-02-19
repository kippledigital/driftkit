"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

// =============================================================================
// MODE SWITCHER
// =============================================================================
// WHY: Dark/light mode toggles are everywhere, but most are boring icon swaps.
// This one morphs the sun into a crescent moon using SVG path animation with
// spring physics. The sun's rays retract as the circle transforms into a moon.
//
// HOW: The sun is drawn with a center circle + radiating lines. On toggle:
// 1. Rays scale down to 0 (retract into the center)
// 2. Center circle morphs — a "bite" appears via an animated clip/mask circle
// 3. The whole icon rotates slightly for organic feel
// 4. Optional "iris wipe" variant radiates the theme change outward from click
//
// WHY SVG animation over icon swap: Morphing creates continuity. The user sees
// a transformation, not a replacement. This communicates "same thing, different
// state" which is exactly what dark/light mode is.
// =============================================================================

// Smooth spring — the morph should feel natural, not snappy
const MORPH_SPRING = { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 };
const RAY_SPRING = { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 };

export interface ModeSwitcherProps {
  /** Controlled mode. If not provided, manages its own state. */
  mode?: "light" | "dark";
  /** Called when mode changes */
  onChange?: (mode: "light" | "dark") => void;
  /** Enable iris wipe transition effect */
  irisWipe?: boolean;
  /** Size of the toggle button in px. Default 40 */
  size?: number;
  className?: string;
}

export function ModeSwitcher({
  mode: controlledMode,
  onChange,
  irisWipe = false,
  size = 40,
  className = "",
}: ModeSwitcherProps) {
  const prefersReducedMotion = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Internal state — used when uncontrolled
  const [internalMode, setInternalMode] = useState<"light" | "dark">("light");

  // Initialize from document class on mount
  useEffect(() => {
    if (typeof document !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark");
      setInternalMode(isDark ? "dark" : "light");
    }
  }, []);

  const currentMode = controlledMode ?? internalMode;
  const isDark = currentMode === "dark";

  const toggle = useCallback(() => {
    const next = isDark ? "light" : "dark";

    if (irisWipe && !prefersReducedMotion && buttonRef.current) {
      // IRIS WIPE: Theme change radiates outward from the toggle button.
      // WHY clip-path: It's GPU-accelerated and doesn't cause layout shifts.
      // We create a full-screen overlay with the new theme colors and
      // animate its clip-path from a small circle to cover the viewport.
      const rect = buttonRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Calculate the max radius needed to cover the entire viewport
      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      // Create overlay with the NEW theme color BEFORE toggling the class.
      // The overlay expands to cover the old theme, then we swap underneath.
      const overlay = document.createElement("div");
      overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 9999; pointer-events: none;
        background: ${next === "dark" ? "#0a0a0a" : "#ffffff"};
        clip-path: circle(0px at ${x}px ${y}px);
      `;
      document.body.appendChild(overlay);

      const anim = overlay.animate(
        [
          { clipPath: `circle(0px at ${x}px ${y}px)` },
          { clipPath: `circle(${maxRadius}px at ${x}px ${y}px)` },
        ],
        { duration: 500, easing: "ease-out", fill: "forwards" }
      );

      // Toggle the actual theme class midway through the wipe (when overlay
      // covers enough of the viewport that the swap is invisible)
      setTimeout(() => {
        document.documentElement.classList.toggle("dark", next === "dark");
      }, 250);

      anim.onfinish = () => overlay.remove();
    } else {
      document.documentElement.classList.toggle("dark", next === "dark");
    }

    setInternalMode(next);
    onChange?.(next);
  }, [isDark, irisWipe, prefersReducedMotion, onChange]);

  // SVG dimensions — viewBox is 24x24, icon centered at 12,12
  const center = 12;
  const sunRadius = isDark ? 5 : 4; // Moon is slightly larger
  // Moon "bite" — a circle that overlaps to create the crescent
  const maskCx = isDark ? 15 : 12; // Moves in to create bite, or stays centered (hidden)
  const maskCy = isDark ? 7 : 12;
  const maskRadius = isDark ? 4.5 : 0; // 0 = no bite = full circle = sun

  // Sun rays — 8 lines radiating from center
  const rays = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 45 * Math.PI) / 180;
    const innerR = 6.5;
    const outerR = 9;
    return {
      x1: center + Math.cos(angle) * innerR,
      y1: center + Math.sin(angle) * innerR,
      x2: center + Math.cos(angle) * outerR,
      y2: center + Math.sin(angle) * outerR,
    };
  });

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      className={`inline-flex items-center justify-center rounded-[8px] cursor-pointer
        bg-neutral-100 dark:bg-neutral-800 
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        ${className}`}
      style={{ width: size, height: size }}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
      transition={RAY_SPRING}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        width={size * 0.5}
        height={size * 0.5}
        // WHY rotate on toggle: Adds organic feel to the morph. The sun
        // appears to "turn into" the moon rather than just reshaping.
        animate={{ rotate: isDark ? 40 : 0 }}
        transition={MORPH_SPRING}
      >
        <defs>
          {/* Mask to create the crescent "bite" in the moon */}
          <mask id="moon-mask">
            <rect x="0" y="0" width="24" height="24" fill="white" />
            <motion.circle
              animate={{ cx: maskCx, cy: maskCy, r: maskRadius }}
              transition={MORPH_SPRING}
              fill="black"
            />
          </mask>
        </defs>

        {/* Center circle — sun body / moon body */}
        <motion.circle
          cx={center}
          cy={center}
          fill="currentColor"
          mask="url(#moon-mask)"
          animate={{ r: sunRadius }}
          transition={MORPH_SPRING}
          className="text-neutral-800 dark:text-neutral-100"
        />

        {/* Sun rays — scale to 0 when dark mode (retract into center) */}
        <g className="text-neutral-800 dark:text-neutral-100">
          {rays.map((ray, i) => (
            <motion.line
              key={i}
              x1={ray.x1}
              y1={ray.y1}
              x2={ray.x2}
              y2={ray.y2}
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              animate={{
                // WHY scale via coordinates instead of CSS scale: Per-line
                // coordinate animation lets each ray retract to center
                // independently. CSS scale would shrink the whole group.
                x1: isDark ? center : ray.x1,
                y1: isDark ? center : ray.y1,
                x2: isDark ? center : ray.x2,
                y2: isDark ? center : ray.y2,
                opacity: isDark ? 0 : 1,
              }}
              transition={{
                ...RAY_SPRING,
                // WHY staggered delay: Rays retracting one by one looks like
                // the sun "closing" rather than just disappearing. 20ms stagger
                // is fast enough to feel unified, slow enough to see the wave.
                delay: i * 0.02,
              }}
            />
          ))}
        </g>
      </motion.svg>
    </motion.button>
  );
}

export default ModeSwitcher;
