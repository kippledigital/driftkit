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
  "accordion": {
    name: "accordion",
    displayName: "Accordion",
    description: "Motion-first accordion with height animations, staggered content reveals, and keyboard navigation. Supports single or multiple open panels.",
    importPath: 'import { Accordion } from "driftkit";',
    category: "Layout",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/accordion.tsx",
    props: [
      {
        name: "items",
        type: "AccordionItem[]",
        required: true,
        description: "Array of accordion items. Each has value (key), trigger (header content), content (panel content), and optional disabled flag."
      },
      {
        name: "type",
        type: '"single" | "multiple"',
        required: false,
        defaultValue: '"single"',
        description: "Single allows only one panel open at a time. Multiple allows any combination."
      },
      {
        name: "value",
        type: "string[]",
        required: false,
        description: "Controlled open values. Array of item values that are currently open."
      },
      {
        name: "defaultValue",
        type: "string[]",
        required: false,
        description: "Default open values for uncontrolled usage."
      },
      {
        name: "onValueChange",
        type: "(value: string[]) => void",
        required: false,
        description: "Callback when open state changes. Receives array of open item values."
      }
    ],
    examples: [
      `<Accordion items={[{ value: "item1", trigger: "Panel 1", content: "Content here" }]} />`,
      `<Accordion type="multiple" items={items} defaultValue={["item1", "item2"]} />`,
      `<Accordion items={faqItems} onValueChange={handleAccordionChange} />`
    ],
  },
  "animated-counter": {
    name: "animated-counter",
    displayName: "Animated Counter",
    description: "Motion-first animated counter component with spring physics and smooth transitions.",
    importPath: 'import { AnimatedCounter } from "driftkit";',
    category: "Data Display",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/animated-counter.tsx",
    props: [],
    examples: [`<AnimatedCounter />`],
  },
  "animated-tabs": {
    name: "animated-tabs",
    displayName: "Animated Tabs",
    description: "Motion-first animated tabs component with spring physics and smooth transitions.",
    importPath: 'import { AnimatedTabs } from "driftkit";',
    category: "Navigation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/animated-tabs.tsx",
    props: [],
    examples: [`<AnimatedTabs />`],
  },
  "badge": {
    name: "badge",
    displayName: "Badge",
    description: "Motion-first badge with multiple variants, icons, pulse animation, and removable functionality. Includes NotificationBadge for counts and status indicators.",
    importPath: 'import { Badge, NotificationBadge, AnimatedBadge } from "driftkit";',
    category: "Data Display",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/badge.tsx",
    props: [
      {
        name: "variant",
        type: '"default" | "secondary" | "success" | "warning" | "error" | "info" | "outline"',
        required: false,
        defaultValue: '"default"',
        description: "Visual variant with different background colors and borders. Success is green, error is red, warning is amber, etc."
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        required: false,
        defaultValue: '"md"',
        description: "Badge size affecting padding and text size."
      },
      {
        name: "icon",
        type: "ReactNode",
        required: false,
        description: "Optional icon displayed before the text. Automatically sized based on badge size."
      },
      {
        name: "pulse",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Shows animated pulse dot for live status indicators."
      },
      {
        name: "removable",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Shows remove button (×) with hover effects. Use with onRemove callback."
      },
      {
        name: "onRemove",
        type: "() => void",
        required: false,
        description: "Callback when remove button is clicked. Only works when removable is true."
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Badge content - typically short text or numbers."
      }
    ],
    examples: [
      `<Badge variant="success">New</Badge>`,
      `<Badge variant="error" removable onRemove={handleRemove}>Error</Badge>`,
      `<Badge pulse variant="warning" icon={<AlertIcon />}>Live</Badge>`,
      `<NotificationBadge count={5}><Button>Messages</Button></NotificationBadge>`
    ],
  },
  "breadcrumbs": {
    name: "breadcrumbs",
    displayName: "Breadcrumbs",
    description: "Motion-first breadcrumbs component with spring physics and smooth transitions.",
    importPath: 'import { Breadcrumbs } from "driftkit";',
    category: "Navigation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/breadcrumbs.tsx",
    props: [],
    examples: [`<Breadcrumbs />`],
  },
  "button": {
    name: "button",
    displayName: "Button",
    description: "Motion-first button component with spring physics and smooth transitions. Features loading states, success states, and multiple variants.",
    importPath: 'import { Button } from "driftkit";',
    category: "Buttons",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/button.tsx",
    props: [
      {
        name: "variant",
        type: '"default" | "secondary" | "ghost" | "destructive"',
        required: false,
        defaultValue: '"default"',
        description: "Visual style variant. Default has dark background, secondary is lighter, ghost is transparent, destructive is red."
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        required: false,
        defaultValue: '"md"',
        description: "Button size affecting padding and text size."
      },
      {
        name: "loading",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Shows loading spinner and 'Loading...' text. Button becomes disabled while loading."
      },
      {
        name: "success",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Shows success checkmark and 'Done' text. Use after successful form submission."
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Disables the button and reduces opacity. Prevents interactions."
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Button content - text, icons, or other elements."
      }
    ],
    examples: [
      `<Button variant="default">Primary Action</Button>`,
      `<Button variant="secondary" size="lg">Secondary</Button>`,
      `<Button loading>Submitting...</Button>`,
      `<Button success>Form Submitted!</Button>`
    ],
  },
  "card": {
    name: "card",
    displayName: "Card",
    description: "Motion-first card component with spring physics, hover lift, and smooth transitions. Includes sub-components for images, content, and actions.",
    importPath: 'import { Card, CardContent, CardImage, CardActions } from "driftkit";',
    category: "Layout",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/card.tsx",
    props: [
      {
        name: "variant",
        type: '"default" | "outlined" | "elevated"',
        required: false,
        defaultValue: '"default"',
        description: "Visual variant. Default has subtle border, outlined has thick border, elevated has enhanced shadow."
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        required: false,
        defaultValue: '"md"',
        description: "Affects text size and overall scale of the card."
      },
      {
        name: "static",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Disables hover and press interactions for non-interactive cards."
      },
      {
        name: "animated",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Enables enter animation when card mounts. Use with CardGrid for staggered effects."
      },
      {
        name: "delay",
        type: "number",
        required: false,
        description: "Animation delay in seconds for staggered entrance effects."
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Card content - typically CardImage, CardContent, and CardActions components."
      }
    ],
    examples: [
      `<Card><CardContent title="Hello" description="Card content" /></Card>`,
      `<Card variant="elevated" animated><CardImage src="/image.jpg" alt="Hero" /><CardContent title="Featured" /></Card>`,
      `<Card variant="outlined" static><CardContent>Static card content</CardContent></Card>`
    ],
  },
  "code-block": {
    name: "code-block",
    displayName: "Code Block",
    description: "Motion-first code block component with spring physics and smooth transitions.",
    importPath: 'import { CodeBlock } from "driftkit";',
    category: "Data Display",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/code-block.tsx",
    props: [],
    examples: [`<CodeBlock />`],
  },
  "code-display": {
    name: "code-display",
    displayName: "Code Display",
    description: "Motion-first code display component with spring physics and smooth transitions.",
    importPath: 'import { CodeDisplay } from "driftkit";',
    category: "Data Display",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/code-display.tsx",
    props: [],
    examples: [`<CodeDisplay />`],
  },
  "command-palette": {
    name: "command-palette",
    displayName: "Command Palette",
    description: "Motion-first command palette component with spring physics and smooth transitions.",
    importPath: 'import { CommandPalette } from "driftkit";',
    category: "Navigation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/command-palette.tsx",
    props: [],
    examples: [`<CommandPalette />`],
  },
  "component-switcher": {
    name: "component-switcher",
    displayName: "Component Switcher",
    description: "Motion-first component switcher component with spring physics and smooth transitions.",
    importPath: 'import { ComponentSwitcher } from "driftkit";',
    category: "Navigation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/component-switcher.tsx",
    props: [],
    examples: [`<ComponentSwitcher />`],
  },
  "context-menu": {
    name: "context-menu",
    displayName: "Context Menu",
    description: "Motion-first context menu component with spring physics and smooth transitions.",
    importPath: 'import { ContextMenu } from "driftkit";',
    category: "Overlay",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/context-menu.tsx",
    props: [],
    examples: [`<ContextMenu />`],
  },
  "control-panel": {
    name: "control-panel",
    displayName: "Control Panel",
    description: "Motion-first control panel component with spring physics and smooth transitions.",
    importPath: 'import { ControlPanel } from "driftkit";',
    category: "Input",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/control-panel.tsx",
    props: [],
    examples: [`<ControlPanel />`],
  },
  "cursor-trail": {
    name: "cursor-trail",
    displayName: "Cursor Trail",
    description: "Motion-first cursor trail component with spring physics and smooth transitions.",
    importPath: 'import { CursorTrail } from "driftkit";',
    category: "Animation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/cursor-trail.tsx",
    props: [],
    examples: [`<CursorTrail />`],
  },
  "date-range-picker": {
    name: "date-range-picker",
    displayName: "Date Range Picker",
    description: "Motion-first date range picker component with spring physics and smooth transitions.",
    importPath: 'import { DateRangePicker } from "driftkit";',
    category: "Input",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/date-range-picker.tsx",
    props: [],
    examples: [`<DateRangePicker />`],
  },
  "dialog": {
    name: "dialog",
    displayName: "Dialog",
    description: "Motion-first modal dialog with backdrop blur, focus trap, keyboard support, and spring physics. Includes DialogTitle, DialogDescription, and DialogFooter sub-components.",
    importPath: 'import { Dialog, DialogTitle, DialogDescription, DialogFooter } from "driftkit";',
    category: "Overlay",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/dialog.tsx",
    props: [
      {
        name: "open",
        type: "boolean",
        required: true,
        description: "Controls dialog visibility. Use state to manage open/close."
      },
      {
        name: "onClose",
        type: "() => void",
        required: true,
        description: "Callback when dialog should close (backdrop click, Escape key)."
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        required: false,
        defaultValue: '"md"',
        description: "Dialog width. Small (24rem), medium (32rem), large (42rem)."
      },
      {
        name: "title",
        type: "string",
        required: false,
        description: "Accessible title for screen readers via aria-label."
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Dialog content - typically DialogTitle, DialogDescription, and DialogFooter."
      }
    ],
    examples: [
      `<Dialog open={isOpen} onClose={() => setIsOpen(false)}><DialogTitle>Confirm</DialogTitle><DialogDescription>Are you sure?</DialogDescription><DialogFooter><Button onClick={() => setIsOpen(false)}>Cancel</Button></DialogFooter></Dialog>`,
      `<Dialog open={showDialog} onClose={handleClose} size="lg"><DialogTitle>Settings</DialogTitle><div>Dialog content...</div></Dialog>`
    ],
  },
  "drawer": {
    name: "drawer",
    displayName: "Drawer",
    description: "Motion-first drawer component with spring physics and smooth transitions.",
    importPath: 'import { Drawer } from "driftkit";',
    category: "Overlay",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/drawer.tsx",
    props: [],
    examples: [`<Drawer />`],
  },
  "dropdown": {
    name: "dropdown",
    displayName: "Dropdown",
    description: "Motion-first dropdown menu with staggered item animations, keyboard navigation, click-outside dismissal, and portal rendering. Features spring physics and WAI-ARIA compliance.",
    importPath: 'import { Dropdown } from "driftkit";',
    category: "Navigation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/dropdown.tsx",
    props: [
      {
        name: "trigger",
        type: "ReactNode",
        required: true,
        description: "The trigger element that opens the dropdown when clicked. Can be a button, text, or any clickable element."
      },
      {
        name: "items",
        type: "DropdownItem[]",
        required: true,
        description: "Array of dropdown items. Each has label, onClick callback, optional icon, disabled flag, and separator flag."
      },
      {
        name: "align",
        type: '"left" | "right"',
        required: false,
        defaultValue: '"left"',
        description: "Menu alignment relative to trigger. Left aligns left edges, right aligns right edges."
      }
    ],
    examples: [
      `<Dropdown trigger={<Button>Menu</Button>} items={[{ label: "Edit", onClick: handleEdit }, { label: "Delete", onClick: handleDelete, separator: true }]} />`,
      `<Dropdown trigger="Options ▾" items={menuItems} align="right" />`,
      `<Dropdown trigger={<IconButton />} items={[{ label: "Profile", icon: <UserIcon />, onClick: goToProfile }, { label: "Settings", icon: <CogIcon />, onClick: openSettings }]} />`
    ],
  },
  "expandable-card": {
    name: "expandable-card",
    displayName: "Expandable Card",
    description: "Motion-first expandable card component with spring physics and smooth transitions.",
    importPath: 'import { ExpandableCard } from "driftkit";',
    category: "Layout",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/expandable-card.tsx",
    props: [],
    examples: [`<ExpandableCard />`],
  },
  "glow-card": {
    name: "glow-card",
    displayName: "Glow Card",
    description: "Motion-first glow card component with spring physics and smooth transitions.",
    importPath: 'import { GlowCard } from "driftkit";',
    category: "Layout",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/glow-card.tsx",
    props: [],
    examples: [`<GlowCard />`],
  },
  "gradient-border": {
    name: "gradient-border",
    displayName: "Gradient Border",
    description: "Motion-first gradient border component with spring physics and smooth transitions.",
    importPath: 'import { GradientBorder } from "driftkit";',
    category: "Animation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/gradient-border.tsx",
    props: [],
    examples: [`<GradientBorder />`],
  },
  "input": {
    name: "input",
    displayName: "Input",
    description: "Motion-first input with floating labels, state-aware styling, error shake animation, and focus rings. Supports success states with checkmark animation.",
    importPath: 'import { Input } from "driftkit";',
    category: "Input",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/input.tsx",
    props: [
      {
        name: "label",
        type: "string",
        required: false,
        description: "Floating label that animates up when focused or filled. Provides accessible labeling."
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        required: false,
        defaultValue: '"md"',
        description: "Input size affecting padding, text size, and label positioning."
      },
      {
        name: "state",
        type: '"default" | "error" | "success"',
        required: false,
        defaultValue: '"default"',
        description: "Visual state. Error shows red border and shake animation. Success shows green border and checkmark."
      },
      {
        name: "errorMessage",
        type: "string",
        required: false,
        description: "Error message displayed below input when state is 'error'. Animates in/out smoothly."
      }
    ],
    examples: [
      `<Input label="Email address" type="email" />`,
      `<Input label="Password" type="password" state="error" errorMessage="Password must be at least 8 characters" />`,
      `<Input label="Username" state="success" value="john_doe" />`,
      `<Input size="lg" placeholder="Enter your name..." />`
    ],
  },
  "liquid-button": {
    name: "liquid-button",
    displayName: "Liquid Button",
    description: "Motion-first liquid button component with spring physics and smooth transitions.",
    importPath: 'import { LiquidButton } from "driftkit";',
    category: "Buttons",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/liquid-button.tsx",
    props: [],
    examples: [`<LiquidButton />`],
  },
  "magnetic-button": {
    name: "magnetic-button",
    displayName: "Magnetic Button",
    description: "Motion-first magnetic button component with spring physics and smooth transitions.",
    importPath: 'import { MagneticButton } from "driftkit";',
    category: "Buttons",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/magnetic-button.tsx",
    props: [],
    examples: [`<MagneticButton />`],
  },
  "magnetic-dock": {
    name: "magnetic-dock",
    displayName: "Magnetic Dock",
    description: "Motion-first magnetic dock component with spring physics and smooth transitions.",
    importPath: 'import { MagneticDock } from "driftkit";',
    category: "Navigation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/magnetic-dock.tsx",
    props: [],
    examples: [`<MagneticDock />`],
  },
  "marquee": {
    name: "marquee",
    displayName: "Marquee",
    description: "Motion-first marquee component with spring physics and smooth transitions.",
    importPath: 'import { Marquee } from "driftkit";',
    category: "Animation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/marquee.tsx",
    props: [],
    examples: [`<Marquee />`],
  },
  "mode-switcher": {
    name: "mode-switcher",
    displayName: "Mode Switcher",
    description: "Motion-first mode switcher component with spring physics and smooth transitions.",
    importPath: 'import { ModeSwitcher } from "driftkit";',
    category: "Utility",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/mode-switcher.tsx",
    props: [],
    examples: [`<ModeSwitcher />`],
  },
  "morphing-hamburger": {
    name: "morphing-hamburger",
    displayName: "Morphing Hamburger",
    description: "Motion-first morphing hamburger component with spring physics and smooth transitions.",
    importPath: 'import { MorphingHamburger } from "driftkit";',
    category: "Navigation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/morphing-hamburger.tsx",
    props: [],
    examples: [`<MorphingHamburger />`],
  },
  "morphing-shape": {
    name: "morphing-shape",
    displayName: "Morphing Shape",
    description: "Motion-first morphing shape component with spring physics and smooth transitions.",
    importPath: 'import { MorphingShape } from "driftkit";',
    category: "Animation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/morphing-shape.tsx",
    props: [],
    examples: [`<MorphingShape />`],
  },
  "multi-select": {
    name: "multi-select",
    displayName: "Multi Select",
    description: "Motion-first multi select component with spring physics and smooth transitions.",
    importPath: 'import { MultiSelect } from "driftkit";',
    category: "Input",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/multi-select.tsx",
    props: [],
    examples: [`<MultiSelect />`],
  },
  "nav-menu": {
    name: "nav-menu",
    displayName: "Nav Menu",
    description: "Motion-first nav menu component with spring physics and smooth transitions.",
    importPath: 'import { NavMenu } from "driftkit";',
    category: "Navigation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/nav-menu.tsx",
    props: [],
    examples: [`<NavMenu />`],
  },
  "number-ticker": {
    name: "number-ticker",
    displayName: "Number Ticker",
    description: "Motion-first number ticker component with spring physics and smooth transitions.",
    importPath: 'import { NumberTicker } from "driftkit";',
    category: "Data Display",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/number-ticker.tsx",
    props: [],
    examples: [`<NumberTicker />`],
  },
  "parallax-scroll": {
    name: "parallax-scroll",
    displayName: "Parallax Scroll",
    description: "Motion-first parallax scroll component with spring physics and smooth transitions.",
    importPath: 'import { ParallaxScroll } from "driftkit";',
    category: "Animation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/parallax-scroll.tsx",
    props: [],
    examples: [`<ParallaxScroll />`],
  },
  "parallax-tilt-card": {
    name: "parallax-tilt-card",
    displayName: "Parallax Tilt Card",
    description: "Motion-first parallax tilt card component with spring physics and smooth transitions.",
    importPath: 'import { ParallaxTiltCard } from "driftkit";',
    category: "Layout",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/parallax-tilt-card.tsx",
    props: [],
    examples: [`<ParallaxTiltCard />`],
  },
  "popover": {
    name: "popover",
    displayName: "Popover",
    description: "Motion-first popover component with spring physics and smooth transitions.",
    importPath: 'import { Popover } from "driftkit";',
    category: "Overlay",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/popover.tsx",
    props: [],
    examples: [`<Popover />`],
  },
  "progress-ring": {
    name: "progress-ring",
    displayName: "Progress Ring",
    description: "Motion-first progress ring component with spring physics and smooth transitions.",
    importPath: 'import { ProgressRing } from "driftkit";',
    category: "Feedback",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/progress-ring.tsx",
    props: [],
    examples: [`<ProgressRing />`],
  },
  "ripple-button": {
    name: "ripple-button",
    displayName: "Ripple Button",
    description: "Motion-first ripple button component with spring physics and smooth transitions.",
    importPath: 'import { RippleButton } from "driftkit";',
    category: "Buttons",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/ripple-button.tsx",
    props: [],
    examples: [`<RippleButton />`],
  },
  "schedule-picker": {
    name: "schedule-picker",
    displayName: "Schedule Picker",
    description: "Motion-first schedule picker component with spring physics and smooth transitions.",
    importPath: 'import { SchedulePicker } from "driftkit";',
    category: "Input",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/schedule-picker.tsx",
    props: [],
    examples: [`<SchedulePicker />`],
  },
  "scroll-reveal": {
    name: "scroll-reveal",
    displayName: "Scroll Reveal",
    description: "Motion-first scroll reveal component with spring physics and smooth transitions.",
    importPath: 'import { ScrollReveal } from "driftkit";',
    category: "Animation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/scroll-reveal.tsx",
    props: [],
    examples: [`<ScrollReveal />`],
  },
  "skeleton": {
    name: "skeleton",
    displayName: "Skeleton",
    description: "Motion-first skeleton component with spring physics and smooth transitions.",
    importPath: 'import { Skeleton } from "driftkit";',
    category: "Layout",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/skeleton.tsx",
    props: [],
    examples: [`<Skeleton />`],
  },
  "spotlight": {
    name: "spotlight",
    displayName: "Spotlight",
    description: "Motion-first spotlight component with spring physics and smooth transitions.",
    importPath: 'import { Spotlight } from "driftkit";',
    category: "Animation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/spotlight.tsx",
    props: [],
    examples: [`<Spotlight />`],
  },
  "spring-carousel": {
    name: "spring-carousel",
    displayName: "Spring Carousel",
    description: "Motion-first spring carousel component with spring physics and smooth transitions.",
    importPath: 'import { SpringCarousel } from "driftkit";',
    category: "Layout",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/spring-carousel.tsx",
    props: [],
    examples: [`<SpringCarousel />`],
  },
  "staggered-list": {
    name: "staggered-list",
    displayName: "Staggered List",
    description: "Motion-first staggered list component with spring physics and smooth transitions.",
    importPath: 'import { StaggeredList } from "driftkit";',
    category: "Animation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/staggered-list.tsx",
    props: [],
    examples: [`<StaggeredList />`],
  },
  "stepper": {
    name: "stepper",
    displayName: "Stepper",
    description: "Motion-first stepper component with spring physics and smooth transitions.",
    importPath: 'import { Stepper } from "driftkit";',
    category: "Navigation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/stepper.tsx",
    props: [],
    examples: [`<Stepper />`],
  },
  "swipe-cards": {
    name: "swipe-cards",
    displayName: "Swipe Cards",
    description: "Motion-first swipe cards component with spring physics and smooth transitions.",
    importPath: 'import { SwipeCards } from "driftkit";',
    category: "Layout",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/swipe-cards.tsx",
    props: [],
    examples: [`<SwipeCards />`],
  },
  "tabs": {
    name: "tabs",
    displayName: "Tabs",
    description: "Motion-first tabs with sliding indicator, direction-aware content transitions, and full keyboard navigation. Features layout animations and spring physics.",
    importPath: 'import { Tabs } from "driftkit";',
    category: "Navigation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/tabs.tsx",
    props: [
      {
        name: "items",
        type: "TabItem[]",
        required: true,
        description: "Array of tab items. Each has value (key), label (tab header), content (panel content), and optional disabled flag."
      },
      {
        name: "value",
        type: "string",
        required: false,
        description: "Controlled active tab value. Use with onValueChange for controlled tabs."
      },
      {
        name: "defaultValue",
        type: "string",
        required: false,
        description: "Default active tab for uncontrolled usage. Falls back to first tab."
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        required: false,
        description: "Callback when active tab changes. Receives the new tab's value."
      }
    ],
    examples: [
      `<Tabs items={[{ value: "tab1", label: "Overview", content: <div>Overview content</div> }]} />`,
      `<Tabs value={activeTab} onValueChange={setActiveTab} items={tabItems} />`,
      `<Tabs defaultValue="settings" items={[{ value: "profile", label: "Profile", content: <ProfileForm /> }, { value: "settings", label: "Settings", content: <SettingsPanel /> }]} />`
    ],
  },
  "text-shimmer": {
    name: "text-shimmer",
    displayName: "Text Shimmer",
    description: "Motion-first text shimmer component with spring physics and smooth transitions.",
    importPath: 'import { TextShimmer } from "driftkit";',
    category: "Animation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/text-shimmer.tsx",
    props: [],
    examples: [`<TextShimmer />`],
  },
  "toast": {
    name: "toast",
    displayName: "Toast",
    description: "Motion-first toast notification system with drag-to-dismiss, auto-dismiss countdown, and spring physics. Use ToastProvider and useToast hook.",
    importPath: 'import { ToastProvider, useToast } from "driftkit";',
    category: "Feedback",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/toast.tsx",
    props: [
      {
        name: "title",
        type: "string",
        required: true,
        description: "Main toast message text displayed prominently."
      },
      {
        name: "description",
        type: "string",
        required: false,
        description: "Optional secondary text displayed below the title in smaller font."
      },
      {
        name: "variant",
        type: '"default" | "success" | "error" | "warning"',
        required: false,
        defaultValue: '"default"',
        description: "Visual variant affecting border color and icon. Success shows ✓, error shows ✕, warning shows !."
      },
      {
        name: "duration",
        type: "number",
        required: false,
        defaultValue: "4000",
        description: "Auto-dismiss duration in milliseconds. Progress bar shows countdown."
      }
    ],
    examples: [
      `const { toast } = useToast(); toast({ title: "Success!", variant: "success" });`,
      `toast({ title: "Error occurred", description: "Please try again", variant: "error" });`,
      `toast({ title: "Warning", description: "Check your input", variant: "warning", duration: 6000 });`
    ],
  },
  "toggle": {
    name: "toggle",
    displayName: "Toggle",
    description: "Motion-first toggle switch with sliding thumb animation, press squish effect, and iOS-style physics. Supports controlled and uncontrolled usage.",
    importPath: 'import { Toggle } from "driftkit";',
    category: "Input",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/toggle.tsx",
    props: [
      {
        name: "checked",
        type: "boolean",
        required: false,
        description: "Controlled checked state. Use with onChange for controlled toggles."
      },
      {
        name: "defaultChecked",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Default checked state for uncontrolled usage."
      },
      {
        name: "onChange",
        type: "(checked: boolean) => void",
        required: false,
        description: "Callback when toggle state changes. Receives the new checked state."
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        required: false,
        defaultValue: '"md"',
        description: "Toggle size. Small (36x20px), medium (44x24px), large (56x30px)."
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Disables the toggle and reduces opacity. Prevents interactions."
      }
    ],
    examples: [
      `<Toggle defaultChecked />`,
      `<Toggle checked={isEnabled} onChange={setIsEnabled} />`,
      `<Toggle size="lg" aria-label="Enable notifications" />`,
      `<Toggle disabled aria-labelledby="setting-label" />`
    ],
  },
  "tooltip": {
    name: "tooltip",
    displayName: "Tooltip",
    description: "Motion-first tooltip component with spring physics and smooth transitions.",
    importPath: 'import { Tooltip } from "driftkit";',
    category: "Overlay",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/tooltip.tsx",
    props: [],
    examples: [`<Tooltip />`],
  },
  "typewriter": {
    name: "typewriter",
    displayName: "Typewriter",
    description: "Motion-first typewriter component with spring physics and smooth transitions.",
    importPath: 'import { Typewriter } from "driftkit";',
    category: "Animation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/typewriter.tsx",
    props: [],
    examples: [`<Typewriter />`],
  },
  "wobble-card": {
    name: "wobble-card",
    displayName: "Wobble Card",
    description: "Motion-first wobble card component with spring physics and smooth transitions.",
    importPath: 'import { WobbleCard } from "driftkit";',
    category: "Layout",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/wobble-card.tsx",
    props: [],
    examples: [`<WobbleCard />`],
  },
};

export function getComponentInfo(slug: string): ComponentInfo | null {
  return componentsData[slug] || null;
}

export function getAllComponentNames(): string[] {
  return Object.keys(componentsData);
}

export function getComponentsByCategory(): Record<string, ComponentInfo[]> {
  const categories: Record<string, ComponentInfo[]> = {};
  for (const info of Object.values(componentsData)) {
    if (!categories[info.category]) categories[info.category] = [];
    categories[info.category].push(info);
  }
  return categories;
}
