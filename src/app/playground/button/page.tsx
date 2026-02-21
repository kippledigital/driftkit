"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/button";
import { ControlPanel } from "@/components/control-panel";
import { CodeDisplay } from "@/components/code-display";

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

  const handleConfigChange = useCallback((key: keyof PhysicsConfig, value: any) => {
    setConfig(prev => {
      if (key === "preset") {
        // Apply preset configuration
        return { ...presets[value], preset: value };
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
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <header className="border-b border-neutral-800 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Button Playground</h1>
              <p className="text-neutral-400 mt-1">
                Experiment with spring physics and motion properties
              </p>
            </div>
            <a
              href="/"
              className="text-neutral-400 hover:text-white transition-colors text-sm"
            >
              ← Back to Components
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Left Panel - Component Preview */}
          <div className="lg:col-span-2 bg-neutral-900 rounded-lg border border-neutral-800 p-8">
            <div className="h-full flex flex-col">
              <h2 className="text-lg font-semibold mb-6 text-white">Live Preview</h2>
              
              <div className="flex-1 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-8">
                  {/* All variants showcase */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-neutral-300 text-center">Variants</h3>
                    <div className="space-y-3">
                      {["default", "secondary", "ghost", "outline"].map((variant) => (
                        <motion.button
                          key={variant}
                          className={`px-4 py-2 font-medium transition-colors ${
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

                  {/* Interactive states */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-neutral-300 text-center">States</h3>
                    <div className="space-y-3">
                      <motion.button
                        className="px-4 py-2 bg-white text-black font-medium"
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
                        className="px-4 py-2 bg-white text-black font-medium flex items-center gap-2"
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
                              className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Loading...
                          </>
                        ) : demoState.success ? (
                          <>
                            <span className="text-green-600">✓</span>
                            Success!
                          </>
                        ) : (
                          "Click me"
                        )}
                      </motion.button>
                      
                      <motion.button
                        className="px-4 py-2 bg-neutral-600 text-neutral-400 font-medium cursor-not-allowed"
                        style={{ borderRadius: `${config.borderRadius}px` }}
                        disabled
                      >
                        Disabled
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Controls */}
          <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-6">
            <ControlPanel
              title="Physics Controls"
              config={config}
              controls={controlsConfig}
              onChange={handleConfigChange}
            />
          </div>
        </div>

        {/* Bottom Panel - Code Output */}
        <div className="mt-6 bg-neutral-900 rounded-lg border border-neutral-800 p-6">
          <CodeDisplay
            title="Generated Code"
            code={generateCode}
            language="tsx"
          />
        </div>
      </div>
    </div>
  );
}