import React from "react";
import Link from "next/link";

const componentCategories = {
  "Layout": {
    description: "Components for structuring and organizing content",
    components: [
      { name: "card", description: "Flexible container with customizable styling" },
      { name: "skeleton", description: "Loading placeholder with shimmer animation" },
      { name: "gradient-border", description: "Container with animated gradient borders" },
      { name: "glow-card", description: "Card with dynamic glow effects" },
      { name: "expandable-card", description: "Card that expands on interaction" },
      { name: "wobble-card", description: "Card with subtle wobble animation" }
    ]
  },
  "Navigation": {
    description: "Components for navigation and wayfinding",
    components: [
      { name: "nav-menu", description: "Responsive navigation menu" },
      { name: "breadcrumbs", description: "Hierarchical navigation trail" },
      { name: "tabs", description: "Tabbed interface component" },
      { name: "animated-tabs", description: "Tabs with smooth animations" },
      { name: "stepper", description: "Multi-step process indicator" },
      { name: "magnetic-dock", description: "MacOS-style dock with magnetic effects" }
    ]
  },
  "Feedback": {
    description: "Components for user feedback and notifications",
    components: [
      { name: "toast", description: "Temporary notification messages" },
      { name: "tooltip", description: "Contextual information on hover" },
      { name: "dialog", description: "Modal dialog component" },
      { name: "drawer", description: "Slide-out panel component" },
      { name: "progress-ring", description: "Circular progress indicator" }
    ]
  },
  "Data Display": {
    description: "Components for displaying data and information",
    components: [
      { name: "badge", description: "Small status or label indicator" },
      { name: "accordion", description: "Collapsible content sections" },
      { name: "code-block", description: "Syntax-highlighted code display" },
      { name: "code-display", description: "Code snippet with copy functionality" },
      { name: "number-ticker", description: "Animated number counter" },
      { name: "animated-counter", description: "Counter with spring animations" }
    ]
  },
  "Overlay": {
    description: "Components that overlay other content",
    components: [
      { name: "popover", description: "Floating content container" },
      { name: "context-menu", description: "Right-click context menu" },
      { name: "dropdown", description: "Dropdown menu component" },
      { name: "command-palette", description: "Keyboard-driven command interface" },
      { name: "spotlight", description: "Search spotlight overlay" }
    ]
  },
  "Input": {
    description: "Form controls and input components",
    components: [
      { name: "button", description: "Interactive button with multiple variants" },
      { name: "input", description: "Text input with enhanced styling" },
      { name: "toggle", description: "Toggle switch component" },
      { name: "multi-select", description: "Multi-option selection component" },
      { name: "date-range-picker", description: "Date range selection interface" },
      { name: "schedule-picker", description: "Time scheduling interface" }
    ]
  },
  "Animation": {
    description: "Components focused on motion and visual effects",
    components: [
      { name: "typewriter", description: "Typewriter text animation" },
      { name: "marquee", description: "Scrolling text marquee" },
      { name: "text-shimmer", description: "Shimmering text effect" },
      { name: "staggered-list", description: "List with staggered animations" },
      { name: "scroll-reveal", description: "Reveal elements on scroll" },
      { name: "parallax-tilt-card", description: "3D tilt effect card" },
      { name: "parallax-scroll", description: "Parallax scrolling effect" },
      { name: "spring-carousel", description: "Carousel with spring physics" },
      { name: "swipe-cards", description: "Swipeable card stack" },
      { name: "morphing-shape", description: "Shape morphing animations" },
      { name: "cursor-trail", description: "Cursor trail effect" }
    ]
  },
  "Buttons": {
    description: "Specialized button components with unique interactions",
    components: [
      { name: "magnetic-button", description: "Button with magnetic hover effect" },
      { name: "ripple-button", description: "Button with ripple click effect" },
      { name: "liquid-button", description: "Button with liquid morphing effect" },
      { name: "morphing-hamburger", description: "Animated hamburger menu button" }
    ]
  },
  "Utility": {
    description: "Utility components for special functionality",
    components: [
      { name: "component-switcher", description: "Switch between different components" },
      { name: "control-panel", description: "Control panel for component demos" },
      { name: "mode-switcher", description: "Dark/light mode toggle" }
    ]
  }
};

export default function DocsPage() {
  const totalComponents = Object.values(componentCategories).reduce(
    (acc, category) => acc + category.components.length, 
    0
  );

  return (
    <div className="py-12 px-8">
        <div className="mb-12 max-w-2xl">
          <h1 className="text-4xl font-medium text-neutral-900 dark:text-white mb-4">
            Components
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-2">
            Motion-first UI components built with Framer Motion and TypeScript.
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            {totalComponents} components across {Object.keys(componentCategories).length} categories
          </p>
        </div>

        <div className="space-y-12">
          {Object.entries(componentCategories).map(([categoryName, { description, components }]) => (
            <section key={categoryName}>
              <div className="mb-6">
                <h2 className="text-2xl font-medium text-neutral-900 dark:text-white mb-2">
                  {categoryName}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {components.map(({ name, description }) => (
                  <Link
                    key={name}
                    href={`/docs/components/${name}`}
                    className="group block p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
                  >
                    <h3 className="font-medium text-neutral-900 dark:text-white mb-2 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                      {name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="text-center">
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Ready to get started?
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                href="/playground"
                className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-md hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors"
              >
                Physics Playground
              </Link>
              <Link 
                href="https://github.com/kippledigital/driftkit"
                className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
}
