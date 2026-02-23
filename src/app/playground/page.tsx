"use client";

import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";
import { ModeSwitcher } from "@/components/mode-switcher";

// =============================================================================
// PHYSICS CONFIG TYPES
// =============================================================================

export interface PhysicsConfig {
  stiffness: number;
  damping: number;
  mass: number;
  bounce: number;
  preset: "snappy" | "smooth" | "bouncy" | "gentle" | "custom";
}

const defaultConfig: PhysicsConfig = {
  stiffness: 300,
  damping: 30,
  mass: 1,
  bounce: 0,
  preset: "smooth",
};

const presets: Record<Exclude<PhysicsConfig["preset"], "custom">, Omit<PhysicsConfig, "preset">> = {
  snappy: {
    stiffness: 500,
    damping: 35,
    mass: 0.8,
    bounce: 0,
  },
  smooth: {
    stiffness: 300,
    damping: 30,
    mass: 1,
    bounce: 0,
  },
  bouncy: {
    stiffness: 400,
    damping: 15,
    mass: 1.2,
    bounce: 0.6,
  },
  gentle: {
    stiffness: 200,
    damping: 25,
    mass: 1.5,
    bounce: 0,
  },
};

// =============================================================================
// SPRING PHYSICS CALCULATIONS
// =============================================================================

interface SpringMetrics {
  settleTime: number;
  overshoot: number;
  oscillationCount: number;
}

function calculateSpringCurve(config: PhysicsConfig, duration: number = 1.5, steps: number = 150) {
  const { stiffness, damping, mass } = config;
  
  const naturalFreq = Math.sqrt(stiffness / mass);
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
  
  const points: { x: number; y: number }[] = [];
  let maxValue = 0;
  let settleTime = duration;
  let oscillationCount = 0;
  let lastValue = 0;
  let hasOscillated = false;
  
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * duration;
    let position = 0;
    
    if (dampingRatio < 1) {
      // Underdamped
      const dampedFreq = naturalFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
      position = 1 - Math.exp(-dampingRatio * naturalFreq * t) * 
        (Math.cos(dampedFreq * t) + (dampingRatio * naturalFreq / dampedFreq) * Math.sin(dampedFreq * t));
    } else if (dampingRatio === 1) {
      // Critically damped
      position = 1 - Math.exp(-naturalFreq * t) * (1 + naturalFreq * t);
    } else {
      // Overdamped
      const r1 = -naturalFreq * (dampingRatio + Math.sqrt(dampingRatio * dampingRatio - 1));
      const r2 = -naturalFreq * (dampingRatio - Math.sqrt(dampingRatio * dampingRatio - 1));
      const A = -r2 / (r1 - r2);
      const B = r1 / (r1 - r2);
      position = 1 - A * Math.exp(r1 * t) - B * Math.exp(r2 * t);
    }
    
    points.push({ x: t, y: position });
    maxValue = Math.max(maxValue, position);
    
    // Detect settle time (within 2% of target)
    if (Math.abs(position - 1) < 0.02 && settleTime === duration) {
      settleTime = t;
    }
    
    // Count oscillations by detecting zero crossings of velocity
    if (i > 0) {
      const currentValue = position - 1; // Relative to target
      if (Math.sign(currentValue) !== Math.sign(lastValue) && Math.abs(currentValue) > 0.01) {
        oscillationCount++;
        hasOscillated = true;
      }
      lastValue = currentValue;
    }
  }
  
  const metrics: SpringMetrics = {
    settleTime: Math.round(settleTime * 1000) / 1000,
    overshoot: Math.round((maxValue - 1) * 100 * 10) / 10,
    oscillationCount: Math.floor(oscillationCount / 2), // Full oscillations
  };
  
  return { points, metrics };
}

// =============================================================================
// CONTROL SLIDER COMPONENT
// =============================================================================

interface ControlSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}

