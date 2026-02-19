"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ExpandableCardProps {
  /** Compact preview content */
  preview: React.ReactNode;
  /** Expanded detail content */
  detail: React.ReactNode;
  className?: string;
}

const SPRING = { type: "spring" as const, stiffness: 400, damping: 30, mass: 0.8 };

export function ExpandableCard({ preview, detail, className = "" }: ExpandableCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
          />
        )}
      </AnimatePresence>
      <motion.div
        layout
        layoutId="expandable-card"
        onClick={() => setExpanded(!expanded)}
        className={`cursor-pointer rounded-[8px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden ${
          expanded ? "fixed inset-4 sm:inset-auto sm:top-[15vh] sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-lg z-50" : ""
        } ${className}`}
        transition={SPRING}
        style={expanded ? { zIndex: 50 } : undefined}
      >
        <motion.div layout="position" className="p-5">
          {preview}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                className="mt-4"
              >
                {detail}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}

export default ExpandableCard;
