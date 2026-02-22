"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, type ButtonVariant, type ButtonSize } from "@/components/button";
import { Toggle } from "@/components/toggle";
import { Dialog, DialogTitle, DialogDescription, DialogFooter } from "@/components/dialog";
import { useToast } from "@/components/toast";
import { Tooltip } from "@/components/tooltip";
import { Dropdown, type DropdownItem } from "@/components/dropdown";
import { Card, CardImage, CardContent, CardActions, CardGrid, CardHeader, CardFooter, FlipCard } from "@/components/card";
import { Tabs } from "@/components/tabs";
import { Accordion } from "@/components/accordion";
import { Input } from "@/components/input";
import { Skeleton } from "@/components/skeleton";
import { NavMenu } from "@/components/nav-menu";
import { MagneticButton } from "@/components/magnetic-button";
import { GlowCard } from "@/components/glow-card";
import { NumberTicker } from "@/components/number-ticker";
import { ModeSwitcher } from "@/components/mode-switcher";
import { MorphingHamburger } from "@/components/morphing-hamburger";
import { Typewriter } from "@/components/typewriter";
import { MagneticDock } from "@/components/magnetic-dock";
import { StaggeredList } from "@/components/staggered-list";
import { ParallaxTiltCard, ParallaxLayer } from "@/components/parallax-tilt-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Marquee, MarqueeItem } from "@/components/marquee";
import { RippleButton } from "@/components/ripple-button";
import { GradientBorder } from "@/components/gradient-border";
import { Spotlight } from "@/components/spotlight";
import { SwipeCards } from "@/components/swipe-cards";
import { TextShimmer } from "@/components/text-shimmer";
import { WobbleCard } from "@/components/wobble-card";
import { AnimatedTabs } from "@/components/animated-tabs";
import { CommandPalette } from "@/components/command-palette";
import { ExpandableCard } from "@/components/expandable-card";
import { CursorTrail } from "@/components/cursor-trail";
import { LiquidButton } from "@/components/liquid-button";
import { AnimatedCounter, StatCard } from "@/components/animated-counter";
import { ProgressRing } from "@/components/progress-ring";
import { SpringCarousel } from "@/components/spring-carousel";
import { ParallaxScroll, ParallaxItem } from "@/components/parallax-scroll";
import { MorphingShape } from "@/components/morphing-shape";
import { CodeBlock } from "@/components/code-block";
import { SchedulePicker, type ScheduleValue } from "@/components/schedule-picker";
import { DateRangePicker, type DateRange } from "@/components/date-range-picker";
import { MultiSelect } from "@/components/multi-select";
import { Stepper } from "@/components/stepper";
import { Drawer, DrawerHeader, DrawerContent, DrawerFooter } from "@/components/drawer";
import { ContextMenu, contextMenuItems } from "@/components/context-menu";
import { Popover } from "@/components/popover";
import { Breadcrumbs, breadcrumbPatterns } from "@/components/breadcrumbs";
import { Badge, NotificationBadge } from "@/components/badge";

const variants: ButtonVariant[] = ["default", "secondary", "ghost", "destructive"];
const sizes: ButtonSize[] = ["sm", "md", "lg"];

const COMPONENT_COUNT = 52;

// =============================================================================
// SECTION DEFINITIONS (for TOC)
// =============================================================================

interface SectionDef {
  id: string;
  title: string;
  group: "showpiece" | "standard";
}

const sections: SectionDef[] = [
  // Showpieces
  { id: "typewriter", title: "Typewriter", group: "showpiece" },
  { id: "magnetic-dock", title: "Magnetic Dock", group: "showpiece" },
  { id: "magnetic-button", title: "Magnetic Button", group: "showpiece" },
  { id: "cursor-glow-card", title: "Cursor Glow Card", group: "showpiece" },
  { id: "number-ticker", title: "Number Ticker", group: "showpiece" },
  { id: "morphing-hamburger", title: "Morphing Hamburger", group: "showpiece" },
  { id: "staggered-list", title: "Staggered List", group: "showpiece" },
  { id: "mode-switcher", title: "Mode Switcher", group: "showpiece" },
  { id: "parallax-tilt-card", title: "Parallax Tilt Card", group: "showpiece" },
  { id: "swipe-cards", title: "Swipe Cards", group: "showpiece" },
  { id: "marquee", title: "Marquee", group: "showpiece" },
  { id: "gradient-border", title: "Gradient Border", group: "showpiece" },
  { id: "spotlight-beam", title: "Spotlight Beam", group: "showpiece" },
  { id: "ripple-button", title: "Ripple Button", group: "showpiece" },
  { id: "scroll-reveal", title: "Scroll Reveal", group: "showpiece" },
  { id: "text-shimmer", title: "Text Shimmer", group: "showpiece" },
  { id: "wobble-card", title: "Wobble Card", group: "showpiece" },
  { id: "animated-tabs", title: "Animated Tabs", group: "showpiece" },
  { id: "command-palette", title: "Command Palette", group: "showpiece" },
  { id: "expandable-card", title: "Expandable Card", group: "showpiece" },
  { id: "cursor-trail", title: "Cursor Trail", group: "showpiece" },
  { id: "liquid-button", title: "Liquid Button", group: "showpiece" },
  { id: "animated-counter", title: "Animated Counter", group: "showpiece" },
  { id: "progress-ring", title: "Progress Ring", group: "showpiece" },
  { id: "spring-carousel", title: "Spring Carousel", group: "showpiece" },
  { id: "parallax-scroll", title: "Parallax Scroll", group: "showpiece" },
  { id: "morphing-shape", title: "Morphing Shape", group: "showpiece" },
  { id: "schedule-picker", title: "Schedule Picker", group: "showpiece" },
  { id: "date-range-picker", title: "Date Range Picker", group: "showpiece" },
  { id: "multi-select", title: "Multi Select", group: "showpiece" },
  { id: "stepper", title: "Stepper", group: "showpiece" },
  { id: "drawer", title: "Drawer", group: "showpiece" },
  { id: "context-menu", title: "Context Menu", group: "showpiece" },
  { id: "popover", title: "Popover", group: "showpiece" },
  { id: "breadcrumbs", title: "Breadcrumbs", group: "showpiece" },
  { id: "badge", title: "Badge", group: "showpiece" },
  { id: "code-block", title: "Code Block", group: "showpiece" },
  { id: "code-display", title: "Code Display", group: "showpiece" },
  { id: "component-switcher", title: "Component Switcher", group: "showpiece" },
  { id: "control-panel", title: "Control Panel", group: "showpiece" },
  // Standard
  { id: "nav-menu", title: "Navigation Menu", group: "standard" },
  { id: "button", title: "Button", group: "standard" },
  { id: "input", title: "Input", group: "standard" },
  { id: "toggle", title: "Toggle", group: "standard" },
  { id: "tabs", title: "Tabs", group: "standard" },
  { id: "accordion", title: "Accordion", group: "standard" },
  { id: "dialog", title: "Dialog", group: "standard" },
  { id: "tooltip", title: "Tooltip", group: "standard" },
  { id: "dropdown", title: "Dropdown Menu", group: "standard" },
  { id: "card", title: "Card", group: "standard" },
  { id: "skeleton", title: "Skeleton", group: "standard" },
  { id: "toast", title: "Toast", group: "standard" },
];

// =============================================================================
// FLOATING TOC
// =============================================================================

function TableOfContents() {
  const [activeId, setActiveId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden xl:block fixed left-[max(1rem,calc(50%-38rem))] top-24 w-48 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-none text-xs" style={{ scrollbarWidth: 'none' }}>
        <p className="text-neutral-600 dark:text-neutral-500 font-semibold uppercase tracking-wider mb-3">Showpieces</p>
        {sections.filter(s => s.group === "showpiece").map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`block py-0.5 transition-colors ${activeId === s.id ? "text-neutral-900 dark:text-white font-medium" : "text-neutral-500 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-400"}`}
          >
            {s.title}
          </a>
        ))}
        <p className="text-neutral-600 dark:text-neutral-500 font-semibold uppercase tracking-wider mb-3 mt-5">Standard</p>
        {sections.filter(s => s.group === "standard").map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`block py-0.5 transition-colors ${activeId === s.id ? "text-neutral-900 dark:text-white font-medium" : "text-neutral-500 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-400"}`}
          >
            {s.title}
          </a>
        ))}
      </nav>

      {/* Mobile floating button */}
      <div className="xl:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 flex items-center justify-center shadow-lg cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
        >
          ≡
        </button>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute bottom-12 right-0 w-56 max-h-80 overflow-y-auto bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg p-3 shadow-xl text-xs"
          >
            <p className="text-neutral-600 dark:text-neutral-500 font-semibold uppercase tracking-wider mb-2">Showpieces</p>
            {sections.filter(s => s.group === "showpiece").map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)} className="block py-0.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                {s.title}
              </a>
            ))}
            <p className="text-neutral-600 dark:text-neutral-500 font-semibold uppercase tracking-wider mb-2 mt-3">Standard</p>
            {sections.filter(s => s.group === "standard").map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)} className="block py-0.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                {s.title}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
}

