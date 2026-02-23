"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RadialItem {
  label: string;
  emoji: string;
  href: string;
}

const navItems: RadialItem[] = [
  { label: "Typewriter", emoji: "⌨️", href: "#typewriter" },
  { label: "Magnetic Dock", emoji: "🧲", href: "#magnetic-dock" },
  { label: "Swipe Cards", emoji: "🃏", href: "#swipe-cards" },
  { label: "Command Palette", emoji: "⌘", href: "#command-palette" },
  { label: "Tabs", emoji: "📑", href: "#animated-tabs" },
  { label: "Carousel", emoji: "🎠", href: "#spring-carousel" },
  { label: "Mode Switch", emoji: "🌗", href: "#mode-switcher" },
  { label: "Tilt Card", emoji: "🎴", href: "#parallax-tilt-card" },
];

// Fan items in a semi-circle arc from bottom-right
const RADIUS = 160;
const START_ANGLE = -180; // degrees (left)
const END_ANGLE = -90; // degrees (up)

function getPosition(index: number, total: number) {
  const angle = START_ANGLE + ((END_ANGLE - START_ANGLE) / (total - 1)) * index;
  const rad = (angle * Math.PI) / 180;
  return {
    x: Math.cos(rad) * RADIUS,
    y: Math.sin(rad) * RADIUS,
  };
}

export function RadialNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleItemClick = useCallback((href: string) => {
    setIsOpen(false);
    // Smooth scroll to section
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Radial items */}
      <AnimatePresence>
        {isOpen &&
          navItems.map((item, i) => {
            const pos = getPosition(i, navItems.length);
            return (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.3 }}
                animate={{
                  opacity: 1,
                  x: pos.x,
                  y: pos.y,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: 0,
                  y: 0,
                  scale: 0.3,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 22,
                  mass: 0.8,
                  delay: i * 0.04,
                }}
                onClick={() => handleItemClick(item.href)}
                className="absolute bottom-0 right-0 flex items-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-lg hover:shadow-xl hover:scale-105 transition-shadow cursor-pointer whitespace-nowrap origin-bottom-right"
              >
                <span className="text-sm">{item.emoji}</span>
                <span className="text-xs font-medium text-neutral-900 dark:text-white">
                  {item.label}
                </span>
              </motion.button>
            );
          })}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={toggle}
        className="relative w-14 h-14 rounded-full bg-neutral-900 dark:bg-white shadow-lg shadow-neutral-900/25 dark:shadow-white/10 flex items-center justify-center cursor-pointer hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-white dark:text-neutral-900"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.div>
      </motion.button>
    </div>
  );
}
