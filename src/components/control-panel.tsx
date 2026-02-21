"use client";

import React, { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";

export interface ControlConfig {
  type: "slider" | "dropdown";
  label: string;
  key: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: { value: any; label: string }[];
}

export interface ControlPanelProps {
  title: string;
  config: Record<string, any>;
  controls: ControlConfig[];
  onChange: (key: string, value: any) => void;
}

function CustomSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!trackRef.current || !isDragging) return;

      const rect = trackRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const newValue = min + (x / rect.width) * (max - min);
      const steppedValue = Math.round(newValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));
      
      onChange(clampedValue);
    },
    [isDragging, min, max, step, onChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleTrackClick = useCallback(
    (e: React.MouseEvent) => {
      if (!trackRef.current) return;
      
      const rect = trackRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const newValue = min + (x / rect.width) * (max - min);
      const steppedValue = Math.round(newValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));
      
      onChange(clampedValue);
    },
    [min, max, step, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let newValue = value;
      
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown":
          newValue = Math.max(min, value - step);
          break;
        case "ArrowRight":
        case "ArrowUp":
          newValue = Math.min(max, value + step);
          break;
        case "Home":
          newValue = min;
          break;
        case "End":
          newValue = max;
          break;
        default:
          return;
      }
      
      e.preventDefault();
      onChange(newValue);
    },
    [value, min, max, step, onChange]
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-mono text-neutral-300 select-none">
          {label}
        </label>
        <span className="text-sm font-mono text-neutral-400 tabular-nums">
          {value}
          {unit}
        </span>
      </div>
      
      <div className="relative">
        {/* Track */}
        <div
          ref={trackRef}
          className="relative h-2 bg-neutral-800 rounded-full cursor-pointer"
          onClick={handleTrackClick}
        >
          {/* Fill */}
          <motion.div
            className="absolute top-0 left-0 h-full bg-white rounded-full"
            style={{ width: `${percentage}%` }}
            layout
          />
          
          {/* Thumb */}
          <motion.div
            className={`absolute top-1/2 w-4 h-4 bg-white rounded-full -translate-y-1/2 cursor-grab active:cursor-grabbing ${
              isFocused ? "ring-2 ring-white ring-opacity-50" : ""
            }`}
            style={{ left: `${percentage}%`, marginLeft: "-8px" }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onMouseDown={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="slider"
            aria-valuenow={value}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-label={label}
          />
        </div>
      </div>
    </div>
  );
}

function CustomDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: any;
  options: { value: any; label: string }[];
  onChange: (value: any) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const currentOption = options.find(opt => opt.value === value);

  return (
    <div className="space-y-2">
      <label className="text-sm font-mono text-neutral-300 select-none">
        {label}
      </label>
      
      <div className="relative">
        <motion.button
          className="w-full px-3 py-2 bg-neutral-800 text-white rounded border border-neutral-700 text-left flex items-center justify-between text-sm font-mono"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.98 }}
        >
          <span>{currentOption?.label}</span>
          <motion.span
            className="text-neutral-400"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▼
          </motion.span>
        </motion.button>
        
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Options */}
            <motion.div
              className="absolute top-full left-0 right-0 mt-1 bg-neutral-800 border border-neutral-700 rounded shadow-lg z-20"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  className={`w-full px-3 py-2 text-left text-sm font-mono hover:bg-neutral-700 transition-colors ${
                    option.value === value ? "bg-neutral-700 text-white" : "text-neutral-300"
                  }`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

export function ControlPanel({ title, config, controls, onChange }: ControlPanelProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      
      <div className="space-y-4">
        {controls.map((control) => (
          <div key={control.key}>
            {control.type === "slider" ? (
              <CustomSlider
                label={control.label}
                value={config[control.key]}
                min={control.min}
                max={control.max}
                step={control.step}
                unit={control.unit}
                onChange={(value) => onChange(control.key, value)}
              />
            ) : control.type === "dropdown" && control.options ? (
              <CustomDropdown
                label={control.label}
                value={config[control.key]}
                options={control.options}
                onChange={(value) => onChange(control.key, value)}
              />
            ) : null}
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t border-neutral-800">
        <div className="text-xs text-neutral-500 space-y-1">
          <p>• Drag sliders to adjust values</p>
          <p>• Use arrow keys for precision</p>
          <p>• Try different presets for quick configs</p>
        </div>
      </div>
    </div>
  );
}