// =============================================================================
// SHOWPIECE DEMOS
// =============================================================================

function MagneticButtonDemo() {
  return (
    <div className="flex flex-wrap gap-8 items-center">
      <MagneticButton><Button>Hover near me</Button></MagneticButton>
      <MagneticButton intensity={0.5}><Button variant="secondary">Subtle pull</Button></MagneticButton>
      <MagneticButton intensity={1.5}><Button variant="ghost">Strong pull</Button></MagneticButton>
    </div>
  );
}

function GlowCardDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <GlowCard>
        <h3 className="text-base font-semibold mb-1">Surface Glow</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">Move your cursor over this card. A soft radial light follows.</p>
      </GlowCard>
      <GlowCard borderGlow glowOpacity={0.6}>
        <h3 className="text-base font-semibold mb-1">Border Glow</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">The border illuminates near the cursor position.</p>
      </GlowCard>
    </div>
  );
}

function NumberTickerDemo() {
  const [value, setValue] = useState(1234);
  const [price, setPrice] = useState(49.99);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="text-3xl font-bold tabular-nums"><NumberTicker value={value} /></span>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={() => setValue((v) => v + 100)}>+100</Button>
          <Button size="sm" variant="secondary" onClick={() => setValue((v) => v - 100)}>−100</Button>
          <Button size="sm" variant="ghost" onClick={() => setValue(Math.floor(Math.random() * 99999))}>Random</Button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-2xl font-semibold"><NumberTicker value={price} prefix="$" decimals={2} /></span>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={() => setPrice((p) => +(p + 10).toFixed(2))}>+$10</Button>
          <Button size="sm" variant="secondary" onClick={() => setPrice((p) => +(Math.max(0, p - 10)).toFixed(2))}>−$10</Button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xl"><NumberTicker value={87} suffix="%" /></span>
        <span className="text-sm text-neutral-600 dark:text-neutral-400">Completion rate</span>
      </div>
    </div>
  );
}

function ModeSwitcherDemo() {
  return (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2"><ModeSwitcher size={48} /><span className="text-xs text-neutral-600 dark:text-neutral-400">Default</span></div>
      <div className="flex flex-col items-center gap-2"><ModeSwitcher size={48} irisWipe /><span className="text-xs text-neutral-600 dark:text-neutral-400">Iris wipe</span></div>
    </div>
  );
}

function MorphingHamburgerDemo() {
  return (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2"><MorphingHamburger size={48} /><span className="text-xs text-neutral-600 dark:text-neutral-400">Click to morph</span></div>
      <div className="flex flex-col items-center gap-2"><MorphingHamburger size={40} /><span className="text-xs text-neutral-600 dark:text-neutral-400">Compact</span></div>
    </div>
  );
}

function TypewriterDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-9 overflow-hidden">
        <span className="text-2xl font-bold">
          <Typewriter text="" loop={["Motion-first components.", "Spring physics everywhere.", "Copy, paste, ship."]} speed={60} loopPause={2500} />
        </span>
      </div>
      <div className="h-6 overflow-hidden text-base text-neutral-600 dark:text-neutral-400">
        <Typewriter text="Each character settles into place with spring physics." speed={35} delay={500} />
      </div>
    </div>
  );
}

