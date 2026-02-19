"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export interface BreadcrumbItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** URL or path */
  href?: string;
  /** Click handler */
  onClick?: () => void;
  /** Icon to display */
  icon?: ReactNode;
  /** Whether this item is disabled */
  disabled?: boolean;
}

export interface BreadcrumbsProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Separator between items */
  separator?: ReactNode;
  /** Maximum items to show before collapsing */
  maxItems?: number;
  /** Show home icon on first item */
  showHomeIcon?: boolean;
  /** Additional classes */
  className?: string;
}

const itemVariants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
};

const springConfig = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

const defaultSeparator = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="currentColor"
    className="text-neutral-400 dark:text-neutral-600"
  >
    <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const homeIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="currentColor"
    className="text-neutral-500 dark:text-neutral-400"
  >
    <path d="M7 1L13 6v7H1V6L7 1z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 13V8h4v5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Breadcrumbs({
  items,
  separator = defaultSeparator,
  maxItems,
  showHomeIcon = false,
  className = "",
}: BreadcrumbsProps) {
  if (!items.length) return null;

  // Handle collapsing when there are too many items
  let displayItems = items;
  let hasCollapsed = false;

  if (maxItems && items.length > maxItems) {
    hasCollapsed = true;
    // Show first item, ellipsis, and last few items
    const keepFromEnd = maxItems - 2; // Reserve space for first item and ellipsis
    displayItems = [
      items[0],
      { id: "ellipsis", label: "…", disabled: true },
      ...items.slice(-keepFromEnd),
    ];
  }

  const renderItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
    const isClickable = !item.disabled && !isLast && (item.href || item.onClick);
    const isHome = index === 0 && showHomeIcon;

    const content = (
      <span className="flex items-center gap-1.5">
        {isHome ? homeIcon : item.icon}
        <span className="text-sm font-medium">
          {isHome ? "" : item.label}
        </span>
      </span>
    );

    const baseClasses = `
      flex items-center gap-1.5 rounded-lg px-2 py-1 transition-colors
      ${isClickable 
        ? "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer" 
        : isLast 
          ? "text-neutral-900 dark:text-neutral-100" 
          : "text-neutral-500 dark:text-neutral-500 cursor-default"
      }
      ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}
    `;

    if (isClickable) {
      if (item.href) {
        return (
          <motion.a
            key={item.id}
            href={item.href}
            className={baseClasses}
            variants={itemVariants}
            initial="initial"
            animate="animate"
            transition={{ ...springConfig, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {content}
          </motion.a>
        );
      } else {
        return (
          <motion.button
            key={item.id}
            onClick={item.onClick}
            className={baseClasses}
            variants={itemVariants}
            initial="initial"
            animate="animate"
            transition={{ ...springConfig, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {content}
          </motion.button>
        );
      }
    }

    return (
      <motion.span
        key={item.id}
        className={baseClasses}
        variants={itemVariants}
        initial="initial"
        animate="animate"
        transition={{ ...springConfig, delay: index * 0.05 }}
      >
        {content}
      </motion.span>
    );
  };

  return (
    <nav className={`flex items-center ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          
          return (
            <li key={item.id} className="flex items-center gap-2">
              {renderItem(item, index, isLast)}
              {!isLast && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ...springConfig, delay: index * 0.05 + 0.1 }}
                  className="flex items-center"
                  aria-hidden="true"
                >
                  {separator}
                </motion.div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Pre-built breadcrumb patterns
export const breadcrumbPatterns = {
  /** Simple text breadcrumbs */
  simple: (labels: string[], onNavigate?: (index: number) => void): BreadcrumbItem[] =>
    labels.map((label, index) => ({
      id: `item-${index}`,
      label,
      onClick: onNavigate ? () => onNavigate(index) : undefined,
    })),

  /** File system style breadcrumbs */
  filesystem: (path: string, onNavigate?: (path: string) => void): BreadcrumbItem[] => {
    const parts = path.split("/").filter(Boolean);
    
    return [
      {
        id: "root",
        label: "Root",
        icon: homeIcon,
        onClick: onNavigate ? () => onNavigate("/") : undefined,
      },
      ...parts.map((part, index) => ({
        id: `path-${index}`,
        label: part,
        onClick: onNavigate ? () => onNavigate("/" + parts.slice(0, index + 1).join("/")) : undefined,
      })),
    ];
  },

  /** Page hierarchy breadcrumbs */
  pages: (pages: Array<{ name: string; path?: string }>, onNavigate?: (path: string) => void): BreadcrumbItem[] =>
    pages.map((page, index) => ({
      id: `page-${index}`,
      label: page.name,
      href: page.path,
      onClick: page.path && onNavigate ? () => onNavigate(page.path!) : undefined,
    })),
};