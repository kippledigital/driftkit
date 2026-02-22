// Static component data for documentation
export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description?: string;
}

export interface ComponentInfo {
  name: string;
  displayName: string;
  description: string;
  importPath: string;
  props: ComponentProp[];
  examples: string[];
  category: string;
  githubUrl: string;
}

export const componentsData: Record<string, ComponentInfo> = {
  "button": {
    name: "button",
    displayName: "Button",
    description: "Motion-first button component with multiple variants and spring physics interactions.",
    importPath: `import { DriftButton } from "driftkit";`,
    category: "Input",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/button.tsx",
    props: [
      { name: "variant", type: '"default" | "secondary" | "ghost" | "destructive"', required: false, description: "Button style variant" },
      { name: "size", type: '"sm" | "md" | "lg"', required: false, description: "Button size" },
      { name: "disabled", type: "boolean", required: false, description: "Whether button is disabled" },
      { name: "loading", type: "boolean", required: false, description: "Show loading state" },
      { name: "children", type: "React.ReactNode", required: true, description: "Button content" }
    ],
    examples: [
      `<DriftButton variant="default">
  Click me
</DriftButton>`,
      `<DriftButton variant="secondary" size="sm">
  Small button
</DriftButton>`,
      `<DriftButton variant="destructive" disabled>
  Disabled button
</DriftButton>`
    ]
  },
  "card": {
    name: "card",
    displayName: "Card",
    description: "Flexible container component with hover effects and customizable styling.",
    importPath: `import { DriftCard } from "driftkit";`,
    category: "Layout",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/card.tsx",
    props: [
      { name: "hover", type: '"none" | "lift" | "glow"', required: false, description: "Hover effect type" },
      { name: "className", type: "string", required: false, description: "Additional CSS classes" },
      { name: "children", type: "React.ReactNode", required: true, description: "Card content" }
    ],
    examples: [
      `<DriftCard>
  <p>Basic card content</p>
</DriftCard>`,
      `<DriftCard hover="lift" className="p-6">
  <h3>Interactive card</h3>
  <p>Hovers and lifts on interaction</p>
</DriftCard>`
    ]
  },
  "input": {
    name: "input",
    displayName: "Input",
    description: "Enhanced text input component with smooth focus animations.",
    importPath: `import { DriftInput } from "driftkit";`,
    category: "Input",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/input.tsx",
    props: [
      { name: "label", type: "string", required: false, description: "Input label" },
      { name: "placeholder", type: "string", required: false, description: "Placeholder text" },
      { name: "type", type: "string", required: false, description: "Input type", defaultValue: "text" },
      { name: "required", type: "boolean", required: false, description: "Whether input is required" },
      { name: "disabled", type: "boolean", required: false, description: "Whether input is disabled" }
    ],
    examples: [
      `<DriftInput placeholder="Enter text..." />`,
      `<DriftInput 
  label="Email"
  type="email" 
  required 
/>`
    ]
  },
  "magnetic-button": {
    name: "magnetic-button",
    displayName: "Magnetic Button",
    description: "Button with magnetic hover effect that follows cursor movement.",
    importPath: `import { MagneticButton } from "driftkit";`,
    category: "Buttons",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/magnetic-button.tsx",
    props: [
      { name: "strength", type: "number", required: false, description: "Magnetic effect strength", defaultValue: "0.3" },
      { name: "children", type: "React.ReactNode", required: true, description: "Button content" }
    ],
    examples: [
      `<MagneticButton>
  Hover me
</MagneticButton>`,
      `<MagneticButton strength={0.5}>
  Strong magnetic effect
</MagneticButton>`
    ]
  },
  "typewriter": {
    name: "typewriter",
    displayName: "Typewriter",
    description: "Animated typewriter text effect with customizable speed and cursor.",
    importPath: `import { Typewriter } from "driftkit";`,
    category: "Animation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/typewriter.tsx",
    props: [
      { name: "text", type: "string", required: true, description: "Text to animate" },
      { name: "speed", type: "number", required: false, description: "Typing speed in ms", defaultValue: "100" },
      { name: "showCursor", type: "boolean", required: false, description: "Show blinking cursor", defaultValue: "true" }
    ],
    examples: [
      `<Typewriter text="Hello, world!" />`,
      `<Typewriter 
  text="Fast typing animation" 
  speed={50} 
  showCursor={false} 
/>`
    ]
  }
};

export function getComponentInfo(slug: string): ComponentInfo | null {
  return componentsData[slug] || null;
}

export function getAllComponentSlugs(): string[] {
  return Object.keys(componentsData);
}

// For components without detailed info, provide basic fallback
const fallbackComponents = [
  "accordion", "animated-counter", "animated-tabs", "badge", "breadcrumbs",
  "code-block", "code-display", "command-palette", "component-switcher",
  "context-menu", "control-panel", "cursor-trail", "date-range-picker",
  "dialog", "drawer", "dropdown", "expandable-card", "glow-card",
  "gradient-border", "liquid-button", "magnetic-dock", "marquee",
  "mode-switcher", "morphing-hamburger", "morphing-shape", "multi-select",
  "nav-menu", "number-ticker", "parallax-scroll", "parallax-tilt-card",
  "popover", "progress-ring", "ripple-button", "schedule-picker",
  "scroll-reveal", "skeleton", "spotlight", "spring-carousel",
  "staggered-list", "stepper", "swipe-cards", "tabs", "text-shimmer",
  "toast", "toggle", "tooltip", "wobble-card"
];

export function getAllComponentNames(): string[] {
  return [...Object.keys(componentsData), ...fallbackComponents];
}