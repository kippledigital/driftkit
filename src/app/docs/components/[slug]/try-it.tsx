"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// =============================================================================
// PHYSICS CONFIG TYPES
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
// CONTROL SLIDER COMPONENT
// =============================================================================

interface ControlSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  hint?: string;
  onChange: (value: number) => void;
}

function ControlSlider({ label, value, min, max, step, hint, onChange }: ControlSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
          {label}
          {hint && (
            <span className="relative group">
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-neutral-300 dark:border-neutral-600 text-[9px] text-neutral-400 cursor-help leading-none">i</span>
              <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 text-[11px] leading-snug text-white bg-neutral-800 dark:bg-neutral-700 rounded-lg shadow-lg whitespace-normal w-48 opacity-0 translate-x-1 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-20">
                {hint}
              </span>
            </span>
          )}
        </label>
        <span className="text-sm font-mono text-neutral-600 dark:text-neutral-400 min-w-16 text-right">
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neutral-900 dark:[&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-sm
          [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-neutral-900 dark:[&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none
          [&::-moz-range-thumb]:cursor-pointer"
      />
    </div>
  );
}

// =============================================================================
// SPECIALIZED COMPONENT DEMOS (from playground)
// =============================================================================

function ButtonDemo({ isPlaying, springTransition }: { isPlaying: boolean; springTransition: object }) {
  const [playCount, setPlayCount] = useState(0);
  
  useEffect(() => {
    if (isPlaying) setPlayCount(c => c + 1);
  }, [isPlaying]);

  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        key={playCount}
        className="px-6 py-2.5 rounded-lg text-white text-sm font-semibold shadow-lg bg-neutral-900 dark:bg-white dark:text-neutral-900"
        initial={{ scale: 1, y: 0 }}
        animate={playCount > 0 ? { scale: [0.85, 1.08, 1], y: [3, -2, 0] } : {}}
        transition={springTransition}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Click me
      </motion.div>
    </div>
  );
}

function ToggleDemo({ isPlaying, springTransition }: { isPlaying: boolean; springTransition: object }) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-16 h-8 rounded-full p-1 relative bg-neutral-900 dark:bg-white">
        <motion.div
          className="w-6 h-6 rounded-full bg-white dark:bg-neutral-900 shadow-md"
          animate={isPlaying ? { x: 32 } : { x: 0 }}
          transition={springTransition}
        />
      </div>
    </div>
  );
}

