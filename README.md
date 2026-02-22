# DriftKit

**Motion-first UI components. Beautiful physics. Copy, paste, ship.**

A premium collection of **49+ React components** built with spring physics at their core. Every interaction feels natural — no easing curves, no keyframes, just physics-based motion that responds to user intent.

[![React 19](https://img.shields.io/badge/React-19.2-61dafb?logo=react)](https://react.dev)
[![Framer Motion 12](https://img.shields.io/badge/Framer%20Motion-12.34-ff69b4?logo=framer)](https://www.framer.com/motion/)
[![Tailwind v4](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://typescriptlang.org)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Philosophy

- **Motion IS the design** — not decoration bolted on afterward
- **Spring physics over bezier curves** — interactive elements should feel physical
- **Interruptible animations** — hover mid-press? It should feel smooth, not jarring
- **Reduced motion respected** — every component degrades gracefully
- **Copy, don't install** — grab the code, make it yours, customize freely

---

## ✦ Showpieces

**Advanced components that push beyond standard UI**

| Component | Description |
|-----------|-------------|
| **[Typewriter](src/components/typewriter.tsx)** | Characters settle with spring physics. Loop mode cycles through phrases |
| **[Magnetic Dock](src/components/magnetic-dock.tsx)** | macOS-style fisheye magnification with cursor proximity |
| **[Magnetic Button](src/components/magnetic-button.tsx)** | Subtle cursor pull with spring physics (max 8px displacement) |
| **[Cursor Glow Card](src/components/glow-card.tsx)** | Radial spotlight follows cursor with zero re-renders |
| **[Number Ticker](src/components/number-ticker.tsx)** | Slot machine digit rolling — direction-aware with physics |
| **[Morphing Hamburger](src/components/morphing-hamburger.tsx)** | Three lines fold into X with per-line spring animation |
| **[Staggered List](src/components/staggered-list.tsx)** | Cascading entrance with 3 animation variants |
| **[Mode Switcher](src/components/mode-switcher.tsx)** | Sun↔moon SVG morph + iris wipe theme transition |
| **[Parallax Tilt Card](src/components/parallax-tilt-card.tsx)** | 3D perspective tilt with multi-depth layers |
| **[Swipe Cards](src/components/swipe-cards.tsx)** | Tinder-style card stack with drag-to-dismiss physics |
| **[Marquee](src/components/marquee.tsx)** | Infinite scroll with edge fade and variable speed |
| **[Gradient Border](src/components/gradient-border.tsx)** | Rotating conic gradient border with soft glow |
| **[Spotlight](src/components/spotlight.tsx)** | Animated light beam sweeps across content |
| **[Ripple Button](src/components/ripple-button.tsx)** | Material-style click ripple with spring physics |
| **[Scroll Reveal](src/components/scroll-reveal.tsx)** | Viewport-triggered entrance animations |
| **[Text Shimmer](src/components/text-shimmer.tsx)** | Animated gradient sweep across text |
| **[Wobble Card](src/components/wobble-card.tsx)** | Jelly-like hover with low-damping spring overshoot |
| **[Animated Tabs](src/components/animated-tabs.tsx)** | Tab indicator blob morphs with layout animation |
| **[Command Palette](src/components/command-palette.tsx)** | ⌘K modal with fuzzy search and keyboard nav |
| **[Expandable Card](src/components/expandable-card.tsx)** | Shared layout animation — compact to detail morph |
| **[Cursor Trail](src/components/cursor-trail.tsx)** | Decorative dots with staggered spring decay |
| **[Liquid Button](src/components/liquid-button.tsx)** | SVG blob shape that morphs toward cursor |
| **[Animated Counter](src/components/animated-counter.tsx)** | Count-up animation when scrolled into view |
| **[Progress Ring](src/components/progress-ring.tsx)** | Circular progress with spring overshoot |
| **[Spring Carousel](src/components/spring-carousel.tsx)** | Drag-to-navigate with spring snap physics |
| **[Parallax Scroll](src/components/parallax-scroll.tsx)** | Multi-speed scrolling with spring smoothing |
| **[Morphing Shape](src/components/morphing-shape.tsx)** | SVG path morphs between geometric shapes |
| **[Schedule Picker](src/components/schedule-picker.tsx)** | Weekly availability with expandable time slots |
| **[Date Range Picker](src/components/date-range-picker.tsx)** | Two-date selector with spring calendar dropdown |
| **[Multi Select](src/components/multi-select.tsx)** | Tag input with spring entrance/exit animations |
| **[Stepper](src/components/stepper.tsx)** | Multi-step form with animated progress |
| **[Drawer](src/components/drawer.tsx)** | Side panel with spring slide and backdrop blur |
| **[Context Menu](src/components/context-menu.tsx)** | Right-click menu with keyboard shortcuts |
| **[Popover](src/components/popover.tsx)** | Smart-positioning tooltip with spring entrance |
| **[Breadcrumbs](src/components/breadcrumbs.tsx)** | Navigation breadcrumbs with click interactions |
| **[Badge](src/components/badge.tsx)** | Labels, tags, and notification badges with pulse |

---

## Standard Components

**Essential UI building blocks enhanced with motion**

| Component | Description |
|-----------|-------------|
| **[Button](src/components/button.tsx)** | Hover lift, press sink, loading states with spring physics |
| **[Input](src/components/input.tsx)** | Floating label, focus ring, error shake, success checkmark |
| **[Toggle](src/components/toggle.tsx)** | Spring-animated switch with iOS-like press squish |
| **[Tabs](src/components/tabs.tsx)** | Direction-aware content slide with spring indicator |
| **[Accordion](src/components/accordion.tsx)** | Expandable sections with height animation |
| **[Dialog](src/components/dialog.tsx)** | Spring-in modal with backdrop blur and focus trap |
| **[Tooltip](src/components/tooltip.tsx)** | Spring pop-in with auto-flip positioning |
| **[Dropdown](src/components/dropdown.tsx)** | Origin-aware spring open with staggered children |
| **[Card](src/components/card.tsx)** | Hover lift + press sink with composable sub-components |
| **[Skeleton](src/components/skeleton.tsx)** | Shimmer loading with spring crossfade reveal |
| **[Toast](src/components/toast.tsx)** | Swipe-to-dismiss notifications with auto-dismiss |
| **[Nav Menu](src/components/nav-menu.tsx)** | Sliding indicator follows mouse with spring physics |

---

## Quick Start

### Prerequisites
- React 18+
- Framer Motion
- Tailwind CSS

```bash
npm install framer-motion
# Install Tailwind CSS if you haven't already
```

### Usage

**Copy any component file into your project:**

```tsx
// Example: Spring-powered button with hover lift
import { Button } from "@/components/button";

export function MyComponent() {
  return (
    <Button variant="default" size="md">
      Click me
    </Button>
  );
}
```

**Why springs instead of bezier curves?** Springs have no fixed duration — they respond to velocity and can be interrupted at any point, naturally blending into a new target. This makes hover→press→release feel alive instead of queued-up and robotic.

```tsx
// Every component uses consistent spring configs
const springs = {
  snappy: { type: "spring", stiffness: 500, damping: 30, mass: 0.5 },
  smooth: { type: "spring", stiffness: 300, damping: 30, mass: 1 },
  quick: { type: "spring", stiffness: 500, damping: 40, mass: 0.3 },
};
```

---

## Anti-AI-Slop Positioning

This library represents **human craft** in an AI-driven world:

- **Physics understanding** — Real spring math, not CSS approximations
- **Interaction design** — Thoughtful micro-interactions at every touchpoint  
- **Performance obsession** — GPU transforms, layout animation, tree-shakeable
- **Accessibility first** — `useReducedMotion`, focus management, ARIA labels
- **Designer-developer bridge** — Built by someone who designs *and* builds

**No generated code.** **No cookie-cutter patterns.** **Just physics-based motion that feels human.**

---

## Live Demo

**🚀 [View Interactive Demo →](https://driftkit.vercel.app)**

See all 49+ components in action with live code examples, spring configuration details, and copy-paste snippets.

---

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- Development setup
- Component architecture
- Spring physics principles  
- Accessibility requirements
- Code style guidelines

---

## Credits

Built by **[Nikki Kipple](https://nikkikipple.com)** — design engineer, motion designer, and educator.

> *"Every pixel should have purpose, every transition should have physics, and every interaction should feel human."*

---

## License

[MIT License](LICENSE) — use it, modify it, ship it. 

Built with ❤️ for designers who build and developers who care about craft.

---

**DriftKit • Motion-first • 49+ Components • Copy & Paste • MIT License**