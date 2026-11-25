"use client";

import { MotionConfig } from "framer-motion";
import { ToastProvider } from "@/components/toast";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  // reducedMotion="user": a safety net so any motion component on the site
  // drops transform and layout animation when the visitor asks for less motion.
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>{children}</ToastProvider>
    </MotionConfig>
  );
}
