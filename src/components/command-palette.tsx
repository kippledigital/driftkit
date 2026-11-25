"use client";

/**
 * Command Palette
 * =============================================================================
 * The panel drops 12px into place on the `smooth` spring; results cascade in
 * once, on open, and then hold still while you type. Re-animating every row on
 * every keystroke is the most common reason palettes feel busy.
 *
 * The highlight glides between rows on the `snappy` spring. Keyboard and mouse
 * don't fight: the highlight only follows the pointer when the pointer actually
 * moves, so scrolling the list with arrow keys never "steals" the selection.
 *
 * Search ranks prefix matches first, then word starts, then loose matches,
 * and shows which letters matched.
 *
 * Accessibility: role="combobox" input controlling a role="listbox", with
 * aria-activedescendant, so screen readers announce the highlighted command.
 *
 * Needs: ./motion.ts, ./overlay.ts
 * =============================================================================
 */

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fade, stagger, useMotionPrefs } from "./motion";
import { useEscape, useFocusTrap, useMounted, useScrollLock } from "./overlay";

export interface CommandItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  /** Extra words to match, e.g. ["settings", "preferences"]. */
  keywords?: string[];
  onSelect: () => void;
}

export interface CommandPaletteProps {
  items: CommandItem[];
  open: boolean;
  onClose: () => void;
  placeholder?: string;
  query?: string;
  onQueryChange?: (query: string) => void;
  /** Shown when nothing matches. */
  emptyText?: string;
}

/** Score a label against a query and return matched character positions. */
function match(query: string, text: string): { score: number; hits: number[] } | null {
  const q = query.trim().toLowerCase();
  if (!q) return { score: 0, hits: [] };
  const t = text.toLowerCase();
  const at = t.indexOf(q);
  if (at === 0) return { score: 300 - t.length, hits: [...Array(q.length)].map((_, i) => i) };
  if (at > 0) {
    const wordStart = /\s|-|_|\//.test(t[at - 1]);
    return { score: (wordStart ? 200 : 100) - at, hits: [...Array(q.length)].map((_, i) => at + i) };
  }
  const hits: number[] = [];
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      hits.push(ti);
      qi++;
    }
  }
  if (qi < q.length) return null;
  const spread = hits[hits.length - 1] - hits[0];
  return { score: 50 - spread, hits };
}

function Highlight({ text, hits }: { text: string; hits: number[] }) {
  if (!hits.length) return <>{text}</>;
  const set = new Set(hits);
  return (
    <>
      {text.split("").map((ch, i) =>
        set.has(i) ? (
          <span key={i} className="font-semibold text-neutral-950 dark:text-white">
            {ch}
          </span>
        ) : (
          <React.Fragment key={i}>{ch}</React.Fragment>
        )
      )}
    </>
  );
}

