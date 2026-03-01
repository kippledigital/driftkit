"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useSpring, useTransform } from "framer-motion";

// Interactive spring demo
function SpringDemo() {
  const [config, setConfig] = useState({ stiffness: 300, damping: 30, mass: 1 });
  const [key, setKey] = useState(0);

  return (
    <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/40 dark:border-neutral-800/40">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
          Interactive Spring
        </h3>
        <button
          onClick={() => setKey(k => k + 1)}
          className="text-xs px-3 py-1.5 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors"
        >
          Replay
        </button>
      </div>

      {/* Animation preview */}
      <div className="h-16 mb-6 relative overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
        <motion.div
          key={key}
          className="w-12 h-12 rounded-xl bg-neutral-900 dark:bg-indigo-400 absolute top-2 left-2"
          initial={{ left: "8px", scale: 0.8, opacity: 0 }}
          animate={{ left: "calc(100% - 56px)", scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: config.stiffness,
            damping: config.damping,
            mass: config.mass,
          }}
        />
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <label className="text-neutral-600 dark:text-neutral-400">
              Stiffness
            </label>
            <span className="font-mono text-neutral-900 dark:text-white">{config.stiffness}</span>
          </div>
          <input
            type="range"
            min="50"
            max="1000"
            value={config.stiffness}
            onChange={(e) => {
              setConfig(c => ({ ...c, stiffness: Number(e.target.value) }));
              setKey(k => k + 1);
            }}
            className="w-full accent-neutral-900 dark:accent-white"
          />
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Higher = snappier, more force pulling toward target
          </p>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <label className="text-neutral-600 dark:text-neutral-400">
              Damping
            </label>
            <span className="font-mono text-neutral-900 dark:text-white">{config.damping}</span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={config.damping}
            onChange={(e) => {
              setConfig(c => ({ ...c, damping: Number(e.target.value) }));
              setKey(k => k + 1);
            }}
            className="w-full accent-neutral-900 dark:accent-white"
          />
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Higher = less oscillation, settles faster. Lower = more bounce.
          </p>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <label className="text-neutral-600 dark:text-neutral-400">
              Mass
            </label>
            <span className="font-mono text-neutral-900 dark:text-white">{config.mass}</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={config.mass}
            onChange={(e) => {
              setConfig(c => ({ ...c, mass: Number(e.target.value) }));
              setKey(k => k + 1);
            }}
            className="w-full accent-neutral-900 dark:accent-white"
          />
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Higher = heavier, more momentum, slower to start/stop
          </p>
        </div>
      </div>

      {/* Config output */}
      <pre className="mt-4 p-3 bg-neutral-950 text-neutral-400 rounded-lg text-xs overflow-x-auto">
        <code>{`{ type: "spring", stiffness: ${config.stiffness}, damping: ${config.damping}, mass: ${config.mass} }`}</code>
      </pre>
    </div>
  );
}