function ControlSlider({ label, value, min, max, step, unit = "", onChange }: ControlSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </label>
        <span className="text-sm font-mono text-neutral-600 dark:text-neutral-400 min-w-16 text-right">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neutral-900 dark:[&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md
          [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-neutral-900 dark:[&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none
          [&::-moz-range-thumb]:cursor-pointer"
      />
    </div>
  );
}

// =============================================================================
// PRESET SELECTOR
// =============================================================================

interface PresetSelectorProps {
  value: PhysicsConfig["preset"];
  onChange: (preset: PhysicsConfig["preset"]) => void;
}

function PresetSelector({ value, onChange }: PresetSelectorProps) {
  const presetOptions = [
    { value: "snappy", label: "⚡ Snappy", description: "Fast & responsive" },
    { value: "smooth", label: "✨ Smooth", description: "Balanced feel" },
    { value: "bouncy", label: "🎾 Bouncy", description: "Playful overshoot" },
    { value: "gentle", label: "🌸 Gentle", description: "Slow & elegant" },
  ] as const;

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
        Physics Presets
      </label>
      <div className="grid grid-cols-2 gap-2">
        {presetOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`p-3 rounded-lg border text-left transition-all hover:scale-[1.02] ${
              value === option.value
                ? "border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                : "border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white hover:border-neutral-400 dark:hover:border-neutral-600"
            }`}
          >
            <div className="text-sm font-medium mb-1">{option.label}</div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">
              {value === option.value ? "Active" : option.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// SPRING CURVE VISUALIZATION
// =============================================================================

interface SpringCurveProps {
  config: PhysicsConfig;
}

function SpringCurve({ config }: SpringCurveProps) {
  const { points, metrics } = useMemo(() => calculateSpringCurve(config), [config]);
  
  // Calculate preset curves for background
  const presetCurves = useMemo(() => {
    return Object.entries(presets).map(([key, preset]) => {
      const presetConfig = { ...preset, preset: key as keyof typeof presets };
      const { points } = calculateSpringCurve(presetConfig);
      return { key, points, color: getPresetColor(key) };
    });
  }, []);
  
  const width = 400;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 40, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  // Scale functions
  const xScale = (x: number) => (x / 1.5) * innerWidth;
  const yScale = (y: number) => innerHeight - (y * innerHeight);
  
  // Generate path data
  const pathData = points.map((point, i) => 
    `${i === 0 ? 'M' : 'L'} ${xScale(point.x)} ${yScale(point.y)}`
  ).join(' ');
  
  const presetPaths = presetCurves.map(curve => 
    curve.points.map((point, i) => 
      `${i === 0 ? 'M' : 'L'} ${xScale(point.x)} ${yScale(point.y)}`
    ).join(' ')
  );
  
  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 border border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Spring Curve
        </h2>
        <div className="flex items-center gap-4 text-xs text-neutral-600 dark:text-neutral-400">
          <span>Settle: {metrics.settleTime}s</span>
          <span>Overshoot: {metrics.overshoot}%</span>
          <span>Oscillations: {metrics.oscillationCount}</span>
        </div>
      </div>
      
      <div className="relative">
        <svg width={width} height={height} className="bg-white dark:bg-neutral-800 rounded border">
          <defs>
            <linearGradient id="springGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          
          {/* Background grid */}
          <g className="opacity-20">
            {[0, 0.25, 0.5, 0.75, 1, 1.25, 1.5].map(t => (
              <line
                key={t}
                x1={margin.left + xScale(t)}
                y1={margin.top}
                x2={margin.left + xScale(t)}
                y2={height - margin.bottom}
                stroke="currentColor"
                strokeWidth="1"
                className="text-neutral-400"
              />
            ))}
            {[0, 0.5, 1, 1.5].map(y => (
              <line
                key={y}
                x1={margin.left}
                y1={margin.top + yScale(y)}
                x2={width - margin.right}
                y2={margin.top + yScale(y)}
                stroke="currentColor"
                strokeWidth="1"
                className="text-neutral-400"
              />
            ))}
          </g>
          
          {/* Target line */}
          <line
            x1={margin.left}
            y1={margin.top + yScale(1)}
            x2={width - margin.right}
            y2={margin.top + yScale(1)}
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="text-neutral-500"
          />
          
          {/* Preset curves (background) */}
          {presetPaths.map((path, i) => (
            <g key={presetCurves[i].key}>
              <path
                d={`M ${margin.left} ${margin.top} L ${margin.left} ${margin.top} ${path}`}
                fill="none"
                stroke={presetCurves[i].color}
                strokeWidth="2"
                opacity="0.3"
                transform={`translate(${margin.left}, ${margin.top})`}
              />
            </g>
          ))}
          
          {/* Current config curve */}
          <path
            d={`M ${margin.left} ${margin.top} L ${margin.left} ${margin.top} ${pathData}`}
            fill="none"
            stroke="url(#springGradient)"
            strokeWidth="3"
            transform={`translate(${margin.left}, ${margin.top})`}
          />
          
          {/* Axes */}
          <g className="text-neutral-600 dark:text-neutral-400">
            {/* X-axis */}
            <line
              x1={margin.left}
              y1={height - margin.bottom}
              x2={width - margin.right}
              y2={height - margin.bottom}
              stroke="currentColor"
              strokeWidth="2"
            />
            {[0, 0.5, 1, 1.5].map(t => (
              <g key={t}>
                <line
                  x1={margin.left + xScale(t)}
                  y1={height - margin.bottom}
                  x2={margin.left + xScale(t)}
                  y2={height - margin.bottom + 6}
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <text
                  x={margin.left + xScale(t)}
                  y={height - margin.bottom + 20}
                  textAnchor="middle"
                  fontSize="12"
                  fill="currentColor"
                >
                  {t}s
                </text>
              </g>
            ))}
            
            {/* Y-axis */}
            <line
              x1={margin.left}
              y1={margin.top}
              x2={margin.left}
              y2={height - margin.bottom}
              stroke="currentColor"
              strokeWidth="2"
            />
            {[0, 0.5, 1, 1.5].map(y => (
              <g key={y}>
                <line
                  x1={margin.left - 6}
                  y1={margin.top + yScale(y)}
                  x2={margin.left}
                  y2={margin.top + yScale(y)}
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <text
                  x={margin.left - 10}
                  y={margin.top + yScale(y) + 4}
                  textAnchor="end"
                  fontSize="12"
                  fill="currentColor"
                >
                  {y.toFixed(1)}
                </text>
              </g>
            ))}
          </g>
          
          {/* Axis labels */}
          <text
            x={width / 2}
            y={height - 5}
            textAnchor="middle"
            fontSize="12"
            fill="currentColor"
            className="text-neutral-600 dark:text-neutral-400"
          >
            Time (seconds)
          </text>
          <text
            x={15}
            y={height / 2}
            textAnchor="middle"
            fontSize="12"
            fill="currentColor"
            className="text-neutral-600 dark:text-neutral-400"
            transform={`rotate(-90, 15, ${height / 2})`}
          >
            Position
          </text>
        </svg>
      </div>
    </div>
  );
}

function getPresetColor(preset: string) {
  const colors = {
    snappy: "#ef4444", // red
    smooth: "#10b981", // emerald
    bouncy: "#f59e0b", // amber
    gentle: "#8b5cf6", // violet
  };
  return colors[preset as keyof typeof colors] || "#6b7280";
}

// =============================================================================
// PRESET COMPARISON GRID
// =============================================================================

interface PresetComparisonProps {
  config: PhysicsConfig;
  onPresetSelect: (preset: PhysicsConfig["preset"]) => void;
}

function PresetComparison({ config, onPresetSelect }: PresetComparisonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoReplay, setAutoReplay] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const allConfigs = useMemo(() => {
    const configs = Object.entries(presets).map(([key, preset]) => ({
      ...preset,
      preset: key as keyof typeof presets,
      label: getPresetLabel(key),
      isActive: config.preset === key,
    }));
    
    const customConfig = {
      stiffness: config.stiffness,
      damping: config.damping,
      mass: config.mass,
      bounce: config.bounce,
      preset: config.preset,
      label: "Your Config",
      isActive: config.preset === "custom",
    };
    
    return [...configs, customConfig];
  }, [config]);
  
  const triggerAnimation = useCallback(() => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 1500);
  }, []);
  
  useEffect(() => {
    if (autoReplay) {
      intervalRef.current = setInterval(() => {
        triggerAnimation();
      }, 3000);
      triggerAnimation();
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoReplay, triggerAnimation]);
  
  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 border border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Preset Comparison
        </h2>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <input
              type="checkbox"
              checked={autoReplay}
              onChange={(e) => setAutoReplay(e.target.checked)}
              className="rounded"
            />
            Auto-replay
          </label>
          <Button
            onClick={triggerAnimation}
            disabled={isPlaying}
            className="bg-indigo-600 hover:bg-indigo-500"
          >
            {isPlaying ? "Playing..." : "Play All"}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {allConfigs.map((configItem, index) => {
          const springConfig = {
            type: "spring" as const,
            stiffness: configItem.stiffness,
            damping: configItem.damping,
            mass: configItem.mass,
            bounce: configItem.bounce,
          };
          
          const isCustom = configItem.label === "Your Config";
          
          return (
            <div
              key={index}
              className={`relative p-4 rounded-lg border-2 transition-all cursor-pointer ${
                configItem.isActive
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30"
                  : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600"
              }`}
              onClick={() => {
                if (!isCustom && configItem.preset !== "custom") {
                  onPresetSelect(configItem.preset);
                }
              }}
            >
              <div className="text-center mb-4">
                <h3 className={`text-sm font-semibold mb-1 ${
                  isCustom 
                    ? "text-indigo-600 dark:text-indigo-400" 
                    : "text-neutral-900 dark:text-white"
                }`}>
                  {configItem.label}
                  {isCustom && (
                    <span className="ml-1 text-xs px-1.5 py-0.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded">
                      LIVE
                    </span>
                  )}
                </h3>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 space-y-0.5">
                  <div>S:{configItem.stiffness} D:{configItem.damping}</div>
                  <div>M:{configItem.mass} B:{configItem.bounce}</div>
                </div>
              </div>
              
              <div className="h-32 bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden relative">
                <motion.div
                  animate={isPlaying ? {
                    y: [-100, 0],
                    opacity: [0, 1],
                  } : {}}
                  transition={springConfig}
                  className={`absolute bottom-4 left-4 right-4 h-16 rounded-lg shadow-lg ${
                    isCustom
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                      : "bg-gradient-to-r from-neutral-400 to-neutral-500"
                  }`}
                  initial={{ y: 0, opacity: 1 }}
                >
                  <div className="p-3 text-white text-xs font-medium">
                    {configItem.label.split(" ")[0]}
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getPresetLabel(preset: string) {
  const labels = {
    snappy: "⚡ Snappy",
    smooth: "✨ Smooth", 
    bouncy: "🎾 Bouncy",
    gentle: "🌸 Gentle",
  };
  return labels[preset as keyof typeof labels] || preset;
}

// =============================================================================
// CODE OUTPUT
// =============================================================================

interface CodeOutputProps {
  config: PhysicsConfig;
}

function CodeOutput({ config }: CodeOutputProps) {
  const springCode = useMemo(() => {
    const springConfig = {
      type: "spring",
      stiffness: config.stiffness,
      damping: config.damping,
      mass: config.mass,
      ...(config.bounce > 0 && { bounce: config.bounce }),
    };

    return `const springConfig = ${JSON.stringify(springConfig, null, 2)};

// Basic hover animation
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={springConfig}
>
  <Button>Hover me</Button>
</motion.div>

// Card with lift effect
<motion.div
  whileHover={{
    scale: 1.02,
    y: -4,
  }}
  transition={springConfig}
>
  <Card>Your content</Card>
</motion.div>

// Slide in animation (like comparison grid)
<motion.div
  animate={{
    y: [100, 0],
    opacity: [0, 1],
  }}
  transition={springConfig}
>
  <div>Sliding element</div>
</motion.div>`;
  }, [config]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(springCode);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = springCode;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  }, [springCode]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Generated Code
        </h3>
        <motion.button
          onClick={copyToClipboard}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1.5 text-xs font-mono bg-neutral-800 dark:bg-neutral-700 text-neutral-300 dark:text-neutral-200 hover:bg-neutral-700 dark:hover:bg-neutral-600 rounded transition-colors"
        >
          Copy
        </motion.button>
      </div>
      
      <div className="bg-neutral-950 border border-neutral-800 rounded-lg overflow-auto">
        <pre className="p-4 text-xs font-mono text-neutral-200 leading-relaxed overflow-x-auto">
          <code>{springCode}</code>
        </pre>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN PHYSICS PLAYGROUND COMPONENT
// =============================================================================

export default function PhysicsPlayground() {
  const [config, setConfig] = useState<PhysicsConfig>(defaultConfig);

  const handleConfigChange = useCallback((key: keyof PhysicsConfig, value: number | string) => {
    setConfig(prev => {
      if (key === "preset" && value !== "custom") {
        const presetKey = value as keyof typeof presets;
        return { ...presets[presetKey], preset: presetKey };
      }
      return { ...prev, [key]: value, preset: "custom" };
    });
  }, []);

  const handlePresetChange = useCallback((preset: PhysicsConfig["preset"]) => {
    if (preset === "custom") return;
    setConfig({ ...presets[preset], preset });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Header */}
      <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link 
                href="/" 
                className="flex items-center gap-3 text-lg font-semibold text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
              >
                ← driftkit
              </Link>
              <div>
                <h1 className="text-xl font-bold text-neutral-900 dark:text-white">
                  Physics Playground
                </h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Compare presets • Visualize curves • Fine-tune parameters • Copy code
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/docs"
                className="px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Docs
              </Link>
              <ModeSwitcher size={32} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Top Row: Controls + Curve */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Controls Panel */}
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
              Spring Physics Controls
            </h2>
            
            <div className="space-y-6">
              <PresetSelector 
                value={config.preset} 
                onChange={handlePresetChange} 
              />

              <ControlSlider
                label="Stiffness"
                value={config.stiffness}
                min={50}
                max={1000}
                step={10}
                onChange={(value) => handleConfigChange("stiffness", value)}
              />

              <ControlSlider
                label="Damping"
                value={config.damping}
                min={5}
                max={100}
                step={1}
                onChange={(value) => handleConfigChange("damping", value)}
              />

              <ControlSlider
                label="Mass"
                value={config.mass}
                min={0.1}
                max={5}
                step={0.1}
                onChange={(value) => handleConfigChange("mass", value)}
              />

              <ControlSlider
                label="Bounce"
                value={config.bounce}
                min={0}
                max={1}
                step={0.05}
                onChange={(value) => handleConfigChange("bounce", value)}
              />
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
              <div className="text-xs text-neutral-500 dark:text-neutral-400 space-y-2">
                <div><strong>Stiffness:</strong> How quickly it moves to target</div>
                <div><strong>Damping:</strong> How much it resists motion</div>
                <div><strong>Mass:</strong> How heavy the element feels</div>
                <div><strong>Bounce:</strong> Overshoot amount (0-1)</div>
              </div>
            </div>
          </div>

          {/* Spring Curve Visualization */}
          <SpringCurve config={config} />
        </div>

        {/* Preset Comparison Grid */}
        <div className="mb-8">
          <PresetComparison config={config} onPresetSelect={handlePresetChange} />
        </div>

        {/* Code Output */}
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 border border-neutral-200 dark:border-neutral-800">
          <CodeOutput config={config} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Compare spring presets • Visualize timing curves • Perfect your animations • Copy the code
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Link
                href="/"
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                ← Back to Components
              </Link>
              <Link
                href="/docs"
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Documentation
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}