function MagneticDockDemo() {
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

function StaggeredListDemo() {
  const [variant, setVariant] = useState<"slide-up" | "fade-blur" | "slide-left">("slide-up");
  const [key, setKey] = useState(0);
  const items = [
    { id: "1", content: <div className="p-3 rounded-lg border border-neutral-300 dark:border-neutral-800 text-sm">Design tokens defined</div> },
    { id: "2", content: <div className="p-3 rounded-lg border border-neutral-300 dark:border-neutral-800 text-sm">Component API designed</div> },
    { id: "3", content: <div className="p-3 rounded-lg border border-neutral-300 dark:border-neutral-800 text-sm">Spring physics tuned</div> },
    { id: "4", content: <div className="p-3 rounded-lg border border-neutral-300 dark:border-neutral-800 text-sm">Accessibility tested</div> },
    { id: "5", content: <div className="p-3 rounded-lg border border-neutral-300 dark:border-neutral-800 text-sm">Documentation written</div> },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {(["slide-up", "fade-blur", "slide-left"] as const).map((v) => (
          <Button key={v} size="sm" variant={variant === v ? "default" : "secondary"} onClick={() => { setVariant(v); setKey((k) => k + 1); }}>{v}</Button>
        ))}
        <Button size="sm" variant="ghost" onClick={() => setKey((k) => k + 1)}>Replay</Button>
      </div>
      <div className="h-[260px] overflow-hidden">
        <StaggeredList key={key} items={items} variant={variant} className="flex flex-col gap-2" />
      </div>
    </div>
  );
}

function ParallaxTiltDemo() {
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

function ScrollRevealDemo() {
  const [key, setKey] = useState(0);
  const rvariants: Array<"fade-up" | "fade-left" | "scale" | "blur"> = ["fade-up", "fade-left", "scale", "blur"];
  return (
    <div className="flex flex-col gap-4">
      <Button size="sm" variant="ghost" onClick={() => setKey((k) => k + 1)}>Replay</Button>
      <div key={key} className="grid grid-cols-2 gap-3">
        {rvariants.map((v, i) => (
          <ScrollReveal key={v} variant={v} delay={i * 0.1}>
            <div className="p-4 rounded-lg border border-neutral-300 dark:border-neutral-800 text-sm text-center">{v}</div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

function MarqueeDemo() {
  const items = [
    { text: "React", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200" },
    { text: "Framer Motion", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200" },
    { text: "Tailwind", color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200" },
    { text: "Spring Physics", color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200" },
    { text: "Copy & Paste", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200" },
    { text: "Zero Dependencies", color: "bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-200" },
    { text: "Motion-First", color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200" },
  ];
  return (
    <div className="flex flex-col gap-4">
      <Marquee speed={30}>
        {items.map((item) => (
          <MarqueeItem key={item.text}>
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shadow-sm border border-white/20 ${item.color}`}>
              {item.text}
            </span>
          </MarqueeItem>
        ))}
      </Marquee>
      <Marquee speed={20} direction="right">
        {items.map((item) => (
          <MarqueeItem key={item.text}>
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm ${item.color.replace('100', '200').replace('900/30', '800/40')}`}>
              {item.text}
            </span>
          </MarqueeItem>
        ))}
      </Marquee>
    </div>
  );
}

function RippleButtonDemo() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <RippleButton>Click for ripple</RippleButton>
      <RippleButton rippleColor="rgba(99,102,241,0.4)" className="bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:text-white">Custom color</RippleButton>
    </div>
  );
}

function GradientBorderDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <GradientBorder><div className="p-5"><h3 className="text-base font-semibold mb-1">Rainbow Spin</h3><p className="text-sm text-neutral-400">Default gradient, 3s rotation.</p></div></GradientBorder>
      <GradientBorder colors={["#6366f1", "#8b5cf6", "#a78bfa", "#6366f1"]} duration={2} borderWidth={2}><div className="p-5"><h3 className="text-base font-semibold mb-1">Purple Pulse</h3><p className="text-sm text-neutral-400">Custom colors, faster spin.</p></div></GradientBorder>
    </div>
  );
}

function SpotlightDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Spotlight delay={1} duration={1.2}><div className="p-5 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-200 dark:bg-neutral-900 text-neutral-900 dark:text-white"><h3 className="text-base font-semibold mb-1">Beam Sweep</h3><p className="text-sm text-neutral-600 dark:text-neutral-400">A light beam sweeps across periodically.</p></div></Spotlight>
      <Spotlight delay={2} color="rgba(99,102,241,0.2)"><div className="p-5 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-200 dark:bg-neutral-900 text-neutral-900 dark:text-white"><h3 className="text-base font-semibold mb-1">Color Beam</h3><p className="text-sm text-neutral-600 dark:text-neutral-400">Tinted beam with custom delay.</p></div></Spotlight>
    </div>
  );
}

function TextShimmerDemo() {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-3xl font-bold"><TextShimmer>Motion-first components</TextShimmer></span>
      <span className="text-lg"><TextShimmer duration={3}>A gradient that sweeps across text endlessly.</TextShimmer></span>
    </div>
  );
}

function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <WobbleCard><div className="p-6"><h3 className="text-base font-semibold mb-1">Jelly Hover</h3><p className="text-sm text-neutral-400">Move your cursor across this card. It wobbles like jelly with spring decay.</p></div></WobbleCard>
      <WobbleCard><div className="p-6"><h3 className="text-base font-semibold mb-1">Spring Physics</h3><p className="text-sm text-neutral-400">Low damping creates the bouncy overshoot. Leave and it springs back.</p></div></WobbleCard>
    </div>
  );
}

function AnimatedTabsDemo() {
  return (
    <AnimatedTabs items={[
      { id: "design", label: "Design", content: <p className="text-sm text-neutral-600 dark:text-neutral-400 p-3">Start with motion. Every interaction has weight, velocity, and spring.</p> },
      { id: "develop", label: "Develop", content: <p className="text-sm text-neutral-600 dark:text-neutral-400 p-3">Copy the component. Paste it. Tweak the spring config. Ship it.</p> },
      { id: "deploy", label: "Deploy", content: <p className="text-sm text-neutral-600 dark:text-neutral-400 p-3">Zero dependencies beyond Framer Motion. Tree-shakeable. SSR-safe.</p> },
    ]} />
  );
}

function CommandPaletteDemo() {
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
    <div>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>Open ⌘K Palette</Button>
      <CommandPalette items={items} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

function ExpandableCardDemo() {
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

function CursorTrailDemo() {
  const [active, setActive] = useState(false);
  return (
    <div>
      <Button variant="secondary" size="sm" onClick={() => setActive(!active)}>{active ? "Hide Trail" : "Show Cursor Trail"}</Button>
      {active && <CursorTrail count={8} size={10} color="#6366f1" />}
    </div>
  );
}

function SwipeCardsDemo() {
  const [key, setKey] = useState(0);
  const cards = [
    { id: "1", content: <div><h3 className="text-lg font-bold mb-1">Card One</h3><p className="text-sm text-neutral-600 dark:text-neutral-400">Swipe me left or right →</p></div> },
    { id: "2", content: <div><h3 className="text-lg font-bold mb-1">Card Two</h3><p className="text-sm text-neutral-600 dark:text-neutral-400">Spring physics dismiss</p></div> },
    { id: "3", content: <div><h3 className="text-lg font-bold mb-1">Card Three</h3><p className="text-sm text-neutral-600 dark:text-neutral-400">Stack depth illusion</p></div> },
    { id: "4", content: <div><h3 className="text-lg font-bold mb-1">Card Four</h3><p className="text-sm text-neutral-600 dark:text-neutral-400">Last one!</p></div> },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="h-[280px] overflow-hidden">
        <SwipeCards key={key} cards={cards} />
      </div>
      <Button size="sm" variant="ghost" onClick={() => setKey((k) => k + 1)}>Reset cards</Button>
    </div>
  );
}

function LiquidButtonDemo() {
  return (
    <div className="flex flex-wrap gap-6 items-center">
      <LiquidButton color="#6366f1">Hover me</LiquidButton>
      <LiquidButton color="#f43f5e">Elastic</LiquidButton>
      <LiquidButton color="#10b981">Organic</LiquidButton>
    </div>
  );
}

function AnimatedCounterDemo() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <StatCard value={12847} label="Total Users" icon="👥" />
      <StatCard value={99.9} label="Uptime" suffix="%" decimals={1} icon="⚡" />
      <StatCard value={3.2} label="Avg Rating" prefix="" suffix="/5" decimals={1} icon="⭐" />
      <StatCard value={482} label="Components" suffix="+" icon="🧩" />
    </div>
  );
}

function ProgressRingDemo() {
  const [value, setValue] = useState(72);
  return (
    <div className="flex flex-wrap items-center gap-8">
      <ProgressRing value={value} color="#6366f1" />
      <ProgressRing value={value} size={80} strokeWidth={6} color="#10b981" />
      <ProgressRing value={value} size={80} strokeWidth={6} color="#f43f5e" />
      <div className="flex flex-col gap-2">
        <Button size="sm" variant="secondary" onClick={() => setValue(Math.min(100, value + 10))}>+10%</Button>
        <Button size="sm" variant="secondary" onClick={() => setValue(Math.max(0, value - 10))}>−10%</Button>
        <Button size="sm" variant="ghost" onClick={() => setValue(Math.floor(Math.random() * 100))}>Random</Button>
      </div>
    </div>
  );
}

function SpringCarouselDemo() {
  const items = [
    <div key="1" className="p-6"><h3 className="font-semibold mb-1">Spring Physics</h3><p className="text-sm text-neutral-600 dark:text-neutral-400">Natural motion with mass, stiffness, and damping.</p></div>,
    <div key="2" className="p-6"><h3 className="font-semibold mb-1">Gesture-Driven</h3><p className="text-sm text-neutral-600 dark:text-neutral-400">Drag to navigate. Velocity determines snap direction.</p></div>,
    <div key="3" className="p-6"><h3 className="font-semibold mb-1">Copy & Paste</h3><p className="text-sm text-neutral-600 dark:text-neutral-400">Drop into your project. Customize springs to match your brand.</p></div>,
    <div key="4" className="p-6"><h3 className="font-semibold mb-1">Accessible</h3><p className="text-sm text-neutral-600 dark:text-neutral-400">Keyboard navigation with arrow keys. Focus management built in.</p></div>,
    <div key="5" className="p-6"><h3 className="font-semibold mb-1">Performant</h3><p className="text-sm text-neutral-600 dark:text-neutral-400">GPU-accelerated transforms. No layout thrashing.</p></div>,
  ];
  return <SpringCarousel items={items} />;
}

function ParallaxScrollDemo() {
  return (
    <ParallaxScroll className="h-64 relative rounded-lg border border-neutral-300 dark:border-neutral-800 overflow-hidden bg-neutral-200 dark:bg-neutral-900">
      <div className="absolute inset-0 flex items-center justify-center">
        <ParallaxItem speed={-0.3} className="absolute top-4 left-8"><div className="w-16 h-16 rounded-lg bg-indigo-900/50 flex items-center justify-center text-2xl">✦</div></ParallaxItem>
        <ParallaxItem speed={0.5} className="absolute top-12 right-12"><div className="w-12 h-12 rounded-full bg-rose-900/50 flex items-center justify-center text-lg">◆</div></ParallaxItem>
        <ParallaxItem speed={-0.6} className="absolute bottom-8 left-1/4"><div className="w-20 h-20 rounded-lg bg-emerald-900/50 flex items-center justify-center text-3xl">○</div></ParallaxItem>
        <ParallaxItem speed={0.3} className="absolute bottom-4 right-1/4"><div className="w-14 h-14 rounded-full bg-amber-900/50 flex items-center justify-center text-xl">△</div></ParallaxItem>
        <ParallaxItem speed={0}><p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Scroll to see parallax</p></ParallaxItem>
      </div>
    </ParallaxScroll>
  );
}

function MorphingShapeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <MorphingShape size={150} />
      <MorphingShape size={100} color="rgba(244, 63, 94, 0.15)" strokeColor="#f43f5e" />
    </div>
  );
}

function SchedulePickerDemo() {
  const [schedule, setSchedule] = useState<ScheduleValue>({
    Monday: { enabled: false, slots: [{ from: "09:00", to: "17:00" }] },
    Tuesday: { enabled: true, slots: [{ from: "09:00", to: "12:00" }, { from: "13:00", to: "17:00" }] },
    Wednesday: { enabled: true, slots: [{ from: "10:00", to: "16:00" }] },
    Thursday: { enabled: false, slots: [{ from: "09:00", to: "17:00" }] },
    Friday: { enabled: false, slots: [{ from: "09:00", to: "17:00" }] },
    Saturday: { enabled: false, slots: [{ from: "09:00", to: "17:00" }] },
    Sunday: { enabled: false, slots: [{ from: "09:00", to: "17:00" }] },
  });
  return (
    <div className="flex flex-col gap-6">
      <SchedulePicker value={schedule} onChange={setSchedule} />
      <details className="text-xs">
        <summary className="text-neutral-600 dark:text-neutral-400 cursor-pointer hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">Live data output</summary>
        <pre className="mt-2 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 overflow-x-auto text-[11px] leading-relaxed max-h-64 overflow-y-auto">
          {JSON.stringify(schedule, null, 2)}
        </pre>
      </details>
    </div>
  );
}

function DateRangePickerDemo() {
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  return (
    <div className="flex flex-col gap-4">
      <DateRangePicker value={range} onChange={setRange} />
      {range.start && range.end && (
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          Selected: {range.start.toLocaleDateString()} → {range.end.toLocaleDateString()}
          {" "}({Math.round((range.end.getTime() - range.start.getTime()) / 86400000)} days)
        </p>
      )}
    </div>
  );
}

function MultiSelectDemo() {
  const [tags, setTags] = useState<string[]>(["React", "TypeScript"]);
  const suggestions = ["React", "TypeScript", "Framer Motion", "Tailwind", "Next.js", "Vite", "Zustand", "SWR", "Radix"];
  return (
    <div className="flex flex-col gap-4 max-w-md">
      <MultiSelect
        value={tags}
        onChange={setTags}
        suggestions={suggestions}
        maxTags={8}
        placeholder="Add technologies..."
      />
      <p className="text-xs text-neutral-600 dark:text-neutral-400">{tags.length} tag{tags.length !== 1 ? "s" : ""}: {tags.join(", ") || "none"}</p>
    </div>
  );
}

function StepperDemo() {
  const [finished, setFinished] = useState(false);
  const steps = [
    { id: "details", label: "Details", content: <div className="p-4 rounded-lg border border-neutral-300 dark:border-neutral-800 text-sm text-neutral-600 dark:text-neutral-400"><p className="font-medium text-neutral-800 dark:text-neutral-200 mb-2">Project Details</p><p>Enter your project name, description, and select a category. All fields are required.</p></div> },
    { id: "config", label: "Configure", content: <div className="p-4 rounded-lg border border-neutral-300 dark:border-neutral-800 text-sm text-neutral-600 dark:text-neutral-400"><p className="font-medium text-neutral-800 dark:text-neutral-200 mb-2">Configuration</p><p>Choose your framework, set up environment variables, and configure build settings.</p></div> },
    { id: "review", label: "Review", content: <div className="p-4 rounded-lg border border-neutral-300 dark:border-neutral-800 text-sm text-neutral-600 dark:text-neutral-400"><p className="font-medium text-neutral-800 dark:text-neutral-200 mb-2">Review & Deploy</p><p>Review your settings and deploy. You can always change these later.</p></div> },
  ];
  return (
    <div className="flex flex-col gap-4">
      <Stepper steps={steps} onFinish={() => setFinished(true)} />
      {finished && <p className="text-xs text-green-600 dark:text-green-400 text-center">✓ Complete! (reset by navigating back)</p>}
    </div>
  );
}

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState<"left" | "right" | "top" | "bottom">("right");
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {(["right", "left", "top", "bottom"] as const).map((s) => (
          <Button key={s} size="sm" variant={side === s ? "default" : "secondary"} onClick={() => setSide(s)}>
            {s}
          </Button>
        ))}
      </div>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open {side} drawer
      </Button>
      
      <Drawer open={open} onClose={() => setOpen(false)} side={side}>
        <DrawerHeader onClose={() => setOpen(false)}>
          {side.charAt(0).toUpperCase() + side.slice(1)} Drawer
        </DrawerHeader>
        <DrawerContent>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            This drawer slides in from the {side} with spring physics. The backdrop blurs and clicking outside closes it.
          </p>
          <div className="space-y-4">
            <Button variant="secondary" size="sm">Action 1</Button>
            <Button variant="secondary" size="sm">Action 2</Button>
            <Button variant="secondary" size="sm">Action 3</Button>
          </div>
        </DrawerContent>
        <DrawerFooter>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setOpen(false)}>Save</Button>
          </div>
        </DrawerFooter>
      </Drawer>
    </div>
  );
}

