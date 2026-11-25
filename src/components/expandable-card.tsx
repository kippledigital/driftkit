"use client";

/**
 * Expandable Card
 * =============================================================================
 * A shared-layout morph: the card you tapped becomes the dialog, on the
 * `smooth` spring. Two details make it feel solid:
 *
 *  - The card's original spot keeps its size while it's open, so the page
 *    underneath doesn't jump.
 *  - Border radius is set as a style, which lets Framer Motion correct it
 *    during the scale. Without that, corners stretch mid-morph.
 *
 * The detail content waits until the morph is mostly done, then fades in.
 * Opened, it behaves like a dialog: focus moves in, Tab stays inside, Escape
 * or the backdrop closes it, and focus returns to the card.
 *
 * Needs: ./motion.ts, ./overlay.ts
 * =============================================================================
 */

import React, { useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fade, useMotionPrefs } from "./motion";
import { useEscape, useFocusTrap, useMounted, useScrollLock } from "./overlay";

export interface ExpandableCardProps {
  preview: React.ReactNode;
  detail: React.ReactNode;
  className?: string;
  id?: string;
  /** Accessible name for the opened card. */
  label?: string;
}

const RADIUS = 10;

export function ExpandableCard({ preview, detail, className = "", id, label }: ExpandableCardProps) {
  const mounted = useMounted();
  const m = useMotionPrefs();
  const uid = useId();
  const layoutId = `expandable-${id ?? uid}`;
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const morph = m.reduced ? { duration: 0 } : m.spring("smooth");

  useFocusTrap(dialogRef, open);
  useScrollLock(open);
  useEscape(open, () => setOpen(false));

  const card = "border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 overflow-hidden";

  return (
    <>
      <div className={`relative ${className}`}>
        <motion.div
          layoutId={layoutId}
          role="button"
          tabIndex={open ? -1 : 0}
          aria-expanded={open}
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen(true);
            }
          }}
          style={{ borderRadius: RADIUS, visibility: open ? "hidden" : "visible" }}
          transition={morph}
          whileHover={m.reduced || open ? undefined : { y: -2 }}
          className={`${card} cursor-pointer shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
        >
          <motion.div layout="position" className="p-5">
            {preview}
          </motion.div>
        </motion.div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                  aria-hidden
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: fade.in }}
                  exit={{ opacity: 0, transition: fade.out }}
                  onClick={() => setOpen(false)}
                />
                <motion.div
                  ref={dialogRef}
                  layoutId={layoutId}
                  role="dialog"
                  aria-modal="true"
                  aria-label={label}
                  tabIndex={-1}
                  style={{ borderRadius: RADIUS }}
                  transition={morph}
                  className={`${card} relative w-full max-w-lg shadow-2xl outline-none`}
                >
                  <motion.div layout="position" className="p-5 pr-12">
                    {preview}
                  </motion.div>
                  <motion.div
                    className="px-5 pb-5"
                    initial={{ opacity: 0, y: m.reduced ? 0 : 6 }}
                    animate={{ opacity: 1, y: 0, transition: { ...m.spring("smooth"), delay: m.reduced ? 0 : 0.12 } }}
                    exit={{ opacity: 0, transition: { duration: 0.08 } }}
                  >
                    {detail}
                  </motion.div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-[6px] text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

export default ExpandableCard;
