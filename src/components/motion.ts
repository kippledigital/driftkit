"use client";

/**
 * DriftKit motion system
 * =============================================================================
 * One source of truth for how DriftKit moves. Every component pulls its springs
 * from here, so the whole library feels like one family and a single edit
 * retunes everything.
 *
 * Copy-paste note: if you copy a component into your project, copy this file
 * next to it (it has no dependencies beyond framer-motion).
 *
 * HOW TO PICK A SPRING
 * --------------------
 * Ask "how far does it travel, and how much should it say?"
 *
 *   snappy  small, direct feedback: toggles, presses, indicators, checkmarks.
 *           Fast and nearly critically damped; it lands, it doesn't wobble.
 *   smooth  medium travel: dialogs, popovers, tab content, list items.
 *           The default. A hint of settle that reads as "arrived".
 *   gentle  large travel: drawers, sheets, carousels, full-panel moves.
 *           Lower stiffness so big distances don't feel violent; no overshoot.
 *   bouncy  playful moments you want noticed: badges, dock icons, success states.
 *           Visible overshoot. Use sparingly, at most one per screen.
 *   wobbly  decorative jelly (wobble card, liquid button). Never for UI that
 *           someone is waiting on.
 *
 * ENTER WITH A SPRING, EXIT WITH A TWEEN
 * --------------------------------------
 * People wait for things to appear, but they've already moved on when they
 * dismiss something. Exits are short ease-in tweens so the UI gets out of the
 * way instead of springing slowly closed.
 *
 * DAMPING RATIO, FOR THE CURIOUS
 * ------------------------------
 * zeta = damping / (2 * sqrt(stiffness * mass)). Below 1 overshoots, 1 lands
 * exactly, above 1 creeps in. The ratio is noted on each token.
 * =============================================================================
 */

import { useReducedMotion, type Transition } from "framer-motion";

export const spring = {
  /** zeta ~0.88. Controls and indicators. */
  snappy: { type: "spring", stiffness: 520, damping: 40, mass: 1 },
  /** zeta ~0.87. The default for things that appear. */
  smooth: { type: "spring", stiffness: 320, damping: 31, mass: 1 },
  /** zeta ~1.0. Large panels and anything that travels far. */
  gentle: { type: "spring", stiffness: 210, damping: 29, mass: 1 },
  /** zeta ~0.52. Visible overshoot, for moments of delight. */
  bouncy: { type: "spring", stiffness: 380, damping: 20, mass: 1 },
  /** zeta ~0.35. Decorative jelly only. */
  wobbly: { type: "spring", stiffness: 180, damping: 9.5, mass: 1 },
} as const satisfies Record<string, Transition>;

export type SpringName = keyof typeof spring;

/** Same springs without `type`, for useSpring(). */
export const springValue = {
  snappy: { stiffness: 520, damping: 40, mass: 1 },
  smooth: { stiffness: 320, damping: 31, mass: 1 },
  gentle: { stiffness: 210, damping: 29, mass: 1 },
  bouncy: { stiffness: 380, damping: 20, mass: 1 },
  wobbly: { stiffness: 180, damping: 9.5, mass: 1 },
} as const;

/** Exits: quick and out of the way. */
export const exit = {
  /** Small things: tooltips, menus, toasts. */
  quick: { duration: 0.12, ease: [0.4, 0, 1, 1] },
  /** Overlays and panels. */
  panel: { duration: 0.18, ease: [0.4, 0, 1, 1] },
} as const satisfies Record<string, Transition>;

/** Fades for backdrops and anything blurred: springs make blur shimmer. */
export const fade = {
  in: { duration: 0.2, ease: [0, 0, 0.2, 1] },
  out: { duration: 0.15, ease: [0.4, 0, 1, 1] },
} as const satisfies Record<string, Transition>;

/** Stagger between siblings. Keep total cascades under ~250ms. */
export const stagger = { tight: 0.025, normal: 0.04, loose: 0.06 } as const;

/** What reduced motion becomes: a short crossfade, no travel. */
export const reducedTransition: Transition = { duration: 0.12, ease: "linear" };

/**
 * Returns transitions that respect `prefers-reduced-motion`.
 *
 *   const m = useMotionPrefs();
 *   <motion.div transition={m.spring("smooth")} />
 *   <motion.div initial={m.reduced ? { opacity: 0 } : { opacity: 0, y: 8 }} />
 */
export function useMotionPrefs() {
  const reduced = useReducedMotion() ?? false;
  return {
    reduced,
    spring: (name: SpringName): Transition => (reduced ? reducedTransition : spring[name]),
    exit: (name: keyof typeof exit = "panel"): Transition => (reduced ? reducedTransition : exit[name]),
  };
}
