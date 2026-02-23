"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Playground page transition — uses Next.js template.tsx which
 * re-mounts on every navigation (unlike layout.tsx).
 * 
 * The effect: a spring-physics wipe that feels like the playground itself.
 */
export default function PlaygroundTemplate({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Overlay panels that wipe away */}
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none"
        style={{ originX: 0 }}
      >
        {/* Left panel */}
        <motion.div
          className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-indigo-600 to-indigo-500"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1,
          }}
          style={{ originX: 0, transformOrigin: "left" }}
        />
        {/* Right panel */}
        <motion.div
          className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-purple-600 to-purple-500"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1,
          }}
          style={{ originX: 1, transformOrigin: "right" }}
        />
        {/* Center flash — the ⚡ moment */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0 }}
        >
          <motion.span
            className="text-6xl"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.2, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, times: [0, 0.4, 1] }}
          >
            ⚡
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Page content — slides up with spring physics */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
          delay: 0.25,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
