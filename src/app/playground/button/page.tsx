"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/button";
import { ControlPanel } from "@/components/control-panel";
import { CodeDisplay } from "@/components/code-display";
import { ComponentSwitcher } from "@/components/component-switcher";

export interface PhysicsConfig {
  tension: number;
  damping: number;
  mass: number;
  duration: number;
  scaleHover: number;
  scalePress: number;
  borderRadius: number;
  preset: "snappy" | "smooth" | "bouncy" | "gentle";
}

const defaultConfig: PhysicsConfig = {
  tension: 200,
  damping: 20,
  mass: 1,
  duration: 0.3,
  scaleHover: 1.05,
  scalePress: 0.95,
  borderRadius: 8,
  preset: "smooth",
};

const presets: Record<PhysicsConfig["preset"], Omit<PhysicsConfig, "preset">> = {
  snappy: {
    tension: 500,
    damping: 30,
    mass: 0.5,
    duration: 0.2,
    scaleHover: 1.02,
    scalePress: 0.97,
    borderRadius: 8,
  },
  smooth: {
    tension: 200,
    damping: 20,
    mass: 1,
    duration: 0.3,
    scaleHover: 1.05,
    scalePress: 0.95,
    borderRadius: 8,
  },
  bouncy: {
    tension: 300,
    damping: 10,
    mass: 1.2,
    duration: 0.4,
    scaleHover: 1.08,
    scalePress: 0.92,
    borderRadius: 12,
  },
  gentle: {
    tension: 150,
    damping: 25,
    mass: 1.5,
    duration: 0.5,
    scaleHover: 1.03,
    scalePress: 0.98,
    borderRadius: 6,
  },
};

const controlsConfig = [
  {
    type: "slider" as const,
    label: "Spring Tension",
    key: "tension" as keyof PhysicsConfig,
    min: 50,
    max: 500,
    step: 10,
    unit: "",
  },
  {
    type: "slider" as const,
    label: "Damping",
    key: "damping" as keyof PhysicsConfig,
    min: 5,
    max: 50,
    step: 1,
    unit: "",
  },
  {
    type: "slider" as const,
    label: "Mass",
    key: "mass" as keyof PhysicsConfig,
    min: 0.1,
    max: 5,
    step: 0.1,
    unit: "",
  },
  {
    type: "slider" as const,
    label: "Duration",
    key: "duration" as keyof PhysicsConfig,
    min: 0.1,
    max: 2,
    step: 0.1,
    unit: "s",
  },
  {
    type: "slider" as const,
    label: "Scale on Hover",
    key: "scaleHover" as keyof PhysicsConfig,
    min: 1.0,
    max: 1.15,
    step: 0.01,
    unit: "",
  },
  {
    type: "slider" as const,
    label: "Scale on Press",
    key: "scalePress" as keyof PhysicsConfig,
    min: 0.9,
    max: 1.0,
    step: 0.01,
    unit: "",
  },
  {
    type: "slider" as const,
    label: "Border Radius",
    key: "borderRadius" as keyof PhysicsConfig,
    min: 0,
    max: 24,
    step: 1,
    unit: "px",
  },
  {
    type: "dropdown" as const,
    label: "Preset",
    key: "preset" as keyof PhysicsConfig,
    options: [
      { value: "snappy", label: "Snappy" },
      { value: "smooth", label: "Smooth" },
      { value: "bouncy", label: "Bouncy" },
      { value: "gentle", label: "Gentle" },
    ],
  },
];

