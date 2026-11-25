"use client";

/**
 * Tabs
 * =============================================================================
 * The active pill is one shared element that glides between tabs on the
 * `snappy` spring. Content slides 16px in the direction you moved, so going
 * right feels like moving forward, and the panel's height eases between
 * tabs instead of jumping.
 *
 * Keyboard: arrows move and select (wrapping), Home and End jump, disabled tabs
 * are skipped. Roving tabindex, so Tab leaves the tab list in one step.
 *
 * Needs: ./motion.ts
 * =============================================================================
 */

import React, { useId, useRef, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { spring, useMotionPrefs } from "./motion";

export interface TabItem {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function Tabs({ items, value: controlled, defaultValue, onValueChange, className = "" }: TabsProps) {
  const m = useMotionPrefs();
  const id = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const [internal, setInternal] = useState(defaultValue ?? items.find((t) => !t.disabled)?.value ?? "");
  const active = controlled ?? internal;
  const activeIndex = items.findIndex((t) => t.value === active);

  // Direction comes from comparing with the previous render, so it is right
  // for controlled and uncontrolled use alike.
  const [prev, setPrev] = useState({ index: activeIndex, dir: 1 });
  if (prev.index !== activeIndex) setPrev({ index: activeIndex, dir: activeIndex > prev.index ? 1 : -1 });
  const dir = prev.dir;

  const select = (value: string) => {
    if (controlled === undefined) setInternal(value);
    onValueChange?.(value);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const enabled = items.filter((t) => !t.disabled);
    const at = enabled.findIndex((t) => t.value === active);
    const next = {
      ArrowRight: enabled[(at + 1) % enabled.length],
      ArrowDown: enabled[(at + 1) % enabled.length],
      ArrowLeft: enabled[(at - 1 + enabled.length) % enabled.length],
      ArrowUp: enabled[(at - 1 + enabled.length) % enabled.length],
      Home: enabled[0],
      End: enabled[enabled.length - 1],
    }[e.key];
    if (!next) return;
    e.preventDefault();
    select(next.value);
    listRef.current?.querySelector<HTMLElement>(`[data-tab-value="${CSS.escape(next.value)}"]`)?.focus();
  };

  const current = items[activeIndex];
  const offset = m.reduced ? 0 : 16;

  return (
    <div className={`flex flex-col ${className}`}>
      <LayoutGroup id={id}>
        <div
          ref={listRef}
          role="tablist"
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className="relative flex items-center gap-1 rounded-[8px] bg-neutral-100 p-1 dark:bg-neutral-800/60"
        >
          {items.map((item) => {
            const isActive = item.value === active;
            return (
              <button
                key={item.value}
                type="button"
                role="tab"
                data-tab-value={item.value}
                id={`${id}-tab-${item.value}`}
                aria-selected={isActive}
                aria-controls={`${id}-panel-${item.value}`}
                tabIndex={isActive ? 0 : -1}
                disabled={item.disabled}
                onClick={() => select(item.value)}
                className={`relative rounded-[6px] px-4 py-2 text-sm font-medium transition-colors duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  item.disabled
                    ? "cursor-not-allowed opacity-40"
                    : isActive
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="indicator"
                    aria-hidden
                    className="absolute inset-0 rounded-[6px] bg-white shadow-sm dark:bg-neutral-700"
                    transition={m.reduced ? { duration: 0 } : spring.snappy}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <motion.div layout={m.reduced ? false : "size"} transition={{ layout: spring.smooth }} className="relative mt-3 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          {current && (
            <motion.div
              key={current.value}
              role="tabpanel"
              id={`${id}-panel-${current.value}`}
              aria-labelledby={`${id}-tab-${current.value}`}
              tabIndex={0}
              custom={dir}
              variants={{
                enter: (d: number) => ({ x: d * offset, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d: number) => ({ x: d * -offset, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={m.reduced ? m.spring("smooth") : { ...spring.smooth, opacity: { duration: 0.16 } }}
              className="rounded-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {current.content}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

Tabs.displayName = "Tabs";

export default Tabs;
