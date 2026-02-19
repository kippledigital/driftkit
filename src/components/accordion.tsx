"use client";

import React, { useState, useCallback, useId, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

// =============================================================================
// SPRING PHYSICS
// =============================================================================
// Same spring system as Button and Tabs — see button.tsx for full rationale.
//
// "snappy" — stiffness 500, damping 30, mass 0.5
//   Used for chevron rotation. The chevron is a small, lightweight element
//   so it should respond crisply. Overshoot would look jittery on a rotation.
//
// "smooth" — stiffness 300, damping 30, mass 1
//   Used for height animation. Opening/closing panels should feel weighty
//   and intentional — like a drawer sliding open, not a switch flipping.
//   The mass of 1 prevents it from feeling weightless.
//
// "quick" — stiffness 500, damping 40, mass 0.3
//   Used for the header press scale and staggered content fade-in.
//   These are secondary animations that shouldn't compete with the
//   main height reveal.
// =============================================================================

const springs = {
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
  smooth: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
  quick: { type: "spring" as const, stiffness: 500, damping: 40, mass: 0.3 },
};

// =============================================================================
// TYPES
// =============================================================================

export interface AccordionItem {
  /** Unique key */
  value: string;
  /** Header content */
  trigger: React.ReactNode;
  /** Panel content */
  content: React.ReactNode;
  /** Disable this item */
  disabled?: boolean;
}

export interface AccordionProps {
  /** Accordion items */
  items: AccordionItem[];
  /** "single" = only one open at a time, "multiple" = any combination */
  type?: "single" | "multiple";
  /** Controlled open values */
  value?: string[];
  /** Default open values (uncontrolled) */
  defaultValue?: string[];
  /** Called when open state changes */
  onValueChange?: (value: string[]) => void;
  /** Additional class on root */
  className?: string;
}

// =============================================================================
// CHEVRON (inline SVG — self-contained, no external deps)
// =============================================================================

function Chevron({ isOpen, reduced }: { isOpen: boolean; reduced: boolean }) {
  return (
    <motion.svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0 text-neutral-500 dark:text-neutral-400"
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={reduced ? { duration: 0 } : springs.snappy}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

// =============================================================================
// ACCORDION PANEL — handles height animation
// =============================================================================
// Height animation is notoriously hard because `height: auto` isn't animatable.
// We use AnimatePresence + animate from height 0 → "auto" which Framer Motion
// supports natively (it measures the element, then animates to that value).
// This avoids layout thrashing and ResizeObserver hacks.
// =============================================================================

function AccordionPanel({
  children,
  reduced,
}: {
  children: React.ReactNode;
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={
        reduced
          ? { duration: 0.1 }
          : {
              height: springs.smooth,
              opacity: { duration: 0.2, ease: "easeOut" },
            }
      }
      className="overflow-hidden"
    >
      {/* Inner wrapper provides padding without affecting height calc.
          Staggered children fade in sequentially for a polished feel. */}
      <StaggerContent reduced={reduced}>{children}</StaggerContent>
    </motion.div>
  );
}

// =============================================================================
// STAGGER CONTENT — children fade in sequentially on open
// =============================================================================

function StaggerContent({
  children,
  reduced,
}: {
  children: React.ReactNode;
  reduced: boolean;
}) {
  // Wrap each direct child in a stagger container
  const childArray = React.Children.toArray(children);

  if (reduced || childArray.length <= 1) {
    return <div className="px-4 pb-4 pt-1">{children}</div>;
  }

  return (
    <div className="px-4 pb-4 pt-1">
      {childArray.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ...springs.quick,
            // Stagger: each child delays slightly after the previous.
            // 60ms feels sequential without dragging.
            delay: i * 0.06,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

// =============================================================================
// COMPONENT
// =============================================================================

export function Accordion({
  items,
  type = "single",
  value: controlledValue,
  defaultValue,
  onValueChange,
  className = "",
}: AccordionProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const id = useId();

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>(
    defaultValue ?? []
  );
  const openValues = isControlled ? controlledValue : internalValue;

  const toggle = useCallback(
    (itemValue: string) => {
      let next: string[];
      const isOpen = openValues.includes(itemValue);

      if (type === "single") {
        // Single mode: toggle off or switch to this one
        next = isOpen ? [] : [itemValue];
      } else {
        // Multiple mode: toggle this item independently
        next = isOpen
          ? openValues.filter((v) => v !== itemValue)
          : [...openValues, itemValue];
      }

      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    },
    [type, openValues, isControlled, onValueChange]
  );

  // Keyboard: Enter/Space to toggle, per WAI-ARIA Accordion pattern
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, itemValue: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle(itemValue);
      }
    },
    [toggle]
  );

  // Memoize the set for O(1) lookup
  const openSet = useMemo(() => new Set(openValues), [openValues]);

  return (
    <div
      className={`divide-y divide-neutral-200 dark:divide-neutral-700 rounded-[8px] border border-neutral-200 dark:border-neutral-700 overflow-hidden tracking-[0.02em] ${className}`}
      style={{ fontFamily: "Satoshi, sans-serif" }}
    >
      {items.map((item) => {
        const isOpen = openSet.has(item.value);
        const triggerId = `${id}-trigger-${item.value}`;
        const panelId = `${id}-panel-${item.value}`;

        return (
          <div key={item.value}>
            {/* Header — subtle scale on press for tactile feel */}
            <motion.button
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              disabled={item.disabled}
              onClick={() => {
                if (!item.disabled) toggle(item.value);
              }}
              onKeyDown={(e) => handleKeyDown(e, item.value)}
              className={`flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-left select-none cursor-pointer
                ${
                  item.disabled
                    ? "opacity-40 cursor-default"
                    : "text-neutral-900 dark:text-neutral-100"
                }
              `}
              // Framer owns all interaction states — no Tailwind hover:
              whileHover={
                item.disabled || prefersReducedMotion
                  ? undefined
                  : { backgroundColor: "rgba(0,0,0,0.03)" }
              }
              whileTap={
                item.disabled || prefersReducedMotion
                  ? undefined
                  : { scale: 0.985 }
              }
              transition={springs.quick}
            >
              <span>{item.trigger}</span>
              <Chevron isOpen={isOpen} reduced={prefersReducedMotion} />
            </motion.button>

            {/* Panel — AnimatePresence handles mount/unmount with height animation */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <AccordionPanel reduced={prefersReducedMotion}>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className="text-sm text-neutral-600 dark:text-neutral-300"
                  >
                    {item.content}
                  </div>
                </AccordionPanel>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

Accordion.displayName = "Accordion";

export default Accordion;
