"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/button";
import { Toggle } from "@/components/toggle";
import { Dialog, DialogTitle, DialogDescription, DialogFooter } from "@/components/dialog";
import { useToast } from "@/components/toast";
import { MagneticButton } from "@/components/magnetic-button";
import { MagneticDock } from "@/components/magnetic-dock";
import { SwipeCards } from "@/components/swipe-cards";
import { AnimatedTabs } from "@/components/animated-tabs";
import { CommandPalette } from "@/components/command-palette";
import { ExpandableCard } from "@/components/expandable-card";
import { ParallaxTiltCard, ParallaxLayer } from "@/components/parallax-tilt-card";
import { WobbleCard } from "@/components/wobble-card";

// =============================================================================
// DEMO COMPONENTS
// =============================================================================

export function MagneticButtonDemo() {
  return (
    <div className="flex flex-wrap gap-8 items-center justify-center">
      <MagneticButton><Button>Hover near me</Button></MagneticButton>
      <MagneticButton intensity={0.5}><Button variant="secondary">Subtle pull</Button></MagneticButton>
      <MagneticButton intensity={1.5}><Button variant="ghost">Strong pull</Button></MagneticButton>
    </div>
  );
}

export function MagneticDockDemo() {
  const dockItems = [
    { id: "finder", icon: "📁", label: "Finder" },
    { id: "safari", icon: "🧭", label: "Safari" },
    { id: "mail", icon: "✉️", label: "Mail" },
    { id: "music", icon: "🎵", label: "Music" },
    { id: "photos", icon: "🖼️", label: "Photos" },
    { id: "terminal", icon: "⬛", label: "Terminal" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];
  return <div className="flex justify-center py-4"><MagneticDock items={dockItems} /></div>;
}

export function SwipeCardsDemo() {
  const [key, setKey] = useState(0);
  const cards = [
    { id: "1", content: <div><h3 className="text-lg font-bold mb-1">Card One</h3><p className="text-sm text-neutral-600 dark:text-neutral-400">Swipe me left or right →</p></div> },
    { id: "2", content: <div><h3 className="text-lg font-bold mb-1">Card Two</h3><p className="text-sm text-neutral-600 dark:text-neutral-400">Spring physics dismiss</p></div> },
    { id: "3", content: <div><h3 className="text-lg font-bold mb-1">Card Three</h3><p className="text-sm text-neutral-600 dark:text-neutral-400">Stack depth illusion</p></div> },
    { id: "4", content: <div><h3 className="text-lg font-bold mb-1">Card Four</h3><p className="text-sm text-neutral-600 dark:text-neutral-400">Last one!</p></div> },
  ];
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="h-[280px] overflow-hidden">
        <SwipeCards key={key} cards={cards} />
      </div>
      <Button size="sm" variant="ghost" onClick={() => setKey((k) => k + 1)}>Reset cards</Button>
    </div>
  );
}

export function AnimatedTabsDemo() {
  return (
    <AnimatedTabs items={[
      { id: "design", label: "Design", content: <p className="text-sm text-neutral-600 dark:text-neutral-400 p-3">Start with motion. Every interaction has weight, velocity, and spring.</p> },
      { id: "develop", label: "Develop", content: <p className="text-sm text-neutral-600 dark:text-neutral-400 p-3">Copy the component. Paste it. Tweak the spring config. Ship it.</p> },
      { id: "deploy", label: "Deploy", content: <p className="text-sm text-neutral-600 dark:text-neutral-400 p-3">Zero dependencies beyond Framer Motion. Tree-shakeable. SSR-safe.</p> },
    ]} />
  );
}