function ContextMenuDemo() {
  const [lastAction, setLastAction] = useState<string>("");
  
  const items = [
    contextMenuItems.copy(() => setLastAction("Copied!")),
    contextMenuItems.cut(() => setLastAction("Cut!")),
    contextMenuItems.paste(() => setLastAction("Pasted!")),
    contextMenuItems.separator(),
    contextMenuItems.rename(() => setLastAction("Renamed!")),
    contextMenuItems.duplicate(() => setLastAction("Duplicated!")),
    contextMenuItems.separator(),
    contextMenuItems.delete(() => setLastAction("Deleted!")),
  ];
  
  return (
    <div className="flex flex-col gap-4">
      <ContextMenu items={items}>
        <div className="p-8 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 text-center cursor-context-menu">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">Right-click me!</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-500">Try the context menu with keyboard shortcuts</p>
        </div>
      </ContextMenu>
      {lastAction && (
        <p className="text-sm text-green-600 dark:text-green-400">Last action: {lastAction}</p>
      )}
    </div>
  );
}

function PopoverDemo() {
  const [trigger, setTrigger] = useState<"click" | "hover">("click");
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button size="sm" variant={trigger === "click" ? "default" : "secondary"} onClick={() => setTrigger("click")}>
          Click
        </Button>
        <Button size="sm" variant={trigger === "hover" ? "default" : "secondary"} onClick={() => setTrigger("hover")}>
          Hover
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <Popover 
          content={<div className="p-2"><p className="text-sm">This popover appears on {trigger}!</p></div>}
          trigger={trigger}
          placement="top"
        >
          <Button variant="secondary" size="sm">Top</Button>
        </Popover>
        
        <Popover 
          content={<div className="p-2"><p className="text-sm">Smart positioning keeps me in view</p></div>}
          trigger={trigger}
          placement="bottom"
        >
          <Button variant="secondary" size="sm">Bottom</Button>
        </Popover>
        
        <Popover 
          content={<div className="p-2 max-w-xs"><p className="text-sm">Popovers automatically flip when there's not enough space. Try resizing your window!</p></div>}
          trigger={trigger}
          placement="right"
        >
          <Button variant="secondary" size="sm">Right</Button>
        </Popover>
      </div>
    </div>
  );
}

function BreadcrumbsDemo() {
  const [current, setCurrent] = useState("/docs/components/breadcrumbs");
  
  const items = breadcrumbPatterns.filesystem(current, (path) => setCurrent(path));
  
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs items={items} showHomeIcon />
      
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="text-neutral-600 dark:text-neutral-400">Try:</span>
        {["/", "/docs", "/docs/components", "/docs/components/buttons"].map((path) => (
          <button
            key={path}
            onClick={() => setCurrent(path)}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {path === "/" ? "root" : path}
          </button>
        ))}
      </div>
    </div>
  );
}

