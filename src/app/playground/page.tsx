"use client";

import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { ModeSwitcher } from "@/components/mode-switcher";

// =============================================================================
// TYPES & PRESETS
// =============================================================================

interface PhysicsConfig {
  stiffness: number;
  damping: number;
  mass: number;
  bounce: number;
  preset: "snappy" | "smooth" | "bouncy" | "gentle" | "custom";
}

const presets = {
  snappy: { stiffness: 500, damping: 35, mass: 0.8, bounce: 0 },
  smooth: { stiffness: 300, damping: 30, mass: 1, bounce: 0 },
  bouncy: { stiffness: 400, damping: 15, mass: 1.2, bounce: 0.6 },
  gentle: { stiffness: 200, damping: 25, mass: 1.5, bounce: 0 },
};

const presetMeta: Record<string, { emoji: string; label: string; description: string; color: string }> = {
  snappy: { emoji: "⚡", label: "Snappy", description: "Quick, decisive interactions", color: "#ef4444" },
  smooth: { emoji: "✨", label: "Smooth", description: "Balanced, natural movement", color: "#10b981" },
  bouncy: { emoji: "🎾", label: "Bouncy", description: "Playful, energetic feel", color: "#f59e0b" },
  gentle: { emoji: "🌸", label: "Gentle", description: "Calm, elegant transitions", color: "#8b5cf6" },
};

const defaultConfig: PhysicsConfig = { ...presets.smooth, preset: "smooth" };

// =============================================================================
// SPRING MATH
// =============================================================================

function calculateSpringCurve(config: { stiffness: number; damping: number; mass: number }, steps = 120) {
  const { stiffness, damping, mass } = config;
  const duration = 1.5;
  const naturalFreq = Math.sqrt(stiffness / mass);
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
  const points: number[] = [];
  let maxVal = 0;
  let settleTime = duration;
  let oscillations = 0;
  let lastSign = 0;

  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * duration;
    let pos: number;

    if (dampingRatio < 1) {
      const dampedFreq = naturalFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
      pos = 1 - Math.exp(-dampingRatio * naturalFreq * t) *
        (Math.cos(dampedFreq * t) + (dampingRatio * naturalFreq / dampedFreq) * Math.sin(dampedFreq * t));
    } else if (dampingRatio === 1) {
      pos = 1 - Math.exp(-naturalFreq * t) * (1 + naturalFreq * t);
    } else {
      const r1 = -naturalFreq * (dampingRatio + Math.sqrt(dampingRatio * dampingRatio - 1));
      const r2 = -naturalFreq * (dampingRatio - Math.sqrt(dampingRatio * dampingRatio - 1));
      const A = -r2 / (r1 - r2);
      const B = r1 / (r1 - r2);
      pos = 1 - A * Math.exp(r1 * t) - B * Math.exp(r2 * t);
    }

    points.push(pos);
    maxVal = Math.max(maxVal, pos);
    
    if (Math.abs(pos - 1) < 0.02 && settleTime === duration) settleTime = t;
    
    const sign = Math.sign(pos - 1);
    if (i > 5 && sign !== 0 && sign !== lastSign && lastSign !== 0) oscillations++;
    if (sign !== 0) lastSign = sign;
  }

  return {
    points,
    settleTime: Math.round(settleTime * 100) / 100,
    overshoot: Math.round(Math.max(0, maxVal - 1) * 1000) / 10,
    oscillations: Math.floor(oscillations / 2),
  };
}

// =============================================================================
// MINI SPRING CURVE (inline, no axes — just the shape)
// =============================================================================

