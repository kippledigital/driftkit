"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Component categories with their components
const componentCategories = {
  "Layout": [
    "card", "skeleton", "gradient-border", "glow-card", "expandable-card", "wobble-card"
  ],
  "Navigation": [
    "nav-menu", "breadcrumbs", "tabs", "animated-tabs", "stepper", "magnetic-dock"
  ],
  "Feedback": [
    "toast", "tooltip", "dialog", "drawer", "progress-ring", "skeleton"
  ],
  "Data Display": [
    "badge", "accordion", "code-block", "code-display", "number-ticker", "animated-counter"
  ],
  "Overlay": [
    "popover", "context-menu", "dropdown", "command-palette", "spotlight"
  ],
  "Input": [
    "button", "input", "toggle", "multi-select", "date-range-picker", "schedule-picker"
  ],
  "Animation": [
    "typewriter", "marquee", "text-shimmer", "staggered-list", "scroll-reveal", 
    "parallax-tilt-card", "parallax-scroll", "spring-carousel", "swipe-cards",
    "morphing-shape", "cursor-trail"
  ],
  "Buttons": [
    "magnetic-button", "ripple-button", "liquid-button", "morphing-hamburger"
  ],
  "Utility": [
    "component-switcher", "control-panel", "mode-switcher"
  ]
};

function ComponentSidebar() {
  const pathname = usePathname();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    "Layout": true,
    "Navigation": true,
    "Feedback": true,
    "Data Display": true,
    "Overlay": true,
    "Input": true,
    "Animation": true,
    "Buttons": true,
    "Utility": true,
  });

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <aside className="w-64 shrink-0 bg-white/50 dark:bg-neutral-900/50 border-r border-neutral-200 dark:border-neutral-800 overflow-y-auto hidden lg:block">
      <div className="p-6">
        <Link 
          href="/docs" 
          className="block mb-8 text-xl font-medium text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
        >
          Components
        </Link>
        
        <nav className="space-y-6">
          {Object.entries(componentCategories).map(([category, components]) => (
            <div key={category}>
              <button
                onClick={() => toggleCategory(category)}
                className="flex items-center justify-between w-full text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors mb-2"
              >
                {category}
                <motion.div
                  animate={{ rotate: openCategories[category] ? 90 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openCategories[category] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-1 ml-4">
                      {components.map(component => {
                        const href = `/docs/components/${component}`;
                        const isActive = pathname === href;
                        
                        return (
                          <Link
                            key={component}
                            href={href}
                            className={`block px-3 py-1.5 text-sm rounded-md transition-colors relative ${
                              isActive 
                                ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800" 
                                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                            }`}
                          >
                            {component.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm"
        aria-label="Open navigation"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 w-72 z-50 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
                <Link href="/docs" className="text-lg font-medium" onClick={() => setOpen(false)}>
                  Components
                </Link>
                <button onClick={() => setOpen(false)} className="p-1" aria-label="Close navigation">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <MobileSidebarNav onNavigate={() => setOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileSidebarNav({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    Object.fromEntries(Object.keys(componentCategories).map(k => [k, true]))
  );

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <nav className="p-4 space-y-4">
      {Object.entries(componentCategories).map(([category, components]) => (
        <div key={category}>
          <button
            onClick={() => toggleCategory(category)}
            className="flex items-center justify-between w-full text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
          >
            {category}
            <motion.div animate={{ rotate: openCategories[category] ? 90 : 0 }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </button>
          <AnimatePresence>
            {openCategories[category] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-1 ml-4">
                  {components.map(component => {
                    const href = `/docs/components/${component}`;
                    const isActive = pathname === href;
                    return (
                      <Link
                        key={component}
                        href={href}
                        onClick={onNavigate}
                        className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                          isActive
                            ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800"
                            : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                        }`}
                      >
                        {component.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </nav>
  );
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <MobileSidebar />
      <div className="flex">
        <ComponentSidebar />
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}