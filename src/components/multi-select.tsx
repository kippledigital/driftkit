"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
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

export interface MultiSelectProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  suggestions?: string[];
  maxTags?: number;
}

// =============================================================================
// TAG PILL
// =============================================================================

function TagPill({
  tag,
  onRemove,
  reduced,
  index,
}: {
  tag: string;
  onRemove: () => void;
  reduced: boolean;
  index: number;
}) {
  return (
    <motion.span
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
      transition={{
        layout: springs.quick,
        scale: springs.snappy,
        opacity: { duration: 0.12 },
        delay: index * 0.03,
      }}
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 shrink-0"
    >
      {tag}
      <motion.button
        type="button"
        onClick={onRemove}
        className="text-neutral-400 hover:text-red-400 dark:text-neutral-500 dark:hover:text-red-400 transition-colors cursor-pointer ml-0.5"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.85 }}
        transition={springs.quick}
        aria-label={`Remove ${tag}`}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.button>
    </motion.span>
  );
}

// =============================================================================
// MULTI SELECT / TAG INPUT
// =============================================================================

export function MultiSelect({
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = "Type and press Enter...",
  className = "",
  suggestions = [],
  maxTags,
}: MultiSelectProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>(() => defaultValue ?? []);
  const tags = isControlled ? controlledValue : internalValue;

  const [inputValue, setInputValue] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const update = useCallback(
    (next: string[]) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  const addTag = useCallback(
    (tag: string) => {
      const trimmed = tag.trim();
      if (!trimmed || tags.includes(trimmed)) return;
      if (maxTags && tags.length >= maxTags) return;
      update([...tags, trimmed]);
      setInputValue("");
    },
    [tags, update, maxTags]
  );

  const removeTag = useCallback(
    (index: number) => {
      update(tags.filter((_, i) => i !== index));
    },
    [tags, update]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addTag(inputValue);
      } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
        removeTag(tags.length - 1);
      }
    },
    [inputValue, tags, addTag, removeTag]
  );

  // Filter suggestions
  const filteredSuggestions = inputValue.length > 0
    ? suggestions.filter(
        (s) => s.toLowerCase().includes(inputValue.toLowerCase()) && !tags.includes(s)
      )
    : [];

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ fontFamily: "Satoshi, sans-serif" }}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springs.smooth}
    >
      <motion.div
        className={`flex flex-wrap items-center gap-1.5 px-3 py-2 rounded-lg border bg-white dark:bg-neutral-900 min-h-[42px] cursor-text transition-colors
          ${focused ? "border-blue-500 ring-2 ring-blue-500/20" : "border-neutral-200 dark:border-neutral-700"}
        `}
        onClick={() => inputRef.current?.focus()}
        animate={{
          borderColor: focused ? "rgb(59, 130, 246)" : undefined,
        }}
        transition={springs.quick}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {tags.map((tag, i) => (
            <TagPill
              key={tag}
              tag={tag}
              index={i}
              onRemove={() => removeTag(i)}
              reduced={prefersReducedMotion}
            />
          ))}
        </AnimatePresence>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            // Add tag on blur if there's input
            if (inputValue.trim()) addTag(inputValue);
          }}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[100px] bg-transparent outline-none text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
        />
      </motion.div>

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {focused && filteredSuggestions.length > 0 && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.97 }}
            transition={springs.snappy}
            className="absolute top-full left-0 right-0 mt-1 z-50 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-lg overflow-hidden"
          >
            {filteredSuggestions.slice(0, 6).map((s) => (
              <button
                key={s}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  addTag(s);
                }}
                className="w-full text-left px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {maxTags && (
        <div className="mt-1 text-[10px] text-neutral-400 text-right">
          {tags.length}/{maxTags}
        </div>
      )}
    </motion.div>
  );
}

MultiSelect.displayName = "MultiSelect";
export default MultiSelect;
