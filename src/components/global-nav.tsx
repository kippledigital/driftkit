"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ModeSwitcher } from "./mode-switcher";

const navItems = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/recipes", label: "Recipes" },
  { href: "/playground", label: "Playground" },
];

export function GlobalNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
            driftkit
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 font-medium">
            beta
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1 p-1 rounded-[8px] bg-neutral-100 dark:bg-neutral-800/60">
          {navItems.map(item => {
            // More specific paths should match first — check exact or startsWith,
            // but exclude sub-paths that have their own nav item
            const isActive = item.href === "/docs"
              ? (pathname === "/docs" || (pathname.startsWith("/docs/") && !pathname.startsWith("/docs/recipes")))
              : (pathname === item.href || pathname.startsWith(item.href + "/"));
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative z-10 px-3 py-1.5 text-sm font-medium rounded-[6px] transition-colors"
              >
                {isActive && (
                  <motion.div
                    layoutId="global-nav-blob"
                    className="absolute inset-0 rounded-[6px] bg-white dark:bg-neutral-700 shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                <span className={isActive ? "text-neutral-900 dark:text-white" : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              // Trigger the command palette by dispatching a keyboard event
              window.dispatchEvent(new KeyboardEvent('keydown', {
                key: 'k',
                metaKey: true,
                bubbles: true
              }));
            }}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-neutral-800 rounded-[6px] hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors group"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Search</span>
            <kbd className="text-xs px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 rounded border border-neutral-200 dark:border-neutral-700 font-mono">⌘K</kbd>
          </button>
          <a
            href="https://github.com/kippledigital/driftkit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <ModeSwitcher size={32} />
        </div>
      </div>
    </header>
  );
}
