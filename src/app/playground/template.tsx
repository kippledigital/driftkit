"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Playground page transition — single color curtain that
 * slides up to reveal the page, then content fades in.
 */
export default function PlaygroundTemplate({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Color curtain — slides up to reveal */}
      <motion.div
        className="fixed inset-0 z-50 bg-gradient-to-br from-indigo-600 to-purple-600 pointer-events-none"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 28,
          mass: 0.8,
          delay: 0.05,
        }}
      />

      {/* Content fades in after curtain starts moving */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.4,
          delay: 0.2,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