function BadgeDemo() {
  const [items, setItems] = useState([
    { id: "1", label: "React", variant: "default" as const },
    { id: "2", label: "TypeScript", variant: "info" as const },
    { id: "3", label: "New", variant: "success" as const },
  ]);
  
  const removeItem = (id: string) => {
    setItems(items => items.filter(item => item.id !== id));
  };
  
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">Variants</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </div>
      
      <div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">With Icons & Pulse</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success" icon={<span>✓</span>}>Completed</Badge>
          <Badge variant="warning" icon={<span>⚠</span>}>Warning</Badge>
          <Badge variant="error" pulse>Live</Badge>
        </div>
      </div>
      
      <div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">Removable Tags</p>
        <div className="flex flex-wrap gap-2">
          {items.map(item => (
            <Badge 
              key={item.id}
              variant={item.variant}
              removable 
              onRemove={() => removeItem(item.id)}
            >
              {item.label}
            </Badge>
          ))}
        </div>
      </div>
      
      <div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">Notification Badges</p>
        <div className="flex gap-6">
          <NotificationBadge count={3}>
            <Button variant="secondary" size="sm">Messages</Button>
          </NotificationBadge>
          <NotificationBadge count={99} max={99}>
            <Button variant="secondary" size="sm">Notifications</Button>
          </NotificationBadge>
          <NotificationBadge dot>
            <Button variant="secondary" size="sm">Online</Button>
          </NotificationBadge>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// STANDARD DEMOS
// =============================================================================

function CardDemo() {
  const [variant, setVariant] = useState<"default" | "outlined" | "elevated">("default");
  const [showGrid, setShowGrid] = useState(false);
  const [gridKey, setGridKey] = useState(0);

  // Sample card data for the grid demo
  const cardData = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=240&fit=crop",
      title: "Design System",
      description: "A comprehensive guide to building scalable design systems with motion-first components.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=240&fit=crop",
      title: "Spring Physics",
      description: "Understanding mass, stiffness, and damping for natural motion that feels alive.",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=240&fit=crop",
      title: "User Experience",
      description: "Crafting interactions that delight users through thoughtful animation and feedback.",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop",
      title: "Performance",
      description: "Optimizing animations for smooth 60fps experiences across all devices and browsers.",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=240&fit=crop",
      title: "Accessibility",
      description: "Ensuring animations respect user preferences and work with assistive technologies.",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=240&fit=crop",
      title: "Implementation",
      description: "Copy-paste components that integrate seamlessly with your existing React projects.",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Variant Controls */}
      <div className="flex flex-wrap gap-3">
        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Variants:</p>
        {(["default", "outlined", "elevated"] as const).map((v) => (
          <Button
            key={v}
            size="sm"
            variant={variant === v ? "default" : "secondary"}
            onClick={() => setVariant(v)}
          >
            {v}
          </Button>
        ))}
      </div>

      {/* Single Card Demos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Basic Card */}
        <Card variant={variant}>
          <CardContent
            title="Motion-First Design"
            description="Every component starts with spring physics. Animation isn't added afterward—it's the foundation."
          >
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
            </div>
          </CardContent>
          <CardActions>
            <Button size="sm" variant="secondary">Learn More</Button>
            <Button size="sm" variant="ghost">View Code</Button>
          </CardActions>
        </Card>

        {/* Card with Image */}
        <Card variant={variant}>
          <CardImage
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=240&fit=crop"
            alt="Design system components"
          />
          <CardContent
            title="Beautiful Components"
            description="Craft-level attention to detail in every hover state, transition, and spring curve."
          />
          <CardActions>
            <Button size="sm">Get Started</Button>
          </CardActions>
        </Card>

        {/* Interactive Card */}
        <Card variant={variant}>
          <CardContent>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                DK
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">Driftkit</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Motion component library</p>
              </div>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              Hover over me to see the subtle scale and lift animation with spring physics.
            </p>
            <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-1">
                <span>⭐</span> 4.9
              </span>
              <span>•</span>
              <span>48 components</span>
              <span>•</span>
              <span className="text-green-600 dark:text-green-400">Active</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid Demo Toggle */}
      <div className="flex items-center gap-3">
        <Button
          size="sm"
          variant={showGrid ? "default" : "secondary"}
          onClick={() => setShowGrid(!showGrid)}
        >
          {showGrid ? "Hide Grid Demo" : "Show Grid Demo"}
        </Button>
        {showGrid && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setGridKey(k => k + 1)}
          >
            Replay Animation
          </Button>
        )}
      </div>

      {/* Staggered Grid Demo */}
      {showGrid && (
        <div className="space-y-4">
          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
            <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              Staggered Grid Animation
            </h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
              Cards enter with fade + slide up animation, staggered for a premium feel.
            </p>
          </div>

          <CardGrid key={gridKey} columns={3} gap="md" staggerDelay={0.15}>
            {cardData.map((card) => (
              <Card key={card.id} variant={variant}>
                <CardImage src={card.image} alt={card.title} />
                <CardContent title={card.title} description={card.description} />
                <CardActions>
                  <Button size="sm">Read More</Button>
                  <Button size="sm" variant="ghost">Share</Button>
                </CardActions>
              </Card>
            ))}
          </CardGrid>
        </div>
      )}

      {/* Legacy FlipCard Demo */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
        <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
          Flip Card (Legacy)
        </h4>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          3D flip animation for reveal interactions.
        </p>
        <div className="max-w-sm">
          <FlipCard
            front={
              <div className="p-6">
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Front Side</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Click to flip and see the back →
                </p>
              </div>
            }
            back={
              <div className="p-6">
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Back Side</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Smooth 3D rotation with spring physics ←
                </p>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}

function LoadingDemo() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleClick = () => {
    setLoading(true); setSuccess(false);
    setTimeout(() => { setLoading(false); setSuccess(true); setTimeout(() => setSuccess(false), 1500); }, 1500);
  };
  return <Button loading={loading} success={success} onClick={handleClick}>Submit</Button>;
}

function ToggleDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex flex-col gap-4">
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

function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)} size="md" title="Example dialog">
        <DialogTitle>Spring-animated dialog</DialogTitle>
        <DialogDescription>Springs in from scale 0.95. Backdrop blurs smoothly. Closing feels snappier than opening.</DialogDescription>
        <DialogFooter>
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
          <Button size="sm" onClick={() => setOpen(false)}>Confirm</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

function DropdownDemo() {
  const items: DropdownItem[] = [
    { label: "Edit", onClick: () => {} },
    { label: "Duplicate", onClick: () => {} },
    { separator: true, label: "Archive", onClick: () => {} },
    { label: "Delete", onClick: () => {} },
  ];
  return <Dropdown trigger={<Button variant="secondary" size="sm">Open menu</Button>} items={items} />;
}

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="secondary" size="sm" onClick={() => toast({ title: "Hello!", description: "Default toast." })}>Default</Button>
      <Button variant="secondary" size="sm" onClick={() => toast({ title: "Saved!", description: "Changes saved.", variant: "success" })}>Success</Button>
      <Button variant="secondary" size="sm" onClick={() => toast({ title: "Error", description: "Something went wrong.", variant: "error" })}>Error</Button>
      <Button variant="secondary" size="sm" onClick={() => toast({ title: "Warning", description: "Disk space low.", variant: "warning" })}>Warning</Button>
    </div>
  );
}

function InputDemo() {
  const [state, setState] = useState<"default" | "error" | "success">("default");
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <Input label="Email" placeholder="you@example.com" state={state} errorMessage={state === "error" ? "Please enter a valid email" : undefined} />
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onClick={() => setState("default")}>Default</Button>
        <Button size="sm" variant="secondary" onClick={() => setState("error")}>Error</Button>
        <Button size="sm" variant="secondary" onClick={() => setState("success")}>Success</Button>
      </div>
    </div>
  );
}

function SkeletonDemo() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="flex gap-3 items-start">
        <Skeleton variant="avatar" loaded={loaded}><div className="w-10 h-10 rounded-full bg-blue-500" /></Skeleton>
        <Skeleton variant="text" lines={2} loaded={loaded}><div><p className="text-sm font-medium">Nikki Kipple</p><p className="text-xs text-neutral-600 dark:text-neutral-500">Design Engineer & Educator</p></div></Skeleton>
      </div>
      <Skeleton variant="card" height={80} loaded={loaded}>
        <div className="p-4 rounded-lg border border-neutral-300 dark:border-neutral-800"><p className="text-sm">This content was loaded with a spring crossfade.</p></div>
      </Skeleton>
      <Button size="sm" variant="secondary" onClick={() => setLoaded(!loaded)}>{loaded ? "Show skeleton" : "Load content"}</Button>
    </div>
  );
}

function NavMenuDemo() {
  const [active, setActive] = useState("home");
  return <NavMenu items={[{ id: "home", label: "Home" }, { id: "components", label: "Components" }, { id: "docs", label: "Docs" }, { id: "blog", label: "Blog" }]} activeId={active} onActiveChange={setActive} />;
}

function TabsDemo() {
  return (
    <Tabs items={[
      { value: "preview", label: "Preview", content: <div className="p-4 text-sm text-neutral-600 dark:text-neutral-500">Live preview of the component with spring animations.</div> },
      { value: "code", label: "Code", content: <div className="p-4 text-sm font-mono text-neutral-600 dark:text-neutral-500">{'<Button variant="default">Click me</Button>'}</div> },
      { value: "props", label: "Props", content: <div className="p-4 text-sm text-neutral-600 dark:text-neutral-500">variant, size, loading, success, disabled</div> },
    ]} />
  );
}

function AccordionDemo() {
  return (
    <Accordion type="single" items={[
      { value: "1", trigger: "What makes driftkit different?", content: "Every component is designed motion-first. Spring physics, not CSS transitions. The animation IS the design." },
      { value: "2", trigger: "Do I need to install anything?", content: "Just framer-motion and tailwindcss. Copy the component file into your project." },
      { value: "3", trigger: "Can I customize the spring values?", content: "Every spring config is clearly commented. Tweak stiffness, damping, and mass to match your brand's feel." },
    ]} />
  );
}

// =============================================================================
// CODE SNIPPETS
// =============================================================================

