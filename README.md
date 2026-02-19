# driftkit

Motion-first UI components. Beautiful physics. Copy, paste, ship.

Every component is designed around how it moves — not how it looks with motion bolted on.

Built with [Framer Motion](https://www.framer.com/motion/) + [Tailwind CSS](https://tailwindcss.com/) + React.

## Philosophy

- **Motion is the design.** Not decoration.
- **Spring physics over bezier curves.** Interactive elements should feel physical.
- **Interruptible animations.** Hover mid-press? It should feel smooth.
- **Reduced motion respected.** Every component degrades gracefully.
- **Copy, don't install.** Grab the code, make it yours.

## Components

- [Button](src/components/button.tsx) — hover lift, press sink, loading states, spring physics
- [Toggle](src/components/toggle.tsx) — spring-animated switch with iOS-like press squish and color morphing
- [Dialog](src/components/dialog.tsx) — spring-in modal with backdrop blur, focus trap, escape dismiss
- [Toast](src/components/toast.tsx) — stacking notifications with drag-to-dismiss, auto-dismiss progress, layout animation

## Usage

Copy any component file into your project. Requires:
- `framer-motion`
- `tailwindcss`
- React 18+

## Credits

Built by [Nikki Kipple](https://nikkikipple.com) — design engineer & motion designer.

## License

MIT
