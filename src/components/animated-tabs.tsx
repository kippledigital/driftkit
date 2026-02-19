"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface AnimatedTabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface AnimatedTabsProps {
  items: AnimatedTabItem[];
  defaultId?: string;
  className?: string;
}

const TAB_SPRING = { type: "spring" as const, stiffness: 400, damping: 30, mass: 0.8 };

export function AnimatedTabs({ items, defaultId, className = "" }: AnimatedTabsProps) {
  const [activeId, setActiveId] = useState(defaultId || items[0]?.id);
  const active = items.find((i) => i.id === activeId) || items[0];

  return (
    <div className={className}>
      <div className="relative flex gap-1 p-1 rounded-[8px] bg-neutral-100 dark:bg-neutral-800/60">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className="relative z-10 flex-1 px-3 py-1.5 text-sm font-medium rounded-[6px] transition-colors"
            style={{ color: activeId === item.id ? "var(--tab-active, inherit)" : undefined }}
          >
            {activeId === item.id && (
              <motion.div
                layoutId="animated-tab-blob"
                className="absolute inset-0 rounded-[6px] bg-white dark:bg-neutral-700 shadow-sm"
                transition={TAB_SPRING}
                style={{ zIndex: -1 }}
              />
            )}
            {item.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          className="mt-3"
        >
          {active.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default AnimatedTabs;
