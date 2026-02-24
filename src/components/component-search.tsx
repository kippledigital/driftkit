"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { CommandPalette, CommandItem } from "./command-palette";
import { componentsData } from "../app/docs/data/components";

interface SearchEntry {
  id: string;
  title: string;
  group: string;
  description?: string;
  category?: string;
  url?: string;
  type: "component" | "docs" | "page";
}

// Storage keys for recent searches
const RECENT_SEARCHES_KEY = "driftkit-recent-searches";
const FREQUENT_SEARCHES_KEY = "driftkit-frequent-searches";

// Get components from the actual data
const getComponentEntries = (): SearchEntry[] => {
  return Object.entries(componentsData).map(([key, data]) => ({
    id: key,
    title: data.displayName,
    group: data.category,
    description: data.description,
    category: data.category,
    url: `/docs/components/${key}`,
    type: "component" as const,
  }));
};

// Add docs pages and general pages
const getDocsEntries = (): SearchEntry[] => {
  return [
    {
      id: "docs-overview",
      title: "Documentation Overview",
      group: "Docs",
      description: "Overview of all DriftKit components and features",
      url: "/docs",
      type: "docs",
    },
    {
      id: "playground",
      title: "Playground",
      group: "Tools",
      description: "Interactive playground for testing components",
      url: "/playground",
      type: "page",
    },
    {
      id: "playground-button",
      title: "Button Playground", 
      group: "Tools",
      description: "Interactive button component playground",
      url: "/playground/button",
      type: "page",
    },
    {
      id: "github",
      title: "GitHub Repository",
      group: "Links",
      description: "View source code and contribute",
      url: "https://github.com/kippledigital/driftkit",
      type: "page",
    },
  ];
};

const allEntries: SearchEntry[] = [
  ...getComponentEntries(),
  ...getDocsEntries(),
];

// Recent searches utilities
const getRecentSearches = (): string[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
  return stored ? JSON.parse(stored) : [];
};

const addToRecentSearches = (entryId: string) => {
  if (typeof window === "undefined") return;
  const recent = getRecentSearches().filter(id => id !== entryId);
  recent.unshift(entryId);
  // Keep only last 10 recent searches
  const updated = recent.slice(0, 10);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
};

const getFrequentSearches = (): Record<string, number> => {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem(FREQUENT_SEARCHES_KEY);
  return stored ? JSON.parse(stored) : {};
};

const incrementSearchFrequency = (entryId: string) => {
  if (typeof window === "undefined") return;
  const frequent = getFrequentSearches();
  frequent[entryId] = (frequent[entryId] || 0) + 1;
  localStorage.setItem(FREQUENT_SEARCHES_KEY, JSON.stringify(frequent));
};

export function ComponentSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

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

  const handleSelect = useCallback((entry: SearchEntry) => {
    // Track usage
    addToRecentSearches(entry.id);
    incrementSearchFrequency(entry.id);

    if (entry.type === "component") {
      // For components, try to scroll to them on current page first
      const el = document.getElementById(entry.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (entry.url) {
        // If not found, navigate to component docs page
        router.push(entry.url);
      }
    } else if (entry.url) {
      // For docs and pages, navigate directly
      if (entry.url.startsWith("http")) {
        window.open(entry.url, "_blank", "noopener,noreferrer");
      } else {
        router.push(entry.url);
      }
    }
  }, [router]);

  const getRecentEntries = useCallback((): SearchEntry[] => {
    const recentIds = getRecentSearches();
    return recentIds
      .map(id => allEntries.find(entry => entry.id === id))
      .filter((entry): entry is SearchEntry => entry !== undefined)
      .slice(0, 5);
  }, []);

  const getFrequentEntries = useCallback((): SearchEntry[] => {
    const frequent = getFrequentSearches();
    return allEntries
      .filter(entry => frequent[entry.id] > 0)
      .sort((a, b) => (frequent[b.id] || 0) - (frequent[a.id] || 0))
      .slice(0, 5);
  }, []);

  const items: CommandItem[] = useMemo(() => {
    const recentEntries = getRecentEntries();
    const frequentEntries = getFrequentEntries();
    const hasRecent = recentEntries.length > 0;
    const hasFrequent = frequentEntries.length > 0;

    const items: CommandItem[] = [];

    // Add recent searches section
    if (!query && hasRecent) {
      items.push({
        id: "recent-header",
        label: "Recent",
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12,6 12,12 16,14" />
          </svg>
        ),
        onSelect: () => {},
      });

      recentEntries.forEach(entry => {
        items.push({
          id: `recent-${entry.id}`,
          label: entry.title,
          icon: (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium">
              {entry.group}
            </span>
          ),
          onSelect: () => handleSelect(entry),
        });
      });
    }

    // Add frequent searches section  
    if (!query && hasFrequent && frequentEntries.some(e => !recentEntries.includes(e))) {
      const uniqueFrequent = frequentEntries.filter(e => !recentEntries.includes(e));
      if (uniqueFrequent.length > 0) {
        items.push({
          id: "frequent-header",
          label: "Frequently Used",
          icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          ),
          onSelect: () => {},
        });

        uniqueFrequent.slice(0, 3).forEach(entry => {
          items.push({
            id: `frequent-${entry.id}`,
            label: entry.title,
            icon: (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 font-medium">
                {entry.group}
              </span>
            ),
            onSelect: () => handleSelect(entry),
          });
        });
      }
    }

    // Add all entries section
    if (!query && (hasRecent || hasFrequent)) {
      items.push({
        id: "all-header",
        label: "All Items",
        icon: (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
            <path d="M3 3h18v18H3z" />
            <path d="M9 9h6v6H9z" />
          </svg>
        ),
        onSelect: () => {},
      });
    }

    // Add filtered entries based on query
    const filteredEntries = query 
      ? allEntries.filter(entry => 
          entry.title.toLowerCase().includes(query.toLowerCase()) ||
          entry.description?.toLowerCase().includes(query.toLowerCase()) ||
          entry.group.toLowerCase().includes(query.toLowerCase())
        )
      : allEntries;

    filteredEntries.forEach(entry => {
      items.push({
        id: entry.id,
        label: entry.title,
        icon: (
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
            entry.type === "component" 
              ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
              : entry.type === "docs"
              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
          }`}>
            {entry.group}
          </span>
        ),
        onSelect: () => handleSelect(entry),
      });
    });

    return items;
  }, [query, handleSelect, getRecentEntries, getFrequentEntries]);

  const totalCount = allEntries.length;

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
        placeholder={`Search ${totalCount} components, docs & more…`}
        query={query}
        onQueryChange={setQuery}
      />
    </>
  );
}
