export const registry = {
  button: {
    name: "Button",
    description: "Hover lift, press sink, loading states, spring physics",
    file: "src/components/button.tsx",
    dependencies: ["framer-motion"],
    tags: ["button", "interactive", "spring"],
  },
  toggle: {
    name: "Toggle",
    description: "Spring-animated switch with iOS-like press squish and color morphing",
    file: "src/components/toggle.tsx",
    dependencies: ["framer-motion"],
    tags: ["toggle", "switch", "interactive", "spring"],
  },
  dialog: {
    name: "Dialog",
    description: "Spring-in modal with backdrop blur, focus trap, escape dismiss",
    file: "src/components/dialog.tsx",
    dependencies: ["framer-motion"],
    tags: ["dialog", "modal", "overlay", "spring"],
  },
  toast: {
    name: "Toast",
    description: "Stacking notifications with drag-to-dismiss, auto-dismiss progress, layout animation",
    file: "src/components/toast.tsx",
    dependencies: ["framer-motion"],
    tags: ["toast", "notification", "spring", "drag"],
  },
} as const;