const codeSnippets: Record<string, string> = {
  "typewriter": `import { Typewriter } from "@/components/typewriter";

<Typewriter
  text=""
  loop={["Hello world.", "Spring physics.", "Copy & paste."]}
  speed={60}
  loopPause={2500}
/>`,
  "magnetic-dock": `import { MagneticDock } from "@/components/magnetic-dock";

const items = [
  { id: "finder", icon: "📁", label: "Finder" },
  { id: "mail", icon: "✉️", label: "Mail" },
];

<MagneticDock items={items} />`,
  "magnetic-button": `import { MagneticButton } from "@/components/magnetic-button";

<MagneticButton intensity={0.5}>
  <button>Hover near me</button>
</MagneticButton>`,
  "cursor-glow-card": `import { GlowCard } from "@/components/glow-card";

<GlowCard borderGlow glowOpacity={0.6}>
  <p>Cursor-following glow effect</p>
</GlowCard>`,
  "number-ticker": `import { NumberTicker } from "@/components/number-ticker";

<NumberTicker value={1234} />
<NumberTicker value={49.99} prefix="$" decimals={2} />`,
  "morphing-hamburger": `import { MorphingHamburger } from "@/components/morphing-hamburger";

<MorphingHamburger size={48} />`,
  "staggered-list": `import { StaggeredList } from "@/components/staggered-list";

const items = [
  { id: "1", content: <div>Item one</div> },
  { id: "2", content: <div>Item two</div> },
];

<StaggeredList items={items} variant="slide-up" />`,
  "mode-switcher": `import { ModeSwitcher } from "@/components/mode-switcher";

<ModeSwitcher size={48} />
<ModeSwitcher size={48} irisWipe />`,
  "parallax-tilt-card": `import { ParallaxTiltCard, ParallaxLayer } from "@/components/parallax-tilt-card";

<ParallaxTiltCard>
  <ParallaxLayer depth={2}><h3>Title</h3></ParallaxLayer>
  <ParallaxLayer depth={1}><p>Description</p></ParallaxLayer>
</ParallaxTiltCard>`,
  "swipe-cards": `import { SwipeCards } from "@/components/swipe-cards";

const cards = [
  { id: "1", content: <div>Card One</div> },
  { id: "2", content: <div>Card Two</div> },
];

<SwipeCards cards={cards} />`,
  "marquee": `import { Marquee, MarqueeItem } from "@/components/marquee";

<Marquee speed={30}>
  <MarqueeItem><span>Item 1</span></MarqueeItem>
  <MarqueeItem><span>Item 2</span></MarqueeItem>
</Marquee>`,
  "gradient-border": `import { GradientBorder } from "@/components/gradient-border";

<GradientBorder colors={["#6366f1", "#8b5cf6", "#a78bfa"]} duration={2}>
  <div className="p-5">Content here</div>
</GradientBorder>`,
  "spotlight-beam": `import { Spotlight } from "@/components/spotlight";

<Spotlight delay={1} duration={1.2}>
  <div>Your content</div>
</Spotlight>`,
  "ripple-button": `import { RippleButton } from "@/components/ripple-button";

<RippleButton>Click for ripple</RippleButton>
<RippleButton rippleColor="rgba(99,102,241,0.4)">Custom</RippleButton>`,
  "scroll-reveal": `import { ScrollReveal } from "@/components/scroll-reveal";

<ScrollReveal variant="fade-up" delay={0.1}>
  <div>Revealed on scroll</div>
</ScrollReveal>`,
  "text-shimmer": `import { TextShimmer } from "@/components/text-shimmer";

<TextShimmer duration={3}>Shimmering text</TextShimmer>`,
  "wobble-card": `import { WobbleCard } from "@/components/wobble-card";

<WobbleCard>
  <div className="p-6">Jelly hover effect</div>
</WobbleCard>`,
  "animated-tabs": `import { AnimatedTabs } from "@/components/animated-tabs";

<AnimatedTabs items={[
  { id: "one", label: "Tab 1", content: <p>Content 1</p> },
  { id: "two", label: "Tab 2", content: <p>Content 2</p> },
]} />`,
  "command-palette": `import { CommandPalette } from "@/components/command-palette";

const items = [
  { id: "1", label: "Search", shortcut: "⌘F", onSelect: () => {} },
];

<CommandPalette items={items} open={open} onClose={() => setOpen(false)} />`,
  "expandable-card": `import { ExpandableCard } from "@/components/expandable-card";

<ExpandableCard
  preview={<div>Compact view</div>}
  detail={<div>Expanded detail</div>}
/>`,
  "cursor-trail": `import { CursorTrail } from "@/components/cursor-trail";

<CursorTrail count={8} size={10} color="#6366f1" />`,
  "liquid-button": `import { LiquidButton } from "@/components/liquid-button";

<LiquidButton color="#6366f1">Hover me</LiquidButton>`,
  "animated-counter": `import { AnimatedCounter, StatCard } from "@/components/animated-counter";

<StatCard value={12847} label="Users" icon="👥" />
<AnimatedCounter value={99.9} suffix="%" decimals={1} />`,
  "progress-ring": `import { ProgressRing } from "@/components/progress-ring";

<ProgressRing value={72} color="#6366f1" />
<ProgressRing value={85} size={80} strokeWidth={6} color="#10b981" />`,
  "spring-carousel": `import { SpringCarousel } from "@/components/spring-carousel";

const items = [
  <div key="1">Slide 1</div>,
  <div key="2">Slide 2</div>,
];

<SpringCarousel items={items} />`,
  "parallax-scroll": `import { ParallaxScroll, ParallaxItem } from "@/components/parallax-scroll";

<ParallaxScroll className="h-64">
  <ParallaxItem speed={-0.3}><div>Slow layer</div></ParallaxItem>
  <ParallaxItem speed={0.5}><div>Fast layer</div></ParallaxItem>
</ParallaxScroll>`,
  "morphing-shape": `import { MorphingShape } from "@/components/morphing-shape";

<MorphingShape size={150} />
<MorphingShape size={100} color="rgba(244,63,94,0.15)" strokeColor="#f43f5e" />`,
  "schedule-picker": `import { SchedulePicker } from "@/components/schedule-picker";

const [schedule, setSchedule] = useState({
  Monday: { enabled: true, slots: [{ from: "09:00", to: "17:00" }] },
  Tuesday: { enabled: false, slots: [{ from: "09:00", to: "17:00" }] },
  // ...
});

<SchedulePicker value={schedule} onChange={setSchedule} />`,
  "date-range-picker": `import { DateRangePicker } from "@/components/date-range-picker";

const [range, setRange] = useState({ start: null, end: null });

<DateRangePicker value={range} onChange={setRange} />`,
  "multi-select": `import { MultiSelect } from "@/components/multi-select";

const [tags, setTags] = useState(["React", "TypeScript"]);

<MultiSelect
  value={tags}
  onChange={setTags}
  suggestions={["React", "Next.js", "Tailwind"]}
  maxTags={8}
/>`,
  "stepper": `import { Stepper } from "@/components/stepper";

const steps = [
  { id: "1", label: "Details", content: <div>Step 1</div> },
  { id: "2", label: "Config", content: <div>Step 2</div> },
  { id: "3", label: "Review", content: <div>Step 3</div> },
];

<Stepper steps={steps} onFinish={() => console.log("done")} />`,

  "drawer": `import { Drawer, DrawerHeader, DrawerContent, DrawerFooter } from "@/components/drawer";

<Drawer open={open} onClose={() => setOpen(false)} side="right">
  <DrawerHeader onClose={() => setOpen(false)}>
    Title
  </DrawerHeader>
  <DrawerContent>
    <p>Content here</p>
  </DrawerContent>
  <DrawerFooter>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </DrawerFooter>
</Drawer>`,

  "context-menu": `import { ContextMenu, contextMenuItems } from "@/components/context-menu";

const items = [
  contextMenuItems.copy(() => console.log("copy")),
  contextMenuItems.paste(() => console.log("paste")),
  contextMenuItems.separator(),
  contextMenuItems.delete(() => console.log("delete")),
];

<ContextMenu items={items}>
  <div>Right-click me!</div>
</ContextMenu>`,

  "popover": `import { Popover } from "@/components/popover";

<Popover 
  content={<div className="p-2">Popover content</div>}
  trigger="click"
  placement="top"
>
  <Button>Click me</Button>
</Popover>`,

  "breadcrumbs": `import { Breadcrumbs, breadcrumbPatterns } from "@/components/breadcrumbs";

const items = breadcrumbPatterns.filesystem("/docs/components");

<Breadcrumbs items={items} showHomeIcon />`,

  "badge": `import { Badge, NotificationBadge } from "@/components/badge";

<Badge variant="success">Success</Badge>
<Badge variant="error" pulse>Live</Badge>
<Badge removable onRemove={() => console.log("removed")}>Tag</Badge>

<NotificationBadge count={3}>
  <Button>Messages</Button>
</NotificationBadge>`,
  "nav-menu": `import { NavMenu } from "@/components/nav-menu";

<NavMenu
  items={[{ id: "home", label: "Home" }, { id: "about", label: "About" }]}
  activeId={active}
  onActiveChange={setActive}
/>`,
  "button": `import { Button } from "@/components/button";

<Button variant="default" size="md">Click me</Button>
<Button variant="secondary" loading>Loading...</Button>`,
  "input": `import { Input } from "@/components/input";

<Input label="Email" placeholder="you@example.com" state="default" />
<Input label="Email" state="error" errorMessage="Invalid email" />`,
  "toggle": `import { Toggle } from "@/components/toggle";

<Toggle size="md" checked={checked} onChange={setChecked} />`,
  "tabs": `import { Tabs } from "@/components/tabs";

<Tabs items={[
  { value: "preview", label: "Preview", content: <div>Preview</div> },
  { value: "code", label: "Code", content: <div>Code</div> },
]} />`,
  "accordion": `import { Accordion } from "@/components/accordion";

<Accordion type="single" items={[
  { value: "1", trigger: "Question?", content: "Answer." },
]} />`,
  "dialog": `import { Dialog, DialogTitle, DialogDescription } from "@/components/dialog";

<Dialog open={open} onClose={() => setOpen(false)} title="Title">
  <DialogTitle>Hello</DialogTitle>
  <DialogDescription>Content here.</DialogDescription>
</Dialog>`,
  "tooltip": `import { Tooltip } from "@/components/tooltip";

<Tooltip content="Helpful tip" position="top">
  <button>Hover me</button>
</Tooltip>`,
  "dropdown": `import { Dropdown } from "@/components/dropdown";

<Dropdown
  trigger={<button>Open</button>}
  items={[{ label: "Edit", onClick: () => {} }]}
/>`,
  "card": `import { Card, CardImage, CardContent, CardActions, CardGrid } from "@/components/card";

// Single card with image and actions
<Card variant="default">
  <CardImage src="/image.jpg" alt="Description" />
  <CardContent 
    title="Card Title"
    description="Card description with motion-first design."
  />
  <CardActions>
    <Button>Primary</Button>
    <Button variant="ghost">Secondary</Button>
  </CardActions>
</Card>

// Staggered grid with entrance animations
<CardGrid columns={3} staggerDelay={0.15}>
  <Card><CardContent title="Card 1" /></Card>
  <Card><CardContent title="Card 2" /></Card>
  <Card><CardContent title="Card 3" /></Card>
</CardGrid>`,
  "skeleton": `import { Skeleton } from "@/components/skeleton";

<Skeleton variant="text" lines={2} loaded={false}>
  <p>Content to reveal</p>
</Skeleton>`,
  "toast": `import { useToast } from "@/components/toast";

const { toast } = useToast();
toast({ title: "Saved!", variant: "success" });`,
};

