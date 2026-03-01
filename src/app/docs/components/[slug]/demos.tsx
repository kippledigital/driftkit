"use client";

import React, { useState, useCallback, useRef } from "react";
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
import { Accordion } from "@/components/accordion";
import { AnimatedCounter } from "@/components/animated-counter";
import { Badge } from "@/components/badge";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Card } from "@/components/card";
import { CodeBlock } from "@/components/code-block";
import { CodeDisplay } from "@/components/code-display";
import { ComponentSwitcher } from "@/components/component-switcher";
import { ContextMenu } from "@/components/context-menu";
import { ControlPanel } from "@/components/control-panel";
import { CursorTrail } from "@/components/cursor-trail";
import { DateRangePicker } from "@/components/date-range-picker";
import { Drawer } from "@/components/drawer";
import { Dropdown } from "@/components/dropdown";
import { GlowCard } from "@/components/glow-card";
import { GradientBorder } from "@/components/gradient-border";
import { Input } from "@/components/input";
import { LiquidButton } from "@/components/liquid-button";
import { Marquee } from "@/components/marquee";
import { ModeSwitcher } from "@/components/mode-switcher";
import { MorphingHamburger } from "@/components/morphing-hamburger";
import { MorphingShape } from "@/components/morphing-shape";
import { MultiSelect } from "@/components/multi-select";
import { NavMenu } from "@/components/nav-menu";
import { NumberTicker } from "@/components/number-ticker";
import { ParallaxScroll, ParallaxItem } from "@/components/parallax-scroll";
import { Popover } from "@/components/popover";
import { ProgressRing } from "@/components/progress-ring";
import { RippleButton } from "@/components/ripple-button";
import { SchedulePicker } from "@/components/schedule-picker";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Skeleton } from "@/components/skeleton";
import { Spotlight } from "@/components/spotlight";
import { SpringCarousel } from "@/components/spring-carousel";
import { StaggeredList } from "@/components/staggered-list";
import { Stepper } from "@/components/stepper";
import { Tabs } from "@/components/tabs";
import { TextShimmer } from "@/components/text-shimmer";
import { Tooltip } from "@/components/tooltip";
import { Typewriter } from "@/components/typewriter";

// =============================================================================
// EXISTING DEMO COMPONENTS
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
        <span className="text-sm text-neutral-500 dark:text-neutral-300">{checked ? "On" : "Off"}</span>
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
// NEW COMPONENT DEMOS (42 components)
// =============================================================================

