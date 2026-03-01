<div align="center">

# DriftKit

### Motion-first UI components with spring physics.

**49+ React components** where every hover, press, and transition is driven by real spring math — not CSS keyframes, not bezier approximations. Physics.

[![React 19](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev)
[![Framer Motion 12](https://img.shields.io/badge/Framer%20Motion-12-ff69b4?logo=framer)](https://www.framer.com/motion/)
[![Tailwind v4](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://typescriptlang.org)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[**Live Demo**](https://driftkit.vercel.app) · [**Docs**](https://driftkit.vercel.app/docs) · [**Playground**](https://driftkit.vercel.app/playground)

<!-- TODO: Add hero GIF/video showing 6-8 components in action -->

</div>

---

## Why Springs?

CSS animations use **bezier curves** — fixed duration, fixed path, can't be interrupted. If a user hovers mid-press, the animations queue up and fight each other.

Spring animations have **no fixed duration**. They respond to velocity, can be interrupted at any point, and naturally blend into new targets. The result: interactions that feel *physical* instead of *scripted*.

```
Bezier:   ████████████░░░░  (waits to finish, then starts next)
Spring:   ████████↗████████  (redirects mid-flight, no delay)
```

Every DriftKit component uses consistent spring configurations:

```tsx
const springs = {
  snappy: { type: "spring", stiffness: 500, damping: 30, mass: 0.5 },
  smooth: { type: "spring", stiffness: 300, damping: 30, mass: 1   },
  quick:  { type: "spring", stiffness: 500, damping: 40, mass: 0.3 },
};
```

---

## Quick Start

```bash
npm install framer-motion
```

Copy any component file into your project. That's it. No package to install, no config to set up. Grab the `.tsx`, drop it in your components folder, customize freely.

```tsx
import { Button } from "@/components/button";

<Button variant="default" size="md">
  Ship it
</Button>
```

---

## Components

### ⚡ Showpieces

Components that push beyond standard UI — the ones people screenshot.

| Component | What it does |
|-----------|-------------|
| **Typewriter** | Characters land with spring physics. Loop mode cycles phrases. |
| **Magnetic Dock** | macOS-style fisheye magnification with cursor proximity |
| **Magnetic Button** | Subtle cursor pull with spring physics (max 8px displacement) |
| **Cursor Glow Card** | Radial spotlight follows cursor — zero re-renders |
| **Number Ticker** | Slot machine digit rolling, direction-aware |
| **Morphing Hamburger** | Three lines → X with per-line spring timing |
| **Parallax Tilt Card** | 3D perspective tilt with multi-depth layers |
| **Swipe Cards** | Tinder-style drag-to-dismiss with velocity physics |
| **Liquid Button** | SVG blob that morphs toward cursor |
| **Command Palette** | ⌘K modal with fuzzy search and keyboard nav |

### 🧱 Foundation

Essential UI building blocks, enhanced with motion.

| Component | What it does |
|-----------|-------------|
| **Button** | Hover lift, press sink, loading → success states |
| **Input** | Floating label, focus ring, error shake, success checkmark |
| **Toggle** | iOS-like switch with press squish |
| **Card** | Hover lift + press sink, composable sub-components |
| **Dialog** | Spring-in modal with backdrop blur and focus trap |
| **Drawer** | Side panel with spring slide and backdrop blur |
| **Dropdown** | Origin-aware spring open with staggered children |
| **Tabs** | Direction-aware content slide with spring indicator |
| **Accordion** | Expandable sections with height animation |
| **Toast** | Swipe-to-dismiss with auto-dismiss countdown |
| **Tooltip** | Spring pop-in with auto-flip positioning |
| **Skeleton** | Shimmer loading with spring crossfade reveal |

### 🗺️ Navigation

| Component | What it does |
|-----------|-------------|
| **Nav Menu** | Sliding indicator follows mouse with spring physics |
| **Animated Tabs** | Tab indicator blob morphs with layout animation |
| **Breadcrumbs** | Navigation trail with click interactions |
| **Stepper** | Multi-step form with animated progress |
| **Context Menu** | Right-click menu with keyboard shortcuts |
| **Popover** | Smart-positioning tooltip with spring entrance |

### 🎨 Data Display

| Component | What it does |
|-----------|-------------|
| **Badge** | Labels, tags, notification badges with pulse |
| **Animated Counter** | Count-up animation on scroll-into-view |
| **Progress Ring** | Circular progress with spring overshoot |
| **Expandable Card** | Shared layout animation — compact to detail morph |

### ✨ Animation & Effects

| Component | What it does |
|-----------|-------------|
| **Scroll Reveal** | Viewport-triggered entrance animations |
| **Staggered List** | Cascading entrance with 3 animation variants |
| **Marquee** | Infinite scroll with edge fade and variable speed |
| **Text Shimmer** | Animated gradient sweep across text |
| **Spotlight** | Animated light beam sweeps across content |
| **Gradient Border** | Rotating conic gradient with soft glow |
| **Cursor Trail** | Decorative dots with staggered spring decay |
| **Morphing Shape** | SVG path morphs between geometric shapes |
| **Parallax Scroll** | Multi-speed scrolling with spring smoothing |
| **Spring Carousel** | Drag-to-navigate with spring snap |
| **Mode Switcher** | Sun↔moon SVG morph + iris wipe theme transition |

### 📅 Form Components

| Component | What it does |
|-----------|-------------|
| **Multi Select** | Tag input with spring entrance/exit |
| **Date Range Picker** | Two-date selector with spring calendar dropdown |
| **Schedule Picker** | Weekly availability with expandable time slots |

---

## How It Compares

| | **DriftKit** | shadcn/ui | Magic UI | Aceternity UI |
|---|---|---|---|---|
| **Components** | 49+ | 50+ | 30+ | 40+ |
| **Physics model** | Spring-first | None (CSS) | Partial | Partial |
| **Interruptible** | ✅ All | ❌ | Some | Some |
| **Reduced motion** | ✅ Built-in | Manual | Manual | ❌ |
| **Copy-paste** | ✅ | ✅ | ✅ | ✅ |
| **Focus** | Motion + Physics | Accessibility + Primitives | Visual effects | Visual effects |
| **Spring playground** | ✅ Built-in | ❌ | ❌ | ❌ |

**DriftKit isn't competing with shadcn** — it's the motion layer you add on top. Where shadcn gives you solid, accessible primitives with minimal motion, DriftKit gives you components where motion *is* the design.

---

## Philosophy

- **Motion IS the design** — not decoration bolted on afterward
- **Spring physics over bezier curves** — interactions should feel physical
- **Interruptible everything** — hover mid-press should feel smooth, not jarring
- **Reduced motion respected** — every component degrades gracefully
- **Copy, don't install** — grab the code, make it yours

### No AI Slop

This library represents human craft:

- **Real spring math** — not CSS approximations
- **Thoughtful micro-interactions** at every touchpoint
- **Performance obsession** — GPU transforms, layout animation, tree-shakeable
- **Accessibility first** — `useReducedMotion`, focus management, ARIA
- **Designer-developer bridge** — built by someone who designs *and* builds

No generated code. No cookie-cutter patterns. Physics-based motion that feels human.

---

## Roadmap

- [ ] CLI tool: `npx driftkit add button` (like shadcn CLI)
- [ ] Spring playground v2: live physics tuning with export
- [ ] Full documentation site with guides and recipes
- [ ] Figma tokens integration
- [ ] Server Components support
- [ ] Motion Recipes: real-world animation patterns (Stripe, Vercel, Apple)
- [ ] More components: Avatar, Select, Slider, Checkbox, Radio, Progress Bar

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, component architecture, and spring physics principles.

---

## Credits

Built by **[Nikki Kipple](https://nikkikipple.com)** — design engineer, motion designer, and educator.

> *"Every pixel should have purpose, every transition should have physics, and every interaction should feel human."*

## License

[MIT](LICENSE) — use it, modify it, ship it.

---

<div align="center">

**DriftKit** · 49+ Components · Spring Physics · Copy & Paste · MIT

</div>
