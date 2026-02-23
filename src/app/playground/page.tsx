"use client";

import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
// Global nav handles navigation + mode switcher

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

function ButtonPressDemo({ isPlaying, color, springTransition }: { isPlaying: boolean; color: string; springTransition: object }) {
  const [playCount, setPlayCount] = useState(0);
  
  useEffect(() => {
    if (isPlaying) setPlayCount(c => c + 1);
  }, [isPlaying]);

  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        key={playCount}
        className="px-6 py-2.5 rounded-lg text-white text-xs font-semibold shadow-lg"
        style={{ backgroundColor: color }}
        initial={{ scale: 1, y: 0 }}
        animate={playCount > 0 ? { scale: [0.85, 1.08, 1], y: [3, -2, 0] } : {}}
        transition={springTransition}
      >
        Get Started
      </motion.div>
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

function DropdownDemo({ isPlaying, color, springTransition }: { isPlaying: boolean; color: string; springTransition: object }) {
  const [playCount, setPlayCount] = useState(0);
  useEffect(() => { if (isPlaying) setPlayCount(c => c + 1); }, [isPlaying]);
  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      <div className="w-full">
        <div className="w-full h-7 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 flex items-center px-2 justify-between">
          <span className="text-[10px] text-neutral-500">Select option...</span>
          <span className="text-[8px] text-neutral-400">▼</span>
        </div>
        <motion.div
          key={playCount}
          className="w-full mt-1 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-lg overflow-hidden"
          initial={{ opacity: 0, scaleY: 0.6, originY: 0 }}
          animate={playCount > 0 ? { opacity: 1, scaleY: 1 } : {}}
          transition={springTransition}
        >
          {["Design", "Engineering", "Marketing"].map((item, i) => (
            <div key={item} className="px-2 py-1.5 text-[10px] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700" style={i === 0 ? { backgroundColor: color + "15", color } : {}}>
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ModalDemo({ isPlaying, color, springTransition }: { isPlaying: boolean; color: string; springTransition: object }) {
  const [playCount, setPlayCount] = useState(0);
  useEffect(() => { if (isPlaying) setPlayCount(c => c + 1); }, [isPlaying]);
  return (
    <div className="flex items-center justify-center h-full relative">
      <motion.div
        key={playCount}
        className="w-28 rounded-lg bg-white dark:bg-neutral-800 shadow-2xl border border-neutral-200 dark:border-neutral-700 p-3"
        initial={{ scale: 0.85, y: 8 }}
        animate={playCount > 0 ? { scale: [0.75, 1.02, 1], y: [10, -2, 0] } : { scale: 1, y: 0 }}
        transition={springTransition}
      >
        <div className="w-full h-1.5 rounded-full mb-2" style={{ backgroundColor: color, opacity: 0.6 }} />
        <div className="w-16 h-1 rounded-full bg-neutral-200 dark:bg-neutral-600 mb-1" />
        <div className="w-20 h-1 rounded-full bg-neutral-200 dark:bg-neutral-600 mb-3" />
        <div className="flex gap-1.5 justify-end">
          <div className="px-2 py-0.5 rounded text-[8px] bg-neutral-100 dark:bg-neutral-700 text-neutral-500">Cancel</div>
          <div className="px-2 py-0.5 rounded text-[8px] text-white font-medium" style={{ backgroundColor: color }}>Confirm</div>
        </div>
      </motion.div>
    </div>
  );
}

function TabsDemo({ isPlaying, color, springTransition }: { isPlaying: boolean; color: string; springTransition: object }) {
  const [playCount, setPlayCount] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    if (isPlaying) {
      setPlayCount(c => c + 1);
      setActiveTab(prev => (prev === 0 ? 1 : prev === 1 ? 2 : 0));
    }
  }, [isPlaying]);
  const tabs = ["Overview", "Details", "Settings"];
  return (
    <div className="flex flex-col justify-center h-full px-3">
      <div className="w-full">
        <div className="flex border-b border-neutral-200 dark:border-neutral-700 relative">
          {tabs.map((tab, i) => (
            <div key={tab} className={`px-2.5 py-1.5 text-[10px] relative ${i === activeTab ? "font-semibold" : "text-neutral-400"}`}
              style={i === activeTab ? { color } : {}}>
              {tab}
            </div>
          ))}
          <motion.div
            className="absolute bottom-0 h-0.5 rounded-full"
            style={{ backgroundColor: color }}
            animate={{ left: `${activeTab * 33.33}%`, width: "33.33%" }}
            transition={springTransition}
          />
        </div>
        <motion.div
          key={`content-${playCount}`}
          className="pt-2.5 space-y-1.5"
          animate={playCount > 0 ? { opacity: [0, 1], x: [15, 0] } : { opacity: 1, x: 0 }}
          transition={springTransition}
        >
          <div className="w-full h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700" />
          <div className="w-3/4 h-1 rounded-full bg-neutral-100 dark:bg-neutral-800" />
          <div className="w-5/6 h-1 rounded-full bg-neutral-100 dark:bg-neutral-800" />
        </motion.div>
      </div>
    </div>
  );
}

const demoOptions = [
  { key: "button", label: "Button" },
  { key: "toggle", label: "Toggle" },
  { key: "toast", label: "Toast" },
  { key: "card", label: "Card" },
  { key: "badge", label: "Badge" },
  { key: "dropdown", label: "Dropdown" },
  { key: "modal", label: "Modal" },
  { key: "tabs", label: "Tabs" },
];

const demoComponents: Record<string, React.FC<{ isPlaying: boolean; color: string; springTransition: object }>> = {
  button: ButtonPressDemo,
  toggle: ToggleSwitchDemo,
  badge: NotificationBadgeDemo,
  card: CardSlideDemo,
  toast: ToastDemo,
  dropdown: DropdownDemo,
  modal: ModalDemo,
  tabs: TabsDemo,
};

// =============================================================================
// COMPARISON CARD
// =============================================================================

function ComparisonCard({ 
  config, 
  meta, 
  isPlaying: globalPlaying, 
  isActive, 
  onClick,
  demoKey,
  isCustom = false,
}: {
  config: { stiffness: number; damping: number; mass: number; bounce: number };
  meta: { emoji: string; label: string; description: string; color: string };
  isPlaying: boolean;
  isActive: boolean;
  onClick: () => void;
  demoKey: string;
  isCustom?: boolean;
}) {
  const [localPlaying, setLocalPlaying] = useState(false);
  const isPlaying = globalPlaying || localPlaying;

  const handleClick = useCallback(() => {
    onClick();
    setLocalPlaying(true);
    setTimeout(() => setLocalPlaying(false), 1500);
  }, [onClick]);

  const springTransition = {
    type: "spring" as const,
    stiffness: config.stiffness,
    damping: config.damping,
    mass: config.mass,
  };

  const Demo = demoComponents[demoKey] || ToastDemo;
  const color = isCustom ? "#6366f1" : meta.color;

  return (
    <motion.button
      onClick={handleClick}
      className={`relative text-left w-full rounded-xl border-2 overflow-hidden transition-colors ${
        isActive
          ? "border-indigo-500 dark:border-indigo-400 shadow-lg shadow-indigo-500/10"
          : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
      } bg-white dark:bg-neutral-900`}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Animation stage */}
      <div className="h-48 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden">
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
    <div className="rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 p-4 flex flex-col">
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

type CodeFormat = "framer" | "spring" | "css";

interface CodeOutputProps {
  config: PhysicsConfig;
}

function CodeOutput({ config }: CodeOutputProps) {
  const [activeFormat, setActiveFormat] = useState<CodeFormat>("framer");

  // Framer Motion code (existing)
  const framerCode = useMemo(() => {
    const springConfig = {
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

  // React Spring code
  const springCode = useMemo(() => {
    // Convert Framer Motion values to React Spring
    const tension = config.stiffness; // Direct mapping
    const friction = config.damping;  // Direct mapping
    const mass = config.mass;

    return `import { useSpring, animated } from '@react-spring/web';

const springConfig = {
  tension: ${tension},
  friction: ${friction},
  mass: ${mass}${config.bounce > 0 ? `,
  bounce: ${config.bounce}` : ''}
};

// Basic hover animation
function HoverButton() {
  const [springs, api] = useSpring(() => ({
    scale: 1,
    config: springConfig
  }));

  return (
    <animated.div
      style={springs}
      onMouseEnter={() => api.start({ scale: 1.05 })}
      onMouseLeave={() => api.start({ scale: 1 })}
    >
      <Button>Hover me</Button>
    </animated.div>
  );
}

// Card with lift effect
function LiftCard() {
  const [springs, api] = useSpring(() => ({
    scale: 1,
    y: 0,
    config: springConfig
  }));

  return (
    <animated.div
      style={springs}
      onMouseEnter={() => api.start({ scale: 1.02, y: -4 })}
      onMouseLeave={() => api.start({ scale: 1, y: 0 })}
    >
      <Card>Your content</Card>
    </animated.div>
  );
}

// Continuous animation
function ContinuousAnimation() {
  const springs = useSpring({
    from: { scale: 1, rotate: 0 },
    to: async (next) => {
      while (true) {
        await next({ scale: 1.1, rotate: 180 });
        await next({ scale: 1, rotate: 360 });
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    },
    config: springConfig
  });

  return (
    <animated.div style={springs}>
      <div>Animated element</div>
    </animated.div>
  );
}`;
  }, [config]);

  // CSS code with cubic-bezier approximation
  const cssCode = useMemo(() => {
    // Approximate spring to cubic-bezier
    // Higher stiffness = faster curve, lower damping = more bounce
    const speed = Math.max(0.1, Math.min(1, config.stiffness / 500));
    const bounce = Math.max(0, Math.min(0.9, (100 - config.damping) / 100));
    
    // Estimate duration based on mass and stiffness
    const baseDuration = 150 + (config.mass * 100) + (1000 - config.stiffness) / 10;
    const duration = Math.round(baseDuration);

    // Create cubic-bezier values
    const p1 = 0.25 + (speed * 0.5); // x1
    const p2 = bounce * 0.5; // y1
    const p3 = 0.75 - (speed * 0.25); // x2
    const p4 = 1 - (bounce * 0.3); // y2

    const easing = `cubic-bezier(${p1.toFixed(2)}, ${p2.toFixed(2)}, ${p3.toFixed(2)}, ${p4.toFixed(2)})`;

    return `/* Spring approximation with CSS transitions */
.spring-transition {
  transition-duration: ${duration}ms;
  transition-timing-function: ${easing};
}

/* Basic hover animation */
.hover-button {
  transform: scale(1);
  transition: transform ${duration}ms ${easing};
}

.hover-button:hover {
  transform: scale(1.05);
}

/* Card with lift effect */
.lift-card {
  transform: scale(1) translateY(0);
  transition: transform ${duration}ms ${easing};
}

.lift-card:hover {
  transform: scale(1.02) translateY(-4px);
}

/* Continuous animation */
@keyframes spring-rotate {
  0% { transform: scale(1) rotate(0deg); }
  33% { transform: scale(1.1) rotate(180deg); }
  66% { transform: scale(1) rotate(360deg); }
  100% { transform: scale(1) rotate(360deg); }
}

.continuous-animation {
  animation: spring-rotate ${duration * 3}ms ${easing} infinite;
  animation-delay: 2s;
}

/* Spring physics approximation:
 * Stiffness: ${config.stiffness} → Speed: ${(speed * 100).toFixed(0)}%
 * Damping: ${config.damping} → Bounce: ${(bounce * 100).toFixed(0)}%
 * Mass: ${config.mass} → Duration: ${duration}ms
 * Cubic-bezier: ${easing}
 */`;
  }, [config]);

  const getCurrentCode = () => {
    switch (activeFormat) {
      case "framer": return framerCode;
      case "spring": return springCode;
      case "css": return cssCode;
      default: return framerCode;
    }
  };

  const copyToClipboard = useCallback(async () => {
    const code = getCurrentCode();
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  }, [getCurrentCode]);

  const tabs = [
    { id: "framer" as const, label: "Framer Motion", icon: "🎨" },
    { id: "spring" as const, label: "React Spring", icon: "🌸" },
    { id: "css" as const, label: "CSS", icon: "🎯" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Export Code
        </h3>
        <motion.button
          onClick={copy}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md transition-colors"
        >
          {copied ? "✓ Copied" : "Copy"}
        </motion.button>
      </div>
      {/* Format Tabs */}
      <div className="flex gap-1 p-1 bg-neutral-200 dark:bg-neutral-800 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFormat(tab.id)}
            className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all ${
              activeFormat === tab.id
                ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
            }`}
          >
            <span className="mr-1.5">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="bg-neutral-950 border border-neutral-800 rounded-lg overflow-auto">
        <pre className="p-4 text-xs font-mono text-neutral-200 leading-relaxed overflow-x-auto">
          <code>{getCurrentCode()}</code>
        </pre>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN PLAYGROUND
// =============================================================================

function ShareButton() {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);
  return (
    <motion.button
      onClick={copy}
      whileTap={{ scale: 0.95 }}
      className="w-full px-4 py-2.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-neutral-700 rounded-xl transition-colors"
    >
      {copied ? "✓ Copied URL" : "🔗 Share Config"}
    </motion.button>
  );
}

function parseUrlConfig(): { config?: Partial<PhysicsConfig>; demo?: string } {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const result: { config?: Partial<PhysicsConfig>; demo?: string } = {};
  
  // Check for preset first
  const preset = p.get("preset");
  if (preset && preset in presets) {
    result.config = { ...presets[preset as keyof typeof presets], preset: preset as PhysicsConfig["preset"] };
  } else {
    const s = p.get("s"), d = p.get("d"), m = p.get("m"), b = p.get("b");
    if (s || d || m || b) {
      result.config = {
        stiffness: s ? Number(s) : defaultConfig.stiffness,
        damping: d ? Number(d) : defaultConfig.damping,
        mass: m ? Number(m) : defaultConfig.mass,
        bounce: b ? Number(b) : defaultConfig.bounce,
        preset: "custom",
      };
    }
  }
  
  const demo = p.get("demo");
  if (demo && demoOptions.some(o => o.key === demo)) result.demo = demo;
  
  return result;
}

function updateUrl(config: PhysicsConfig, demoKey: string) {
  if (typeof window === "undefined") return;
  const p = new URLSearchParams();
  if (config.preset !== "custom" && config.preset in presets) {
    p.set("preset", config.preset);
  } else {
    p.set("s", String(config.stiffness));
    p.set("d", String(config.damping));
    p.set("m", String(config.mass));
    if (config.bounce > 0) p.set("b", String(config.bounce));
  }
  if (demoKey !== "button") p.set("demo", demoKey);
  const qs = p.toString();
  const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
  window.history.replaceState(null, "", url);
}

export default function PhysicsPlayground() {
  const [config, setConfig] = useState<PhysicsConfig>(() => {
    const parsed = parseUrlConfig();
    return parsed.config ? { ...defaultConfig, ...parsed.config } : defaultConfig;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoReplay, setAutoReplay] = useState(false);
  const [demoKey, setDemoKey] = useState(() => {
    const parsed = parseUrlConfig();
    return parsed.demo || "button";
  });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync URL on changes
  useEffect(() => {
    updateUrl(config, demoKey);
  }, [config, demoKey]);

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
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Sidebar + Preview Area */}
        <section className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          {/* Left sidebar — Controls */}
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 space-y-4">
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
            <ShareButton />
          </div>

          {/* Right — Preview area */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
            {/* Header bar */}
            <div className="px-5 py-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-white mb-0.5">Compare</h2>
                <p className="text-[11px] text-neutral-400">Same component, different physics</p>
              </div>
              <motion.button
                onClick={() => setAutoReplay(prev => !prev)}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  autoReplay
                    ? "bg-indigo-500 text-white"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                }`}
              >
                {autoReplay ? "⏸ Stop" : "▶ Loop"}
              </motion.button>
            </div>

            {/* Component selector */}
            <div className="px-5 py-2 border-b border-neutral-100 dark:border-neutral-800">
              <div className="relative flex gap-1 p-1 rounded-[8px] bg-neutral-100 dark:bg-neutral-800/60 w-fit">
                {demoOptions.map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => setDemoKey(opt.key)}
                    className="relative z-10 px-2.5 py-1.5 text-[11px] font-medium rounded-[6px] transition-colors"
                  >
                    {demoKey === opt.key && (
                      <motion.div
                        layoutId="component-tab-blob"
                        className="absolute inset-0 rounded-[6px] bg-white dark:bg-neutral-700 shadow-sm"
                        transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
                        style={{ zIndex: -1 }}
                      />
                    )}
                    <span className={demoKey === opt.key ? "text-neutral-900 dark:text-white" : "text-neutral-500"}>
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom preview (big) — click to play */}
            <div className="p-4">
              <button
                onClick={play}
                className="w-full rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 h-56 mb-4 relative overflow-hidden group cursor-pointer transition-colors hover:border-indigo-300 dark:hover:border-indigo-700"
              >
                {(() => {
                  const Demo = demoComponents[demoKey] || ToastDemo;
                  const springTransition = { type: "spring" as const, stiffness: config.stiffness, damping: config.damping, mass: config.mass };
                  return (
                    <div className="w-full h-full flex items-center justify-center scale-125">
                      <div className="w-full max-w-sm h-full">
                        <Demo isPlaying={isPlaying} color="#6366f1" springTransition={springTransition} />
                      </div>
                    </div>
                  );
                })()}
                <div className="absolute bottom-2 left-3">
                  <span className="text-[10px] font-semibold text-neutral-500 bg-white/80 dark:bg-neutral-900/80 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    🎛️ Custom
                  </span>
                </div>
                <div className="absolute bottom-2 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-medium text-indigo-500 bg-white/80 dark:bg-neutral-900/80 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    Click to play
                  </span>
                </div>
              </button>

              {/* Preset grid 2×2 */}
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(presets).map(([key, p]) => {
                  const meta = presetMeta[key];
                  const isActive = config.preset === key;
                  const Demo = demoComponents[demoKey] || ToastDemo;
                  const springTransition = { type: "spring" as const, stiffness: p.stiffness, damping: p.damping, mass: p.mass };
                  return (
                    <motion.button
                      key={key}
                      onClick={() => {
                        handlePreset(key);
                        play();
                      }}
                      className={`relative text-left rounded-xl border-2 overflow-hidden transition-colors ${
                        isActive
                          ? "border-indigo-500 dark:border-indigo-400 shadow-md shadow-indigo-500/10"
                          : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
                      } bg-neutral-50 dark:bg-neutral-950`}
                      whileHover={{ y: -1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="h-28 relative overflow-hidden">
                        <Demo isPlaying={isPlaying} color={meta.color} springTransition={springTransition} />
                        <div className="absolute bottom-2 left-2">
                          <span className="text-[10px] font-semibold bg-white/80 dark:bg-neutral-900/80 px-2 py-0.5 rounded-full backdrop-blur-sm text-neutral-700 dark:text-neutral-300">
                            {meta.emoji} {meta.label}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Spring Curve */}
              <div className="mt-4">
                <SpringCurveDetail config={config} />
              </div>
            </div>
          </div>
        </section>

        {/* Code output — full width */}
        <section>
          <CodeOutput config={config} />
        </section>
      </main>
    </div>
  );
}