// =============================================================================
// SECTION COMPONENT
// =============================================================================

function Section({ id, title, description, children, code }: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  code?: string;
}) {
  return (
    <ScrollReveal variant="fade-up" delay={0.05}>
      <section id={id} className="scroll-mt-24 mb-24">
        <div className="border-t border-neutral-200/60 dark:border-neutral-800/60 pt-8 mb-6">
          <h2 className="text-base font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">{title}</h2>
          {description && <p className="text-sm text-neutral-600 dark:text-neutral-500 leading-relaxed">{description}</p>}
        </div>
        <div className="rounded-xl border border-neutral-200/40 dark:border-neutral-800/40 bg-neutral-100/30 dark:bg-neutral-900/30 p-6 overflow-hidden">
          {children}
        </div>
        {code && <CodeBlock code={code} />}
      </section>
    </ScrollReveal>
  );
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function Home() {
  return (
    <>
      <TableOfContents />

      <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 max-w-3xl mx-auto px-6 sm:px-8">
        {/* ============================================================= */}
        {/* HERO                                                           */}
        {/* ============================================================= */}
        <header className="pt-24 pb-32 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold tracking-tight">driftkit</h1>
            <ModeSwitcher irisWipe />
          </div>

          <div className="mb-6 h-[3.5rem] sm:h-[4rem] overflow-hidden">
            <span className="text-4xl sm:text-5xl font-bold leading-tight block">
              <Typewriter
                text=""
                loop={[
                  "Motion-first UI components.",
                  "Spring physics everywhere.",
                  "Copy, paste, ship.",
                ]}
                speed={50}
                loopPause={2500}
              />
            </span>
          </div>

          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mb-8 leading-relaxed">
            A growing collection of beautifully animated React components built with Framer Motion and Tailwind CSS.
            Every interaction is powered by spring physics — no easing curves, no keyframes, just natural motion.
          </p>

          <div className="flex items-center gap-6 flex-wrap">
            <a
              href="#typewriter"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-medium text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              Browse Components →
            </a>
            <a
              href="/docs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-medium text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              📚 Documentation
            </a>
            <a
              href="/playground/button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-sm hover:from-indigo-700 hover:to-purple-700 transition-colors shadow-lg shadow-indigo-500/25"
            >
              ⚡ V2 Playground
            </a>
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <span className="text-2xl font-bold text-neutral-900 dark:text-white tabular-nums">
                <NumberTicker value={COMPONENT_COUNT} />
              </span>
              <span className="text-sm">components and counting</span>
            </div>
          </div>
        </header>

        {/* ============================================================= */}
        {/* SHOWPIECES                                                     */}
        {/* ============================================================= */}
        <div className="pt-24 pb-16">
          <ScrollReveal variant="fade-up">
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-3">✦ Showpieces</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Interactive components that push beyond standard UI — magnetic pull, cursor glow, digit rolling, theme morphing, fisheye dock, and more.
              </p>
            </div>
          </ScrollReveal>

          <Section id="typewriter" title="Typewriter" description="Characters settle into place with spring physics. Loop mode types, deletes, and cycles through phrases." code={codeSnippets["typewriter"]}>
            <TypewriterDemo />
          </Section>

          <Section id="magnetic-dock" title="Magnetic Dock" description="macOS-style fisheye magnification. Items scale based on cursor proximity — zero re-renders." code={codeSnippets["magnetic-dock"]}>
            <MagneticDockDemo />
          </Section>

          <Section id="magnetic-button" title="Magnetic Button" description="Buttons that subtly pull toward your cursor. Spring physics, max 8px displacement." code={codeSnippets["magnetic-button"]}>
            <MagneticButtonDemo />
          </Section>

          <Section id="cursor-glow-card" title="Cursor Glow Card" description="Radial gradient spotlight follows the cursor. Zero re-renders — pure motion values." code={codeSnippets["cursor-glow-card"]}>
            <GlowCardDemo />
          </Section>

          <Section id="number-ticker" title="Number Ticker" description="Individual digits roll up or down like a slot machine. Direction-aware with spring physics." code={codeSnippets["number-ticker"]}>
            <NumberTickerDemo />
          </Section>

          <Section id="morphing-hamburger" title="Morphing Hamburger" description="Three lines fold into an X with per-line spring animation. The icon transforms, not replaces." code={codeSnippets["morphing-hamburger"]}>
            <MorphingHamburgerDemo />
          </Section>

          <Section id="staggered-list" title="Staggered List" description="Cascading entrance with three animation variants. Each item overshoots then settles." code={codeSnippets["staggered-list"]}>
            <StaggeredListDemo />
          </Section>

          <Section id="mode-switcher" title="Mode Switcher" description="Sun↔moon SVG morph with spring physics. The iris wipe variant radiates the theme change outward." code={codeSnippets["mode-switcher"]}>
            <ModeSwitcherDemo />
          </Section>

          <Section id="parallax-tilt-card" title="Parallax Tilt Card" description="3D perspective tilt on hover. Layers shift at different depths. Light reflection follows cursor." code={codeSnippets["parallax-tilt-card"]}>
            <ParallaxTiltDemo />
          </Section>

          <Section id="swipe-cards" title="Swipe Cards" description="Tinder-style card stack. Drag to dismiss with spring physics. Cards rotate as they fly." code={codeSnippets["swipe-cards"]}>
            <SwipeCardsDemo />
          </Section>

          <Section id="marquee" title="Marquee" description="Infinite horizontal scroll with edge fade. Variable speed and direction. Pause on hover." code={codeSnippets["marquee"]}>
            <MarqueeDemo />
          </Section>

          <Section id="gradient-border" title="Gradient Border" description="Rotating conic gradient border with soft glow. Custom colors and speed." code={codeSnippets["gradient-border"]}>
            <GradientBorderDemo />
          </Section>

          <Section id="spotlight-beam" title="Spotlight Beam" description="Animated light beam sweeps across content. Subtle premium shine effect." code={codeSnippets["spotlight-beam"]}>
            <SpotlightDemo />
          </Section>

          <Section id="ripple-button" title="Ripple Button" description="Material-style click ripple with spring physics. Multiple concurrent ripples." code={codeSnippets["ripple-button"]}>
            <RippleButtonDemo />
          </Section>

          <Section id="scroll-reveal" title="Scroll Reveal" description="Viewport-triggered entrance animations. Fade, slide, scale, and blur with springs." code={codeSnippets["scroll-reveal"]}>
            <ScrollRevealDemo />
          </Section>

          <Section id="text-shimmer" title="Text Shimmer" description="Animated gradient sweeps across text. Eye-catching for headings and hero sections." code={codeSnippets["text-shimmer"]}>
            <TextShimmerDemo />
          </Section>

          <Section id="wobble-card" title="Wobble Card" description="Cards that wobble like jelly on hover. Low-damping springs create the bouncy overshoot." code={codeSnippets["wobble-card"]}>
            <WobbleCardDemo />
          </Section>

          <Section id="animated-tabs" title="Animated Tabs" description="Tab indicator blob morphs between tabs with layout animation. Content cross-fades with springs." code={codeSnippets["animated-tabs"]}>
            <AnimatedTabsDemo />
          </Section>

          <Section id="command-palette" title="Command Palette" description="⌘K modal with fuzzy search, keyboard navigation, and spring transitions." code={codeSnippets["command-palette"]}>
            <CommandPaletteDemo />
          </Section>

          <Section id="expandable-card" title="Expandable Card" description="Shared layout animation — card morphs from compact to full detail view." code={codeSnippets["expandable-card"]}>
            <ExpandableCardDemo />
          </Section>

          <Section id="cursor-trail" title="Cursor Trail" description="Decorative dots follow the cursor with staggered spring decay. Each dot is lazier than the last." code={codeSnippets["cursor-trail"]}>
            <CursorTrailDemo />
          </Section>

          <Section id="liquid-button" title="Liquid Button" description="SVG blob shape that morphs and stretches toward your cursor with a gooey filter. Pure spring physics." code={codeSnippets["liquid-button"]}>
            <LiquidButtonDemo />
          </Section>

          <Section id="animated-counter" title="Animated Counter" description="Numbers count up with spring physics when scrolled into view. Stat cards with staggered entrance." code={codeSnippets["animated-counter"]}>
            <AnimatedCounterDemo />
          </Section>

          <Section id="progress-ring" title="Progress Ring" description="Circular progress with spring animation. The arc overshoots then settles into place." code={codeSnippets["progress-ring"]}>
            <ProgressRingDemo />
          </Section>

          <Section id="spring-carousel" title="Spring Carousel" description="Drag-to-navigate carousel with spring snap physics. Active card scales up, others recede." code={codeSnippets["spring-carousel"]}>
            <SpringCarouselDemo />
          </Section>

          <Section id="parallax-scroll" title="Parallax Scroll" description="Elements move at different speeds as you scroll. Spring-smoothed for buttery parallax." code={codeSnippets["parallax-scroll"]}>
            <ParallaxScrollDemo />
          </Section>

          <Section id="morphing-shape" title="Morphing Shape" description="SVG path morphs between circle, square, triangle, star, and diamond with spring physics. Click to cycle." code={codeSnippets["morphing-shape"]}>
            <MorphingShapeDemo />
          </Section>

          <Section id="schedule-picker" title="Schedule Picker" description="Weekly availability picker with toggleable days and expandable time slots. Spring-animated expand/collapse, slot add/remove." code={codeSnippets["schedule-picker"]}>
            <SchedulePickerDemo />
          </Section>

          <Section id="date-range-picker" title="Date Range Picker" description="Two-date range selector with spring-animated calendar dropdown. Visual range indicator and hover preview." code={codeSnippets["date-range-picker"]}>
            <DateRangePickerDemo />
          </Section>

          <Section id="multi-select" title="Multi Select" description="Tag input with spring entrance/exit for each pill. Type to add, backspace to remove, with optional suggestions." code={codeSnippets["multi-select"]}>
            <MultiSelectDemo />
          </Section>

          <Section id="stepper" title="Stepper" description="Multi-step form with numbered indicators, spring slide transitions, and animated progress bar." code={codeSnippets["stepper"]}>
            <StepperDemo />
          </Section>
        </div>

        {/* ============================================================= */}
        {/* STANDARD COMPONENTS                                            */}
        {/* ============================================================= */}
        <div className="pt-24 pb-16 border-t-2 border-neutral-300/50 dark:border-neutral-700/50 mt-8">
          <ScrollReveal variant="fade-up">
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-3">Standard Components</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Essential UI building blocks — each one enhanced with spring physics and micro-interactions.
              </p>
            </div>
          </ScrollReveal>

          <Section id="nav-menu" title="Navigation Menu" description="Sliding indicator follows your mouse with spring physics." code={codeSnippets["nav-menu"]}>
            <NavMenuDemo />
          </Section>

          <Section id="button" title="Button" code={codeSnippets["button"]}>
            <div className="space-y-6">
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-500 mb-3 uppercase tracking-wider">Variants</p>
                <div className="flex flex-wrap gap-3">
                  {variants.map((v) => <Button key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Button>)}
                </div>
              </div>
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-500 mb-3 uppercase tracking-wider">Sizes</p>
                <div className="flex flex-wrap items-center gap-3">
                  {sizes.map((s) => <Button key={s} size={s}>Size {s}</Button>)}
                </div>
              </div>
              <div>
                <p className="text-xs text-neutral-600 dark:text-neutral-500 mb-3 uppercase tracking-wider">Loading → Success</p>
                <LoadingDemo />
              </div>
            </div>
          </Section>

          <Section id="input" title="Input" description="Floating label, focus ring, error shake, success checkmark." code={codeSnippets["input"]}>
            <InputDemo />
          </Section>

          <Section id="toggle" title="Toggle" code={codeSnippets["toggle"]}>
            <ToggleDemo />
          </Section>

          <Section id="tabs" title="Tabs" description="Direction-aware content slide with spring indicator." code={codeSnippets["tabs"]}>
            <TabsDemo />
          </Section>

          <Section id="accordion" title="Accordion" code={codeSnippets["accordion"]}>
            <AccordionDemo />
          </Section>

          <Section id="dialog" title="Dialog" code={codeSnippets["dialog"]}>
            <DialogDemo />
          </Section>

          <Section id="tooltip" title="Tooltip" description="Spring pop-in with auto-positioning." code={codeSnippets["tooltip"]}>
            <div className="flex flex-wrap gap-6">
              <Tooltip content="Top" position="top"><Button variant="secondary" size="sm">Top</Button></Tooltip>
              <Tooltip content="Bottom" position="bottom"><Button variant="secondary" size="sm">Bottom</Button></Tooltip>
              <Tooltip content="I follow ✨" followCursor><Button variant="ghost" size="sm">Follow</Button></Tooltip>
            </div>
          </Section>

          <Section id="dropdown" title="Dropdown Menu" code={codeSnippets["dropdown"]}>
            <DropdownDemo />
          </Section>

          <Section id="card" title="Card" description="Motion-first cards with hover lift, press feedback, and staggered grid animations. Three variants with image slots and structured content areas." code={codeSnippets["card"]}>
            <CardDemo />
          </Section>

          <Section id="skeleton" title="Skeleton" description="Shimmer loading with spring crossfade reveal." code={codeSnippets["skeleton"]}>
            <SkeletonDemo />
          </Section>

          <Section id="toast" title="Toast" description="Swipe to dismiss. Hover to pause." code={codeSnippets["toast"]}>
            <ToastDemo />
          </Section>
        </div>

        {/* ============================================================= */}
        {/* FOOTER                                                         */}
        {/* ============================================================= */}
        <footer className="py-16 mt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-600 dark:text-neutral-500">
          <div className="flex items-center gap-3">
            <span className="font-bold text-neutral-700 dark:text-neutral-300">driftkit</span>
            <span>·</span>
            <span className="tabular-nums"><NumberTicker value={COMPONENT_COUNT} /> components</span>
          </div>
          <div className="flex items-center gap-4">
            <span>
              Built by{" "}
              <a href="https://nikkikipple.com" className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white underline underline-offset-2 transition-colors">
                Nikki Kipple
              </a>
            </span>
            <a
              href="https://github.com/nikkikipple/driftkit"
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