function MiniCurve({ config, color = "#6366f1", height = 48, width = 120 }: {
  config: { stiffness: number; damping: number; mass: number };
  color?: string;
  height?: number;
  width?: number;
}) {
  const { points } = useMemo(() => calculateSpringCurve(config), [config]);
  const maxY = Math.max(...points, 1.15);
  
  const d = points.map((y, i) => {
    const x = (i / (points.length - 1)) * width;
    const py = height - (y / maxY) * height * 0.85 - height * 0.05;
    return `${i === 0 ? "M" : "L"}${x},${py}`;
  }).join(" ");

  const targetY = height - (1 / maxY) * height * 0.85 - height * 0.05;

  return (
    <svg width={width} height={height} className="opacity-60">
      <line x1={0} y1={targetY} x2={width} y2={targetY} stroke={color} strokeWidth={0.5} strokeDasharray="2 2" opacity={0.3} />
      <path d={d} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

// =============================================================================
// ANIMATION DEMOS — each preset shows a different micro-interaction
// =============================================================================

function CheckboxDemo({ isPlaying, color, springTransition }: { isPlaying: boolean; color: string; springTransition: object }) {
  return (
    <div className="flex items-center justify-center gap-3 h-full">
      <div className="relative">
        <motion.div
          className="w-6 h-6 rounded-md border-2 flex items-center justify-center"
          style={{ borderColor: color, backgroundColor: isPlaying ? color : "transparent" }}
          animate={isPlaying ? { scale: [0.8, 1.15, 1] } : { scale: 1 }}
          transition={springTransition}
        >
          <motion.svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            animate={isPlaying ? { pathLength: [0, 1], opacity: [0, 1] } : { opacity: isPlaying ? 1 : 0 }}
          >
            <motion.path
              d="M2.5 7L5.5 10L11.5 4"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={isPlaying ? { pathLength: [0, 1] } : {}}
              transition={springTransition}
            />
          </motion.svg>
        </motion.div>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="w-16 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
        <div className="w-10 h-1 rounded-full bg-neutral-200 dark:bg-neutral-700" />
      </div>
    </div>
  );
}

function ToggleSwitchDemo({ isPlaying, color, springTransition }: { isPlaying: boolean; color: string; springTransition: object }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-full">
      <div className="w-12 h-6 rounded-full p-0.5 relative" style={{ backgroundColor: isPlaying ? color : "#d1d5db" }}>
        <motion.div
          className="w-5 h-5 rounded-full bg-white shadow-md"
          animate={isPlaying ? { x: 24 } : { x: 0 }}
          transition={springTransition}
        />
      </div>
    </div>
  );
}

function NotificationBadgeDemo({ isPlaying, color, springTransition }: { isPlaying: boolean; color: string; springTransition: object }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-full">
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-lg">
          🔔
        </div>
        <motion.div
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
          style={{ backgroundColor: color }}
          animate={isPlaying ? { scale: [0, 1.3, 1], opacity: [0, 1, 1] } : { scale: 1, opacity: 1 }}
          transition={springTransition}
        >
          3
        </motion.div>
      </div>
    </div>
  );
}

function CardSlideDemo({ isPlaying, color, springTransition }: { isPlaying: boolean; color: string; springTransition: object }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-full">
      <motion.div
        className="w-16 h-20 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 flex items-center justify-center"
        animate={isPlaying ? { y: [40, 0], opacity: [0, 1] } : { y: 0, opacity: 1 }}
        transition={springTransition}
      >
        <div className="space-y-1">
          <div className="w-10 h-1.5 rounded-full" style={{ backgroundColor: color, opacity: 0.6 }} />
          <div className="w-8 h-1 rounded-full bg-neutral-200 dark:bg-neutral-600" />
          <div className="w-10 h-1 rounded-full bg-neutral-200 dark:bg-neutral-600" />
        </div>
      </motion.div>
    </div>
  );
}

function ToastDemo({ isPlaying, color, springTransition }: { isPlaying: boolean; color: string; springTransition: object }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-3">
      <motion.div
        className="w-full rounded-lg shadow-xl overflow-hidden"
        style={{ backgroundColor: color + "15", borderLeft: `3px solid ${color}` }}
        animate={isPlaying ? { x: [80, 0], opacity: [0, 1], scale: [0.95, 1] } : { x: 0, opacity: 1, scale: 1 }}
        transition={springTransition}
      >
        <div className="px-2.5 py-2">
          <div className="flex items-center gap-1.5 mb-0.5">
            <div className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] shrink-0" style={{ backgroundColor: color }}>
              <span className="text-white font-bold">✓</span>
            </div>
            <span className="text-[11px] font-semibold text-neutral-900 dark:text-white truncate">Changes saved</span>
          </div>
          <p className="text-[9px] text-neutral-500 dark:text-neutral-400 pl-[22px] leading-tight">Updated successfully.</p>
        </div>
      </motion.div>
    </div>
  );
}

const demoComponents: Record<string, React.FC<{ isPlaying: boolean; color: string; springTransition: object }>> = {
  snappy: CheckboxDemo,
  smooth: ToggleSwitchDemo,
  bouncy: NotificationBadgeDemo,
  gentle: CardSlideDemo,
  custom: ToastDemo,
};

// =============================================================================
// COMPARISON CARD
// =============================================================================

