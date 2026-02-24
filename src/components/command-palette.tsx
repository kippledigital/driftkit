"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface CommandItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onSelect: () => void;
}

export interface CommandPaletteProps {
  items: CommandItem[];
  open: boolean;
  onClose: () => void;
  placeholder?: string;
  query?: string;
  onQueryChange?: (query: string) => void;
}

const OVERLAY_SPRING = { type: "spring" as const, stiffness: 400, damping: 30, mass: 0.8 };
const PANEL_SPRING = { type: "spring" as const, stiffness: 500, damping: 32, mass: 0.8 };
const RESULT_SPRING = { type: "spring" as const, stiffness: 600, damping: 35, mass: 0.6 };

function fuzzy(query: string, text: string): boolean {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length;
}

export function CommandPalette({ 
  items, 
  open, 
  onClose, 
  placeholder = "Type a command…",
  query: externalQuery,
  onQueryChange
}: CommandPaletteProps) {
  const [internalQuery, setInternalQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use external query if provided, otherwise use internal
  const query = externalQuery !== undefined ? externalQuery : internalQuery;
  const setQuery = externalQuery !== undefined ? onQueryChange! : setInternalQuery;

  const filtered = useMemo(
    () => (query ? items.filter((i) => fuzzy(query, i.label)) : items),
    [query, items]
  );

  useEffect(() => {
    if (open) {
      if (externalQuery === undefined) {
        setInternalQuery("");
      }
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open, externalQuery]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const select = useCallback(
    (item: CommandItem) => {
      item.onSelect();
      onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
      if (e.key === "Enter" && filtered[activeIndex]) { select(filtered[activeIndex]); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose, filtered, activeIndex, select]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={OVERLAY_SPRING}
        >
          <motion.div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md" 
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative w-full max-w-md rounded-[8px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden mx-4"
            initial={{ scale: 0.9, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={PANEL_SPRING}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
              <span className="text-neutral-400 text-sm">⌘</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-neutral-400"
              />
            </div>
            <div className="max-h-64 overflow-y-auto py-2">
              {filtered.length === 0 && (
                <motion.p 
                  className="px-4 py-3 text-sm text-neutral-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, ...RESULT_SPRING }}
                >
                  No results found.
                </motion.p>
              )}
              {filtered.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => select(item)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left relative overflow-hidden ${
                    i === activeIndex
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.02, ...RESULT_SPRING }}
                  whileHover={{ x: 2 }}
                >
                  {i === activeIndex && (
                    <motion.div
                      className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-[4px] mx-1"
                      layoutId="active-result"
                      transition={RESULT_SPRING}
                    />
                  )}
                  <div className="relative flex items-center gap-3 flex-1">
                    {item.icon && (
                      <motion.span 
                        className="text-base"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        {item.icon}
                      </motion.span>
                    )}
                    <span className="flex-1">{item.label}</span>
                    {item.shortcut && (
                      <kbd className="text-xs text-neutral-400 font-mono bg-neutral-50 dark:bg-neutral-800/50 px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-700">
                        {item.shortcut}
                      </kbd>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CommandPalette;
