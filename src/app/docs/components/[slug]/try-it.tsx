"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// =============================================================================
// PHYSICS CONFIG TYPES (reused from playground)
// =============================================================================

export interface PhysicsConfig {
  stiffness: number;
  damping: number;
  mass: number;
}

const defaultConfig: PhysicsConfig = {
  stiffness: 300,
  damping: 30,
  mass: 1,
};

// =============================================================================
// CONTROL SLIDER COMPONENT (reused from playground)
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
// COMPONENT PREVIEW WITH SPRING PHYSICS
// =============================================================================

interface ComponentPreviewProps {
  componentName: string;
  config: PhysicsConfig;
  isPlaying: boolean;
}

function ComponentPreview({ componentName, config, isPlaying }: ComponentPreviewProps) {
  const springConfig = {
    type: "spring" as const,
    stiffness: config.stiffness,
    damping: config.damping,
    mass: config.mass,
  };

  // Different animation variants for different types of components
  const getAnimationProps = () => {
    const baseProps = {
      transition: springConfig,
    };

    // Button-like components
    if (["button", "magnetic-button", "ripple-button", "liquid-button"].includes(componentName)) {
      return {
        ...baseProps,
        animate: isPlaying ? { scale: [1, 1.05, 1] } : { scale: 1 },
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
      };
    }

    // Card-like components
    if (["card", "expandable-card", "glow-card", "wobble-card"].includes(componentName)) {
      return {
        ...baseProps,
        animate: isPlaying ? { scale: [1, 1.02, 1], y: [0, -4, 0] } : { scale: 1, y: 0 },
        whileHover: { scale: 1.02, y: -4 },
      };
    }

    // Dialog-like components
    if (["dialog", "drawer", "popover", "tooltip"].includes(componentName)) {
      return {
        ...baseProps,
        animate: isPlaying ? { scale: [0.9, 1, 0.9] } : { scale: 1 },
      };
    }

    // Badge and small components
    if (["badge", "toast", "breadcrumbs"].includes(componentName)) {
      return {
        ...baseProps,
        animate: isPlaying ? { scale: [1, 1.1, 1] } : { scale: 1 },
        whileHover: { scale: 1.05 },
      };
    }

    // Tab-like components
    if (["tabs", "animated-tabs", "nav-menu"].includes(componentName)) {
      return {
        ...baseProps,
        animate: isPlaying ? { x: [0, 10, 0] } : { x: 0 },
        whileHover: { x: 2 },
      };
    }

    // Default animation
    return {
      ...baseProps,
      animate: isPlaying ? { scale: [1, 1.02, 1] } : { scale: 1 },
      whileHover: { scale: 1.02 },
    };
  };

  const animationProps = getAnimationProps();

  return (
    <div className="flex items-center justify-center min-h-[200px] p-8 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
      <motion.div
        key={`${config.stiffness}-${config.damping}-${config.mass}-${isPlaying}`}
        {...animationProps}
        className="cursor-pointer"
      >
        <div className="px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg font-medium">
          {componentName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Component
        </div>
      </motion.div>
    </div>
  );
}

// =============================================================================
// MAIN TRY IT COMPONENT
// =============================================================================

interface TryItProps {
  componentName: string;
}

export default function TryIt({ componentName }: TryItProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<PhysicsConfig>(defaultConfig);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleConfigChange = useCallback((key: keyof PhysicsConfig, value: number) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  }, []);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    // Reset after animation completes
    setTimeout(() => setIsPlaying(false), 1500);
  }, []);

  const springCode = useMemo(() => {
    const springConfig = {
      type: "spring",
      stiffness: config.stiffness,
      damping: config.damping,
      mass: config.mass,
    };

    return `const springConfig = ${JSON.stringify(springConfig, null, 2)};

<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={springConfig}
>
  <YourComponent />
</motion.div>`;
  }, [config]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(springCode);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  }, [springCode]);

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="text-lg">🎮</div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Try It</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Experiment with spring physics controls
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-neutral-500 dark:text-neutral-400"
        >
          ▼
        </motion.div>
      </button>

      {/* Collapsible Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-6">
              {/* Live Preview */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Live Preview
                  </h4>
                  <button
                    onClick={handlePlay}
                    disabled={isPlaying}
                    className="px-3 py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-md hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors disabled:opacity-50"
                  >
                    {isPlaying ? "Playing..." : "▶ Play"}
                  </button>
                </div>
                <ComponentPreview
                  componentName={componentName}
                  config={config}
                  isPlaying={isPlaying}
                />
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              </div>

              {/* Generated Code */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Generated Code
                  </h4>
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-1.5 text-xs font-mono bg-neutral-800 dark:bg-neutral-700 text-neutral-300 dark:text-neutral-200 hover:bg-neutral-700 dark:hover:bg-neutral-600 rounded transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <div className="bg-neutral-950 border border-neutral-800 rounded-lg overflow-auto">
                  <pre className="p-4 text-xs font-mono text-neutral-200 leading-relaxed overflow-x-auto">
                    <code>{springCode}</code>
                  </pre>
                </div>
              </div>

              {/* Help Text */}
              <div className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 p-3 rounded space-y-1">
                <div><strong>Stiffness:</strong> How quickly the animation reaches its target (higher = faster)</div>
                <div><strong>Damping:</strong> How much the animation resists motion (higher = less overshoot)</div>
                <div><strong>Mass:</strong> How heavy the element feels during animation (higher = slower)</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}