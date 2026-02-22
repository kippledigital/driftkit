# Contributing to DriftKit

Thank you for your interest in contributing to DriftKit! This guide will help you understand our philosophy, development process, and how to create components that feel naturally physical.

## 🎯 Philosophy

DriftKit isn't just another UI library — it's a **motion-first** approach to building interfaces. Every contribution should embody these principles:

### Motion IS the Design
- Animation isn't decoration added afterward — it's the foundation
- Every state change should have physical meaning
- Think in terms of mass, velocity, and springs, not CSS transitions

### Spring Physics Over Bezier Curves
- Use Framer Motion's spring animations exclusively
- No `ease-in-out` or custom cubic-bezier curves
- Springs feel natural because they respond to interruption

### Interruptible Everything
- Users should be able to hover mid-press, click mid-hover, etc.
- Animations should blend smoothly, never queue up
- Test rapid interactions — they should feel fluid, not jarring

---

## 🛠 Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Getting Started

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/driftkit.git
   cd driftkit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the demo site**
   ```
   http://localhost:3000
   ```

### Project Structure
```
src/
├── components/          # All UI components
│   ├── button.tsx      # Example: enhanced button with spring physics
│   ├── toggle.tsx      # Example: iOS-like spring toggle
│   └── ...
├── app/                # Next.js app directory
│   ├── page.tsx        # Main demo site
│   └── playground/     # Individual component playgrounds
└── ...
```

---

## 🧩 Component Architecture

### File Structure
Each component should be self-contained in a single `.tsx` file:

```typescript
"use client";

import { motion, type SpringOptions } from "framer-motion";
import { useState, useEffect } from "react";

// Spring configurations - consistent across all components
const springs = {
  snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
  smooth: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
  quick: { type: "spring" as const, stiffness: 500, damping: 40, mass: 0.3 },
};

// Component interface - export for TypeScript users
export interface ComponentProps {
  // Always include className for extensibility
  className?: string;
  children?: React.ReactNode;
  // Specific props here
}

// Main component
export function Component({ className, children, ...props }: ComponentProps) {
  // Implementation with spring physics
  
  return (
    <motion.div
      className={`base-styles ${className || ""}`}
      // Spring animations here
      {...props}
    >
      {children}
    </motion.div>
  );
}
```

### Spring Configuration Guidelines

**Use these standard spring configs:**

```typescript
// Fast, snappy interactions (buttons, toggles)
snappy: { type: "spring", stiffness: 500, damping: 30, mass: 0.5 }

// Smooth, elegant motions (modals, sheets)
smooth: { type: "spring", stiffness: 300, damping: 30, mass: 1 }

// Quick, subtle effects (hover states)
quick: { type: "spring", stiffness: 500, damping: 40, mass: 0.3 }
```

**When to create custom springs:**
- Only when the standard configs don't achieve the desired feel
- Document WHY in code comments
- Test across different devices/frame rates

### Accessibility Requirements

Every component MUST:

1. **Respect reduced motion preferences**
   ```typescript
   import { useReducedMotion } from "framer-motion";
   
   const shouldReduceMotion = useReducedMotion();
   const transition = shouldReduceMotion ? { duration: 0 } : springs.smooth;
   ```

2. **Support keyboard navigation**
   ```typescript
   // Handle Enter and Space for interactive elements
   onKeyDown={(e) => {
     if (e.key === "Enter" || e.key === " ") {
       e.preventDefault();
       onClick?.(e);
     }
   }}
   ```

3. **Include proper ARIA attributes**
   ```typescript
   <motion.button
     role="button"
     aria-label="Descriptive label"
     aria-pressed={isPressed}
     tabIndex={0}
   >
   ```

4. **Maintain focus management**
   - Visible focus indicators
   - Logical tab order
   - Focus trapping in modals

---

## 📝 Code Style Guidelines

### TypeScript
- Export all component interfaces
- Use strict typing — avoid `any`
- Document complex prop types

### Tailwind Classes
- Use Tailwind v4 syntax
- Prefer utility classes over custom CSS
- Include dark mode variants
- Group classes logically:
  ```typescript
  className="
    inline-flex items-center justify-center
    px-4 py-2 rounded-lg
    text-sm font-medium
    bg-neutral-900 text-white
    hover:bg-neutral-800
    dark:bg-white dark:text-neutral-900
    dark:hover:bg-neutral-100
    transition-colors duration-150
  "
  ```

