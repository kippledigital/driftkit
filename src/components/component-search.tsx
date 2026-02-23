"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { CommandPalette, CommandItem } from "./command-palette";

interface ComponentEntry {
  id: string;
  title: string;
  group: string;
}

const components: ComponentEntry[] = [
  // Showpieces
  { id: "typewriter", title: "Typewriter", group: "Showpiece" },
  { id: "magnetic-dock", title: "Magnetic Dock", group: "Showpiece" },
  { id: "magnetic-button", title: "Magnetic Button", group: "Showpiece" },
  { id: "cursor-glow-card", title: "Cursor Glow Card", group: "Showpiece" },
  { id: "number-ticker", title: "Number Ticker", group: "Showpiece" },
  { id: "morphing-hamburger", title: "Morphing Hamburger", group: "Showpiece" },
  { id: "staggered-list", title: "Staggered List", group: "Showpiece" },
  { id: "mode-switcher", title: "Mode Switcher", group: "Showpiece" },
  { id: "parallax-tilt-card", title: "Parallax Tilt Card", group: "Showpiece" },
  { id: "swipe-cards", title: "Swipe Cards", group: "Showpiece" },
  { id: "marquee", title: "Marquee", group: "Showpiece" },
  { id: "gradient-border", title: "Gradient Border", group: "Showpiece" },
  { id: "spotlight-beam", title: "Spotlight Beam", group: "Showpiece" },
  { id: "ripple-button", title: "Ripple Button", group: "Showpiece" },
  { id: "scroll-reveal", title: "Scroll Reveal", group: "Showpiece" },
  { id: "text-shimmer", title: "Text Shimmer", group: "Showpiece" },
  { id: "wobble-card", title: "Wobble Card", group: "Showpiece" },
  { id: "animated-tabs", title: "Animated Tabs", group: "Showpiece" },
  { id: "command-palette", title: "Command Palette", group: "Showpiece" },
  { id: "expandable-card", title: "Expandable Card", group: "Showpiece" },
  { id: "cursor-trail", title: "Cursor Trail", group: "Showpiece" },
  { id: "liquid-button", title: "Liquid Button", group: "Showpiece" },
  { id: "animated-counter", title: "Animated Counter", group: "Showpiece" },
  { id: "progress-ring", title: "Progress Ring", group: "Showpiece" },
  { id: "spring-carousel", title: "Spring Carousel", group: "Showpiece" },
  { id: "parallax-scroll", title: "Parallax Scroll", group: "Showpiece" },
  { id: "morphing-shape", title: "Morphing Shape", group: "Showpiece" },
  { id: "schedule-picker", title: "Schedule Picker", group: "Showpiece" },
  { id: "date-range-picker", title: "Date Range Picker", group: "Showpiece" },
  { id: "multi-select", title: "Multi Select", group: "Showpiece" },
  { id: "stepper", title: "Stepper", group: "Showpiece" },
  { id: "drawer", title: "Drawer", group: "Showpiece" },
  { id: "context-menu", title: "Context Menu", group: "Showpiece" },
  { id: "popover", title: "Popover", group: "Showpiece" },
  { id: "breadcrumbs", title: "Breadcrumbs", group: "Showpiece" },
  { id: "badge", title: "Badge", group: "Showpiece" },
  { id: "code-block", title: "Code Block", group: "Showpiece" },
  { id: "code-display", title: "Code Display", group: "Showpiece" },
  { id: "component-switcher", title: "Component Switcher", group: "Showpiece" },
  { id: "control-panel", title: "Control Panel", group: "Showpiece" },
  // Standard
  { id: "nav-menu", title: "Navigation Menu", group: "Standard" },
  { id: "button", title: "Button", group: "Standard" },
  { id: "input", title: "Input", group: "Standard" },
  { id: "toggle", title: "Toggle", group: "Standard" },
  { id: "tabs", title: "Tabs", group: "Standard" },
  { id: "accordion", title: "Accordion", group: "Standard" },
  { id: "dialog", title: "Dialog", group: "Standard" },
  { id: "tooltip", title: "Tooltip", group: "Standard" },
  { id: "dropdown", title: "Dropdown Menu", group: "Standard" },
  { id: "card", title: "Card", group: "Standard" },
  { id: "skeleton", title: "Skeleton", group: "Standard" },
  { id: "toast", title: "Toast", group: "Standard" },
];

export function ComponentSearch() {
  const [open, setOpen] = useState(false);

  // ⌘K / Ctrl+K to open
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const items: CommandItem[] = useMemo(
    () =>
      components.map((c) => ({
        id: c.id,
        label: c.title,
        icon: (
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 font-medium">
            {c.group}
          </span>
        ),
        onSelect: () => scrollTo(c.id),
      })),
    [scrollTo]
  );

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-lg shadow-neutral-900/25 dark:shadow-white/10 hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span className="text-sm font-medium">Search</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono rounded bg-white/20 dark:bg-black/20">
          ⌘K
        </kbd>
      </button>

      <CommandPalette
        items={items}
        open={open}
        onClose={() => setOpen(false)}
        placeholder="Search 52 components…"
      />
    </>
  );
}
