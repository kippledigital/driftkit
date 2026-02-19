export const registry = {
  button: {
    name: "Button",
    description: "Hover lift, press sink, loading states, spring physics",
    file: "src/components/button.tsx",
    dependencies: ["framer-motion"],
    tags: ["button", "interactive", "spring"],
  },
} as const;