### Comments
Include these comment types:

1. **Physics explanations** (why this spring config?)
   ```typescript
   // Why springs instead of bezier curves? Springs have no fixed duration — they
   // respond to velocity and can be interrupted at any point, naturally blending
   // into a new target. This makes hover→press→release feel alive instead of
   // queued-up and robotic.
   ```

2. **Interaction design decisions**
   ```typescript
   // The toggle should "squish" like iOS — scale down on press, pop back on release.
   // This gives physical feedback that the action registered.
   ```

3. **Performance notes**
   ```typescript
   // Using transform instead of changing width/height to avoid layout thrash.
   // GPU-accelerated and won't trigger reflows.
   ```

---

## 🧪 Testing Your Component

### Manual Testing Checklist
- [ ] Works on mobile (touch interactions)
- [ ] Smooth at 60fps on slower devices  
- [ ] Handles rapid interactions gracefully
- [ ] Respects `prefers-reduced-motion`
- [ ] Keyboard navigation works
- [ ] Focus indicators are visible
- [ ] Dark mode looks good
- [ ] Component is screen reader accessible

### Integration Testing
1. Add your component to the main demo page (`src/app/page.tsx`)
2. Create a demo section showing different states/variants
3. Include a code snippet showing usage
4. Test in different screen sizes

---

## 📋 Submitting a Pull Request

### Before You Submit
1. **Test thoroughly** — manual testing on multiple devices
2. **Check accessibility** — use a screen reader, keyboard-only navigation
3. **Add to demo site** — show your component in action
4. **Write clear commit messages**
   ```
   feat(button): add liquid morphing variant
   
   - SVG blob shape that morphs toward cursor
   - Uses spring physics for organic feel
   - Includes hover and press states
   - Fully accessible with keyboard support
   ```

### PR Template
When submitting, include:

- **What does this PR do?** Brief description
- **Type of component** (Showpiece or Standard)
- **Design inspiration** (if any)
- **Accessibility considerations** 
- **Browser testing** (which browsers/devices tested)
- **Screenshots/GIFs** (especially for motion-heavy components)

---

## 🎨 Design Inspiration

When creating new components, draw inspiration from:

- **Physical materials** — springs, rubber, liquid, magnets
- **High-end apps** — iOS interactions, premium web experiences
- **Motion design** — 12 principles of animation adapted for UI
- **Nature** — organic movement, physics, gravity

Avoid:
- Overly complex animations that distract from content
- Motion without purpose (animation for animation's sake)
- Copying trends without understanding the underlying physics
- Breaking established interaction patterns

---

## 🤝 Community Guidelines

### Be Constructive
- Focus on the work, not the person
- Suggest improvements rather than just pointing out flaws
- Share knowledge — explain WHY something feels better

### Motion-First Mindset
- Consider how every state change should move
- Think about velocity, not just start and end positions
- Test interactions, don't just review static code

### Respect the Philosophy
- Springs over keyframes
- Physics over arbitrary timing
- Human feel over pixel perfection

---

## 🎓 Learning Resources

### Framer Motion
- [Official Framer Motion docs](https://www.framer.com/motion/)
- [Spring Animation Guide](https://www.framer.com/motion/transition/#spring)
- [Layout Animations](https://www.framer.com/motion/layout-animations/)

### Motion Design Principles
- [12 Principles of Animation](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation)
- [Material Motion](https://material.io/design/motion/)
- [iOS Human Interface Guidelines - Motion](https://developer.apple.com/design/human-interface-guidelines/motion)

### Spring Physics
- [A Complete Guide to CSS Springs](https://www.joshwcomeau.com/animation/css-transitions/#springs)
- [The Physics of Spring Animations](https://blog.maximeheckel.com/posts/the-physics-behind-spring-animations/)

---

## 💬 Questions?

- **General questions:** Open a [GitHub Discussion](https://github.com/kippledigital/driftkit/discussions)
- **Bug reports:** Create a [GitHub Issue](https://github.com/kippledigital/driftkit/issues)
- **Feature requests:** Start with a Discussion to gather feedback

---

**Thank you for contributing to DriftKit!** 

Every component you add makes the web a little more physics-based and a lot more human. ✨