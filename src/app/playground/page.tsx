"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";
import { MagneticButton } from "@/components/magnetic-button";
import { RippleButton } from "@/components/ripple-button";
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
// COMPONENT PREVIEW
// =============================================================================

interface ComponentPreviewProps {
  config: PhysicsConfig;
}

function ComponentPreview({ config }: ComponentPreviewProps) {
  const springConfig = {
    type: "spring" as const,
    stiffness: config.stiffness,
    damping: config.damping,
    mass: config.mass,
    bounce: config.bounce,
  };

  return (
    <div className="space-y-8">
      {/* Buttons Section */}
      <div>
        <h3 className="text-sm font-mono text-neutral-500 dark:text-neutral-400 mb-3 uppercase tracking-wider">
          Buttons
        </h3>
        <div className="flex flex-wrap gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={springConfig}
          >
            <Button>Hover & Click</Button>
          </motion.div>

          <RippleButton className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg">
            Ripple Effect
          </RippleButton>

          <MagneticButton intensity={0.5}>
            <Button variant="secondary">Magnetic</Button>
          </MagneticButton>
        </div>
      </div>

      {/* Cards Section */}
      <div>
        <h3 className="text-sm font-mono text-neutral-500 dark:text-neutral-400 mb-3 uppercase tracking-wider">
          Cards
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div
            whileHover={{
              scale: 1.02,
              y: -4,
            }}
            whileTap={{ scale: 0.98 }}
            transition={springConfig}
            className="cursor-pointer"
          >
            <Card>
              <CardContent
                title="Physics Card"
                description="Hover to see lift animation with your custom spring settings."
              />
            </Card>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.03,
              rotateY: 5,
            }}
            transition={springConfig}
            className="cursor-pointer"
          >
            <div className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white">
              <h4 className="font-semibold mb-2">3D Tilt</h4>
              <p className="text-sm text-purple-100">
                Subtle perspective rotation
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Interactive Elements */}
      <div>
        <h3 className="text-sm font-mono text-neutral-500 dark:text-neutral-400 mb-3 uppercase tracking-wider">
          Interactive Elements
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          <motion.div
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={springConfig}
            className="cursor-pointer"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-lg">
              ⚡
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={springConfig}
            className="cursor-pointer"
          >
            <ModeSwitcher size={40} />
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.25)",
            }}
            transition={springConfig}
            className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg cursor-pointer"
          >
            <span className="text-sm font-medium">Shadow Lift</span>
          </motion.div>
        </div>
      </div>

      {/* Animated Shapes */}
      <div>
        <h3 className="text-sm font-mono text-neutral-500 dark:text-neutral-400 mb-3 uppercase tracking-wider">
          Shapes
        </h3>
        <div className="flex flex-wrap gap-4">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              ...springConfig,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg"
          />
          
          <motion.div
            animate={{
              borderRadius: ["10px", "50%", "10px"],
            }}
            transition={{
              ...springConfig,
              repeat: Infinity,
              repeatDelay: 1.5,
            }}
            className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500"
          />
          
          <motion.div
            animate={{
              scaleX: [1, 1.5, 1],
              scaleY: [1, 0.5, 1],
            }}
            transition={{
              ...springConfig,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
          />
        </div>
      </div>
    </div>
  );
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

// Continuous animation
<motion.div
  animate={{
    scale: [1, 1.1, 1],
    rotate: [0, 180, 360],
  }}
  transition={{
    ...springConfig,
    repeat: Infinity,
    repeatDelay: 2,
  }}
>
  <div>Animated element</div>
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
                  Tune spring physics • See live preview • Copy code
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 border border-neutral-200 dark:border-neutral-800">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
                Spring Physics
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
          </div>

          {/* Live Preview */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 border border-neutral-200 dark:border-neutral-800">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
                Live Preview
              </h2>
              <ComponentPreview config={config} />
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 border border-neutral-200 dark:border-neutral-800">
              <CodeOutput config={config} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Experiment with spring physics • Find your perfect feel • Copy the code
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