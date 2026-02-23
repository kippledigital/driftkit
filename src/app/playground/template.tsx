"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Playground page transition — smooth single-motion entrance.
 * Uses Next.js template.tsx which re-mounts on every navigation.
 */
export default function PlaygroundTemplate({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
        mass: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
}
