"use client";

import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// =============================================================================
// SPRING PHYSICS
// =============================================================================
const springs = {
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
  smooth: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
  quick: { type: "spring" as const, stiffness: 500, damping: 40, mass: 0.3 },
};

// =============================================================================
// TYPES
// =============================================================================

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DateRangePickerProps {
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (range: DateRange) => void;
  className?: string;
  placeholder?: { start?: string; end?: string };
}

// =============================================================================
// HELPERS
// =============================================================================

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function formatDate(d: Date | null): string {
  if (!d) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const t = date.getTime();
  return t > start.getTime() && t < end.getTime();
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// =============================================================================
// CALENDAR
// =============================================================================

function Calendar({
  year,
  month,
  onMonthChange,
  range,
  selecting,
  onDayClick,
  onDayHover,
  hoverDate,
  reduced,
}: {
  year: number;
  month: number;
  onMonthChange: (delta: number) => void;
  range: DateRange;
  selecting: "start" | "end" | null;
  onDayClick: (d: Date) => void;
  onDayHover: (d: Date | null) => void;
  hoverDate: Date | null;
  reduced: boolean;
}) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);

  const effectiveEnd = selecting === "end" && hoverDate ? hoverDate : range.end;
  const effectiveStart = range.start;

  return (
    <div className="p-3" style={{ fontFamily: "Satoshi, sans-serif" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <motion.button
          type="button"
          onClick={() => onMonthChange(-1)}
          className="w-7 h-7 flex items-center justify-center rounded-md text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          whileTap={reduced ? undefined : { scale: 0.85 }}
          transition={springs.quick}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </motion.button>
        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {MONTH_NAMES[month]} {year}
        </span>
        <motion.button
          type="button"
          onClick={() => onMonthChange(1)}
          className="w-7 h-7 flex items-center justify-center rounded-md text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          whileTap={reduced ? undefined : { scale: 0.85 }}
          transition={springs.quick}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </motion.button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-0 mb-1">
        {DAY_LABELS.map((d) => (
          <span key={d} className="text-[10px] text-center text-neutral-400 dark:text-neutral-500 font-medium py-1">{d}</span>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-0">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="h-8" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = new Date(year, month, day);
          const isStart = isSameDay(date, effectiveStart);
          const isEnd = isSameDay(date, effectiveEnd);
          const inRange = isInRange(date, effectiveStart, effectiveEnd);
          const isSelected = isStart || isEnd;

          return (
            <motion.button
              key={day}
              type="button"
              onClick={() => onDayClick(date)}
              onMouseEnter={() => onDayHover(date)}
              onMouseLeave={() => onDayHover(null)}
              className={`h-8 w-full text-xs font-medium rounded-md relative cursor-pointer transition-colors
                ${isSelected ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 z-10" : ""}
                ${inRange ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100" : ""}
                ${!isSelected && !inRange ? "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800" : ""}
              `}
              whileTap={reduced ? undefined : { scale: 0.85 }}
              transition={springs.quick}
            >
              {day}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// =============================================================================
// DATE RANGE PICKER
// =============================================================================

export function DateRangePicker({
  value: controlledValue,
  defaultValue,
  onChange,
  className = "",
  placeholder,
}: DateRangePickerProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<DateRange>(
    () => defaultValue ?? { start: null, end: null }
  );
  const range = isControlled ? controlledValue : internalValue;

  const [open, setOpen] = useState(false);
  const [selecting, setSelecting] = useState<"start" | "end" | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [dropdownPos, setDropdownPos] = useState<{x: number; y: number; width: number}>({ x: 0, y: 0, width: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(range.start?.getFullYear() ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(range.start?.getMonth() ?? today.getMonth());

  const update = useCallback(
    (next: DateRange) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  const handleMonthChange = useCallback((delta: number) => {
    setViewMonth((m) => {
      let nm = m + delta;
      if (nm < 0) { setViewYear((y) => y - 1); return 11; }
      if (nm > 11) { setViewYear((y) => y + 1); return 0; }
      return nm;
    });
  }, []);

  const handleDayClick = useCallback(
    (date: Date) => {
      if (!selecting || selecting === "start") {
        update({ start: date, end: null });
        setSelecting("end");
      } else {
        const start = range.start!;
        if (date.getTime() < start.getTime()) {
          update({ start: date, end: start });
        } else {
          update({ start, end: date });
        }
        setSelecting(null);
        setOpen(false);
      }
    },
    [selecting, range, update]
  );

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSelecting(null);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleOpen = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPos({
        x: rect.left + window.scrollX,
        y: rect.bottom + window.scrollY + 8,
        width: rect.width,
      });
    }
    setOpen(true);
    setSelecting("start");
    if (range.start) {
      setViewYear(range.start.getFullYear());
      setViewMonth(range.start.getMonth());
    }
  }, [range]);

  return (
    <div ref={ref} className={`relative inline-block ${className}`} style={{ fontFamily: "Satoshi, sans-serif" }}>
      {/* Trigger */}
      <motion.button
        ref={triggerRef}
        type="button"
        onClick={handleOpen}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors min-w-[280px]"
        whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
        transition={springs.quick}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-neutral-400 shrink-0">
          <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.2" />
          <path d="M2 7h12M5 1v4M11 1v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span className={range.start ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-400"}>
          {range.start ? formatDate(range.start) : (placeholder?.start ?? "Start date")}
        </span>
        <span className="text-neutral-300 dark:text-neutral-600">→</span>
        <span className={range.end ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-400"}>
          {range.end ? formatDate(range.end) : (placeholder?.end ?? "End date")}
        </span>
      </motion.button>

      {/* Range indicator bar */}
      {range.start && range.end && (
        <motion.div
          className="absolute -bottom-1 left-3 right-3 h-0.5 bg-neutral-900 dark:bg-white rounded-full"
          initial={prefersReducedMotion ? false : { scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={springs.snappy}
        />
      )}

      {/* Calendar dropdown */}
      <AnimatePresence>
        {open && typeof window !== "undefined" && createPortal(
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.96 }}
            transition={springs.snappy}
            className="fixed z-[9999] rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-xl"
            style={{
              left: dropdownPos.x,
              top: dropdownPos.y,
              minWidth: Math.max(dropdownPos.width, 280),
            }}
          >
            <Calendar
              year={viewYear}
              month={viewMonth}
              onMonthChange={handleMonthChange}
              range={range}
              selecting={selecting}
              onDayClick={handleDayClick}
              onDayHover={setHoverDate}
              hoverDate={hoverDate}
              reduced={prefersReducedMotion}
            />
            {selecting && (
              <div className="px-3 pb-2 text-[10px] text-neutral-400 text-center">
                {selecting === "start" ? "Select start date" : "Select end date"}
              </div>
            )}
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </div>
  );
}

DateRangePicker.displayName = "DateRangePicker";
export default DateRangePicker;
