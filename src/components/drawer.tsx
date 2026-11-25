"use client";

/**
 * Drawer
 * =============================================================================
 * Slides in on the `gentle` spring: a full-height panel travels a long way, and
 * a stiffer spring makes that distance feel violent. Closes with a short tween.
 *
 * Drag it toward its edge to dismiss. The decision uses distance OR velocity,
 * so a quick flick closes it even if it only moved a little, and the close
 * continues at the speed of your hand instead of restarting from zero.
 *
 * Behavior: portal, role="dialog", focus trap and restore, Escape (topmost
 * overlay only), scroll lock without layout jump, 100dvh for mobile toolbars.
 *
 * Needs: ./motion.ts, ./overlay.ts
 * =============================================================================
 */

import { useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, type PanInfo } from "framer-motion";
import { fade, spring, useMotionPrefs } from "./motion";
import { useEscape, useFocusTrap, useMounted, useScrollLock } from "./overlay";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right" | "top" | "bottom";
  /** Width (left/right) or height (top/bottom). */
  size?: string | number;
  backdrop?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  /** Drag toward the edge to close. Default true. */
  dragToClose?: boolean;
  /** Accessible name for the panel. */
  title?: string;
  children: ReactNode;
  className?: string;
}

const offscreen = {
  left: { x: "-100%" },
  right: { x: "100%" },
  top: { y: "-100%" },
  bottom: { y: "100%" },
} as const;

export function Drawer({
  open,
  onClose,
  side = "right",
  size,
  backdrop = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  dragToClose = true,
  title,
  children,
  className = "",
}: DrawerProps) {
  const mounted = useMounted();
  const m = useMotionPrefs();
  const panelRef = useRef<HTMLDivElement>(null);
  const horizontal = side === "left" || side === "right";
  const sign = side === "left" || side === "top" ? -1 : 1;

  useFocusTrap(panelRef, open);
  useScrollLock(open);
  useEscape(open && closeOnEscape, onClose);

  // Backdrop follows the drag so the page "comes back" as you pull the drawer away.
  const drag = useMotionValue(0);
  const backdropOpacity = useTransform(drag, (v: number | string) => {
    // During enter/exit the value is a percentage string; only live drags are pixels.
    if (typeof v === "string") return 1;
    const extent = panelRef.current ? (horizontal ? panelRef.current.offsetWidth : panelRef.current.offsetHeight) : 400;
    return 1 - Math.min(1, Math.max(0, (v * sign) / extent));
  });

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const offset = (horizontal ? info.offset.x : info.offset.y) * sign;
    const velocity = (horizontal ? info.velocity.x : info.velocity.y) * sign;
    const extent = panelRef.current ? (horizontal ? panelRef.current.offsetWidth : panelRef.current.offsetHeight) : 400;
    if (offset > extent * 0.35 || velocity > 500) {
      onClose();
    } else {
      animate(drag, 0, spring.snappy);
    }
  };

  const dimension = size ?? (horizontal ? 320 : 280);
  const sizeStyle = horizontal
    ? { width: dimension, maxWidth: "100vw", height: "100dvh" }
    : { height: dimension, maxHeight: "100dvh", width: "100vw" };

  const placement = {
    left: "left-0 top-0 border-r",
    right: "right-0 top-0 border-l",
    top: "top-0 left-0 border-b",
    bottom: "bottom-0 left-0 border-t rounded-t-[12px]",
  }[side];

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          {backdrop && (
            <motion.div
              aria-hidden
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: fade.in }}
              exit={{ opacity: 0, transition: fade.out }}
              onClick={closeOnBackdropClick ? onClose : undefined}
            >
              <motion.div className="h-full w-full bg-black/30 backdrop-blur-[6px] dark:bg-black/50" style={{ opacity: backdropOpacity }} />
            </motion.div>
          )}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            className={`absolute flex flex-col border-neutral-200 bg-white shadow-xl outline-none dark:border-neutral-800 dark:bg-neutral-900 ${placement} ${className}`}
            style={{ ...sizeStyle, [horizontal ? "x" : "y"]: drag }}
            initial={m.reduced ? { opacity: 0 } : offscreen[side]}
            animate={{ x: 0, y: 0, opacity: 1, transition: m.spring("gentle") }}
            exit={m.reduced ? { opacity: 0, transition: m.exit() } : { ...offscreen[side], transition: m.exit("panel") }}
            drag={dragToClose && !m.reduced ? (horizontal ? "x" : "y") : false}
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={
              horizontal
                ? { left: side === "left" ? 1 : 0.04, right: side === "right" ? 1 : 0.04 }
                : { top: side === "top" ? 1 : 0.04, bottom: side === "bottom" ? 1 : 0.04 }
            }
            dragMomentum={false}
            onDragEnd={onDragEnd}
          >
            {side === "bottom" && dragToClose && (
              <div aria-hidden className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export interface DrawerHeaderProps {
  children: ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
}

export function DrawerHeader({ children, onClose, showCloseButton = true, className = "" }: DrawerHeaderProps) {
  return (
    <div className={`flex items-center justify-between border-b border-neutral-200 p-4 dark:border-neutral-800 ${className}`}>
      <div className="font-semibold text-neutral-900 dark:text-neutral-100">{children}</div>
      {showCloseButton && onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid h-8 w-8 place-items-center rounded-[6px] text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

export function DrawerContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`flex-1 overflow-y-auto overscroll-contain p-4 ${className}`}>{children}</div>;
}

export function DrawerFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`border-t border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950 ${className}`}>
      {children}
    </div>
  );
}

export default Drawer;
