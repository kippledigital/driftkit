"use client";

import React, { useState, useMemo, useCallback, forwardRef } from "react";
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from "framer-motion";

// =============================================================================
// SPRING PHYSICS
// =============================================================================
// "smooth" — stiffness 300, damping 30, mass 1
//   Used for row reorder animations. When sorting changes, rows should
//   slide to their new positions smoothly — like cards being reshuffled.
//
// "snappy" — stiffness 500, damping 30, mass 0.5
//   Used for the sort indicator rotation and row entrance/exit.
//
// "quick" — stiffness 500, damping 40, mass 0.3
//   Used for hover highlight on rows.
// =============================================================================

const springs = {
  smooth: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
  quick: { type: "spring" as const, stiffness: 500, damping: 40, mass: 0.3 },
};

// =============================================================================
// TYPES
// =============================================================================

export interface Column<T> {
  /** Unique key for the column */
  key: string;
  /** Header label */
  header: string;
  /** Cell renderer */
  cell: (row: T) => React.ReactNode;
  /** Enable sorting for this column */
  sortable?: boolean;
  /** Custom sort function */
  sortFn?: (a: T, b: T) => number;
  /** Column width (CSS value) */
  width?: string;
  /** Align cell content */
  align?: "left" | "center" | "right";
}

export interface DataTableProps<T> {
  /** Column definitions */
  columns: Column<T>[];
  /** Row data */
  data: T[];
  /** Unique key extractor for each row */
  rowKey: (row: T) => string;
  /** Row click handler */
  onRowClick?: (row: T) => void;
  /** Currently selected row keys */
  selectedKeys?: Set<string>;
  /** Enable row hover highlight */
  hoverable?: boolean;
  /** Striped rows */
  striped?: boolean;
  /** Compact mode */
  compact?: boolean;
  /** Empty state content */
  emptyContent?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

// =============================================================================
// SORT STATE
// =============================================================================

type SortDirection = "asc" | "desc" | null;
interface SortState {
  key: string | null;
  direction: SortDirection;
}

// =============================================================================
// DATA TABLE
// =============================================================================

function DataTableInner<T>(
  {
    columns,
    data,
    rowKey,
    onRowClick,
    selectedKeys,
    hoverable = true,
    striped = false,
    compact = false,
    emptyContent,
    className = "",
  }: DataTableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const prefersReducedMotion = useReducedMotion();
  const [sort, setSort] = useState<SortState>({ key: null, direction: null });

  const handleSort = useCallback((columnKey: string) => {
    setSort((prev) => {
      if (prev.key !== columnKey) return { key: columnKey, direction: "asc" };
      if (prev.direction === "asc") return { key: columnKey, direction: "desc" };
      return { key: null, direction: null };
    });
  }, []);

  const sortedData = useMemo(() => {
    if (!sort.key || !sort.direction) return data;

    const column = columns.find((c) => c.key === sort.key);
    if (!column?.sortable) return data;

    const sorted = [...data].sort((a, b) => {
      if (column.sortFn) return column.sortFn(a, b);

      const aVal = column.cell(a);
      const bVal = column.cell(b);
      const aStr = typeof aVal === "string" ? aVal : String(aVal);
      const bStr = typeof bVal === "string" ? bVal : String(bVal);

      return aStr.localeCompare(bStr, undefined, { numeric: true });
    });

    return sort.direction === "desc" ? sorted.reverse() : sorted;
  }, [data, sort, columns]);

  const cellPadding = compact ? "px-3 py-2" : "px-4 py-3";

  return (
    <div ref={ref} className={`w-full overflow-auto rounded-xl border border-neutral-200 dark:border-neutral-800 ${className}`}>
      <LayoutGroup id="data-table">
        <table className="w-full border-collapse">
          {/* Header */}
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`${cellPadding} text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 text-left ${
                    col.sortable ? "cursor-pointer select-none hover:text-neutral-900 dark:hover:text-white transition-colors" : ""
                  }`}
                  style={{ width: col.width }}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className={`flex items-center gap-1.5 ${col.align === "center" ? "justify-center" : col.align === "right" ? "justify-end" : ""}`}>
                    {col.header}
                    {col.sortable && (
                      <motion.div
                        animate={{
                          rotate: sort.key === col.key && sort.direction === "desc" ? 180 : 0,
                          opacity: sort.key === col.key ? 1 : 0.3,
                        }}
                        transition={springs.snappy}
                        className="shrink-0"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M3 5L6 2L9 5" />
                          <path d="M6 2V10" />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            <AnimatePresence mode="popLayout">
              {sortedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-12 text-center text-sm text-neutral-500 dark:text-neutral-400">
                    {emptyContent || "No data"}
                  </td>
                </tr>
              ) : (
                sortedData.map((row, i) => {
                  const key = rowKey(row);
                  const isSelected = selectedKeys?.has(key);

                  return (
                    <motion.tr
                      key={key}
                      layout={!prefersReducedMotion}
                      initial={prefersReducedMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={springs.smooth}
                      onClick={() => onRowClick?.(row)}
                      className={`border-b border-neutral-100 dark:border-neutral-800/50 transition-colors
                        ${onRowClick ? "cursor-pointer" : ""}
                        ${isSelected ? "bg-indigo-50 dark:bg-indigo-950/20" : ""}
                        ${hoverable && !isSelected ? "hover:bg-neutral-50 dark:hover:bg-neutral-900/30" : ""}
                        ${striped && i % 2 === 1 && !isSelected ? "bg-neutral-25 dark:bg-neutral-900/20" : ""}
                      `}
                    >
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className={`${cellPadding} text-sm text-neutral-700 dark:text-neutral-300 ${
                            col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : ""
                          }`}
                        >
                          {col.cell(row)}
                        </td>
                      ))}
                    </motion.tr>
                  );
                })
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </LayoutGroup>
    </div>
  );
}

// Wrapper to support forwardRef with generics
export const DataTable = forwardRef(DataTableInner) as <T>(
  props: DataTableProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;
