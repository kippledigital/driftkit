"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type PanInfo,
  useReducedMotion,
} from "framer-motion";

// =============================================================================
// SPRING PHYSICS
// =============================================================================
// "snappy" — stiffness 500, damping 30, mass 0.5
//   Used for the slide-in entrance. Toasts should arrive with presence —
//   a quick spring with subtle overshoot says "hey, look at me" without
//   being jarring. The low mass keeps small notification cards feeling light.
//
// "smooth" — stiffness 300, damping 30, mass 1
//   Used for layout animations when toasts stack/reorder. When a new toast
//   pushes others up, the movement should feel like physical cards being
//   nudged — weighty, not jittery. Layout springs need more mass to look
//   natural with multiple elements moving simultaneously.
//
// Drag dismiss uses velocity detection — if the user flicks fast enough
// (velocity > 500px/s), dismiss even if drag distance is small. This
// matches iOS notification behavior where intent matters more than distance.
// =============================================================================

const springs = {
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
  smooth: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
};

const exitTransition = { duration: 0.2, ease: "easeIn" as const };

// =============================================================================
// TYPES
// =============================================================================

export type ToastVariant = "default" | "success" | "error" | "warning";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number; // ms, default 4000
}

interface ToastContextValue {
  toast: (t: Omit<Toast, "id">) => string;
  dismiss: (id: string) => void;
}

// =============================================================================
// CONTEXT
// =============================================================================

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

// =============================================================================
// VARIANT STYLES
// =============================================================================

const variantStyles: Record<
  ToastVariant,
  { border: string; icon: string; iconColor: string }
> = {
  default: {
    border: "border-neutral-200 dark:border-neutral-700",
    icon: "",
    iconColor: "",
  },
  success: {
    border: "border-green-200 dark:border-green-800",
    icon: "✓",
    iconColor: "text-green-600 dark:text-green-400",
  },
  error: {
    border: "border-red-200 dark:border-red-800",
    icon: "✕",
    iconColor: "text-red-600 dark:text-red-400",
  },
  warning: {
    border: "border-amber-200 dark:border-amber-800",
    icon: "!",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
};

const progressColors: Record<ToastVariant, string> = {
  default: "bg-neutral-400 dark:bg-neutral-500",
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-amber-500",
};

// =============================================================================
// TOAST ITEM
// =============================================================================

function ToastItem({
  toast: t,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const variant = t.variant || "default";
  const style = variantStyles[variant];
  const duration = t.duration ?? 4000;
  const [progress, setProgress] = useState(1);
  const startRef = useRef(Date.now());
  const pausedRef = useRef(false);

  // Auto-dismiss countdown with progress bar
  useEffect(() => {
    let raf: number;
    const tick = () => {
      if (pausedRef.current) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const elapsed = Date.now() - startRef.current;
      const remaining = 1 - elapsed / duration;
      if (remaining <= 0) {
        onDismiss(t.id);
        return;
      }
      setProgress(remaining);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, onDismiss, t.id]);

  // Drag-to-dismiss
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0.3, 1, 0.3]);

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      // Velocity-based dismiss: fast flick = dismiss even with small distance
      if (
        Math.abs(info.velocity.x) > 500 ||
        Math.abs(info.offset.x) > 100
      ) {
        onDismiss(t.id);
      }
    },
    [onDismiss, t.id]
  );

  return (
    <motion.div
      layout
      layoutId={t.id}
      // Slide in from right with spring
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 100, scale: 0.95 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0, scale: 1 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 80 }}
      transition={prefersReducedMotion ? { duration: 0.15, layout: springs.smooth } : { ...springs.snappy, layout: springs.smooth }}
      // Drag to dismiss horizontally
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      style={{ x, opacity, touchAction: "none" }}
      className={`relative w-80 rounded-[8px] border bg-white dark:bg-neutral-900 shadow-lg overflow-hidden cursor-grab active:cursor-grabbing ${style.border}`}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        // Adjust start time to account for pause
        startRef.current = Date.now() - (1 - progress) * duration;
        pausedRef.current = false;
      }}
    >
      <div className="p-4 flex gap-3 items-start">
        {/* Variant icon */}
        {style.icon && (
          <span
            className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${style.iconColor}`}
          >
            {style.icon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {t.title}
          </p>
          {t.description && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {t.description}
            </p>
          )}
        </div>
        <button
          onClick={() => onDismiss(t.id)}
          className="flex-shrink-0 text-neutral-400 dark:text-neutral-500 text-sm cursor-pointer"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>

      {/* Progress bar — shrinks as auto-dismiss timer runs down */}
      <div className="h-0.5 w-full bg-neutral-100 dark:bg-neutral-800">
        <motion.div
          className={`h-full ${progressColors[variant]}`}
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </motion.div>
  );
}

// =============================================================================
// PROVIDER
// =============================================================================

let toastCounter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((t: Omit<Toast, "id">) => {
    const id = `toast-${++toastCounter}`;
    setToasts((prev) => [...prev, { ...t, id }]);
    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}

      {/* Toast container — fixed bottom-right */}
      <div
        className="fixed bottom-4 right-4 z-[100] flex flex-col-reverse gap-2 pointer-events-none"
        aria-live="polite"
        aria-label="Notifications"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <div key={t.id} className="pointer-events-auto">
              <ToastItem toast={t} onDismiss={dismiss} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
