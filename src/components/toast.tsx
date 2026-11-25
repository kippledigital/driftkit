"use client";

/**
 * Toast
 * =============================================================================
 * Toasts slide up and in on the `smooth` spring, and the stack reflows with
 * layout animation when one leaves. Exits are a quick tween.
 *
 * Swipe sideways to dismiss: distance or a fast flick both count, and the toast
 * leaves in the direction you threw it, carrying your velocity.
 *
 * The countdown bar is a transform (scaleX) driven by a motion value, so it
 * runs on the compositor and never re-renders React. It pauses while the toast
 * is hovered, focused, being dragged, or the tab is in the background.
 *
 * Errors are announced assertively (role="alert"); everything else politely.
 *
 * Needs: ./motion.ts
 * =============================================================================
 */

import React, { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useTransform,
  type AnimationPlaybackControls,
  type PanInfo,
} from "framer-motion";
import { spring, useMotionPrefs } from "./motion";

export type ToastVariant = "default" | "success" | "error" | "warning";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  /** Milliseconds before auto-dismiss. Default 4000. Use Infinity to keep it. */
  duration?: number;
}

interface ToastContextValue {
  toast: (t: Omit<Toast, "id">) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

const tone: Record<ToastVariant, { ring: string; icon: string; bar: string }> = {
  default: { ring: "border-neutral-200 dark:border-neutral-700", icon: "", bar: "bg-neutral-400 dark:bg-neutral-500" },
  success: { ring: "border-green-200 dark:border-green-900", icon: "text-green-600 dark:text-green-400", bar: "bg-green-500" },
  error: { ring: "border-red-200 dark:border-red-900", icon: "text-red-600 dark:text-red-400", bar: "bg-red-500" },
  warning: { ring: "border-amber-200 dark:border-amber-900", icon: "text-amber-600 dark:text-amber-400", bar: "bg-amber-500" },
};

function Icon({ variant }: { variant: ToastVariant }) {
  if (variant === "default") return null;
  const paths = {
    success: <path d="M5 8.2l2 2 4-4.4" />,
    error: <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" />,
    warning: <path d="M8 4.5v4.2M8 11.2v.1" />,
  }[variant];
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`mt-0.5 shrink-0 ${tone[variant].icon}`}
      aria-hidden
    >
      <circle cx="8" cy="8" r="6.6" strokeOpacity=".35" />
      {paths}
    </svg>
  );
}

function ToastItem({ toast: t, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const m = useMotionPrefs();
  const variant = t.variant ?? "default";
  const duration = t.duration ?? 4000;

  const x = useMotionValue(0);
  const dragOpacity = useTransform(x, [-160, 0, 160], [0, 1, 0]);
  const progress = useMotionValue(1);
  const timer = useRef<AnimationPlaybackControls | null>(null);
  const holds = useRef(new Set<string>());
  const leaving = useRef(false);

  useEffect(() => {
    if (!Number.isFinite(duration)) return;
    const controls = animate(progress, 0, {
      duration: duration / 1000,
      ease: "linear",
      onComplete: () => !leaving.current && onDismiss(t.id),
    });
    timer.current = controls;
    const onVisibility = () => (document.hidden ? controls.pause() : holds.current.size === 0 && controls.play());
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      controls.stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [duration, onDismiss, progress, t.id]);

  const hold = (reason: string, on: boolean) => {
    if (on) holds.current.add(reason);
    else holds.current.delete(reason);
    if (holds.current.size > 0) timer.current?.pause();
    else if (!document.hidden) timer.current?.play();
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    hold("drag", false);
    const { offset, velocity } = info;
    if (Math.abs(offset.x) > 90 || Math.abs(velocity.x) > 450) {
      leaving.current = true;
      const dir = Math.sign(offset.x || velocity.x) || 1;
      animate(x, dir * 420, { ...spring.smooth, velocity: velocity.x }).then(() => onDismiss(t.id));
    } else {
      animate(x, 0, spring.snappy);
    }
  };

  const assertive = variant === "error";

  return (
    <motion.li
      layout={m.reduced ? false : "position"}
      initial={m.reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1, transition: m.spring("smooth") }}
      exit={{ opacity: 0, scale: m.reduced ? 1 : 0.97, transition: m.exit("quick") }}
      transition={{ layout: spring.smooth }}
      className="pointer-events-auto list-none"
      onPointerEnter={() => hold("hover", true)}
      onPointerLeave={() => hold("hover", false)}
      onFocus={() => hold("focus", true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && hold("focus", false)}
    >
      <motion.div
        role={assertive ? "alert" : "status"}
        aria-atomic="true"
        drag={m.reduced ? false : "x"}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.9}
        dragMomentum={false}
        onDragStart={() => hold("drag", true)}
        onDragEnd={onDragEnd}
        style={{ x, opacity: dragOpacity, touchAction: "pan-y" }}
        className={`relative w-[min(22rem,calc(100vw-2rem))] cursor-grab overflow-hidden rounded-[10px] border bg-white shadow-lg active:cursor-grabbing dark:bg-neutral-900 ${tone[variant].ring}`}
      >
        <div className="flex items-start gap-3 p-4">
          <Icon variant={variant} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{t.title}</p>
            {t.description && <p className="mt-0.5 text-[13px] leading-snug text-neutral-500 dark:text-neutral-400">{t.description}</p>}
          </div>
          <button
            type="button"
            onClick={() => onDismiss(t.id)}
            aria-label="Dismiss notification"
            className="-mr-1 -mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-[6px] text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {Number.isFinite(duration) && (
          <div aria-hidden className="h-0.5 w-full bg-neutral-100 dark:bg-neutral-800">
            <motion.div className={`h-full origin-left ${tone[variant].bar}`} style={{ scaleX: progress }} />
          </div>
        )}
      </motion.div>
    </motion.li>
  );
}

let toastCounter = 0;

export interface ToastProviderProps {
  children: ReactNode;
  /** Most toasts visible at once; older ones leave first. Default 4. */
  max?: number;
}

export function ToastProvider({ children, max = 4 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(
    (t: Omit<Toast, "id">) => {
      const id = `toast-${++toastCounter}`;
      setToasts((prev) => [...prev, { ...t, id }].slice(-max));
      return id;
    },
    [max]
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <section aria-label="Notifications" className="pointer-events-none fixed bottom-4 right-4 z-[100]">
        <ol className="flex flex-col-reverse gap-2">
          <AnimatePresence initial={false}>
            {toasts.map((t) => (
              <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
            ))}
          </AnimatePresence>
        </ol>
      </section>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
