"use client";

import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export interface DrawerProps {
  /** Whether the drawer is open */
  open: boolean;
  /** Callback when the drawer should close */
  onClose: () => void;
  /** Which side the drawer slides from */
  side?: "left" | "right" | "top" | "bottom";
  /** Width/height of the drawer */
  size?: string | number;
  /** Show backdrop */
  backdrop?: boolean;
  /** Close on backdrop click */
  closeOnBackdropClick?: boolean;
  /** Close on escape key */
  closeOnEscape?: boolean;
  /** Drawer content */
  children: ReactNode;
  /** Additional classes for the drawer */
  className?: string;
}

const sideVariants = {
  left: {
    closed: { x: "-100%" },
    open: { x: "0%" },
  },
  right: {
    closed: { x: "100%" },
    open: { x: "0%" },
  },
  top: {
    closed: { y: "-100%" },
    open: { y: "0%" },
  },
  bottom: {
    closed: { y: "100%" },
    open: { y: "0%" },
  },
};

const backdropVariants = {
  closed: { opacity: 0, backdropFilter: "blur(0px)" },
  open: { opacity: 1, backdropFilter: "blur(8px)" },
};

const springConfig = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

export function Drawer({
  open,
  onClose,
  side = "right",
  size,
  backdrop = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  children,
  className = "",
}: DrawerProps) {
  // Close on escape key
  useEffect(() => {
    if (!closeOnEscape || !open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeOnEscape, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Get size styles based on side
  const getSizeStyle = () => {
    const sizeValue = size || (side === "left" || side === "right" ? "320px" : "240px");
    
    if (side === "left" || side === "right") {
      return { width: sizeValue, height: "100vh" };
    } else {
      return { height: sizeValue, width: "100vw" };
    }
  };

  const drawerContent = (
    <AnimatePresence mode="wait">
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          {backdrop && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={backdropVariants}
              transition={springConfig}
              className="absolute inset-0 bg-black/20 dark:bg-black/40"
              onClick={closeOnBackdropClick ? onClose : undefined}
              style={{ cursor: closeOnBackdropClick ? "pointer" : "default" }}
            />
          )}

          {/* Drawer */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sideVariants[side]}
            transition={springConfig}
            className={`
              relative bg-white dark:bg-neutral-900 
              border-neutral-200 dark:border-neutral-800 
              shadow-xl z-10 
              flex flex-col
              ${side === "left" ? "border-r" : ""}
              ${side === "right" ? "border-l ml-auto" : ""}
              ${side === "top" ? "border-b" : ""}
              ${side === "bottom" ? "border-t mt-auto" : ""}
              ${className}
            `}
            style={getSizeStyle()}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  // Use portal to render in body
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(drawerContent, document.body);
}

// Pre-built drawer components for common use cases

export interface DrawerHeaderProps {
  children: ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
}

export function DrawerHeader({ 
  children, 
  onClose, 
  showCloseButton = true,
  className = "" 
}: DrawerHeaderProps) {
  return (
    <div className={`
      flex items-center justify-between 
      p-4 border-b border-neutral-200 dark:border-neutral-800
      ${className}
    `}>
      <div className="font-semibold text-neutral-900 dark:text-neutral-100">
        {children}
      </div>
      {showCloseButton && onClose && (
        <button
          onClick={onClose}
          className="
            p-1 rounded-lg text-neutral-600 dark:text-neutral-400 
            hover:bg-neutral-100 dark:hover:bg-neutral-800 
            hover:text-neutral-900 dark:hover:text-neutral-200
            transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 
            focus-visible:ring-offset-2 focus-visible:ring-offset-white 
            dark:focus-visible:ring-offset-neutral-900
          "
          aria-label="Close drawer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M12.207 4.793a1 1 0 010 1.414L9.414 9l2.793 2.793a1 1 0 11-1.414 1.414L8 10.414l-2.793 2.793a1 1 0 01-1.414-1.414L6.586 9 3.793 6.207a1 1 0 011.414-1.414L8 7.586l2.793-2.793a1 1 0 011.414 0z" />
          </svg>
        </button>
      )}
    </div>
  );
}

export interface DrawerContentProps {
  children: ReactNode;
  className?: string;
}

export function DrawerContent({ children, className = "" }: DrawerContentProps) {
  return (
    <div className={`flex-1 overflow-y-auto p-4 ${className}`}>
      {children}
    </div>
  );
}

export interface DrawerFooterProps {
  children: ReactNode;
  className?: string;
}

export function DrawerFooter({ children, className = "" }: DrawerFooterProps) {
  return (
    <div className={`
      p-4 border-t border-neutral-200 dark:border-neutral-800
      bg-neutral-50 dark:bg-neutral-950 
      ${className}
    `}>
      {children}
    </div>
  );
}