function ToastDemo({ isPlaying, springTransition }: { isPlaying: boolean; springTransition: object }) {
  return (
    <div className="flex items-center justify-center h-full px-4">
      <motion.div
        className="w-full max-w-xs rounded-lg shadow-xl overflow-hidden bg-white dark:bg-neutral-800 border-l-3 border-green-500"
        animate={isPlaying ? { x: [80, 0], opacity: [0, 1], scale: [0.95, 1] } : { x: 0, opacity: 1, scale: 1 }}
        transition={springTransition}
      >
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">
              ✓
            </div>
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white text-sm">Success!</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">Your changes have been saved.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function CardDemo({ isPlaying, springTransition }: { isPlaying: boolean; springTransition: object }) {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        className="w-48 p-4 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
        animate={isPlaying ? { y: [40, 0], opacity: [0, 1] } : { y: 0, opacity: 1 }}
        transition={springTransition}
        whileHover={{ scale: 1.02, y: -4 }}
      >
        <div className="space-y-3">
          <div className="w-full h-3 bg-neutral-900 dark:bg-white rounded opacity-60" />
          <div className="w-3/4 h-2 bg-neutral-200 dark:bg-neutral-600 rounded" />
          <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-600 rounded" />
          <div className="w-1/2 h-2 bg-neutral-200 dark:bg-neutral-600 rounded" />
        </div>
      </motion.div>
    </div>
  );
}

function TabsDemo({ isPlaying, springTransition }: { isPlaying: boolean; springTransition: object }) {
  const [activeTab, setActiveTab] = useState(0);
  
  useEffect(() => {
    if (isPlaying) {
      setActiveTab(prev => (prev === 0 ? 1 : prev === 1 ? 2 : 0));
    }
  }, [isPlaying]);
  
  const tabs = ["Overview", "Details", "Settings"];
  
  return (
    <div className="flex flex-col justify-center h-full px-6">
      <div className="w-full">
        <div className="flex border-b border-neutral-200 dark:border-neutral-700 relative">
          {tabs.map((tab, i) => (
            <div key={tab} className={`px-4 py-2 text-sm relative ${i === activeTab ? "font-semibold text-neutral-900 dark:text-white" : "text-neutral-400"}`}>
              {tab}
            </div>
          ))}
          <motion.div
            className="absolute bottom-0 h-0.5 bg-neutral-900 dark:bg-white rounded-full"
            animate={{ left: `${activeTab * 33.33}%`, width: "33.33%" }}
            transition={springTransition}
          />
        </div>
        <motion.div
          key={`content-${isPlaying ? 1 : 0}`}
          className="pt-4 space-y-2"
          animate={isPlaying ? { opacity: [0, 1], x: [20, 0] } : { opacity: 1, x: 0 }}
          transition={springTransition}
        >
          <div className="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-700" />
          <div className="w-3/4 h-2 rounded-full bg-neutral-100 dark:bg-neutral-800" />
          <div className="w-5/6 h-2 rounded-full bg-neutral-100 dark:bg-neutral-800" />
        </motion.div>
      </div>
    </div>
  );
}

function DropdownDemo({ isPlaying, springTransition }: { isPlaying: boolean; springTransition: object }) {
  const [playCount, setPlayCount] = useState(0);
  
  useEffect(() => {
    if (isPlaying) setPlayCount(c => c + 1);
  }, [isPlaying]);
  
  return (
    <div className="flex flex-col items-center justify-center h-full px-6">
      <div className="w-full max-w-sm">
        <div className="w-full h-8 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 flex items-center px-3 justify-between">
          <span className="text-sm text-neutral-500">Select option...</span>
          <span className="text-xs text-neutral-400">▼</span>
        </div>
        <motion.div
          key={playCount}
          className="w-full mt-1 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-lg overflow-hidden"
          initial={{ opacity: 0, scaleY: 0.6, originY: 0 }}
          animate={playCount > 0 ? { opacity: 1, scaleY: 1 } : {}}
          transition={springTransition}
        >
          {["Design", "Engineering", "Marketing"].map((item, i) => (
            <div key={item} className={`px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 ${i === 0 ? "bg-neutral-100 dark:bg-neutral-700" : ""}`}>
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ModalDemo({ isPlaying, springTransition }: { isPlaying: boolean; springTransition: object }) {
  const [playCount, setPlayCount] = useState(0);
  
  useEffect(() => {
    if (isPlaying) setPlayCount(c => c + 1);
  }, [isPlaying]);
  
  return (
    <div className="flex items-center justify-center h-full relative">
      <motion.div
        key={playCount}
        className="w-64 rounded-lg bg-white dark:bg-neutral-800 shadow-2xl border border-neutral-200 dark:border-neutral-700 p-6"
        initial={{ scale: 0.85, y: 8 }}
        animate={playCount > 0 ? { scale: [0.75, 1.02, 1], y: [10, -2, 0] } : { scale: 1, y: 0 }}
        transition={springTransition}
      >
        <div className="w-full h-3 rounded-full bg-neutral-900 dark:bg-white mb-4 opacity-60" />
        <div className="w-32 h-2 rounded-full bg-neutral-200 dark:bg-neutral-600 mb-2" />
        <div className="w-48 h-2 rounded-full bg-neutral-200 dark:bg-neutral-600 mb-6" />
        <div className="flex gap-3 justify-end">
          <div className="px-4 py-2 rounded text-sm bg-neutral-100 dark:bg-neutral-700 text-neutral-500">Cancel</div>
          <div className="px-4 py-2 rounded text-sm bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium">Confirm</div>
        </div>
      </motion.div>
    </div>
  );
}

function BadgeDemo({ isPlaying, springTransition }: { isPlaying: boolean; springTransition: object }) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-xl">
          🔔
        </div>
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center"
          animate={isPlaying ? { scale: [0, 1.3, 1], opacity: [0, 1, 1] } : { scale: 1, opacity: 1 }}
          transition={springTransition}
          whileHover={{ scale: 1.1 }}
        >
          3
        </motion.div>
      </div>
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

const demoComponents: Record<string, React.FC<{ isPlaying: boolean; springTransition: object }>> = {
  button: ButtonDemo,
  "magnetic-button": ButtonDemo,
  "ripple-button": ButtonDemo,
  "liquid-button": ButtonDemo,
  toggle: ToggleDemo,
  toast: ToastDemo,
  card: CardDemo,
  "expandable-card": CardDemo,
  "glow-card": CardDemo,
  "wobble-card": CardDemo,
  tabs: TabsDemo,
  "animated-tabs": TabsDemo,
  dropdown: DropdownDemo,
  modal: ModalDemo,
  dialog: ModalDemo,
  drawer: ModalDemo,
  popover: ModalDemo,
  tooltip: ModalDemo,
  badge: BadgeDemo,
};

function ComponentPreview({ componentName, config, isPlaying }: ComponentPreviewProps) {
  const springTransition = {
    type: "spring" as const,
    stiffness: config.stiffness,
    damping: config.damping,
    mass: config.mass,
  };

  const Demo = demoComponents[componentName];
  
  if (Demo) {
    return (
      <div className="rounded-xl border border-neutral-200/40 dark:border-neutral-800/40 bg-neutral-100/30 dark:bg-neutral-900/30 p-6">
        <div className="min-h-[180px] flex items-center justify-center">
          <Demo isPlaying={isPlaying} springTransition={springTransition} />
        </div>
      </div>
    );
  }

  // Fallback for components without specific demos
  return (
    <div className="rounded-xl border border-neutral-200/40 dark:border-neutral-800/40 bg-neutral-100/30 dark:bg-neutral-900/30 p-6">
      <div className="flex items-center justify-center min-h-[180px]">
        <motion.div
          key={`${config.stiffness}-${config.damping}-${config.mass}-${isPlaying}`}
          className="px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg font-medium cursor-pointer"
          animate={isPlaying ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={springTransition}
        >
          {componentName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Component
        </motion.div>
      </div>
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

// Basic hover animation
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={springConfig}
>
  <${componentName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')} />
</motion.div>

// Advanced with custom animations
<motion.div
  animate={{ 
    scale: [1, 1.02, 1],
    y: [0, -4, 0]
  }}
  transition={{
    ...springConfig,
    repeat: Infinity,
    repeatDelay: 2
  }}
>
  <${componentName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')} />
</motion.div>`;
  }, [config, componentName]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(springCode);
      // Could add a toast notification here
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  }, [springCode]);

  const sliders = [
    { 
      key: "stiffness" as keyof PhysicsConfig, 
      label: "Stiffness", 
      min: 50, 
      max: 1000, 
      step: 10,
      hint: "How quickly the animation reaches its target. Higher values create snappier animations."
    },
    { 
      key: "damping" as keyof PhysicsConfig, 
      label: "Damping", 
      min: 5, 
      max: 100, 
      step: 1,
      hint: "How much the animation resists motion. Lower values create more bounce and overshoot."
    },
    { 
      key: "mass" as keyof PhysicsConfig, 
      label: "Mass", 
      min: 0.1, 
      max: 5, 
      step: 0.1,
      hint: "How heavy the element feels during animation. Higher values make animations slower with more momentum."
    },
  ];

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="text-xl">🎮</div>
          <div>
            <h3 className="text-base font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              Playground
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Tune spring physics for this component
            </p>
          </div>
        </div>
      </div>

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
              className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

        {/* Physics Controls */}
        <div>
          <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
            Spring Physics
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sliders.map(slider => (
              <ControlSlider
                key={slider.key}
                label={slider.label}
                value={config[slider.key]}
                min={slider.min}
                max={slider.max}
                step={slider.step}
                hint={slider.hint}
                onChange={(value) => handleConfigChange(slider.key, value)}
              />
            ))}
          </div>
        </div>

        {/* Generated Code */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Generated Code
            </h4>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1.5 text-xs font-mono bg-neutral-800 dark:bg-neutral-700 text-neutral-300 dark:text-neutral-200 hover:bg-neutral-700 dark:hover:bg-neutral-600 rounded-md transition-colors"
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
        <div className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg space-y-2">
          <div><strong>Stiffness:</strong> Controls animation speed. Higher values create snappier animations.</div>
          <div><strong>Damping:</strong> Controls resistance to motion. Lower values create more bounce and overshoot.</div>
          <div><strong>Mass:</strong> Controls the perceived weight. Higher values make animations slower with more momentum.</div>
        </div>
      </div>
    </div>
  );
}