export default function ButtonPlayground() {
  const [config, setConfig] = useState<PhysicsConfig>(defaultConfig);
  const [demoState, setDemoState] = useState({
    loading: false,
    success: false,
  });

  const handleConfigChange = useCallback((key: string, value: string | number) => {
    setConfig(prev => {
      if (key === "preset") {
        const presetKey = value as keyof typeof presets;
        return { ...presets[presetKey], preset: presetKey };
      }
      return { ...prev, [key]: value };
    });
  }, []);

  const handleDemoClick = useCallback(() => {
    setDemoState({ loading: true, success: false });
    setTimeout(() => {
      setDemoState({ loading: false, success: true });
      setTimeout(() => {
        setDemoState({ loading: false, success: false });
      }, 2000);
    }, 1500);
  }, []);

  const generateCode = useMemo(() => {
    const springConfig = `{
  type: "spring",
  stiffness: ${config.tension},
  damping: ${config.damping},
  mass: ${config.mass}
}`;

    const hoverScale = config.scaleHover !== 1 ? `scale: ${config.scaleHover}` : "";
    const pressScale = config.scalePress !== 1 ? `scale: ${config.scalePress}` : "";

    return `<motion.button
  className="px-4 py-2 bg-neutral-900 text-white rounded-[${config.borderRadius}px] font-medium"
  whileHover={${hoverScale ? `{ ${hoverScale} }` : "undefined"}}
  whileTap={${pressScale ? `{ ${pressScale} }` : "undefined"}}
  transition={${springConfig}}
>
  Click me
</motion.button>`;
  }, [config]);

  return (
    <div className="h-screen bg-neutral-950 text-white flex flex-col overflow-hidden">
      {/* Component Switcher */}
      <ComponentSwitcher currentComponent="button" />

      {/* Main Layout Grid */}
      <div className="flex-1 grid grid-cols-[1fr_280px] grid-rows-[auto_1fr] gap-3 p-3 min-h-0">
        {/* Live Preview - Top Left */}
        <div className="bg-neutral-900 rounded border border-neutral-800 p-4">
          <h2 className="text-sm font-mono text-neutral-300 mb-4">Live Preview</h2>
          <div className="flex gap-8 items-start">
              <div>
                  <h3 className="text-xs font-mono text-neutral-400 mb-2">Variants</h3>
                  <div className="flex flex-wrap gap-2">
                    {["default", "secondary", "ghost", "outline"].map((variant) => (
                      <motion.button
                        key={variant}
                        className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                          variant === "default" 
                            ? "bg-white text-black" 
                            : variant === "secondary"
                            ? "bg-neutral-700 text-white"
                            : variant === "ghost"
                            ? "bg-transparent text-white hover:bg-neutral-800"
                            : "bg-transparent text-white border border-neutral-600"
                        }`}
                        style={{
                          borderRadius: `${config.borderRadius}px`,
                        }}
                        whileHover={{
                          scale: config.scaleHover,
                        }}
                        whileTap={{
                          scale: config.scalePress,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: config.tension,
                          damping: config.damping,
                          mass: config.mass,
                        }}
                      >
                        {variant.charAt(0).toUpperCase() + variant.slice(1)}
                      </motion.button>
                    ))}
                  </div>
              </div>

              <div>
                  <h3 className="text-xs font-mono text-neutral-400 mb-2">States</h3>
                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      className="px-3 py-1.5 text-sm bg-white text-black font-medium"
                      style={{ borderRadius: `${config.borderRadius}px` }}
                      whileHover={{ scale: config.scaleHover }}
                      whileTap={{ scale: config.scalePress }}
                      transition={{
                        type: "spring",
                        stiffness: config.tension,
                        damping: config.damping,
                        mass: config.mass,
                      }}
                    >
                      Normal
                    </motion.button>
                    
                    <motion.button
                      className="px-3 py-1.5 text-sm bg-white text-black font-medium flex items-center gap-2"
                      style={{ borderRadius: `${config.borderRadius}px` }}
                      whileHover={{ scale: config.scaleHover }}
                      whileTap={{ scale: config.scalePress }}
                      transition={{
                        type: "spring",
                        stiffness: config.tension,
                        damping: config.damping,
                        mass: config.mass,
                      }}
                      onClick={handleDemoClick}
                    >
                      {demoState.loading ? (
                        <>
                          <motion.div
                            className="w-3 h-3 border border-black border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span className="text-xs">Loading...</span>
                        </>
                      ) : demoState.success ? (
                        <>
                          <span className="text-green-600">✓</span>
                          <span className="text-xs">Success!</span>
                        </>
                      ) : (
                        "Interactive"
                      )}
                    </motion.button>
                    
                    <motion.button
                      className="px-3 py-1.5 text-sm bg-neutral-600 text-neutral-400 font-medium cursor-not-allowed"
                      style={{ borderRadius: `${config.borderRadius}px` }}
                      disabled
                    >
                      Disabled
                    </motion.button>
                  </div>
              </div>
          </div>
        </div>

        {/* Physics Controls - Top Right */}
        <div className="bg-neutral-900 rounded border border-neutral-800 p-4 overflow-y-auto">
          <ControlPanel
            title="Physics Controls"
            config={config}
            controls={controlsConfig}
            onChange={handleConfigChange}
          />
        </div>

        {/* Generated Code - Bottom (spans both columns) */}
        <div className="col-span-2 bg-neutral-900 rounded border border-neutral-800 p-4 min-h-0 flex flex-col">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-mono text-neutral-300">Generated Code</h2>
              <motion.button
                className="px-2 py-1 text-xs font-mono bg-neutral-800 text-neutral-300 hover:bg-neutral-700 rounded transition-colors"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(generateCode);
                  } catch (err) {
                    // Fallback for older browsers
                    const textArea = document.createElement("textarea");
                    textArea.value = generateCode;
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    document.execCommand("copy");
                    document.body.removeChild(textArea);
                  }
                }}
                whileTap={{ scale: 0.95 }}
              >
                Copy
              </motion.button>
            </div>
            
            <div className="flex-1 bg-neutral-950 border border-neutral-800 rounded overflow-auto min-h-0">
              <pre className="p-3 text-xs font-mono text-neutral-200 leading-relaxed">
                <code>{generateCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}