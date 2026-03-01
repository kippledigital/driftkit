"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";

// --- RECIPE: Stripe-Style Card Hover ---
// The signature Stripe pricing card effect:
// 1. Card lifts on hover (translateY + shadow)
// 2. Subtle 3D tilt follows cursor position
// 3. Soft radial glow tracks cursor
// 4. Spring physics make it feel physical

function StripeCard({
  title,
  price,
  features,
  highlighted = false,
}: {
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Convert cursor position to rotation (max ±5deg)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  // Glow position
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 25 } }}
      className={`relative p-8 rounded-2xl border cursor-default select-none ${
        highlighted
          ? "bg-neutral-900 dark:bg-white border-neutral-800 dark:border-neutral-200"
          : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
      }`}
    >
      {/* Cursor glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.06) 0%, transparent 60%)`
          ),
        }}
      />

      <div className="relative z-10">
        <h3
          className={`text-sm font-semibold uppercase tracking-wider mb-2 ${
            highlighted
              ? "text-neutral-400 dark:text-neutral-500"
              : "text-neutral-500 dark:text-neutral-400"
          }`}
        >
          {title}
        </h3>
        <div
          className={`text-4xl font-bold mb-6 ${
            highlighted ? "text-white dark:text-neutral-900" : "text-neutral-900 dark:text-white"
          }`}
        >
          {price}
          <span className="text-lg font-normal opacity-60">/mo</span>
        </div>
        <ul className="space-y-3 mb-8">
          {features.map((f) => (
            <li
              key={f}
              className={`text-sm flex items-center gap-2 ${
                highlighted
                  ? "text-neutral-300 dark:text-neutral-600"
                  : "text-neutral-600 dark:text-neutral-400"
              }`}
            >
              <span className="text-green-500">✓</span> {f}
            </li>
          ))}
        </ul>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`w-full py-3 rounded-lg text-sm font-semibold transition-colors ${
            highlighted
              ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
              : "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100"
          }`}
        >
          Get started
        </motion.button>
      </div>
    </motion.div>
  );
}

// --- CODE STRING FOR DISPLAY ---
const codeString = `import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

function StripeCard({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Cursor position → rotation (max ±5°)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), {
    stiffness: 300, damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300, damping: 30,
  });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 25 } }}
    >
      {children}
    </motion.div>
  );
}`;

const springExplanation = `// Why these spring values?
const tiltSpring = { stiffness: 300, damping: 30 };
// stiffness: 300 → responsive but not twitchy
// damping: 30 → smooth settle, no oscillation
// No mass specified → defaults to 1 (natural feel)

const liftSpring = { stiffness: 400, damping: 25 };
// stiffness: 400 → snappier for the lift (feels decisive)
// damping: 25 → slight overshoot on hover-in (playful)`;

export default function StripeCardHoverRecipe() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="py-12 px-8 max-w-5xl">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-sm text-neutral-500">
        <Link href="/docs/recipes" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
          Recipes
        </Link>
        <span>/</span>
        <span className="text-neutral-900 dark:text-white">Stripe Card Hover</span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-3">
        Stripe-Style Card Hover
      </h1>
      <p className="text-base text-neutral-600 dark:text-neutral-400 mb-2">
        The signature Stripe pricing card hover — lift, 3D tilt, and cursor glow that makes flat cards feel physical.
      </p>
      <div className="flex gap-2 mb-10">
        <span className="text-xs px-2 py-0.5 rounded-full border text-green-500 bg-green-500/10 border-green-500/20">
          Beginner
        </span>
        <span className="text-xs px-2 py-0.5 rounded-md bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400">
          Card
        </span>
        <span className="text-xs px-2 py-0.5 rounded-md bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400">
          Glow Card
        </span>
      </div>

      {/* Live Demo */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Live Demo
        </h2>
        <div className="p-8 bg-neutral-100 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto" style={{ perspective: 800 }}>
            <StripeCard
              title="Starter"
              price="$12"
              features={["5 projects", "10GB storage", "Email support"]}
            />
            <StripeCard
              title="Pro"
              price="$29"
              features={["Unlimited projects", "100GB storage", "Priority support", "API access"]}
              highlighted
            />
            <StripeCard
              title="Enterprise"
              price="$79"
              features={["Everything in Pro", "1TB storage", "Dedicated account", "SLA"]}
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          How It Works
        </h2>
        <div className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex gap-3">
            <span className="text-neutral-400 font-mono">1.</span>
            <p><strong className="text-neutral-900 dark:text-white">Track cursor position</strong> — useMotionValue captures mouse X/Y relative to card center (-0.5 to 0.5)</p>
          </div>
          <div className="flex gap-3">
            <span className="text-neutral-400 font-mono">2.</span>
            <p><strong className="text-neutral-900 dark:text-white">Transform to rotation</strong> — useTransform maps position to ±5° rotation on both axes</p>
          </div>
          <div className="flex gap-3">
            <span className="text-neutral-400 font-mono">3.</span>
            <p><strong className="text-neutral-900 dark:text-white">Add spring smoothing</strong> — useSpring wraps the transform so tilt eases naturally (no jitter)</p>
          </div>
          <div className="flex gap-3">
            <span className="text-neutral-400 font-mono">4.</span>
            <p><strong className="text-neutral-900 dark:text-white">Lift on hover</strong> — whileHover with spring transition creates the satisfying "pick up" feel</p>
          </div>
        </div>
      </section>

      {/* Code */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Code
          </h2>
          <button
            onClick={handleCopy}
            className="text-xs px-3 py-1.5 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="p-6 bg-neutral-950 text-neutral-300 rounded-xl text-sm overflow-x-auto leading-relaxed">
          <code>{codeString}</code>
        </pre>
      </section>

      {/* Spring tuning */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Spring Tuning
        </h2>
        <pre className="p-6 bg-neutral-950 text-neutral-400 rounded-xl text-sm overflow-x-auto leading-relaxed">
          <code>{springExplanation}</code>
        </pre>
        <p className="text-sm text-neutral-500 mt-4">
          Try it: increase stiffness to 600 for a snappier feel, or drop damping to 15 for more wobble.
          Use the <Link href="/playground" className="text-neutral-900 dark:text-white underline">Spring Playground</Link> to visualize.
        </p>
      </section>

      {/* Next recipe */}
      <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex justify-between">
        <Link
          href="/docs/recipes"
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          ← All Recipes
        </Link>
        <Link
          href="/docs/recipes/form-micro-interactions"
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          Next: Form Micro-Interactions →
        </Link>
      </div>
    </div>
  );
}
