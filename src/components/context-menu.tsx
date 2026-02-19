"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  separator?: boolean;
  onClick?: () => void;
  submenu?: ContextMenuItem[];
}

export interface ContextMenuProps {
  /** The trigger element */
  children: ReactNode;
  /** Menu items */
  items: ContextMenuItem[];
  /** Disable the context menu */
  disabled?: boolean;
  /** Additional classes */
  className?: string;
}

const menuVariants = {
  closed: {
    opacity: 0,
    scale: 0.95,
    y: -10,
  },
  open: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
};

const springConfig = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

export function ContextMenu({ children, items, disabled = false, className = "" }: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle right click
  const handleContextMenu = (e: React.MouseEvent) => {
    if (disabled) return;
    
    e.preventDefault();
    e.stopPropagation();

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    // Adjust position to keep menu in viewport
    setPosition({ x, y });
    setIsOpen(true);
  };

  // Close menu on click outside or escape
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen]);

  // Adjust menu position to stay in viewport
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const menu = menuRef.current;
    const rect = menu.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let { x, y } = position;

    // Adjust horizontal position
    if (x + rect.width > viewport.width) {
      x = viewport.width - rect.width - 8;
    }
    if (x < 8) x = 8;

    // Adjust vertical position
    if (y + rect.height > viewport.height) {
      y = y - rect.height - 8;
    }
    if (y < 8) y = 8;

    if (x !== position.x || y !== position.y) {
      setPosition({ x, y });
    }
  }, [isOpen, position]);

  const handleItemClick = (item: ContextMenuItem) => {
    if (item.disabled || item.separator) return;
    
    item.onClick?.();
    setIsOpen(false);
  };

  const renderItems = (items: ContextMenuItem[]) => {
    return items.map((item, index) => {
      if (item.separator) {
        return <hr key={`separator-${index}`} className="my-1 border-neutral-200 dark:border-neutral-800" />;
      }

      return (
        <motion.button
          key={item.id}
          onClick={() => handleItemClick(item)}
          className={`
            w-full flex items-center gap-3 px-3 py-2 text-sm text-left
            rounded-lg transition-colors
            ${item.disabled 
              ? "text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
              : item.danger
                ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50"
                : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }
          `}
          disabled={item.disabled}
          whileTap={item.disabled ? {} : { scale: 0.98 }}
          transition={springConfig}
        >
          {item.icon && (
            <span className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
              {item.icon}
            </span>
          )}
          <span className="flex-1">{item.label}</span>
          {item.shortcut && (
            <span className="text-xs text-neutral-500 dark:text-neutral-500 font-mono">
              {item.shortcut}
            </span>
          )}
          {item.submenu && (
            <span className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}
        </motion.button>
      );
    });
  };

  const menu = isOpen && (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial="closed"
        animate="open"
        exit="closed"
        variants={menuVariants}
        transition={springConfig}
        className="
          fixed z-50 min-w-[200px] p-1
          bg-white dark:bg-neutral-900
          border border-neutral-200 dark:border-neutral-800
          rounded-lg shadow-lg
          focus:outline-none
        "
        style={{
          left: position.x,
          top: position.y,
        }}
        role="menu"
        tabIndex={-1}
      >
        {renderItems(items)}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <>
      <div
        ref={triggerRef}
        onContextMenu={handleContextMenu}
        className={className}
      >
        {children}
      </div>
      {typeof document !== "undefined" && createPortal(menu, document.body)}
    </>
  );
}

// Predefined context menu items for common actions
export const contextMenuItems = {
  copy: (onClick?: () => void): ContextMenuItem => ({
    id: "copy",
    label: "Copy",
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <path d="M8 2H4a1 1 0 00-1 1v6a1 1 0 001 1h4a1 1 0 001-1V3a1 1 0 00-1-1zM4 1a2 2 0 00-2 2v6a2 2 0 002 2h4a2 2 0 002-2V3a2 2 0 00-2-2H4z" />
        <path d="M1.5 4.5a.5.5 0 01.5-.5h1a.5.5 0 010 1H2v4.5a.5.5 0 01-1 0V4.5z" />
      </svg>
    ),
    shortcut: "⌘C",
    onClick,
  }),

  cut: (onClick?: () => void): ContextMenuItem => ({
    id: "cut",
    label: "Cut",
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <path d="M8.5 2.5a1 1 0 11-2 0 1 1 0 012 0zM2 7l3-3m0 0l3 3m-3-3v6" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    shortcut: "⌘X",
    onClick,
  }),

  paste: (onClick?: () => void): ContextMenuItem => ({
    id: "paste",
    label: "Paste",
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <path d="M8 1H6a1 1 0 00-1 1v1H3a1 1 0 00-1 1v7a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1H7V2a1 1 0 00-1-1z" />
      </svg>
    ),
    shortcut: "⌘V",
    onClick,
  }),

  delete: (onClick?: () => void): ContextMenuItem => ({
    id: "delete",
    label: "Delete",
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <path d="M3.5 2.5h5a.5.5 0 000-1h-5a.5.5 0 000 1zM2 3v7a1 1 0 001 1h6a1 1 0 001-1V3H2zm2.5 1.5v4a.5.5 0 01-1 0v-4a.5.5 0 011 0zm3 0v4a.5.5 0 01-1 0v-4a.5.5 0 011 0z" />
      </svg>
    ),
    shortcut: "⌦",
    danger: true,
    onClick,
  }),

  separator: (): ContextMenuItem => ({
    id: "separator",
    label: "",
    separator: true,
  }),

  rename: (onClick?: () => void): ContextMenuItem => ({
    id: "rename",
    label: "Rename",
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <path d="M8.5 1.5l2 2L4 10H2v-2L8.5 1.5z" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    shortcut: "F2",
    onClick,
  }),

  duplicate: (onClick?: () => void): ContextMenuItem => ({
    id: "duplicate",
    label: "Duplicate",
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <path d="M8 2H4a1 1 0 00-1 1v6a1 1 0 001 1h4a1 1 0 001-1V3a1 1 0 00-1-1z" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M1.5 4.5h-1v5a2 2 0 002 2h5v-1" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
    ),
    shortcut: "⌘D",
    onClick,
  }),
};