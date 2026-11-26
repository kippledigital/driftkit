"use client";

/**
 * Accordion
 * =============================================================================
 * Panels open on the `smooth` spring and close on a quick tween, so opening
 * feels considered and closing feels instant. Content fades in a beat after
 * the height starts, which keeps text from smearing across the motion.
 *
 * The chevron turns on `snappy`: small things move fast.
 *
 * Keyboard (WAI-ARIA accordion pattern): Up and Down move between headers,
 * Home and End jump to the first and last. Enter and Space toggle natively.
 *
 * Needs: ./motion.ts
 * =============================================================================
 */

import React, { useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { exit, spring, useMotionPrefs } from "./motion";

export interface AccordionItem {
  value: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: "single" | "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  className?: string;
}

export function Accordion({ items, type = "single", value: controlled, defaultValue, onValueChange, className = "" }: AccordionProps) {
  const m = useMotionPrefs();
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [internal, setInternal] = useState<string[]>(defaultValue ?? []);
  const open = controlled ?? internal;

  const toggle = (value: string) => {
    const isOpen = open.includes(value);
    const next = type === "single" ? (isOpen ? [] : [value]) : isOpen ? open.filter((v) => v !== value) : [...open, value];
    if (controlled === undefined) setInternal(next);
    onValueChange?.(next);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const triggers = Array.from(rootRef.current?.querySelectorAll<HTMLButtonElement>("[data-accordion-trigger]:not([disabled])") ?? []);
    const at = triggers.indexOf(document.activeElement as HTMLButtonElement);
    if (at < 0) return;
    const target = {
      ArrowDown: triggers[(at + 1) % triggers.length],
      ArrowUp: triggers[(at - 1 + triggers.length) % triggers.length],
      Home: triggers[0],
      End: triggers[triggers.length - 1],
    }[e.key];
    if (target) {
      e.preventDefault();
      target.focus();
    }
  };

  return (
    <div
      ref={rootRef}
      onKeyDown={onKeyDown}
      className={`divide-y divide-neutral-200 overflow-hidden rounded-[8px] border border-neutral-200 dark:divide-neutral-700 dark:border-neutral-700 ${className}`}
    >
      {items.map((item) => {
        const isOpen = open.includes(item.value);
        const triggerId = `${id}-trigger-${item.value}`;
        const panelId = `${id}-panel-${item.value}`;
        return (
          <div key={item.value}>
            <h3 className="m-0">
              <button
                type="button"
                data-accordion-trigger
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                disabled={item.disabled}
                onClick={() => toggle(item.value)}
                className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium transition-colors duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 ${
                  item.disabled
                    ? "cursor-not-allowed opacity-40"
                    : "cursor-pointer text-neutral-900 hover:bg-neutral-50 dark:text-neutral-100 dark:hover:bg-neutral-800/50"
                }`}
              >
                <span>{item.trigger}</span>
                <motion.svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                  className="shrink-0 text-neutral-500 dark:text-neutral-400"
                  initial={false}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={m.spring("snappy")}
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: m.reduced ? m.spring("smooth") : { height: spring.smooth, opacity: { duration: 0.18, delay: 0.05 } },
                  }}
                  exit={{ height: 0, opacity: 0, transition: m.reduced ? m.exit() : { height: exit.panel, opacity: { duration: 0.1 } } }}
                >
                  <div className="px-4 pb-4 pt-1 text-sm text-neutral-600 dark:text-neutral-300">{item.content}</div>
                </motion.div>
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