export function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);
  const items = [
    { id: "1", icon: "📁", label: "Open File", shortcut: "⌘O", onSelect: () => {} },
    { id: "2", icon: "🔍", label: "Search Components", shortcut: "⌘F", onSelect: () => {} },
    { id: "3", icon: "🎨", label: "Toggle Theme", shortcut: "⌘D", onSelect: () => {} },
    { id: "4", icon: "📋", label: "Copy to Clipboard", shortcut: "⌘C", onSelect: () => {} },
    { id: "5", icon: "⚙️", label: "Settings", onSelect: () => {} },
    { id: "6", icon: "🚀", label: "Deploy Project", onSelect: () => {} },
  ];
  return (
    <div className="flex justify-center">
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>Open ⌘K Palette</Button>
      <CommandPalette items={items} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export function ExpandableCardDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ExpandableCard
        preview={<div><h3 className="text-base font-semibold">Spring Physics</h3><p className="text-sm text-neutral-600 dark:text-neutral-400">Click to expand →</p></div>}
        detail={<div className="text-sm text-neutral-600 dark:text-neutral-400 space-y-2"><p>Springs model real-world physics: mass, stiffness, and damping. Unlike easing curves, springs respond to interruption naturally.</p><p>Change the target mid-animation and the spring redirects — no jarring restart.</p></div>}
      />
      <ExpandableCard
        preview={<div><h3 className="text-base font-semibold">Layout Animations</h3><p className="text-sm text-neutral-600 dark:text-neutral-400">Click to expand →</p></div>}
        detail={<div className="text-sm text-neutral-600 dark:text-neutral-400 space-y-2"><p>Framer Motion&apos;s layout animations automatically animate between DOM states — position, size, border-radius all morph smoothly.</p><p>No FLIP calculations by hand. Just add layout to the component.</p></div>}
      />
    </div>
  );
}

export function ParallaxTiltCardDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ParallaxTiltCard className="h-48">
        <div className="p-6 h-full flex flex-col justify-end">
          <ParallaxLayer depth={2}><h3 className="text-lg font-bold">3D Tilt</h3></ParallaxLayer>
          <ParallaxLayer depth={1}><p className="text-sm text-neutral-600 dark:text-neutral-400">Hover and move your cursor. Layers shift at different depths.</p></ParallaxLayer>
        </div>
      </ParallaxTiltCard>
      <ParallaxTiltCard maxTilt={20} className="h-48">
        <div className="p-6 h-full flex flex-col justify-center items-center text-center">
          <ParallaxLayer depth={3}><span className="text-4xl">✦</span></ParallaxLayer>
          <ParallaxLayer depth={1}><p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">Extra tilt + deep parallax</p></ParallaxLayer>
        </div>
      </ParallaxTiltCard>
    </div>
  );
}

export function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <WobbleCard><div className="p-6"><h3 className="text-base font-semibold mb-1">Jelly Hover</h3><p className="text-sm text-neutral-400">Move your cursor across this card. It wobbles like jelly with spring decay.</p></div></WobbleCard>
      <WobbleCard><div className="p-6"><h3 className="text-base font-semibold mb-1">Spring Physics</h3><p className="text-sm text-neutral-400">Low damping creates the bouncy overshoot. Leave and it springs back.</p></div></WobbleCard>
    </div>
  );
}

export function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Button variant="secondary" size="sm" onClick={() => toast({ title: "Hello!", description: "Default toast." })}>Default</Button>
      <Button variant="secondary" size="sm" onClick={() => toast({ title: "Saved!", description: "Changes saved.", variant: "success" })}>Success</Button>
      <Button variant="secondary" size="sm" onClick={() => toast({ title: "Error", description: "Something went wrong.", variant: "error" })}>Error</Button>
      <Button variant="secondary" size="sm" onClick={() => toast({ title: "Warning", description: "Disk space low.", variant: "warning" })}>Warning</Button>
    </div>
  );
}

export function ToggleDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex flex-wrap items-center gap-4">
        <Toggle size="sm" checked={checked} onChange={setChecked} aria-label="Small" />
        <Toggle size="md" checked={checked} onChange={setChecked} aria-label="Medium" />
        <Toggle size="lg" checked={checked} onChange={setChecked} aria-label="Large" />
        <span className="text-sm text-neutral-500">{checked ? "On" : "Off"}</span>
      </div>
      <div className="flex items-center gap-4">
        <Toggle disabled checked={false} aria-label="Disabled off" />
        <Toggle disabled checked={true} aria-label="Disabled on" />
        <span className="text-sm text-neutral-400">Disabled</span>
      </div>
    </div>
  );
}

// =============================================================================
// DEMO MAPPING
// =============================================================================

export const COMPONENT_DEMOS: Record<string, React.ComponentType> = {
  "magnetic-button": MagneticButtonDemo,
  "magnetic-dock": MagneticDockDemo,
  "swipe-cards": SwipeCardsDemo,
  "animated-tabs": AnimatedTabsDemo,
  "command-palette": CommandPaletteDemo,
  "expandable-card": ExpandableCardDemo,
  "parallax-tilt-card": ParallaxTiltCardDemo,
  "wobble-card": WobbleCardDemo,
  "toast": ToastDemo,
  "toggle": ToggleDemo,
};

export function getDemoComponent(componentName: string): React.ComponentType | null {
  return COMPONENT_DEMOS[componentName] || null;
}