"use client";

import React from "react";
import { COMPONENT_DEMOS } from "./demos";

export function CodeBlock({ code }: { code: string; language?: string }) {
  return (
    <div className="relative">
      <pre className="bg-neutral-900 dark:bg-neutral-950 text-neutral-100 p-4 pr-12 rounded-lg overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
      <button
        onClick={() => navigator.clipboard.writeText(code)}
        className="absolute top-2 right-2 p-2 text-neutral-400 hover:text-neutral-200 transition-colors"
        title="Copy code"
        aria-label="Copy code"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
      </button>
    </div>
  );
}

export function ComponentPreview({ componentName }: { componentName: string }) {
  // A plain lookup into a module-level map: the component identity is stable.
  const DemoComponent = COMPONENT_DEMOS[componentName];

  return (
    <div className="rounded-xl border border-neutral-200/40 dark:border-neutral-800/40 bg-neutral-100/30 dark:bg-neutral-900/30 p-4 sm:p-6">
      <div className="flex items-center justify-center min-h-[200px]">
        {DemoComponent ? (
          // min-w-0 lets a wide demo shrink to the box instead of spilling out
          // of it; the inner flex keeps narrow demos centered.
          <div className="flex w-full min-w-0 justify-center">
            <DemoComponent />
          </div>
        ) : (
          <div className="text-neutral-500 dark:text-neutral-300">
            Interactive preview coming soon
          </div>
        )}
      </div>
    </div>
  );
}
