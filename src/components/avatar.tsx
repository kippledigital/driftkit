"use client";

import React, { forwardRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// =============================================================================
// SPRING PHYSICS
// =============================================================================
// "snappy" — stiffness 500, damping 30, mass 0.5
//   Used for hover scale and presence entrance. Avatars are small UI elements
//   that need to feel responsive — quick pop-in with minimal overshoot.
//
// "smooth" — stiffness 300, damping 30, mass 1
//   Used for group overlap animation when avatars stack/unstack.
//   The sliding motion should feel natural, like cards being dealt.
// =============================================================================

const springs = {
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
  smooth: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
};

// =============================================================================
// TYPES
// =============================================================================

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Fallback text (initials). Auto-generated from alt if not provided. */
  fallback?: string;
  /** Avatar size */
  size?: AvatarSize;
  /** Show online/offline/busy status indicator */
  status?: "online" | "offline" | "busy" | "away";
  /** Additional CSS classes */
  className?: string;
}

export interface AvatarGroupProps {
  /** Avatar elements */
  children: React.ReactNode;
  /** Maximum visible avatars before +N overflow */
  max?: number;
  /** Size applied to all child avatars */
  size?: AvatarSize;
  /** Additional CSS classes */
  className?: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const sizeMap: Record<AvatarSize, { container: string; text: string; status: string; px: number }> = {
  xs: { container: "w-6 h-6", text: "text-[10px]", status: "w-1.5 h-1.5 border", px: 24 },
  sm: { container: "w-8 h-8", text: "text-xs", status: "w-2 h-2 border-[1.5px]", px: 32 },
  md: { container: "w-10 h-10", text: "text-sm", status: "w-2.5 h-2.5 border-2", px: 40 },
  lg: { container: "w-12 h-12", text: "text-base", status: "w-3 h-3 border-2", px: 48 },
  xl: { container: "w-16 h-16", text: "text-lg", status: "w-3.5 h-3.5 border-2", px: 64 },
};

const statusColors: Record<string, string> = {
  online: "bg-green-500",
  offline: "bg-neutral-400",
  busy: "bg-red-500",
  away: "bg-amber-500",
};

// Generate a consistent color from a string
function stringToColor(str: string): string {
  const colors = [
    "bg-red-500", "bg-orange-500", "bg-amber-500", "bg-yellow-500",
    "bg-lime-500", "bg-green-500", "bg-emerald-500", "bg-teal-500",
    "bg-cyan-500", "bg-sky-500", "bg-blue-500", "bg-indigo-500",
    "bg-violet-500", "bg-purple-500", "bg-fuchsia-500", "bg-pink-500",
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// =============================================================================
// AVATAR
// =============================================================================

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  { src, alt = "", fallback, size = "md", status, className = "" },
  ref
) {
  const prefersReducedMotion = useReducedMotion();
  const s = sizeMap[size];
  const initials = fallback || getInitials(alt);
  const bgColor = stringToColor(alt || fallback || "?");

  const [imgError, setImgError] = React.useState(false);
  const showImage = src && !imgError;

  return (
    <motion.div
      ref={ref}
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden ${s.container} ${className}`}
      whileHover={prefersReducedMotion ? {} : { scale: 1.08 }}
      transition={springs.snappy}
    >
      {/* Image */}
      {showImage ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        /* Fallback initials */
        <div
          className={`w-full h-full flex items-center justify-center ${bgColor} text-white font-semibold ${s.text}`}
        >
          {initials || "?"}
        </div>
      )}

      {/* Status indicator */}
      {status && (
        <motion.div
          className={`absolute bottom-0 right-0 rounded-full border-white dark:border-neutral-900 ${s.status} ${statusColors[status]}`}
          initial={prefersReducedMotion ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={springs.snappy}
        />
      )}
    </motion.div>
  );
});

// =============================================================================
// AVATAR GROUP
// =============================================================================

export function AvatarGroup({ children, max = 5, size = "md", className = "" }: AvatarGroupProps) {
  const prefersReducedMotion = useReducedMotion();
  const childArray = React.Children.toArray(children);
  const visible = childArray.slice(0, max);
  const overflow = childArray.length - max;
  const s = sizeMap[size];

  return (
    <div className={`flex items-center ${className}`}>
      <AnimatePresence mode="popLayout">
        {visible.map((child, i) => (
          <motion.div
            key={i}
            className="rounded-full ring-2 ring-white dark:ring-neutral-900"
            style={{ marginLeft: i === 0 ? 0 : -(s.px * 0.3), zIndex: visible.length - i }}
            initial={prefersReducedMotion ? false : { scale: 0, x: -10 }}
            animate={{ scale: 1, x: 0 }}
            exit={{ scale: 0, x: -10 }}
            transition={{ ...springs.smooth, delay: i * 0.05 }}
            layout
          >
            {React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<AvatarProps>, { size })
              : child}
          </motion.div>
        ))}
      </AnimatePresence>

      {overflow > 0 && (
        <motion.div
          className={`flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 font-semibold ring-2 ring-white dark:ring-neutral-900 ${s.container} ${s.text}`}
          style={{ marginLeft: -(s.px * 0.3), zIndex: 0 }}
          initial={prefersReducedMotion ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ ...springs.snappy, delay: visible.length * 0.05 }}
        >
          +{overflow}
        </motion.div>
      )}
    </div>
  );
}
