"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export interface ComponentSwitcherProps {
  currentComponent: string;
}

const components = [
  { id: "button", name: "Button", path: "/playground/button", available: true },
  { id: "card", name: "Card", path: "/playground/card", available: false },
  { id: "tabs", name: "Tabs", path: "/playground/tabs", available: false },
  { id: "accordion", name: "Accordion", path: "/playground/accordion", available: false },
  { id: "modal", name: "Modal", path: "/playground/modal", available: false },
  { id: "tooltip", name: "Tooltip", path: "/playground/tooltip", available: false },
  { id: "carousel", name: "Carousel", path: "/playground/carousel", available: false },
  { id: "input", name: "Input", path: "/playground/input", available: false },
  { id: "dropdown", name: "Dropdown", path: "/playground/dropdown", available: false },
];

export function ComponentSwitcher({ currentComponent }: ComponentSwitcherProps) {
  return (
    <div className="border-b border-neutral-800 bg-neutral-900">
      <div className="flex items-center px-4 py-2">
        <span className="text-sm font-mono text-neutral-400 mr-4">Components:</span>
        
        <div className="flex items-center space-x-1 overflow-x-auto">
          {components.map((component) => {
            const isActive = component.id === currentComponent;
            const isAvailable = component.available;

            if (isAvailable) {
              return (
                <Link key={component.id} href={component.path}>
                  <motion.div
                    className={`px-3 py-1.5 text-sm font-mono rounded transition-colors whitespace-nowrap ${
                      isActive
                        ? "bg-white text-black"
                        : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white"
                    }`}
                    whileHover={{ scale: isActive ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {component.name}
                  </motion.div>
                </Link>
              );
            } else {
              return (
                <motion.div
                  key={component.id}
                  className="px-3 py-1.5 text-sm font-mono rounded bg-neutral-850 text-neutral-500 cursor-not-allowed whitespace-nowrap relative"
                  title="Coming soon"
                >
                  {component.name}
                  <span className="ml-2 text-xs text-neutral-600">soon</span>
                </motion.div>
              );
            }
          })}
        </div>

        <div className="ml-auto">
          <Link href="/">
            <motion.span
              className="text-sm font-mono text-neutral-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              Back
            </motion.span>
          </Link>
        </div>
      </div>
    </div>
  );
}