export function AccordionDemo() {
  return (
    <div className="w-full max-w-md">
      <Accordion
        type="single"
        items={[
          {
            value: "item-1",
            trigger: "What is spring physics?",
            content: (
              <div className="text-sm text-neutral-600 dark:text-neutral-400 space-y-2">
                <p>Springs model real-world physics: mass, stiffness, and damping. Unlike easing curves, springs respond to interruption naturally.</p>
                <p>Change the target mid-animation and the spring redirects smoothly.</p>
              </div>
            ),
          },
          {
            value: "item-2",
            trigger: "How do layout animations work?",
            content: (
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                <p>Framer Motion's layout animations automatically animate between DOM states — position, size, border-radius all morph smoothly without manual FLIP calculations.</p>
              </div>
            ),
          },
          {
            value: "item-3",
            trigger: "Are these components tree-shakeable?",
            content: (
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                <p>Yes! Zero dependencies beyond Framer Motion. Import only what you need.</p>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

export function AnimatedCounterDemo() {
  const [target, setTarget] = useState(1234);
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <div className="text-3xl font-bold">
          <AnimatedCounter target={target} />
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-300 mt-1">Revenue this month</p>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onClick={() => setTarget(567)}>$567</Button>
        <Button size="sm" variant="secondary" onClick={() => setTarget(1234)}>$1,234</Button>
        <Button size="sm" variant="secondary" onClick={() => setTarget(5678)}>$5,678</Button>
        <Button size="sm" variant="secondary" onClick={() => setTarget(12345)}>$12,345</Button>
      </div>
    </div>
  );
}

export function BadgeDemo() {
  const [showPulse, setShowPulse] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
      <div className="flex flex-wrap gap-3">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </div>
      <div className="flex flex-wrap gap-3">
        <Badge icon={<span>🔥</span>}>With icon</Badge>
        <Badge pulse={showPulse} variant="success">
          <span className="flex items-center gap-1">
            Live status
          </span>
        </Badge>
        <Badge removable onRemove={() => console.log('Removed')}>Removable</Badge>
      </div>
      <Button size="sm" variant="ghost" onClick={() => setShowPulse(!showPulse)}>
        Toggle pulse
      </Button>
    </div>
  );
}

export function BreadcrumbsDemo() {
  return (
    <div className="space-y-4">
      <Breadcrumbs
        items={[
          { id: "home", label: "Home", href: "#" },
          { id: "components", label: "Components", href: "#" },
          { id: "navigation", label: "Navigation", href: "#" },
          { id: "breadcrumbs", label: "Breadcrumbs" },
        ]}
      />
      <Breadcrumbs
        separator="/"
        items={[
          { id: "users", label: "Users", href: "#" },
          { id: "settings", label: "Settings", href: "#" },
          { id: "profile", label: "Profile" },
        ]}
      />
      <Breadcrumbs
        separator=">"
        items={[
          { id: "home-icon", label: "🏠", href: "#" },
          { id: "folder-icon", label: "📁", href: "#" },
          { id: "document", label: "Document.pdf" },
        ]}
      />
    </div>
  );
}

export function ButtonDemo() {
  const [loading, setLoading] = useState(false);
  
  const handleAsyncAction = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button disabled>Disabled</Button>
        <Button loading={loading} onClick={handleAsyncAction}>
          {loading ? "Loading..." : "Async Action"}
        </Button>
      </div>
    </div>
  );
}

export function CardDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2">Interactive Card</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Cards respond to hover and press with subtle animations by default.
        </p>
      </Card>
      <Card className="p-6" static>
        <h3 className="text-lg font-semibold mb-2">Static Card</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          This card has interactions disabled using the static prop.
        </p>
      </Card>
    </div>
  );
}

export function CodeBlockDemo() {
  const jsCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55`;

  const tsCode = `interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
};`;

  return (
    <div className="space-y-4">
      <CodeBlock code={jsCode} label="JavaScript" />
      <CodeBlock code={tsCode} label="TypeScript" />
    </div>
  );
}

export function CodeDisplayDemo() {
  return (
    <div className="space-y-4">
      <CodeDisplay
        title="Button Component"
        language="tsx"
        code={`<Button variant="secondary" size="lg">
  Click me
</Button>`}
      />
      <CodeDisplay
        title="Installation Commands"
        language="bash"
        code={`npm install driftkit
yarn add driftkit`}
      />
    </div>
  );
}

export function ComponentSwitcherDemo() {
  return (
    <div className="rounded-lg overflow-hidden">
      <ComponentSwitcher currentComponent="button" />
    </div>
  );
}

export function ContextMenuDemo() {
  return (
    <div className="flex justify-center p-8">
      <ContextMenu
        items={[
          { id: "cut", label: "Cut", shortcut: "⌘X", onClick: () => console.log("Cut") },
          { id: "copy", label: "Copy", shortcut: "⌘C", onClick: () => console.log("Copy") },
          { id: "paste", label: "Paste", shortcut: "⌘V", onClick: () => console.log("Paste") },
          { id: "separator-1", label: "", separator: true },
          { id: "delete", label: "Delete", shortcut: "⌫", onClick: () => console.log("Delete") },
        ]}
      >
        <div className="bg-neutral-100 dark:bg-neutral-800 border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-lg p-8 cursor-pointer">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
            Right-click me for context menu
          </p>
        </div>
      </ContextMenu>
    </div>
  );
}

export function ControlPanelDemo() {
  const [config, setConfig] = useState({
    stiffness: 300,
    damping: 30,
    mass: 1,
    easing: "spring",
  });

  const handleChange = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <ControlPanel
      title="Spring Configuration"
      config={config}
      controls={[
        {
          type: "slider",
          label: "Stiffness",
          key: "stiffness",
          min: 100,
          max: 1000,
          step: 50,
        },
        {
          type: "slider",
          label: "Damping",
          key: "damping",
          min: 10,
          max: 100,
          step: 5,
        },
        {
          type: "slider",
          label: "Mass",
          key: "mass",
          min: 0.1,
          max: 5,
          step: 0.1,
        },
        {
          type: "dropdown",
          label: "Easing",
          key: "easing",
          options: [
            { value: "spring", label: "Spring" },
            { value: "ease", label: "Ease" },
            { value: "ease-in", label: "Ease In" },
            { value: "ease-out", label: "Ease Out" },
          ],
        },
      ]}
      onChange={handleChange}
    />
  );
}

export function CursorTrailDemo() {
  return (
    <div className="relative">
      <CursorTrail />
      <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Move your cursor around</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Watch the particles follow your movement with physics simulation.
        </p>
      </div>
    </div>
  );
}

export function DateRangePickerDemo() {
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  
  return (
    <div className="flex justify-center">
      <DateRangePicker
        value={range}
        onChange={setRange}
        placeholder={{ start: "Start date", end: "End date" }}
      />
    </div>
  );
}

export function DialogDemo() {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="flex justify-center">
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this item? This action cannot be undone.
        </DialogDescription>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={() => setOpen(false)}>Delete</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export function DrawerDemo() {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="flex justify-center">
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Drawer Title</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            This drawer slides in from the right with spring physics. It includes overlay backdrop and focus management.
          </p>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>Close</Button>
            <Button onClick={() => setOpen(false)}>Save Changes</Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export function DropdownDemo() {
  return (
    <div className="flex justify-center">
      <Dropdown
        trigger={<Button variant="secondary">Options</Button>}
        items={[
          { label: "Edit", icon: "✏️", onClick: () => console.log("Edit") },
          { label: "Duplicate", icon: "📋", onClick: () => console.log("Duplicate") },
          { label: "Archive", icon: "📦", onClick: () => console.log("Archive"), separator: true },
          { label: "Delete", icon: "🗑️", onClick: () => console.log("Delete"), disabled: false },
        ]}
      />
    </div>
  );
}

export function GlowCardDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <GlowCard className="p-6">
        <h3 className="text-lg font-semibold mb-2">Purple Glow</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Hover to reveal the animated glow effect with gradient borders.
        </p>
      </GlowCard>
      <GlowCard glowColor="blue" className="p-6">
        <h3 className="text-lg font-semibold mb-2">Blue Glow</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Custom glow colors create different visual themes.
        </p>
      </GlowCard>
    </div>
  );
}

export function GradientBorderDemo() {
  return (
    <div className="space-y-6">
      <GradientBorder className="p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Default Gradient</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          A subtle animated gradient border that pulses with color.
        </p>
      </GradientBorder>
      
      <GradientBorder 
        colors={["#ff6b6b", "#ffa726", "#66bb6a", "#4ecdc4", "#ff6b6b"]}
        className="p-6 rounded-lg"
        duration={2}
      >
        <h3 className="text-lg font-semibold mb-2">Custom Gradient</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Create vibrant custom gradients for specific themes.
        </p>
      </GradientBorder>
    </div>
  );
}

export function InputDemo() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  
  return (
    <div className="space-y-4 max-w-sm">
      <Input
        label="Name"
        placeholder="Enter your name"
        value={value1}
        onChange={(e) => setValue1(e.target.value)}
      />
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={value2}
        onChange={(e) => setValue2(e.target.value)}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        value={value3}
        onChange={(e) => setValue3(e.target.value)}
        state={value3.length > 0 && value3.length < 8 ? "error" : "default"}
        errorMessage={value3.length > 0 && value3.length < 8 ? "Password must be at least 8 characters" : undefined}
      />
    </div>
  );
}

export function LiquidButtonDemo() {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <LiquidButton>Default Liquid</LiquidButton>
      <LiquidButton color="#ff6b6b">Red Liquid</LiquidButton>
      <LiquidButton color="#4ecdc4">Teal Liquid</LiquidButton>
      <LiquidButton color="#45b7d1">Blue Liquid</LiquidButton>
    </div>
  );
}

export function MarqueeDemo() {
  return (
    <div className="space-y-6">
      <Marquee speed={30}>
        <div className="flex gap-8 text-lg font-semibold">
          <span>🚀 DriftKit</span>
          <span>⚡ Spring Physics</span>
          <span>🎨 Beautiful Animations</span>
          <span>📱 Mobile Ready</span>
          <span>🔧 TypeScript</span>
          <span>💡 Zero Config</span>
        </div>
      </Marquee>
      
      <Marquee direction="right" speed={20}>
        <div className="flex gap-8 text-lg font-semibold">
          <span>🚀 DriftKit</span>
          <span>⚡ Spring Physics</span>
          <span>🎨 Beautiful Animations</span>
          <span>📱 Mobile Ready</span>
          <span>🔧 TypeScript</span>
          <span>💡 Zero Config</span>
        </div>
      </Marquee>
      
      <Marquee 
        speed={60}
        className="bg-red-500 text-white py-2"
      >
        <div className="flex gap-8 font-bold">
          <span>BREAKING</span>
          <span>URGENT</span>
          <span>LIVE UPDATE</span>
          <span>DEVELOPING</span>
        </div>
      </Marquee>
    </div>
  );
}

export function ModeSwitcherDemo() {
  return (
    <div className="flex justify-center">
      <ModeSwitcher />
    </div>
  );
}

export function MorphingHamburgerDemo() {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="flex justify-center">
      <MorphingHamburger
        open={open}
        onToggle={(val) => setOpen(val)}
        className="p-2"
      />
    </div>
  );
}

export function MorphingShapeDemo() {
  return (
    <div className="flex justify-center">
      <MorphingShape 
        size={120}
        color="rgba(99, 102, 241, 0.2)"
        strokeColor="#6366f1"
        className=""
      />
    </div>
  );
}

export function MultiSelectDemo() {
  const [selected, setSelected] = useState<string[]>([]);
  
  const suggestions = ["React", "Vue", "Angular", "Svelte", "Solid", "Next.js", "Nuxt", "Astro"];
  
  return (
    <div className="max-w-sm">
      <MultiSelect
        value={selected}
        onChange={setSelected}
        placeholder="Type or select frameworks..."
        suggestions={suggestions}
        maxTags={5}
      />
    </div>
  );
}

export function NavMenuDemo() {
  const [activeId, setActiveId] = useState("home");
  
  return (
    <NavMenu
      items={[
        { id: "home", label: "Home", href: "#" },
        { id: "about", label: "About", href: "#" },
        { id: "services", label: "Services", href: "#" },
        { id: "contact", label: "Contact", href: "#" },
      ]}
      activeId={activeId}
      onActiveChange={setActiveId}
    />
  );
}

export function NumberTickerDemo() {
  const [value, setValue] = useState(1234);
  
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-3xl font-bold">
        <NumberTicker value={value} />
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setValue(567)}>567</Button>
        <Button size="sm" onClick={() => setValue(1234)}>1,234</Button>
        <Button size="sm" onClick={() => setValue(9876)}>9,876</Button>
        <Button size="sm" onClick={() => setValue(54321)}>54,321</Button>
      </div>
    </div>
  );
}

export function ParallaxScrollDemo() {
  return (
    <div className="h-[200px] overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
      <ParallaxScroll className="h-full">
        <div className="space-y-6 p-6">
          <div className="h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-sm text-blue-600 dark:text-blue-400">Layer 1 — Default speed</div>
          <div className="h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-sm text-purple-600 dark:text-purple-400">Layer 2 — Scroll to see parallax</div>
          <div className="h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-sm text-green-600 dark:text-green-400">Layer 3 — Different depths</div>
        </div>
      </ParallaxScroll>
    </div>
  );
}

export function PopoverDemo() {
  return (
    <div className="flex gap-4 justify-center">
      <Popover content={<div className="text-sm p-1">Settings panel content</div>} placement="top">
        <Button size="sm" variant="secondary">Top</Button>
      </Popover>
      <Popover content={<div className="text-sm p-1">More information here</div>} placement="bottom">
        <Button size="sm" variant="secondary">Bottom</Button>
      </Popover>
      <Popover content={<div className="text-sm p-1">Quick actions menu</div>} placement="right" trigger="hover">
        <Button size="sm" variant="secondary">Hover me</Button>
      </Popover>
    </div>
  );
}

export function ProgressRingDemo() {
  const [progress, setProgress] = useState(65);
  
  return (
    <div className="flex flex-col items-center gap-6">
      <ProgressRing
        value={progress}
        size={120}
        strokeWidth={8}
        className="text-blue-500"
      />
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setProgress(25)}>25%</Button>
        <Button size="sm" onClick={() => setProgress(65)}>65%</Button>
        <Button size="sm" onClick={() => setProgress(90)}>90%</Button>
        <Button size="sm" onClick={() => setProgress(100)}>100%</Button>
      </div>
    </div>
  );
}

export function RippleButtonDemo() {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <RippleButton>Default Ripple</RippleButton>
      <RippleButton rippleColor="#ff6b6b">Red Ripple</RippleButton>
      <RippleButton rippleColor="#4ecdc4">Teal Ripple</RippleButton>
      <RippleButton disabled>Disabled</RippleButton>
    </div>
  );
}

export function SchedulePickerDemo() {
  return (
    <div className="max-w-lg">
      <SchedulePicker />
    </div>
  );
}

export function ScrollRevealDemo() {
  const items = Array.from({ length: 10 }, (_, i) => (
    <ScrollReveal key={i} delay={i * 100}>
      <div className="p-6 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Card {i + 1}</h3>
        <p className="text-neutral-600 dark:text-neutral-400">
          This card reveals with staggered animation as you scroll.
        </p>
      </div>
    </ScrollReveal>
  ));
  
  return (
    <div className="h-64 overflow-auto space-y-4 p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
      {items}
    </div>
  );
}

export function SkeletonDemo() {
  const [loading, setLoading] = useState(true);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={() => setLoading(!loading)}>
          {loading ? "Show Content" : "Show Skeleton"}
        </Button>
      </div>
      
      {loading ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center">
              👤
            </div>
            <div className="space-y-1">
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-300">Software Engineer</p>
            </div>
          </div>
          <div className="h-[200px] bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
            <p className="text-neutral-600 dark:text-neutral-400">Content loaded!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function SpotlightDemo() {
  return (
    <div className="relative">
      <Spotlight className="h-64 bg-neutral-900 dark:bg-neutral-950 rounded-lg overflow-hidden">
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Spotlight Effect</h2>
            <p className="text-neutral-300">Move your cursor around to reveal the spotlight</p>
          </div>
        </div>
      </Spotlight>
    </div>
  );
}

export function SpringCarouselDemo() {
  const items = [
    <div key="1" className="w-full h-40 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">Slide 1</div>,
    <div key="2" className="w-full h-40 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-bold">Slide 2</div>,
    <div key="3" className="w-full h-40 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold">Slide 3</div>,
    <div key="4" className="w-full h-40 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold">Slide 4</div>,
  ];
  return (
    <div className="max-w-lg">
      <SpringCarousel items={items} />
    </div>
  );
}

export function StaggeredListDemo() {
  const items = [
    { id: "1", content: <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">First item slides in</div> },
    { id: "2", content: <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">Second item follows</div> },
    { id: "3", content: <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">Third with stagger delay</div> },
    { id: "4", content: <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">Fourth completes the sequence</div> },
  ];
  return (
    <div className="max-w-sm">
      <StaggeredList items={items} />
    </div>
  );
}

export function StepperDemo() {
  const [step, setStep] = useState(0);
  const steps = [
    { id: "details", label: "Details", content: <p className="text-sm text-neutral-600 dark:text-neutral-400">Enter your information</p> },
    { id: "preferences", label: "Preferences", content: <p className="text-sm text-neutral-600 dark:text-neutral-400">Customize your experience</p> },
    { id: "review", label: "Review", content: <p className="text-sm text-neutral-600 dark:text-neutral-400">Confirm your choices</p> },
  ];
  return (
    <div className="max-w-lg">
      <Stepper steps={steps} activeStep={step} onChange={setStep} showControls />
    </div>
  );
}

export function TabsDemo() {
  return (
    <Tabs
      defaultValue="tab1"
      items={[
        {
          value: "tab1",
          label: "Overview",
          content: (
            <div className="p-4">
              <h3 className="font-semibold mb-2">Project Overview</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                DriftKit provides beautiful, physics-based components for modern React applications.
              </p>
            </div>
          ),
        },
        {
          value: "tab2", 
          label: "Features",
          content: (
            <div className="p-4">
              <h3 className="font-semibold mb-2">Key Features</h3>
              <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                <li>• Spring-based animations</li>
                <li>• TypeScript support</li>
                <li>• Zero dependencies</li>
                <li>• Tree-shakeable</li>
              </ul>
            </div>
          ),
        },
        {
          value: "tab3",
          label: "Installation", 
          content: (
            <div className="p-4">
              <h3 className="font-semibold mb-2">Installation</h3>
              <CodeBlock code="npm install driftkit" label="bash" />
            </div>
          ),
        },
      ]}
    />
  );
}

export function TextShimmerDemo() {
  return (
    <div className="space-y-4 text-center">
      <TextShimmer className="text-2xl font-bold">Motion-first components</TextShimmer>
      <TextShimmer className="text-lg">Spring physics for the web</TextShimmer>
      <TextShimmer className="text-sm">Subtle shimmer effect</TextShimmer>
    </div>
  );
}

export function TooltipDemo() {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      <Tooltip content="This is a tooltip">
        <Button variant="secondary">Hover me</Button>
      </Tooltip>
      
      <Tooltip content="Tooltip on the right" position="right">
        <Button variant="secondary">Right tooltip</Button>
      </Tooltip>
      
      <Tooltip content="Tooltip on the bottom" position="bottom">
        <Button variant="secondary">Bottom tooltip</Button>
      </Tooltip>
      
      <Tooltip content="With arrow pointing left" position="left">
        <Button variant="secondary">Left tooltip</Button>
      </Tooltip>
    </div>
  );
}

export function TypewriterDemo() {
  const [trigger, setTrigger] = useState(0);
  
  const texts = [
    "Welcome to DriftKit",
    "Beautiful animations made simple",
    "Spring physics for the web"
  ];
  
  return (
    <div className="space-y-6">
      <div className="text-xl">
        <Typewriter 
          key={trigger}
          text={texts[trigger % texts.length]}
          speed={50}
        />
      </div>
      <Button size="sm" onClick={() => setTrigger(t => t + 1)}>
        Next Text
      </Button>
    </div>
  );
}

// =============================================================================
// DEMO MAPPING
// =============================================================================

export const COMPONENT_DEMOS: Record<string, React.ComponentType> = {
  // Existing demos
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
  
  // New demos (42 components)
  "accordion": AccordionDemo,
  "animated-counter": AnimatedCounterDemo,
  "badge": BadgeDemo,
  "breadcrumbs": BreadcrumbsDemo,
  "button": ButtonDemo,
  "card": CardDemo,
  "code-block": CodeBlockDemo,
  "code-display": CodeDisplayDemo,
  "component-switcher": ComponentSwitcherDemo,
  "context-menu": ContextMenuDemo,
  "control-panel": ControlPanelDemo,
  "cursor-trail": CursorTrailDemo,
  "date-range-picker": DateRangePickerDemo,
  "dialog": DialogDemo,
  "drawer": DrawerDemo,
  "dropdown": DropdownDemo,
  "glow-card": GlowCardDemo,
  "gradient-border": GradientBorderDemo,
  "input": InputDemo,
  "liquid-button": LiquidButtonDemo,
  "marquee": MarqueeDemo,
  "mode-switcher": ModeSwitcherDemo,
  "morphing-hamburger": MorphingHamburgerDemo,
  "morphing-shape": MorphingShapeDemo,
  "multi-select": MultiSelectDemo,
  "nav-menu": NavMenuDemo,
  "number-ticker": NumberTickerDemo,
  "parallax-scroll": ParallaxScrollDemo,
  "popover": PopoverDemo,
  "progress-ring": ProgressRingDemo,
  "ripple-button": RippleButtonDemo,
  "schedule-picker": SchedulePickerDemo,
  "scroll-reveal": ScrollRevealDemo,
  "skeleton": SkeletonDemo,
  "spotlight": SpotlightDemo,
  "spring-carousel": SpringCarouselDemo,
  "staggered-list": StaggeredListDemo,
  "stepper": StepperDemo,
  "tabs": TabsDemo,
  "text-shimmer": TextShimmerDemo,
  "tooltip": TooltipDemo,
  "typewriter": TypewriterDemo,
};

export function getDemoComponent(componentName: string): React.ComponentType | null {
  return COMPONENT_DEMOS[componentName] || null;
}