function ComparisonCard({ 
  config, 
  meta, 
  isPlaying, 
  isActive, 
  onClick,
  demoType = "custom",
  isCustom = false,
}: {
  config: { stiffness: number; damping: number; mass: number; bounce: number };
  meta: { emoji: string; label: string; description: string; color: string };
  isPlaying: boolean;
  isActive: boolean;
  onClick: () => void;
  demoType?: string;
  isCustom?: boolean;
}) {
  const springTransition = {
    type: "spring" as const,
    stiffness: config.stiffness,
    damping: config.damping,
    mass: config.mass,
  };

  const Demo = demoComponents[demoType] || ToastDemo;
  const color = isCustom ? "#6366f1" : meta.color;

  return (
    <motion.button
      onClick={onClick}
      className={`relative text-left w-full rounded-xl border-2 overflow-hidden transition-colors ${
        isActive
          ? "border-indigo-500 dark:border-indigo-400 shadow-lg shadow-indigo-500/10"
          : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
      } bg-white dark:bg-neutral-900`}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Animation stage */}
      <div className="h-40 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden">
        <Demo isPlaying={isPlaying} color={color} springTransition={springTransition} />
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">
            {meta.emoji} {meta.label}
            {isCustom && (
              <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full font-medium">
                LIVE
              </span>
            )}
          </h3>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">{meta.description}</p>
        <MiniCurve config={config} color={color} />
      </div>
    </motion.button>
  );
}

// =============================================================================
// FULL SPRING CURVE (detail view)
// =============================================================================

function SpringCurveDetail({ config }: { config: PhysicsConfig }) {
  const data = useMemo(() => calculateSpringCurve(config, 150), [config]);
  const presetData = useMemo(() => 
    Object.entries(presets).map(([key, p]) => ({
      key,
      color: presetMeta[key].color,
      ...calculateSpringCurve(p, 150),
    })),
  []);

  const padding = { top: 12, right: 12, bottom: 24, left: 32 };
  const w = 700, h = 220;
  const plotW = w - padding.left - padding.right;
  const plotH = h - padding.top - padding.bottom;
  const maxY = Math.max(...data.points, 1.2);

  const toPath = (pts: number[]) => pts.map((y, i) => {
    const x = padding.left + (i / (pts.length - 1)) * plotW;
    const py = padding.top + plotH - (y / maxY) * plotH;
    return `${i === 0 ? "M" : "L"}${x},${py}`;
  }).join(" ");

  const targetY = padding.top + plotH - (1 / maxY) * plotH;

  // Time axis labels
  const timeLabels = [0, 0.375, 0.75, 1.125, 1.5];
  // Value axis labels
  const valueLabels = [0, 0.5, 1];

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Spring Curve</h3>
        <div className="flex gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <span>Settle <strong className="text-neutral-900 dark:text-white">{data.settleTime}s</strong></span>
          <span>Overshoot <strong className="text-neutral-900 dark:text-white">{data.overshoot}%</strong></span>
          <span>Oscillations <strong className="text-neutral-900 dark:text-white">{data.oscillations}</strong></span>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
          {/* Grid lines */}
          {timeLabels.map(t => {
            const x = padding.left + (t / 1.5) * plotW;
            return (
              <g key={`t-${t}`}>
                <line x1={x} y1={padding.top} x2={x} y2={padding.top + plotH} stroke="currentColor" strokeWidth={0.5} opacity={0.08} className="text-neutral-400" />
                <text x={x} y={h - 4} textAnchor="middle" className="fill-neutral-400" style={{ fontSize: 10 }}>{t}s</text>
              </g>
            );
          })}
          {valueLabels.map(v => {
            const y = padding.top + plotH - (v / maxY) * plotH;
            return (
              <g key={`v-${v}`}>
                <line x1={padding.left} y1={y} x2={padding.left + plotW} y2={y} stroke="currentColor" strokeWidth={0.5} opacity={0.08} className="text-neutral-400" />
                <text x={padding.left - 8} y={y + 3} textAnchor="end" className="fill-neutral-400" style={{ fontSize: 10 }}>{v}</text>
              </g>
            );
          })}
          {/* Target line at 1.0 */}
          <line x1={padding.left} y1={targetY} x2={padding.left + plotW} y2={targetY} stroke="currentColor" strokeWidth={1} strokeDasharray="4 4" opacity={0.2} className="text-neutral-500" />
          {/* Preset curves */}
          {presetData.map(p => (
            <path key={p.key} d={toPath(p.points)} fill="none" stroke={p.color} strokeWidth={1.5} opacity={0.25} />
          ))}
          {/* Active curve */}
          <path d={toPath(data.points)} fill="none" stroke="url(#curveGrad)" strokeWidth={2.5} strokeLinecap="round" />
          <defs>
            <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Legend */}
      <div className="flex items-center gap-4 mt-2 flex-wrap">
        {Object.entries(presetMeta).map(([key, m]) => (
          <div key={key} className="flex items-center gap-1.5 text-[10px] text-neutral-400">
            <div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: m.color, opacity: 0.5 }} />
            {m.label}
          </div>
        ))}
        <div className="flex items-center gap-1.5 text-[10px] text-indigo-500 font-medium">
          <div className="w-3 h-0.5 rounded-full bg-indigo-500" />
          Your config
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// CODE OUTPUT
// =============================================================================

