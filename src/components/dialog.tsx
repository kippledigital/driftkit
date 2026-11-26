"use client";

/**
 * Dialog
 * =============================================================================
 * Opens with the `smooth` spring: it rises 8px and scales from 0.96, so it
 * reads as arriving with a little weight. Closes with a short ease-in tween,
 * because by the time someone dismisses a dialog they've already moved on.
 *
 * The backdrop is a pre-blurred layer that only fades. Animating blur itself is
 * expensive and shimmers on a spring.
 *
 * Behavior: rendered in a portal, focus is trapped and restored, Escape closes
 * the topmost overlay only, page scroll locks without a layout jump, and the
 * title is wired to aria-labelledby automatically.
 *
 * Needs: ./motion.ts, ./overlay.ts
 * =============================================================================
 */

import React, { createContext, forwardRef, useContext, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fade, useMotionPrefs } from "./motion";
import { useEscape, useFocusTrap, useMounted, useScrollLock } from "./overlay";

export type DialogSize = "sm" | "md" | "lg";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  size?: DialogSize;
  children: ReactNode;
  className?: string;
  /** Accessible name, used when you don't render a <DialogTitle>. */
  title?: string;
  /** Close when the backdrop is clicked. Default true. */
  closeOnBackdrop?: boolean;
}

const sizeClasses: Record<DialogSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

const DialogIds = createContext<{ titleId: string; descId: string } | null>(null);

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  { open, onClose, size = "md", children, className = "", title, closeOnBackdrop = true },
  ref
) {
  const mounted = useMounted();
  const m = useMotionPrefs();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const baseId = useId();
  const ids = { titleId: `${baseId}-title`, descId: `${baseId}-desc` };

  useFocusTrap(panelRef, open);
  useScrollLock(open);
  useEscape(open, onClose);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: fade.in }}
            exit={{ opacity: 0, transition: fade.out }}
            onClick={closeOnBackdrop ? onClose : undefined}
          />
          <motion.div
            ref={(node) => {
              panelRef.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) ref.current = node;
            }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            aria-labelledby={title ? undefined : ids.titleId}
            aria-describedby={ids.descId}
            tabIndex={-1}
            className={`relative w-full ${sizeClasses[size]} rounded-[8px] bg-white p-6 shadow-xl outline-none dark:bg-neutral-900 ${className}`}
            initial={m.reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: m.spring("smooth") }}
            exit={m.reduced ? { opacity: 0, transition: m.exit() } : { opacity: 0, scale: 0.98, y: 4, transition: m.exit() }}
          >
            <DialogIds.Provider value={ids}>{children}</DialogIds.Provider>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
});

export function DialogTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ids = useContext(DialogIds);
  return (
    <h2 id={ids?.titleId} className={`mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100 ${className}`}>
      {children}
    </h2>
  );
}

export function DialogDescription({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ids = useContext(DialogIds);
  return (
    <p id={ids?.descId} className={`mb-6 text-sm text-neutral-500 dark:text-neutral-400 ${className}`}>
      {children}
    </p>
  );
}

export function DialogFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mt-6 flex justify-end gap-3 ${className}`}>{children}</div>;
}

export default Dialog;
