"use client";

import React, { useState, useRef, useCallback, forwardRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// =============================================================================
// SPRING PHYSICS
// =============================================================================
// "snappy" — stiffness 500, damping 30, mass 0.5
//   Used for tag entrance/exit. Tags should pop in quickly with a tiny
//   overshoot (like a badge being pinned) and shrink out on removal.
//
// "quick" — stiffness 500, damping 40, mass 0.3
//   Used for the remove button hover and the input focus ring.
//   Near-instant feedback for micro-interactions.
// =============================================================================

const springs = {
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
  quick: { type: "spring" as const, stiffness: 500, damping: 40, mass: 0.3 },
};

// =============================================================================
// TYPES
// =============================================================================

export interface TagInputProps {
  /** Controlled tags */
  value?: string[];
  /** Default tags for uncontrolled usage */
  defaultValue?: string[];
  /** Change callback */
  onChange?: (tags: string[]) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Maximum number of tags */
  maxTags?: number;
  /** Allow duplicate tags */
  allowDuplicates?: boolean;
  /** Custom validation — return error message or null */
  validate?: (tag: string) => string | null;
  /** Disable the input */
  disabled?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes */
  className?: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const sizeMap = {
  sm: { input: "text-xs py-1", tag: "text-xs px-2 py-0.5", remove: "w-3 h-3", gap: "gap-1" },
  md: { input: "text-sm py-1.5", tag: "text-sm px-2.5 py-1", remove: "w-3.5 h-3.5", gap: "gap-1.5" },
  lg: { input: "text-base py-2", tag: "text-base px-3 py-1.5", remove: "w-4 h-4", gap: "gap-2" },
};

// Generate consistent color from tag text
function tagColor(tag: string): { bg: string; text: string; hover: string } {
  const palette = [
    { bg: "bg-blue-100 dark:bg-blue-900/40", text: "text-blue-700 dark:text-blue-300", hover: "hover:bg-blue-200 dark:hover:bg-blue-800/50" },
    { bg: "bg-green-100 dark:bg-green-900/40", text: "text-green-700 dark:text-green-300", hover: "hover:bg-green-200 dark:hover:bg-green-800/50" },
    { bg: "bg-purple-100 dark:bg-purple-900/40", text: "text-purple-700 dark:text-purple-300", hover: "hover:bg-purple-200 dark:hover:bg-purple-800/50" },
    { bg: "bg-amber-100 dark:bg-amber-900/40", text: "text-amber-700 dark:text-amber-300", hover: "hover:bg-amber-200 dark:hover:bg-amber-800/50" },
    { bg: "bg-pink-100 dark:bg-pink-900/40", text: "text-pink-700 dark:text-pink-300", hover: "hover:bg-pink-200 dark:hover:bg-pink-800/50" },
    { bg: "bg-teal-100 dark:bg-teal-900/40", text: "text-teal-700 dark:text-teal-300", hover: "hover:bg-teal-200 dark:hover:bg-teal-800/50" },
    { bg: "bg-indigo-100 dark:bg-indigo-900/40", text: "text-indigo-700 dark:text-indigo-300", hover: "hover:bg-indigo-200 dark:hover:bg-indigo-800/50" },
    { bg: "bg-rose-100 dark:bg-rose-900/40", text: "text-rose-700 dark:text-rose-300", hover: "hover:bg-rose-200 dark:hover:bg-rose-800/50" },
  ];
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
}

// =============================================================================
// TAG INPUT
// =============================================================================

export const TagInput = forwardRef<HTMLDivElement, TagInputProps>(function TagInput(
  {
    value: controlledValue,
    defaultValue = [],
    onChange,
    placeholder = "Add a tag...",
    maxTags,
    allowDuplicates = false,
    validate,
    disabled = false,
    size = "md",
    className = "",
  },
  ref
) {
  const prefersReducedMotion = useReducedMotion();
  const [internalTags, setInternalTags] = useState(defaultValue);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const s = sizeMap[size];

  const tags = controlledValue !== undefined ? controlledValue : internalTags;

  const updateTags = useCallback(
    (newTags: string[]) => {
      if (controlledValue === undefined) setInternalTags(newTags);
      onChange?.(newTags);
    },
    [controlledValue, onChange]
  );

  const addTag = useCallback(
    (rawTag: string) => {
      const tag = rawTag.trim();
      if (!tag) return;

      // Validation
      if (validate) {
        const err = validate(tag);
        if (err) {
          setError(err);
          setTimeout(() => setError(null), 2000);
          return;
        }
      }

      if (!allowDuplicates && tags.includes(tag)) {
        setError("Duplicate tag");
        setTimeout(() => setError(null), 2000);
        return;
      }

      if (maxTags && tags.length >= maxTags) {
        setError(`Maximum ${maxTags} tags`);
        setTimeout(() => setError(null), 2000);
        return;
      }

      updateTags([...tags, tag]);
      setInputValue("");
      setError(null);
    },
    [tags, allowDuplicates, maxTags, validate, updateTags]
  );

  const removeTag = useCallback(
    (index: number) => {
      updateTags(tags.filter((_, i) => i !== index));
    },
    [tags, updateTags]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text");
    if (text.includes(",")) {
      e.preventDefault();
      const newTags = text.split(",").map((t) => t.trim()).filter(Boolean);
      let current = [...tags];
      for (const tag of newTags) {
        if (maxTags && current.length >= maxTags) break;
        if (allowDuplicates || !current.includes(tag)) {
          current.push(tag);
        }
      }
      updateTags(current);
      setInputValue("");
    }
  };

  return (
    <div ref={ref} className={className}>
      <motion.div
        className={`flex flex-wrap items-center ${s.gap} px-3 py-2 rounded-lg border-2 transition-colors min-h-[42px]
          ${disabled ? "opacity-50 cursor-not-allowed bg-neutral-50 dark:bg-neutral-900" : "bg-white dark:bg-neutral-900 cursor-text"}
          ${error
            ? "border-red-500"
            : isFocused
            ? "border-neutral-900 dark:border-white"
            : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600"
          }`}
        onClick={() => !disabled && inputRef.current?.focus()}
        animate={error && !prefersReducedMotion ? { x: [0, -4, 4, -2, 2, 0] } : {}}
        transition={{ duration: 0.3 }}
      >
        {/* Tags */}
        <AnimatePresence mode="popLayout">
          {tags.map((tag, i) => {
            const colors = tagColor(tag);
            return (
              <motion.span
                key={`${tag}-${i}`}
                className={`inline-flex items-center gap-1 rounded-md font-medium ${s.tag} ${colors.bg} ${colors.text}`}
                initial={prefersReducedMotion ? false : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { scale: 0, opacity: 0, width: 0, padding: 0, margin: 0 }}
                transition={springs.snappy}
                layout
              >
                {tag}
                {!disabled && (
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTag(i);
                    }}
                    className={`rounded-sm transition-colors ${colors.hover}`}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.2 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.8 }}
                    transition={springs.quick}
                    aria-label={`Remove ${tag}`}
                  >
                    <svg className={s.remove} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M4 4l6 6M10 4l-6 6" />
                    </svg>
                  </motion.button>
                )}
              </motion.span>
            );
          })}
        </AnimatePresence>

        {/* Input */}
        {!disabled && (!maxTags || tags.length < maxTags) && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              if (inputValue.trim()) addTag(inputValue);
            }}
            placeholder={tags.length === 0 ? placeholder : ""}
            className={`flex-1 min-w-[80px] bg-transparent outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 ${s.input}`}
          />
        )}
      </motion.div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            className="text-red-500 text-xs mt-1 ml-1"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={springs.quick}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});