function CodeOutput({ config }: { config: PhysicsConfig }) {
  const [copied, setCopied] = useState(false);
  
  const code = useMemo(() => {
    const c: Record<string, unknown> = {
      type: "spring",
      stiffness: config.stiffness,
      damping: config.damping,
      mass: config.mass,
    };
    if (config.bounce > 0) c.bounce = config.bounce;
    return `const springConfig = ${JSON.stringify(c, null, 2)};

// Notification slide-in
<motion.div
  initial={{ y: 50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={springConfig}
/>

// Button hover
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={springConfig}
/>`;
  }, [config]);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-100 dark:border-neutral-800">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Code</h3>
        <motion.button
          onClick={copy}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md transition-colors"
        >
          {copied ? "✓ Copied" : "Copy"}
        </motion.button>
      </div>
      <pre className="p-5 text-xs font-mono text-neutral-300 bg-neutral-950 leading-relaxed overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// =============================================================================
// MAIN PLAYGROUND
// =============================================================================

export default function PhysicsPlayground() {
  const [config, setConfig] = useState<PhysicsConfig>(defaultConfig);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoReplay, setAutoReplay] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handlePreset = useCallback((key: string) => {
    setConfig({ ...presets[key as keyof typeof presets], preset: key as PhysicsConfig["preset"] });
  }, []);

  const handleSlider = useCallback((key: string, value: number) => {
    setConfig(prev => ({ ...prev, [key]: value, preset: "custom" }));
  }, []);

  const play = useCallback(() => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 1500);
  }, []);

  useEffect(() => {
    if (autoReplay) {
      play();
      intervalRef.current = setInterval(play, 3000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [autoReplay, play]);

  const sliders = [
    { key: "stiffness", label: "Stiffness", min: 50, max: 1000, step: 10, hint: "Snap speed. Higher = faster." },
    { key: "damping", label: "Damping", min: 5, max: 100, step: 1, hint: "Resistance. Low = wobbly. High = heavy." },
    { key: "mass", label: "Mass", min: 0.1, max: 5, step: 0.1, hint: "Weight. Heavier = slower, more momentum." },
    { key: "bounce", label: "Bounce", min: 0, max: 1, step: 0.05, hint: "Elasticity. 0 = none. 1 = rubber ball." },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
              ← driftkit
            </Link>
            <div>
              <h1 className="text-lg font-bold text-neutral-900 dark:text-white">Physics Playground</h1>
              <p className="text-xs text-neutral-500">Tune your spring animations</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/docs" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
              Docs
            </Link>
            <ModeSwitcher size={28} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* Hero — Comparison Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">Compare</h2>
              <p className="text-sm text-neutral-500">See how each preset feels. Click to apply.</p>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-neutral-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoReplay}
                  onChange={e => setAutoReplay(e.target.checked)}
                  className="rounded border-neutral-300 dark:border-neutral-600"
                />
                Loop
              </label>
              <motion.button
                onClick={play}
                disabled={isPlaying}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-sm font-medium bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors disabled:opacity-50"
              >
                {isPlaying ? "Playing…" : "▶ Play All"}
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(presets).map(([key, p]) => (
              <ComparisonCard
                key={key}
                config={p}
                meta={presetMeta[key]}
                isPlaying={isPlaying}
                isActive={config.preset === key}
                onClick={() => handlePreset(key)}
                demoType={key}
              />
            ))}
            <ComparisonCard
              config={config}
              meta={{ emoji: "🎛️", label: "Custom", description: "Your current config", color: "#6366f1" }}
              isPlaying={isPlaying}
              isActive={config.preset === "custom"}
              onClick={() => {}}
              demoType="custom"
              isCustom
            />
          </div>
        </section>

        {/* Controls + Curve */}
        <section className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Sliders */}
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 space-y-3">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Fine-tune</h3>
            {sliders.map(s => (
              <div key={s.key}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                    {s.label}
                    <span className="relative group">
                      <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-neutral-300 dark:border-neutral-600 text-[9px] text-neutral-400 cursor-help leading-none">i</span>
                      <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 text-[11px] leading-snug text-white bg-neutral-800 dark:bg-neutral-700 rounded-lg shadow-lg whitespace-normal w-48 opacity-0 translate-x-1 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-20">
                        {s.hint}
                      </span>
                    </span>
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">{config[s.key as keyof PhysicsConfig]}</span>
                </div>
                <input
                  type="range"
                  min={s.min} max={s.max} step={s.step}
                  value={config[s.key as keyof PhysicsConfig] as number}
                  onChange={e => handleSlider(s.key, Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neutral-900 dark:[&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-sm"
                />
              </div>
            ))}
          </div>

          {/* Curve */}
          <SpringCurveDetail config={config} />
        </section>

        {/* Code */}
        <section>
          <CodeOutput config={config} />
        </section>
      </main>
    </div>
  );
}
