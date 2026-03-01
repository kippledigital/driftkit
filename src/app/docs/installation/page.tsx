"use client";

import React, { useState } from "react";
import Link from "next/link";

function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  
  return (
    <div className="relative group">
      <pre className="p-4 bg-neutral-950 text-neutral-300 rounded-lg text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
      <button
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-neutral-800 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neutral-700"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

export default function InstallationPage() {
  return (
    <div className="py-12 px-8 max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
        Installation
      </h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
        DriftKit uses a copy-paste model. No package to install — grab the components you need and they&apos;re yours.
      </p>

      <div className="space-y-10 text-neutral-600 dark:text-neutral-400">
        {/* Prerequisites */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
            Prerequisites
          </h2>
          <p className="mb-4">DriftKit components require three peer dependencies:</p>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/40 dark:border-neutral-800/40">
              <span className="text-sm font-mono font-medium text-neutral-900 dark:text-white w-40">React 18+</span>
              <span className="text-sm">You probably already have this</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/40 dark:border-neutral-800/40">
              <span className="text-sm font-mono font-medium text-neutral-900 dark:text-white w-40">Framer Motion 10+</span>
              <span className="text-sm">The animation engine that powers everything</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/40 dark:border-neutral-800/40">
              <span className="text-sm font-mono font-medium text-neutral-900 dark:text-white w-40">Tailwind CSS 3+</span>
              <span className="text-sm">For styling (v4 supported)</span>
            </div>
          </div>
        </section>

        {/* Install deps */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
            1. Install Framer Motion
          </h2>
          <p className="mb-3">If you don&apos;t already have Framer Motion:</p>
          <CodeBlock code="npm install framer-motion" />
          <p className="text-sm mt-2">
            Or with your preferred package manager:
          </p>
          <div className="mt-2 space-y-2">
            <CodeBlock code="yarn add framer-motion" />
            <CodeBlock code="pnpm add framer-motion" />
          </div>
        </section>

        {/* Copy components */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
            2. Copy Components
          </h2>
          <p className="mb-4">
            Browse the <Link href="/docs" className="underline hover:text-neutral-900 dark:hover:text-white">component catalog</Link>, find what you need, and copy the source file into your project.
          </p>
          
          <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/40 dark:border-neutral-800/40">
            <p className="text-sm font-medium text-neutral-900 dark:text-white mb-2">
              Recommended structure:
            </p>
            <CodeBlock code={`your-project/
├── src/
│   ├── components/
│   │   ├── ui/           ← DriftKit components go here
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ...
│   │   └── ...           ← Your custom components
│   └── ...`} language="text" />
          </div>
        </section>

        {/* Usage */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
            3. Use
          </h2>
          <p className="mb-3">Import and use like any other component:</p>
          <CodeBlock code={`import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle } from "@/components/ui/dialog";

export function MyPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Dialog
      </Button>
      
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Spring-powered modal</DialogTitle>
        <p>This dialog entered with spring physics.</p>
      </Dialog>
    </>
  );
}`} language="tsx" />
        </section>

        {/* Path aliases */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
            Path Aliases
          </h2>
          <p className="mb-3">
            DriftKit components use <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">@/components</code> imports internally. Make sure your <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">tsconfig.json</code> has path aliases configured:
          </p>
          <CodeBlock code={`{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`} language="json" />
          <p className="text-sm mt-2">
            Next.js, Vite, and most modern setups already have this. Adjust import paths if your setup differs.
          </p>
        </section>

        {/* Spring config */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
            Default Spring Configurations
          </h2>
          <p className="mb-3">
            Most DriftKit components use these shared spring presets. You can customize them in each component file:
          </p>
          <CodeBlock code={`// These appear at the top of most component files
const springs = {
  snappy: { type: "spring", stiffness: 500, damping: 30, mass: 0.5 },
  smooth: { type: "spring", stiffness: 300, damping: 30, mass: 1   },
  quick:  { type: "spring", stiffness: 500, damping: 40, mass: 0.3 },
};`} language="tsx" />
          <p className="text-sm mt-2">
            Want to understand what these numbers mean? Read <Link href="/docs/spring-physics" className="underline hover:text-neutral-900 dark:hover:text-white">Spring Physics 101 →</Link>
          </p>
        </section>

        {/* That's it */}
        <section className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/40 dark:border-neutral-800/40">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            That&apos;s it.
          </h2>
          <p>
            No build plugins. No config files. No provider wrappers. Copy the component, import it, use it. The motion is built into each file — self-contained and customizable.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex justify-between">
        <Link
          href="/docs/introduction"
          className="text-sm text-neutral-500 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          ← Introduction
        </Link>
        <Link
          href="/docs/spring-physics"
          className="text-sm font-medium text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
        >
          Spring Physics 101 →
        </Link>
      </div>
    </div>
  );
}
