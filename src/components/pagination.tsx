"use client";

import React, { forwardRef } from "react";
import { motion, LayoutGroup, useReducedMotion } from "framer-motion";

// =============================================================================
// SPRING PHYSICS
// =============================================================================
// "snappy" — stiffness 500, damping 30, mass 0.5
//   Used for the active page indicator sliding between pages.
//   The blob should track quickly with a tiny overshoot to feel physical.
//
// "quick" — stiffness 500, damping 40, mass 0.3
//   Used for button hover/tap feedback. Near-instant response.
// =============================================================================

const springs = {
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
  quick: { type: "spring" as const, stiffness: 500, damping: 40, mass: 0.3 },
};

// =============================================================================
// TYPES
// =============================================================================

export interface PaginationProps {
  /** Current page (1-indexed) */
  page: number;
  /** Total number of pages */
  totalPages: number;
  /** Page change callback */
  onPageChange: (page: number) => void;
  /** Max visible page buttons (excluding prev/next) */
  siblingCount?: number;
  /** Show first/last page buttons */
  showEdges?: boolean;
  /** Additional CSS classes */
  className?: string;
}

// =============================================================================
// HELPERS
// =============================================================================

function getPageNumbers(page: number, totalPages: number, siblingCount: number): (number | "ellipsis")[] {
  const totalSlots = siblingCount * 2 + 5; // siblings + current + 2 edges + 2 ellipsis
  
  if (totalPages <= totalSlots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  const items: (number | "ellipsis")[] = [];

  // Always show first page
  items.push(1);

  if (showLeftEllipsis) {
    items.push("ellipsis");
  } else {
    for (let i = 2; i < leftSibling; i++) items.push(i);
  }

  // Sibling range
  for (let i = leftSibling; i <= rightSibling; i++) {
    if (i !== 1 && i !== totalPages) items.push(i);
  }

  if (showRightEllipsis) {
    items.push("ellipsis");
  } else {
    for (let i = rightSibling + 1; i < totalPages; i++) items.push(i);
  }

  // Always show last page
  if (totalPages > 1) items.push(totalPages);

  return items;
}

// =============================================================================
// PAGINATION
// =============================================================================

export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    page,
    totalPages,
    onPageChange,
    siblingCount = 1,
    showEdges = true,
    className = "",
  },
  ref
) {
  const prefersReducedMotion = useReducedMotion();
  const pages = getPageNumbers(page, totalPages, siblingCount);

  if (totalPages <= 1) return null;

  return (
    <nav ref={ref} aria-label="Pagination" className={`flex items-center gap-1 ${className}`}>
      <LayoutGroup id="pagination">
        {/* Previous */}
        <motion.button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="flex items-center justify-center w-9 h-9 rounded-lg text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          whileHover={page <= 1 || prefersReducedMotion ? {} : { scale: 1.05 }}
          whileTap={page <= 1 || prefersReducedMotion ? {} : { scale: 0.95 }}
          transition={springs.quick}
          aria-label="Previous page"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 4L6 8L10 12" />
          </svg>
        </motion.button>

        {/* Pages */}
        {pages.map((item, i) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${i}`}
              className="flex items-center justify-center w-9 h-9 text-sm text-neutral-400"
            >
              ···
            </span>
          ) : (
            <motion.button
              key={item}
              onClick={() => onPageChange(item)}
              className="relative flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-colors"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              transition={springs.quick}
              aria-label={`Page ${item}`}
              aria-current={item === page ? "page" : undefined}
            >
              {/* Active indicator blob */}
              {item === page && (
                <motion.div
                  layoutId="pagination-active"
                  className="absolute inset-0 rounded-lg bg-neutral-900 dark:bg-white"
                  transition={prefersReducedMotion ? { duration: 0 } : springs.snappy}
                  style={{ zIndex: 0 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  item === page
                    ? "text-white dark:text-neutral-900"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {item}
              </span>
            </motion.button>
          )
        )}

        {/* Next */}
        <motion.button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="flex items-center justify-center w-9 h-9 rounded-lg text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          whileHover={page >= totalPages || prefersReducedMotion ? {} : { scale: 1.05 }}
          whileTap={page >= totalPages || prefersReducedMotion ? {} : { scale: 0.95 }}
          transition={springs.quick}
          aria-label="Next page"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 4L10 8L6 12" />
          </svg>
        </motion.button>
      </LayoutGroup>
    </nav>
  );
});
