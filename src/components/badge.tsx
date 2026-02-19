"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export type BadgeVariant = 
  | "default" 
  | "secondary" 
  | "success" 
  | "warning" 
  | "error" 
  | "info"
  | "outline";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  /** Badge content */
  children: ReactNode;
  /** Visual variant */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: BadgeSize;
  /** Icon to display */
  icon?: ReactNode;
  /** Whether to show a pulse animation */
  pulse?: boolean;
  /** Whether the badge is removable */
  removable?: boolean;
  /** Callback when badge is removed */
  onRemove?: () => void;
  /** Additional classes */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}

const variantClasses = {
  default: "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100",
  secondary: "bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200",
  success: "bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800",
  warning: "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800",
  error: "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800",
  info: "bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800",
  outline: "border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 bg-transparent",
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-sm",
};

const iconSizes = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-4 h-4",
};

const springConfig = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  icon,
  pulse = false,
  removable = false,
  onRemove,
  className = "",
  onClick,
}: BadgeProps) {
  const isClickable = onClick || removable;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={springConfig}
      whileHover={isClickable ? { scale: 1.05 } : undefined}
      whileTap={isClickable ? { scale: 0.95 } : undefined}
      className={`
        inline-flex items-center gap-1.5 rounded-full font-medium
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isClickable ? "cursor-pointer" : ""}
        ${pulse ? "animate-pulse" : ""}
        ${className}
      `}
      onClick={onClick}
    >
      {pulse && (
        <span className={`
          flex-shrink-0 rounded-full bg-current opacity-75 
          ${size === "sm" ? "w-1.5 h-1.5" : size === "md" ? "w-2 h-2" : "w-2.5 h-2.5"}
        `}>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-40"></span>
        </span>
      )}
      
      {icon && !pulse && (
        <span className={`flex-shrink-0 ${iconSizes[size]}`}>
          {icon}
        </span>
      )}
      
      <span>{children}</span>
      
      {removable && (
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`
            flex-shrink-0 rounded-full hover:bg-black/10 dark:hover:bg-white/10
            ${size === "sm" ? "w-3 h-3 p-0.5" : size === "md" ? "w-4 h-4 p-0.5" : "w-5 h-5 p-1"}
          `}
          aria-label="Remove badge"
        >
          <svg
            viewBox="0 0 12 12"
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.button>
      )}
    </motion.span>
  );
}

// Animated badge wrapper for enter/exit animations
export function AnimatedBadge({ children, ...props }: BadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={springConfig}
      className="inline-block"
    >
      <Badge {...props}>{children}</Badge>
    </motion.div>
  );
}

// Badge with notification dot
export interface NotificationBadgeProps {
  /** Content to wrap */
  children: ReactNode;
  /** Notification count */
  count?: number;
  /** Max count to display before showing "+" */
  max?: number;
  /** Show dot instead of count */
  dot?: boolean;
  /** Badge variant */
  variant?: BadgeVariant;
  /** Position of the notification */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  /** Whether to show when count is 0 */
  showZero?: boolean;
  /** Additional classes */
  className?: string;
}

export function NotificationBadge({
  children,
  count = 0,
  max = 99,
  dot = false,
  variant = "error",
  position = "top-right",
  showZero = false,
  className = "",
}: NotificationBadgeProps) {
  const showBadge = dot || count > 0 || showZero;
  const displayCount = count > max ? `${max}+` : count.toString();

  const positionClasses = {
    "top-right": "-top-2 -right-2",
    "top-left": "-top-2 -left-2", 
    "bottom-right": "-bottom-2 -right-2",
    "bottom-left": "-bottom-2 -left-2",
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {children}
      
      {showBadge && (
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={springConfig}
          className={`
            absolute ${positionClasses[position]}
            ${dot 
              ? "w-2 h-2 rounded-full" 
              : "min-w-[1.25rem] h-5 rounded-full px-1 flex items-center justify-center text-xs font-bold"
            }
            ${variantClasses[variant]}
          `}
        >
          {!dot && displayCount}
        </motion.span>
      )}
    </div>
  );
}

// Pre-built badge variants
export const badgeVariants = {
  status: {
    online: (
      <Badge variant="success" icon={
        <svg viewBox="0 0 12 12" className="w-full h-full">
          <circle cx="6" cy="6" r="2" fill="currentColor" />
        </svg>
      }>
        Online
      </Badge>
    ),
    offline: (
      <Badge variant="secondary" icon={
        <svg viewBox="0 0 12 12" className="w-full h-full">
          <circle cx="6" cy="6" r="2" fill="currentColor" />
        </svg>
      }>
        Offline
      </Badge>
    ),
    busy: (
      <Badge variant="warning" icon={
        <svg viewBox="0 0 12 12" className="w-full h-full">
          <circle cx="6" cy="6" r="2" fill="currentColor" />
        </svg>
      }>
        Busy
      </Badge>
    ),
  },
  
  priority: {
    low: <Badge variant="info">Low</Badge>,
    medium: <Badge variant="warning">Medium</Badge>,
    high: <Badge variant="error">High</Badge>,
    critical: <Badge variant="error" pulse>Critical</Badge>,
  },
  
  category: {
    new: <Badge variant="success">New</Badge>,
    featured: <Badge variant="info">Featured</Badge>,
    popular: <Badge variant="warning">Popular</Badge>,
    sale: <Badge variant="error">Sale</Badge>,
  },
};