// Comparison demo: spring vs bezier
function ComparisonDemo() {
  const [key, setKey] = useState(0);

  return (
    <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/40 dark:border-neutral-800/40">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
          Spring vs Bezier Curve
        </h3>
        <button
          onClick={() => setKey(k => k + 1)}
          className="text-xs px-3 py-1.5 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors"
        >
          Replay
        </button>
      </div>

      <div className="space-y-4">
        {/* Spring */}
        <div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-indigo-400" />
            Spring — interruptible, no fixed duration
          </div>
          <div className="h-10 relative overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <motion.div
              key={`spring-${key}`}
              className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-indigo-400 absolute top-1 left-1"
              initial={{ left: "4px" }}
              animate={{ left: "calc(100% - 36px)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20, mass: 1 }}
            />
          </div>
        </div>

        {/* Bezier */}
        <div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-500" />
            CSS ease-in-out — fixed 500ms, can&apos;t interrupt
          </div>
          <div className="h-10 relative overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <motion.div
              key={`bezier-${key}`}
              className="w-8 h-8 rounded-lg bg-neutral-400 dark:bg-neutral-500 absolute top-1 left-1"
              initial={{ left: "4px" }}
              animate={{ left: "calc(100% - 36px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-4">
        Notice how the spring overshoots and settles naturally, while the bezier curve just... stops. The spring <em>feels</em> like a real object.
      </p>
    </div>
  );
}

// Preset examples
function PresetExamples() {
  const [key, setKey] = useState(0);
  const presets = [
    { name: "Snappy", config: { stiffness: 500, damping: 30, mass: 0.5 }, desc: "Quick, decisive. Buttons, toggles." },
    { name: "Smooth", config: { stiffness: 300, damping: 30, mass: 1 }, desc: "Natural, balanced. Modals, cards." },
    { name: "Quick", config: { stiffness: 500, damping: 40, mass: 0.3 }, desc: "Fast, no overshoot. Tooltips, hovers." },
    { name: "Bouncy", config: { stiffness: 400, damping: 15, mass: 0.8 }, desc: "Playful, energetic. Notifications, badges." },
    { name: "Heavy", config: { stiffness: 200, damping: 25, mass: 2 }, desc: "Weighty, deliberate. Drawers, panels." },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
          Preset Library
        </h3>
        <button
          onClick={() => setKey(k => k + 1)}
          className="text-xs px-3 py-1.5 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
        >
          Replay All
        </button>
      </div>
      {presets.map((preset) => (
        <div
          key={preset.name}
          className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/40 dark:border-neutral-800/40"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-sm font-medium text-neutral-900 dark:text-white">{preset.name}</span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-2">{preset.desc}</span>
            </div>
            <code className="text-xs text-neutral-400">
              {preset.config.stiffness}/{preset.config.damping}/{preset.config.mass}
            </code>
          </div>
          <div className="h-8 relative overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <motion.div
              key={`${preset.name}-${key}`}
              className="w-8 h-6 rounded bg-neutral-900 dark:bg-indigo-400 absolute top-1 left-1"
              initial={{ left: "4px" }}
              animate={{ left: "calc(100% - 36px)" }}
              transition={{ type: "spring", ...preset.config }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SpringPhysicsPage() {
  return (
    <div className="py-12 px-8 max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
        Spring Physics 101
      </h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
        Every DriftKit component uses spring physics instead of CSS timing functions. Here&apos;s what that means, why it matters, and how to tune it.
      </p>

      <div className="space-y-12 text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {/* The Problem */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
            The Problem with CSS Animations
          </h2>
          <p className="mb-4">
            CSS animations use <strong className="text-neutral-900 dark:text-white">bezier curves</strong> — mathematical functions that map time to progress. You specify a duration (say 300ms), an easing function (like <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">ease-in-out</code>), and the animation follows that exact path.
          </p>
          <p className="mb-4">
            This works fine for simple transitions. But it breaks down when interactions get complex:
          </p>
          <ul className="space-y-2 text-sm">
            <li>→ <strong className="text-neutral-900 dark:text-white">Can&apos;t interrupt.</strong> Hover mid-press? The animations queue up and fight.</li>
            <li>→ <strong className="text-neutral-900 dark:text-white">Fixed duration.</strong> A tiny movement takes the same 300ms as a large one.</li>
            <li>→ <strong className="text-neutral-900 dark:text-white">No momentum.</strong> Fast flicks feel the same as slow drags.</li>
            <li>→ <strong className="text-neutral-900 dark:text-white">Feels robotic.</strong> The motion is mathematically perfect, which paradoxically makes it feel unnatural.</li>
          </ul>
        </section>

        {/* Spring vs Bezier */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
            Spring vs Bezier: See the Difference
          </h2>
          <ComparisonDemo />
        </section>

        {/* How springs work */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
            How Springs Work
          </h2>
          <p className="mb-4">
            A spring animation simulates a physical spring. Instead of &quot;go from A to B in 300ms,&quot; it says &quot;pull toward B with this much force, resisting with this much friction.&quot;
          </p>
          <p className="mb-4">Three parameters control everything:</p>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/40 dark:border-neutral-800/40">
              <div className="flex items-center gap-2 mb-1">
                <code className="text-sm font-mono font-bold text-neutral-900 dark:text-white">stiffness</code>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">default: 100</span>
              </div>
              <p className="text-sm">How strong the spring pulls toward the target. Higher = snappier response. Think of it as the &quot;urgency&quot; of the animation.</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Low (50-150): Lazy, floaty. High (400-1000): Snappy, immediate.</p>
            </div>

            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/40 dark:border-neutral-800/40">
              <div className="flex items-center gap-2 mb-1">
                <code className="text-sm font-mono font-bold text-neutral-900 dark:text-white">damping</code>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">default: 10</span>
              </div>
              <p className="text-sm">How quickly oscillation dies out. This is the &quot;friction.&quot; Low damping = more bounce. High damping = smooth settle.</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Low (5-15): Bouncy, playful. High (25-50): Smooth, controlled.</p>
            </div>

            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/40 dark:border-neutral-800/40">
              <div className="flex items-center gap-2 mb-1">
                <code className="text-sm font-mono font-bold text-neutral-900 dark:text-white">mass</code>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">default: 1</span>
              </div>
              <p className="text-sm">How &quot;heavy&quot; the animated element feels. Higher mass = more momentum, slower to start and stop.</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Light (0.1-0.5): Quick, responsive. Heavy (2-5): Weighty, deliberate.</p>
            </div>
          </div>
        </section>

        {/* Interactive demo */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
            Try It Yourself
          </h2>
          <p className="mb-4">
            Adjust the sliders and hit Replay to see how each parameter affects the motion:
          </p>
          <SpringDemo />
        </section>

        {/* Presets */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
            DriftKit Presets
          </h2>
          <p className="mb-4">
            These are the spring presets used across DriftKit components. Format: <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">stiffness/damping/mass</code>
          </p>
          <PresetExamples />
        </section>

        {/* Rules of thumb */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
            Rules of Thumb
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <span className="text-neutral-400 font-mono shrink-0">01</span>
              <p><strong className="text-neutral-900 dark:text-white">Start with stiffness 300, damping 30.</strong> This is a solid default that works for most UI elements. Adjust from there.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-neutral-400 font-mono shrink-0">02</span>
              <p><strong className="text-neutral-900 dark:text-white">Small elements should be snappier.</strong> Buttons, toggles, badges — use higher stiffness (400-600) and lower mass (0.3-0.5).</p>
            </div>
            <div className="flex gap-3">
              <span className="text-neutral-400 font-mono shrink-0">03</span>
              <p><strong className="text-neutral-900 dark:text-white">Large elements should be smoother.</strong> Modals, drawers, page transitions — use lower stiffness (200-300) and higher mass (1-2).</p>
            </div>
            <div className="flex gap-3">
              <span className="text-neutral-400 font-mono shrink-0">04</span>
              <p><strong className="text-neutral-900 dark:text-white">Overshoot adds personality.</strong> A little bounce (damping 15-25) makes UI feel alive. Too much feels broken.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-neutral-400 font-mono shrink-0">05</span>
              <p><strong className="text-neutral-900 dark:text-white">Consistency matters.</strong> Use the same spring for similar interactions. Don&apos;t mix 5 different springs in one component.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-neutral-400 font-mono shrink-0">06</span>
              <p><strong className="text-neutral-900 dark:text-white">Test with reduced motion.</strong> Always check <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">useReducedMotion</code> — some users need static or minimal animation.</p>
            </div>
          </div>
        </section>

        {/* Further reading */}
        <section className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/40 dark:border-neutral-800/40">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
            Go Deeper
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              → <Link href="/playground" className="underline hover:text-neutral-900 dark:hover:text-white">Spring Playground</Link> — Visualize spring curves with the built-in editor
            </li>
            <li>
              → <a href="https://www.framer.com/motion/transition/#spring" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-900 dark:hover:text-white">Framer Motion Spring Docs ↗</a> — Official spring transition reference
            </li>
            <li>
              → <Link href="/docs/recipes" className="underline hover:text-neutral-900 dark:hover:text-white">Motion Recipes</Link> — See springs in action with real-world patterns
            </li>
          </ul>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex justify-between">
        <Link
          href="/docs/installation"
          className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          ← Installation
        </Link>
        <Link
          href="/docs"
          className="text-sm font-medium text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
        >
          Browse Components →
        </Link>
      </div>
    </div>
  );
}