export function CommandPalette({
  items,
  open,
  onClose,
  placeholder = "Type a command…",
  query: externalQuery,
  onQueryChange,
  emptyText = "No matching commands.",
}: CommandPaletteProps) {
  const mounted = useMounted();
  const m = useMotionPrefs();
  const uid = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [internalQuery, setInternalQuery] = useState("");
  const [active, setActive] = useState(0);
  const [openedAt, setOpenedAt] = useState(0);

  const query = externalQuery ?? internalQuery;
  const setQuery = (q: string) => {
    if (externalQuery === undefined) setInternalQuery(q);
    onQueryChange?.(q);
    setActive(0);
  };

  useFocusTrap(panelRef, open, inputRef);
  useScrollLock(open);
  useEscape(open, onClose);

  // Reset when opening (render-time adjustment, no effect needed).
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      if (externalQuery === undefined) setInternalQuery("");
      setActive(0);
      setOpenedAt((n) => n + 1);
    }
  }

  const results = useMemo(() => {
    return items
      .map((item) => {
        const best = [item.label, ...(item.keywords ?? [])]
          .map((text, i) => {
            const r = match(query, text);
            return r ? { ...r, onLabel: i === 0 } : null;
          })
          .filter(Boolean)
          .sort((a, b) => b!.score - a!.score)[0];
        return best ? { item, score: best.score, hits: best.onLabel ? best.hits : [] } : null;
      })
      .filter((r): r is { item: CommandItem; score: number; hits: number[] } => r !== null)
      .sort((a, b) => b.score - a.score);
  }, [items, query]);

  const activeIndex = Math.min(active, Math.max(0, results.length - 1));
  const activeId = results[activeIndex] ? `${uid}-opt-${results[activeIndex].item.id}` : undefined;

  // Keep the highlighted row in view while arrowing through a long list.
  useEffect(() => {
    if (!activeId) return;
    document.getElementById(activeId)?.scrollIntoView({ block: "nearest" });
  }, [activeId]);

  const run = (item: CommandItem) => {
    onClose();
    // Let the palette start closing before the command runs (it may open something else).
    requestAnimationFrame(() => item.onSelect());
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing || results.length === 0) return;
    const last = results.length - 1;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive(activeIndex >= last ? 0 : activeIndex + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(activeIndex <= 0 ? last : activeIndex - 1);
    } else if (e.key === "Home" && e.ctrlKey) {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End" && e.ctrlKey) {
      e.preventDefault();
      setActive(last);
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[activeIndex].item);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center px-4 pt-[14vh]">
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: fade.in }}
            exit={{ opacity: 0, transition: fade.out }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative w-full max-w-md overflow-hidden rounded-[10px] border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900"
            initial={m.reduced ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: m.spring("smooth") }}
            exit={m.reduced ? { opacity: 0, transition: m.exit("quick") } : { opacity: 0, y: -6, scale: 0.98, transition: m.exit("quick") }}
          >
            <div className="flex items-center gap-2 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-neutral-400" aria-hidden>
                <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                role="combobox"
                aria-expanded="true"
                aria-controls={`${uid}-list`}
                aria-activedescendant={activeId}
                aria-autocomplete="list"
                autoComplete="off"
                spellCheck={false}
                className="flex-1 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-neutral-100"
              />
              <kbd className="hidden rounded border border-neutral-200 px-1.5 py-0.5 text-[11px] text-neutral-400 sm:block dark:border-neutral-700">
                esc
              </kbd>
            </div>

            <div ref={listRef} id={`${uid}-list`} role="listbox" aria-label="Commands" className="max-h-72 overflow-y-auto overscroll-contain p-1.5">
              {results.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-neutral-400" role="status">
                  {emptyText}
                </p>
              )}
              {results.map(({ item, hits }, i) => {
                const isActive = i === activeIndex;
                return (
                  <motion.div
                    // Keyed per open, so rows cascade in on open and then stay put while typing.
                    key={`${openedAt}-${item.id}`}
                    id={`${uid}-opt-${item.id}`}
                    role="option"
                    aria-selected={isActive}
                    onPointerMove={() => !isActive && setActive(i)}
                    onClick={() => run(item)}
                    className={`relative flex cursor-pointer items-center gap-3 rounded-[6px] px-3 py-2 text-sm ${
                      isActive ? "text-neutral-900 dark:text-white" : "text-neutral-600 dark:text-neutral-300"
                    }`}
                    initial={m.reduced || query ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...m.spring("smooth"), delay: query ? 0 : Math.min(i, 8) * stagger.tight }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId={`${uid}-highlight`}
                        className="absolute inset-0 rounded-[6px] bg-neutral-100 dark:bg-neutral-800"
                        transition={m.spring("snappy")}
                      />
                    )}
                    {item.icon && <span className="relative grid w-5 place-items-center text-base">{item.icon}</span>}
                    <span className="relative flex-1 truncate">
                      <Highlight text={item.label} hits={hits} />
                    </span>
                    {item.shortcut && (
                      <kbd className="relative rounded border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-[11px] text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-400">
                        {item.shortcut}
                      </kbd>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default CommandPalette;
