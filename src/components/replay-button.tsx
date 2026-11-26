"use client";

/**
 * Replay Button
 * =============================================================================
 * The one control every demo uses to run its animation again, so "replay"
 * looks and behaves the same everywhere. The arrow turns a full revolution on
 * each press as confirmation that something restarted.
 * =============================================================================
 */

import React, { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Button, type ButtonSize } from "./button";
import { spring, useMotionPrefs } from "./motion";

export interface ReplayButtonProps {
  onReplay: () => void;
  /** Label. Default "Replay". */
  children?: ReactNode;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
}

export function ReplayButton({ onReplay, children = "Replay", size = "sm", disabled, className = "" }: ReplayButtonProps) {
  const [turns, setTurns] = useState(0);
  const { reduced } = useMotionPrefs();

  return (
    <Button
      size={size}
      variant="secondary"
      disabled={disabled}
      className={`gap-1.5 ${className}`}
      onClick={() => {
        setTurns((t) => t + 1);
        onReplay();
      }}
    >
      <motion.svg
        aria-hidden
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ rotate: turns * 360 }}
        transition={reduced ? { duration: 0 } : spring.smooth}
      >
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v5h5" />
      </motion.svg>
      {children}
    </Button>
  );
}

export default ReplayButton;
