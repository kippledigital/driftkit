"use client";

import React, { useState, useCallback, useId, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Toggle } from "@/components/toggle";

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

export interface TimeSlot {
  from: string;
  to: string;
}

export interface DaySchedule {
  enabled: boolean;
  slots: TimeSlot[];
}

export type ScheduleValue = Record<string, DaySchedule>;

export interface SchedulePickerProps {
  value?: ScheduleValue;
  defaultValue?: ScheduleValue;
  onChange?: (value: ScheduleValue) => void;
  days?: string[];
  className?: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const DEFAULT_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DEFAULT_SLOT: TimeSlot = { from: "09:00", to: "17:00" };

function buildDefaultValue(days: string[]): ScheduleValue {
  const val: ScheduleValue = {};
  for (const day of days) {
    val[day] = { enabled: false, slots: [{ ...DEFAULT_SLOT }] };
  }
  return val;
}

// =============================================================================
// TIME INPUT
// =============================================================================

function TimeInput({
  value,
  onChange,
  label,
  reduced,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  reduced: boolean;
}) {
  return (
    <motion.label
      className="flex flex-col gap-1"
      initial={reduced ? false : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={springs.quick}
    >
      <span className="text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-medium">
        {label}
      </span>
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 outline-none focus:ring-2 focus:ring-blue-500/40 transition-shadow w-[110px] tabular-nums"
        style={{ fontFamily: "Satoshi, sans-serif" }}
      />
    </motion.label>
  );
}

// =============================================================================
// SLOT ROW
// =============================================================================

function SlotRow({
  slot,
  index,
  onUpdate,
  onRemove,
  canRemove,
  reduced,
}: {
  slot: TimeSlot;
  index: number;
  onUpdate: (index: number, slot: TimeSlot) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
  reduced: boolean;
}) {
  return (
    <motion.div
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, scale: 0.9, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9, height: 0, marginTop: 0 }}
      transition={{
        layout: springs.smooth,
        opacity: { duration: 0.15 },
        scale: springs.quick,
        y: springs.quick,
        height: springs.smooth,
        // Stagger entrance based on index
        delay: index * 0.05,
      }}
      className="flex items-end gap-3"
    >
      <TimeInput
        label="From"
        value={slot.from}
        onChange={(from) => onUpdate(index, { ...slot, from })}
        reduced={reduced}
      />
      <span className="text-neutral-400 dark:text-neutral-500 pb-2 text-sm">→</span>
      <TimeInput
        label="To"
        value={slot.to}
        onChange={(to) => onUpdate(index, { ...slot, to })}
        reduced={reduced}
      />
      {canRemove && (
        <motion.button
          type="button"
          onClick={() => onRemove(index)}
          className="pb-2 text-neutral-400 hover:text-red-400 dark:text-neutral-500 dark:hover:text-red-400 transition-colors cursor-pointer"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          transition={springs.quick}
          aria-label="Remove time slot"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.button>
      )}
    </motion.div>
  );
}

// =============================================================================
// DAY ROW
// =============================================================================

function DayRow({
  day,
  schedule,
  onToggle,
  onUpdateSlot,
  onRemoveSlot,
  onAddSlot,
  reduced,
}: {
  day: string;
  schedule: DaySchedule;
  onToggle: () => void;
  onUpdateSlot: (index: number, slot: TimeSlot) => void;
  onRemoveSlot: (index: number) => void;
  onAddSlot: () => void;
  reduced: boolean;
}) {
  return (
    <motion.div
      layout={!reduced}
      className="border border-neutral-200 dark:border-neutral-700/60 rounded-lg overflow-hidden bg-white dark:bg-neutral-900/50"
      transition={springs.smooth}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {day}
        </span>
        <Toggle
          size="sm"
          checked={schedule.enabled}
          onChange={onToggle}
          aria-label={`Toggle ${day}`}
        />
      </div>

      {/* Expandable slots area */}
      <AnimatePresence initial={false}>
        {schedule.enabled && (
          <motion.div
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              reduced
                ? { duration: 0.1 }
                : {
                    height: springs.smooth,
                    opacity: { duration: 0.2, ease: "easeOut" },
                  }
            }
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 border-t border-neutral-100 dark:border-neutral-800">
              <div className="flex flex-col gap-3 mt-3">
                <AnimatePresence initial={false} mode="popLayout">
                  {schedule.slots.map((slot, i) => (
                    <SlotRow
                      key={`${i}-${slot.from}-${slot.to}`}
                      slot={slot}
                      index={i}
                      onUpdate={onUpdateSlot}
                      onRemove={onRemoveSlot}
                      canRemove={schedule.slots.length > 1}
                      reduced={reduced}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Add more button */}
              <motion.button
                type="button"
                onClick={onAddSlot}
                className="mt-3 text-xs font-medium text-blue-500 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer"
                whileHover={reduced ? undefined : { x: 2 }}
                whileTap={reduced ? undefined : { scale: 0.97 }}
                transition={springs.quick}
              >
                + Add More
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// =============================================================================
// SCHEDULE PICKER
// =============================================================================

export function SchedulePicker({
  value: controlledValue,
  defaultValue,
  onChange,
  days = DEFAULT_DAYS,
  className = "",
}: SchedulePickerProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<ScheduleValue>(
    () => defaultValue ?? buildDefaultValue(days)
  );
  const value = isControlled ? controlledValue : internalValue;

  const update = useCallback(
    (next: ScheduleValue) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  const handleToggle = useCallback(
    (day: string) => {
      const current = value[day] ?? { enabled: false, slots: [{ ...DEFAULT_SLOT }] };
      update({
        ...value,
        [day]: { ...current, enabled: !current.enabled },
      });
    },
    [value, update]
  );

  const handleUpdateSlot = useCallback(
    (day: string, index: number, slot: TimeSlot) => {
      const current = value[day];
      if (!current) return;
      const slots = [...current.slots];
      slots[index] = slot;
      update({ ...value, [day]: { ...current, slots } });
    },
    [value, update]
  );

  const handleRemoveSlot = useCallback(
    (day: string, index: number) => {
      const current = value[day];
      if (!current || current.slots.length <= 1) return;
      const slots = current.slots.filter((_, i) => i !== index);
      update({ ...value, [day]: { ...current, slots } });
    },
    [value, update]
  );

  const handleAddSlot = useCallback(
    (day: string) => {
      const current = value[day];
      if (!current) return;
      const lastSlot = current.slots[current.slots.length - 1];
      update({
        ...value,
        [day]: {
          ...current,
          slots: [...current.slots, { from: lastSlot?.to ?? "09:00", to: "17:00" }],
        },
      });
    },
    [value, update]
  );

  return (
    <motion.div
      className={`flex flex-col gap-2 ${className}`}
      style={{ fontFamily: "Satoshi, sans-serif" }}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springs.smooth}
    >
      {days.map((day) => {
        const schedule = value[day] ?? {
          enabled: false,
          slots: [{ ...DEFAULT_SLOT }],
        };
        return (
          <DayRow
            key={day}
            day={day}
            schedule={schedule}
            onToggle={() => handleToggle(day)}
            onUpdateSlot={(i, s) => handleUpdateSlot(day, i, s)}
            onRemoveSlot={(i) => handleRemoveSlot(day, i)}
            onAddSlot={() => handleAddSlot(day)}
            reduced={prefersReducedMotion}
          />
        );
      })}
    </motion.div>
  );
}

SchedulePicker.displayName = "SchedulePicker";
export default SchedulePicker;
