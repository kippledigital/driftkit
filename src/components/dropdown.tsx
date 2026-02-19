"use client";

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

// =============================================================================
// SPRING PHYSICS
// =============================================================================
// Opening uses "smooth" spring — stiffness 300, damping 30, mass 1.
// WHY: The dropdown should feel like it's unfurling from the trigger — organic
// and weighted. Scale 0.95 → 1.0 with origin at top creates a "growing downward"
// effect that visually connects the menu to its trigger.
//
// Staggered children use 30ms delay between each item.
// WHY: Sequential reveal guides the eye down the menu and creates a sense of
// craftsmanship. 30ms is fast enough to not slow down power users but visible
// enough to notice. Each item fades in + slides up 4px for a waterfall effect.
//
// Item hover uses "quick" spring — stiffness 500, damping 40, mass 0.3.
// WHY: Framer-owned hover backgrounds need to feel instant and responsive as
// the user scans menu items. Any lag here makes the menu feel sluggish.
// =============================================================================

const springs = {
  smooth: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
  quick: { type: "spring" as const, stiffness: 500, damping: 40, mass: 0.3 },
};

// =============================================================================
// TYPES
// =============================================================================

export interface DropdownItem {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
  /** Set to true to render a separator before this item */
  separator?: boolean;
}

export interface DropdownProps {
  /** The trigger element */
  trigger: ReactNode;
  /** Menu items */
  items: DropdownItem[];
  /** Alignment relative to trigger */
  align?: "left" | "right";
  /** Additional className on the menu panel */
  className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function Dropdown({
  trigger,
  items,
  align = "left",
  className = "",
}: DropdownProps) {
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // WHY click-outside: Standard UX pattern — menus should dismiss when you
  // interact with anything else. We use mousedown (not click) to catch the
  // event before focus shifts, preventing flash-of-focus on other elements.
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Reset focus index when closing
  useEffect(() => {
    if (!open) setFocusedIndex(-1);
  }, [open]);

  // Focus the active item when focusedIndex changes
  useEffect(() => {
    if (focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  // WHY full keyboard support: Dropdown menus without keyboard nav are
  // inaccessible. Arrow keys to navigate, Enter to select, Escape to close
  // matches WAI-ARIA menu pattern that screen reader users expect.
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Find selectable (non-disabled) indices
      const selectableIndices = items
        .map((item, i) => (!item.disabled && !item.separator ? i : -1))
        .filter((i) => i >= 0);

      if (!open) {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen(true);
          setFocusedIndex(selectableIndices[0] ?? 0);
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const currentPos = selectableIndices.indexOf(focusedIndex);
          const next = selectableIndices[(currentPos + 1) % selectableIndices.length];
          setFocusedIndex(next);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const currentPos = selectableIndices.indexOf(focusedIndex);
          const prev =
            selectableIndices[
              (currentPos - 1 + selectableIndices.length) % selectableIndices.length
            ];
          setFocusedIndex(prev);
          break;
        }
        case "Enter":
        case " ": {
          e.preventDefault();
          if (focusedIndex >= 0 && items[focusedIndex] && !items[focusedIndex].disabled) {
            items[focusedIndex].onClick?.();
            setOpen(false);
          }
          break;
        }
        case "Escape": {
          e.preventDefault();
          setOpen(false);
          break;
        }
        case "Tab": {
          setOpen(false);
          break;
        }
      }
    },
    [open, focusedIndex, items]
  );

  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  // WHY origin-aware animation: The menu springs from scale 0.95 at the top
  // (transformOrigin: "top left/right") so it visually expands from the trigger.
  // This creates a spatial connection — the menu "belongs" to the button.
  const menuVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        hidden: { opacity: 0, scale: 0.95, y: -4 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: -4 },
      };

  // WHY staggered children: Each item delays by 30ms * index. This creates
  // a cascade/waterfall effect that guides the eye and feels hand-crafted.
  // Combined with a small y offset (4px → 0px), items appear to "settle into place."
  const itemVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y: 4 },
        visible: { opacity: 1, y: 0 },
      };

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onKeyDown={handleKeyDown}
    >
      {/* Trigger */}
      <div
        onClick={toggleOpen}
        role="button"
        aria-haspopup="menu"
        aria-expanded={open}
        tabIndex={0}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {/* Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            className={`absolute z-50 mt-2 min-w-[180px] rounded-[8px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg py-1 ${
              align === "right" ? "right-0" : "left-0"
            } ${className}`}
            style={{
              transformOrigin: align === "right" ? "top right" : "top left",
            }}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={springs.smooth}
          >
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {/* Separator — a simple horizontal line to group related items */}
                {item.separator && (
                  <div className="my-1 h-px bg-neutral-200 dark:bg-neutral-800" role="separator" />
                )}

                <motion.button
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  role="menuitem"
                  disabled={item.disabled}
                  tabIndex={-1}
                  className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 outline-none ${
                    item.disabled
                      ? "text-neutral-400 dark:text-neutral-600 cursor-default"
                      : "text-neutral-700 dark:text-neutral-300 cursor-pointer"
                  }`}
                  onClick={() => {
                    if (!item.disabled) {
                      item.onClick?.();
                      setOpen(false);
                    }
                  }}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    ...springs.smooth,
                    delay: prefersReducedMotion ? 0 : index * 0.03,
                  }}
                  // WHY Framer-owned hover: Tailwind hover: classes fight with
                  // spring animations. Framer's whileHover gives us spring-based
                  // background transitions that feel physical, not CSS-snappy.
                  whileHover={
                    item.disabled
                      ? undefined
                      : {
                          backgroundColor:
                            "var(--dropdown-hover, rgba(0,0,0,0.05))",
                        }
                  }
                  whileFocus={
                    item.disabled
                      ? undefined
                      : {
                          backgroundColor:
                            "var(--dropdown-hover, rgba(0,0,0,0.05))",
                        }
                  }
                  style={
                    { "--dropdown-hover": "rgba(0,0,0,0.05)" } as React.CSSProperties
                  }
                >
                  {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                  {item.label}
                </motion.button>
              </React.Fragment>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dropdown;
