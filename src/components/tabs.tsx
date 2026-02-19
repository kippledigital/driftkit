"use client";

import React, { useState, useCallback, useRef, useId } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  LayoutGroup,
} from "framer-motion";

// =============================================================================
// SPRING PHYSICS
// =============================================================================
// Same spring system as Button — see button.tsx for rationale.
//
// "snappy" — stiffness 500, damping 30, mass 0.5
//   Used for the sliding indicator because it needs to feel direct and
//   responsive. The indicator is the primary feedback for tab selection,
//   so it must arrive quickly with no bounce to avoid feeling sloppy.
//
// "smooth" — stiffness 300, damping 30, mass 1
//   Used for content crossfade/slide. Content transitions should feel
//   deliberate and settled — too fast makes them feel glitchy, too slow
//   makes the UI feel sluggish. Mass of 1 gives it weight.
//
// "quick" — stiffness 500, damping 40, mass 0.3
//   Used for hover backgrounds on inactive tabs. Subtle and immediate.
// =============================================================================

const springs = {
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
  smooth: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
  quick: { type: "spring" as const, stiffness: 500, damping: 40, mass: 0.3 },
};

// =============================================================================
// TYPES
// =============================================================================

export interface TabItem {
  /** Unique key for this tab */
  value: string;
  /** Display label */
  label: React.ReactNode;
  /** Tab panel content */
  content: React.ReactNode;
  /** Disable this tab */
  disabled?: boolean;
}

export interface TabsProps {
  /** Tab definitions */
  items: TabItem[];
  /** Controlled active tab value */
  value?: string;
  /** Default active tab (uncontrolled) */
  defaultValue?: string;
  /** Called when active tab changes */
  onValueChange?: (value: string) => void;
  /** Additional class on the root container */
  className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function Tabs({
  items,
  value: controlledValue,
  defaultValue,
  onValueChange,
  className = "",
}: TabsProps) {
  const prefersReducedMotion = useReducedMotion();
  const id = useId();
  const tabListRef = useRef<HTMLDivElement>(null);

  // Track previous index for direction-aware content animation
  const [prevIndex, setPrevIndex] = useState(0);

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? items[0]?.value ?? ""
  );
  const activeValue = isControlled ? controlledValue : internalValue;

  const activeIndex = items.findIndex((t) => t.value === activeValue);

  const setActiveValue = useCallback(
    (val: string) => {
      const newIndex = items.findIndex((t) => t.value === val);
      setPrevIndex(activeIndex);
      if (!isControlled) setInternalValue(val);
      onValueChange?.(val);
      // We need the index tracking even for controlled mode
      if (isControlled) setPrevIndex(activeIndex);
      void newIndex; // used via closure in render
    },
    [isControlled, activeIndex, items, onValueChange]
  );

  // Direction: 1 = moving right, -1 = moving left
  const direction = activeIndex >= prevIndex ? 1 : -1;

  // Keyboard navigation — arrow keys move between tabs per WAI-ARIA Tabs pattern
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const enabledItems = items.filter((t) => !t.disabled);
      const currentEnabledIdx = enabledItems.findIndex(
        (t) => t.value === activeValue
      );
      let nextItem: TabItem | undefined;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        nextItem =
          enabledItems[(currentEnabledIdx + 1) % enabledItems.length];
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        nextItem =
          enabledItems[
            (currentEnabledIdx - 1 + enabledItems.length) %
              enabledItems.length
          ];
      } else if (e.key === "Home") {
        e.preventDefault();
        nextItem = enabledItems[0];
      } else if (e.key === "End") {
        e.preventDefault();
        nextItem = enabledItems[enabledItems.length - 1];
      }

      if (nextItem) {
        setActiveValue(nextItem.value);
        // Focus the button
        const btn = tabListRef.current?.querySelector(
          `[data-tab-value="${nextItem.value}"]`
        ) as HTMLElement | null;
        btn?.focus();
      }
    },
    [items, activeValue, setActiveValue]
  );

  const activeItem = items[activeIndex];

  // Content animation variants — direction-aware slide + fade
  const contentVariants = prefersReducedMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir: number) => ({
          x: dir * 24,
          opacity: 0,
        }),
        center: {
          x: 0,
          opacity: 1,
        },
        exit: (dir: number) => ({
          x: dir * -24,
          opacity: 0,
        }),
      };

  return (
    <div
      className={`flex flex-col tracking-[0.02em] ${className}`}
      style={{ fontFamily: "Satoshi, sans-serif" }}
    >
      {/* Tab list */}
      <LayoutGroup id={`${id}-tabs`}>
        <div
          ref={tabListRef}
          role="tablist"
          aria-orientation="horizontal"
          onKeyDown={handleKeyDown}
          className="relative flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800/60 rounded-[8px]"
        >
          {items.map((item) => {
            const isActive = item.value === activeValue;
            return (
              <motion.button
                key={item.value}
                data-tab-value={item.value}
                role="tab"
                aria-selected={isActive}
                aria-controls={`${id}-panel-${item.value}`}
                id={`${id}-tab-${item.value}`}
                tabIndex={isActive ? 0 : -1}
                disabled={item.disabled}
                onClick={() => {
                  if (!item.disabled) setActiveValue(item.value);
                }}
                className={`relative z-10 px-4 py-2 text-sm font-medium rounded-[8px] select-none cursor-pointer
                  ${
                    item.disabled
                      ? "opacity-40 cursor-default"
                      : ""
                  }
                  ${
                    isActive
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-500 dark:text-neutral-400"
                  }
                `}
                // Framer owns hover — NO Tailwind hover: classes
                whileHover={
                  item.disabled || isActive || prefersReducedMotion
                    ? undefined
                    : { backgroundColor: "rgba(0,0,0,0.04)" }
                }
                whileTap={
                  item.disabled
                    ? undefined
                    : prefersReducedMotion
                    ? {}
                    : { scale: 0.97 }
                }
                transition={springs.quick}
              >
                {/* Sliding active indicator — layoutId makes it follow the active tab.
                    This is the hero animation: a shared layout element that morphs
                    position/size between tabs using spring physics. */}
                {isActive && (
                  <motion.span
                    layoutId={`${id}-indicator`}
                    className="absolute inset-0 bg-white dark:bg-neutral-700 rounded-[8px] shadow-sm"
                    style={{ zIndex: -1 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : springs.snappy
                    }
                  />
                )}
                {item.label}
              </motion.button>
            );
          })}
        </div>
      </LayoutGroup>

      {/* Tab panels — crossfade with direction-aware slide */}
      <div className="relative mt-3 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          {activeItem && (
            <motion.div
              key={activeItem.value}
              role="tabpanel"
              id={`${id}-panel-${activeItem.value}`}
              aria-labelledby={`${id}-tab-${activeItem.value}`}
              tabIndex={0}
              custom={direction}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={
                prefersReducedMotion
                  ? { duration: 0.1 }
                  : { ...springs.smooth, opacity: { duration: 0.2 } }
              }
              className="focus:outline-none"
            >
              {activeItem.content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

Tabs.displayName = "Tabs";

export default Tabs;
