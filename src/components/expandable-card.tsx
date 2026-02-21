"use client";

import React, { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ExpandableCardProps {
  /** Compact preview content */
  preview: React.ReactNode;
  /** Expanded detail content */
  detail: React.ReactNode;
  className?: string;
  /** Unique identifier for this card (optional, will generate if not provided) */
  id?: string;
}

const SPRING = { type: "spring" as const, stiffness: 400, damping: 30, mass: 0.8 };

export function ExpandableCard({ preview, detail, className = "", id }: ExpandableCardProps) {
  const [expanded, setExpanded] = useState(false);
  const uniqueId = useId();
  const cardId = id || uniqueId;

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
        layoutId={`expandable-card-${cardId}`}
        onClick={() => setExpanded(!expanded)}
        className={`cursor-pointer rounded-[8px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden ${className}`}
        style={
          expanded
            ? {
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "calc(100% - 32px)",
                maxWidth: "32rem",
                zIndex: 50,
              }
            : {}
        }
        transition={SPRING}
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
