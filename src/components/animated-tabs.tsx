"use client";

import React, { useState, useRef, useEffect, useCallback, useId } from "react";
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
  const instanceId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [blobStyle, setBlobStyle] = useState<{ left: number; width: number } | null>(null);
  const isResizing = useRef(false);
  const resizeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const measureBlob = useCallback(() => {
    const container = containerRef.current;
    const activeTab = tabRefs.current.get(activeId);
    if (!container || !activeTab) return;
    const containerRect = container.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();
    setBlobStyle({
      left: tabRect.left - containerRect.left,
      width: tabRect.width,
    });
  }, [activeId]);

  // Measure on active tab change
  useEffect(() => {
    measureBlob();
  }, [measureBlob]);

  // On resize: snap instantly (no spring), then re-enable spring after
  useEffect(() => {
    const onResize = () => {
      isResizing.current = true;
      measureBlob();
      clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(() => {
        isResizing.current = false;
      }, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer.current);
    };
  }, [measureBlob]);

  return (
    <div className={className}>
      <div ref={containerRef} className="relative flex gap-1 p-1 rounded-[8px] bg-neutral-100 dark:bg-neutral-800/60">
        {blobStyle && (
          <motion.div
            className="absolute top-1 bottom-1 rounded-[6px] bg-white dark:bg-neutral-700 shadow-sm"
            animate={{ left: blobStyle.left, width: blobStyle.width }}
            transition={isResizing.current ? { duration: 0 } : TAB_SPRING}
            style={{ zIndex: 0 }}
          />
        )}
        {items.map((item) => (
          <button
            key={item.id}
            ref={(el) => { if (el) tabRefs.current.set(item.id, el); }}
            onClick={() => setActiveId(item.id)}
            className="relative z-10 flex-1 px-3 py-1.5 text-sm font-medium rounded-[6px] transition-colors"
          >
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
