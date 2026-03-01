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
    description: "Count-up animation triggered on scroll-into-view. Numbers animate from 0 to target with spring physics including satisfying overshoot settle.",
    importPath: 'import { AnimatedCounter } from "driftkit";',
    category: "Data Display",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/animated-counter.tsx",
    props: [],
    examples: [
      `<AnimatedCounter />`
    ],
  },
  "animated-tabs": {
    name: "animated-tabs",
    displayName: "Animated Tabs",
    description: "Tabs with morphing indicator blob. Active tab indicator smoothly morphs between positions using layout animation for a fluid selection effect.",
    importPath: 'import { AnimatedTabs } from "driftkit";',
    category: "Navigation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/animated-tabs.tsx",
    props: [],
    examples: [
      `<AnimatedTabs />`
    ],
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
    description: "Navigation breadcrumb trail with spring-animated separators and hover effects. Shows current location in navigation hierarchy.",
    importPath: 'import { Breadcrumbs } from "driftkit";',
    category: "Navigation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/breadcrumbs.tsx",
    props: [],
    examples: [
      `<Breadcrumbs />`
    ],
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
    description: "⌘K command palette with fuzzy search, keyboard navigation, and spring-animated entrance. Supports icons, keyboard shortcut display, and accessible focus management.",
    importPath: 'import { CommandPalette } from "driftkit";',
    category: "Navigation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/command-palette.tsx",
    props: [
          {
                "name": "items",
                "type": "CommandItem[]",
                "required": true,
                "description": "Command items with id, label, optional icon, shortcut, and onSelect callback."
          },
          {
                "name": "open",
                "type": "boolean",
                "required": true,
                "description": "Controls palette visibility."
          },
          {
                "name": "onClose",
                "type": "() => void",
                "required": true,
                "description": "Callback when palette should close."
          },
          {
                "name": "placeholder",
                "type": "string",
                "required": false,
                "defaultValue": "\"Type a command…\"",
                "description": "Search input placeholder."
          }
    ],
    examples: [
      `<CommandPalette open={isOpen} onClose={() => setIsOpen(false)} items={commands} />`
    ],
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
    description: "Right-click context menu with keyboard nav, spring entrance, icons, shortcuts, separators, danger items, and nested submenus.",
    importPath: 'import { ContextMenu } from "driftkit";',
    category: "Overlay",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/context-menu.tsx",
    props: [
          {
                "name": "children",
                "type": "ReactNode",
                "required": true,
                "description": "Right-click target area."
          },
          {
                "name": "items",
                "type": "ContextMenuItem[]",
                "required": true,
                "description": "Menu items with id, label, icon, shortcut, onClick, submenu."
          },
          {
                "name": "disabled",
                "type": "boolean",
                "required": false,
                "defaultValue": "false",
                "description": "Disable context menu."
          }
    ],
    examples: [
      `<ContextMenu items={[{ id: "copy", label: "Copy", shortcut: "⌘C", onClick: copy }]}><div>Right-click</div></ContextMenu>`
    ],
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
    description: "Decorative cursor trail with staggered spring decay. Dots follow the cursor with increasing delay, creating a comet-tail effect with independent springs.",
    importPath: 'import { CursorTrail } from "driftkit";',
    category: "Animation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/cursor-trail.tsx",
    props: [
          {
                "name": "count",
                "type": "number",
                "required": false,
                "defaultValue": "8",
                "description": "Number of trail dots."
          },
          {
                "name": "size",
                "type": "number",
                "required": false,
                "defaultValue": "8",
                "description": "Base dot size in pixels."
          },
          {
                "name": "color",
                "type": "string",
                "required": false,
                "defaultValue": "\"currentColor\"",
                "description": "Dot color. currentColor = rainbow gradient."
          }
    ],
    examples: [
      `<CursorTrail />`,
      `<CursorTrail count={12} size={6} color="#ff6b6b" />`
    ],
  },
  "date-range-picker": {
    name: "date-range-picker",
    displayName: "Date Range Picker",
    description: "Two-date range selector with spring-animated calendar dropdown. Month transitions use directional spring animation. Supports hover preview.",
    importPath: 'import { DateRangePicker } from "driftkit";',
    category: "Input",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/date-range-picker.tsx",
    props: [
          {
                "name": "value",
                "type": "DateRange",
                "required": false,
                "description": "Controlled range (start/end Date | null)."
          },
          {
                "name": "defaultValue",
                "type": "DateRange",
                "required": false,
                "description": "Default range."
          },
          {
                "name": "onChange",
                "type": "(range: DateRange) => void",
                "required": false,
                "description": "Range change callback."
          },
          {
                "name": "placeholder",
                "type": "{ start?: string; end?: string }",
                "required": false,
                "description": "Placeholder text."
          }
    ],
    examples: [
      `<DateRangePicker onChange={setRange} />`,
      `<DateRangePicker placeholder={{ start: "Check in", end: "Check out" }} />`
    ],
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
    description: "Side panel with spring slide from any edge and backdrop blur. Includes focus trap, scroll lock, and keyboard dismissal.",
    importPath: 'import { Drawer } from "driftkit";',
    category: "Overlay",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/drawer.tsx",
    props: [
          {
                "name": "open",
                "type": "boolean",
                "required": true,
                "description": "Controls visibility."
          },
          {
                "name": "onClose",
                "type": "() => void",
                "required": true,
                "description": "Close callback."
          },
          {
                "name": "side",
                "type": "\"left\" | \"right\" | \"top\" | \"bottom\"",
                "required": false,
                "defaultValue": "\"right\"",
                "description": "Slide-from edge."
          },
          {
                "name": "size",
                "type": "string | number",
                "required": false,
                "defaultValue": "\"400px\"",
                "description": "Width or height."
          },
          {
                "name": "backdrop",
                "type": "boolean",
                "required": false,
                "defaultValue": "true",
                "description": "Show backdrop."
          },
          {
                "name": "children",
                "type": "ReactNode",
                "required": true,
                "description": "Drawer content."
          }
    ],
    examples: [
      `<Drawer open={isOpen} onClose={close}>Settings</Drawer>`,
      `<Drawer open={show} onClose={close} side="bottom" size="50vh">Sheet</Drawer>`
    ],
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
    description: "Shared layout animation — compact card expands to detailed view. Uses Framer Motion layoutId for seamless position and size morphing.",
    importPath: 'import { ExpandableCard } from "driftkit";',
    category: "Layout",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/expandable-card.tsx",
    props: [],
    examples: [
      `<ExpandableCard />`
    ],
  },
  "glow-card": {
    name: "glow-card",
    displayName: "Glow Card",
    description: "Card with radial cursor-tracking glow. A soft spotlight follows the mouse with zero re-renders using CSS custom properties. Optional border glow mode.",
    importPath: 'import { GlowCard } from "driftkit";',
    category: "Layout",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/glow-card.tsx",
    props: [
          {
                "name": "children",
                "type": "ReactNode",
                "required": true,
                "description": "Card content."
          },
          {
                "name": "borderGlow",
                "type": "boolean",
                "required": false,
                "defaultValue": "false",
                "description": "Enable glowing border effect."
          },
          {
                "name": "glowColor",
                "type": "string",
                "required": false,
                "description": "Glow color (use rgba for opacity)."
          },
          {
                "name": "glowSize",
                "type": "number",
                "required": false,
                "defaultValue": "300",
                "description": "Glow radius in pixels."
          },
          {
                "name": "glowOpacity",
                "type": "number",
                "required": false,
                "defaultValue": "1",
                "description": "Glow opacity multiplier."
          }
    ],
    examples: [
      `<GlowCard><p>Hover to see the glow</p></GlowCard>`,
      `<GlowCard borderGlow glowColor="rgba(99,102,241,0.3)">Premium</GlowCard>`
    ],
  },
  "gradient-border": {
    name: "gradient-border",
    displayName: "Gradient Border",
    description: "Rotating conic gradient border with soft glow. Animated gradient continuously rotates around the element. Customizable colors, width, and speed.",
    importPath: 'import { GradientBorder } from "driftkit";',
    category: "Animation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/gradient-border.tsx",
    props: [
          {
                "name": "children",
                "type": "ReactNode",
                "required": true,
                "description": "Content inside the border."
          },
          {
                "name": "borderWidth",
                "type": "number",
                "required": false,
                "defaultValue": "2",
                "description": "Border width in pixels."
          },
          {
                "name": "duration",
                "type": "number",
                "required": false,
                "defaultValue": "3",
                "description": "Rotation duration in seconds."
          },
          {
                "name": "colors",
                "type": "string[]",
                "required": false,
                "description": "Gradient colors array."
          }
    ],
    examples: [
      `<GradientBorder><Card>Rainbow</Card></GradientBorder>`,
      `<GradientBorder colors={["#6366f1", "#a855f7"]} duration={2}>Purple</GradientBorder>`
    ],
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
    description: "SVG blob button that morphs toward cursor. Shape deforms fluidly based on cursor position using SVG path manipulation and spring physics.",
    importPath: 'import { LiquidButton } from "driftkit";',
    category: "Buttons",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/liquid-button.tsx",
    props: [
          {
                "name": "children",
                "type": "ReactNode",
                "required": true,
                "description": "Button content."
          },
          {
                "name": "onClick",
                "type": "() => void",
                "required": false,
                "description": "Click handler."
          },
          {
                "name": "color",
                "type": "string",
                "required": false,
                "description": "Button color."
          }
    ],
    examples: [
      `<LiquidButton>Hover me</LiquidButton>`,
      `<LiquidButton color="#6366f1">Liquid!</LiquidButton>`
    ],
  },
  "magnetic-button": {
    name: "magnetic-button",
    displayName: "Magnetic Button",
    description: "Button with subtle magnetic cursor pull — content shifts toward the cursor within a configurable radius. Uses spring physics for smooth attraction with max 8px displacement.",
    importPath: 'import { MagneticButton } from "driftkit";',
    category: "Buttons",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/magnetic-button.tsx",
    props: [
          {
                "name": "children",
                "type": "ReactNode",
                "required": true,
                "description": "Button content."
          },
          {
                "name": "intensity",
                "type": "number",
                "required": false,
                "defaultValue": "1",
                "description": "Pull strength multiplier. 0.5 for subtler, 2 for stronger."
          },
          {
                "name": "disabled",
                "type": "boolean",
                "required": false,
                "defaultValue": "false",
                "description": "Disables magnetic effect."
          },
          {
                "name": "as",
                "type": "\"button\" | \"div\" | \"a\"",
                "required": false,
                "defaultValue": "\"button\"",
                "description": "Render as different HTML element."
          }
    ],
    examples: [
      `<MagneticButton>Hover me</MagneticButton>`,
      `<MagneticButton intensity={0.5}>Subtle</MagneticButton>`
    ],
  },
  "magnetic-dock": {
    name: "magnetic-dock",
    displayName: "Magnetic Dock",
    description: "macOS-style dock with fisheye magnification driven by cursor proximity. Items scale up smoothly as the mouse approaches using spring physics.",
    importPath: 'import { MagneticDock } from "driftkit";',
    category: "Navigation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/magnetic-dock.tsx",
    props: [
          {
                "name": "items",
                "type": "DockItem[]",
                "required": true,
                "description": "Array of dock items. Each has id, icon (ReactNode), label, and optional onClick."
          },
          {
                "name": "maxScale",
                "type": "number",
                "required": false,
                "defaultValue": "1.5",
                "description": "Maximum scale factor for the hovered item."
          },
          {
                "name": "magneticRange",
                "type": "number",
                "required": false,
                "defaultValue": "150",
                "description": "Pixel radius of the magnetic effect."
          }
    ],
    examples: [
      `<MagneticDock items={[{ id: "home", icon: <HomeIcon />, label: "Home" }]} />`
    ],
  },
  "marquee": {
    name: "marquee",
    displayName: "Marquee",
    description: "Infinite horizontal scroll with edge fade. Content duplicates seamlessly for infinite loop. Supports pause on hover, bidirectional scrolling, and variable speed.",
    importPath: 'import { Marquee, MarqueeItem } from "driftkit";',
    category: "Animation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/marquee.tsx",
    props: [
          {
                "name": "children",
                "type": "ReactNode",
                "required": true,
                "description": "Content to scroll. Use MarqueeItem for spacing."
          },
          {
                "name": "speed",
                "type": "number",
                "required": false,
                "defaultValue": "1",
                "description": "Speed multiplier."
          },
          {
                "name": "direction",
                "type": "\"left\" | \"right\"",
                "required": false,
                "defaultValue": "\"left\"",
                "description": "Scroll direction."
          },
          {
                "name": "pauseOnHover",
                "type": "boolean",
                "required": false,
                "defaultValue": "false",
                "description": "Pause on hover."
          },
          {
                "name": "gap",
                "type": "number",
                "required": false,
                "defaultValue": "16",
                "description": "Gap between items in pixels."
          }
    ],
    examples: [
      `<Marquee><MarqueeItem>React</MarqueeItem><MarqueeItem>Next.js</MarqueeItem></Marquee>`,
      `<Marquee speed={2} direction="right" pauseOnHover>{logos}</Marquee>`
    ],
  },
  "mode-switcher": {
    name: "mode-switcher",
    displayName: "Mode Switcher",
    description: "Dark/light mode toggle with sun↔moon SVG morph and iris wipe theme transition. Icon morphs between shapes with spring physics.",
    importPath: 'import { ModeSwitcher } from "driftkit";',
    category: "Utility",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/mode-switcher.tsx",
    props: [],
    examples: [
      `<ModeSwitcher />`
    ],
  },
  "morphing-hamburger": {
    name: "morphing-hamburger",
    displayName: "Morphing Hamburger",
    description: "Three-line hamburger that morphs into X with per-line spring animation. Top/bottom lines rotate and converge while middle fades. Controlled and uncontrolled modes.",
    importPath: 'import { MorphingHamburger } from "driftkit";',
    category: "Navigation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/morphing-hamburger.tsx",
    props: [
          {
                "name": "open",
                "type": "boolean",
                "required": false,
                "description": "Controlled open state."
          },
          {
                "name": "onToggle",
                "type": "(open: boolean) => void",
                "required": false,
                "description": "Toggle callback."
          },
          {
                "name": "size",
                "type": "number",
                "required": false,
                "defaultValue": "24",
                "description": "Icon size in pixels."
          }
    ],
    examples: [
      `<MorphingHamburger />`,
      `<MorphingHamburger open={menuOpen} onToggle={setMenuOpen} size={32} />`
    ],
  },
  "morphing-shape": {
    name: "morphing-shape",
    displayName: "Morphing Shape",
    description: "SVG path morphing between geometric shapes with spring animation. Transitions between circle, square, triangle, and custom paths.",
    importPath: 'import { MorphingShape } from "driftkit";',
    category: "Animation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/morphing-shape.tsx",
    props: [],
    examples: [
      `<MorphingShape />`
    ],
  },
  "multi-select": {
    name: "multi-select",
    displayName: "Multi Select",
    description: "Tag input with spring-animated entrance/exit. Tags animate in with spring scale, out with blur + shrink. Supports autocomplete suggestions and max limit.",
    importPath: 'import { MultiSelect } from "driftkit";',
    category: "Input",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/multi-select.tsx",
    props: [
          {
                "name": "value",
                "type": "string[]",
                "required": false,
                "description": "Controlled tags."
          },
          {
                "name": "defaultValue",
                "type": "string[]",
                "required": false,
                "description": "Default tags."
          },
          {
                "name": "onChange",
                "type": "(tags: string[]) => void",
                "required": false,
                "description": "Tags change callback."
          },
          {
                "name": "placeholder",
                "type": "string",
                "required": false,
                "defaultValue": "\"Add tag...\"",
                "description": "Input placeholder."
          },
          {
                "name": "suggestions",
                "type": "string[]",
                "required": false,
                "description": "Autocomplete suggestions."
          },
          {
                "name": "maxTags",
                "type": "number",
                "required": false,
                "description": "Max tags allowed."
          }
    ],
    examples: [
      `<MultiSelect suggestions={["React", "TypeScript"]} />`,
      `<MultiSelect value={tags} onChange={setTags} maxTags={5} />`
    ],
  },
  "nav-menu": {
    name: "nav-menu",
    displayName: "Nav Menu",
    description: "Navigation menu with sliding spring indicator that follows mouse across menu items. The active highlight tracks cursor movement smoothly.",
    importPath: 'import { NavMenu } from "driftkit";',
    category: "Navigation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/nav-menu.tsx",
    props: [],
    examples: [
      `<NavMenu />`
    ],
  },
  "number-ticker": {
    name: "number-ticker",
    displayName: "Number Ticker",
    description: "Slot machine-style digit rolling with direction awareness. Each digit independently rolls up or down based on value changes. Spring physics create satisfying overshoot.",
    importPath: 'import { NumberTicker } from "driftkit";',
    category: "Data Display",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/number-ticker.tsx",
    props: [
          {
                "name": "value",
                "type": "number",
                "required": true,
                "description": "Numeric value to display. Changes trigger rolling animation."
          },
          {
                "name": "prefix",
                "type": "string",
                "required": false,
                "defaultValue": "\"\"",
                "description": "Text before the number (e.g., '$')."
          },
          {
                "name": "suffix",
                "type": "string",
                "required": false,
                "defaultValue": "\"\"",
                "description": "Text after the number (e.g., '%')."
          },
          {
                "name": "decimals",
                "type": "number",
                "required": false,
                "defaultValue": "0",
                "description": "Decimal places to show."
          },
          {
                "name": "commas",
                "type": "boolean",
                "required": false,
                "defaultValue": "true",
                "description": "Add thousand separators."
          },
          {
                "name": "fontSize",
                "type": "string",
                "required": false,
                "description": "Custom font size."
          }
    ],
    examples: [
      `<NumberTicker value={1234} />`,
      `<NumberTicker value={99.5} prefix="$" decimals={2} />`
    ],
  },
  "parallax-scroll": {
    name: "parallax-scroll",
    displayName: "Parallax Scroll",
    description: "Multi-speed parallax scrolling with spring smoothing. Elements move at different speeds relative to scroll, creating depth.",
    importPath: 'import { ParallaxScroll } from "driftkit";',
    category: "Animation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/parallax-scroll.tsx",
    props: [
          {
                "name": "children",
                "type": "ReactNode",
                "required": true,
                "description": "Parallax layers."
          }
    ],
    examples: [
      `<ParallaxScroll>Background and foreground layers</ParallaxScroll>`
    ],
  },
  "parallax-tilt-card": {
    name: "parallax-tilt-card",
    displayName: "Parallax Tilt Card",
    description: "3D perspective tilt driven by cursor position with multi-depth parallax layers. Optional glare effect. All transforms use spring physics.",
    importPath: 'import { ParallaxTiltCard, ParallaxLayer } from "driftkit";',
    category: "Layout",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/parallax-tilt-card.tsx",
    props: [
          {
                "name": "children",
                "type": "ReactNode",
                "required": false,
                "description": "Card content. Use ParallaxLayer for depth."
          },
          {
                "name": "maxTilt",
                "type": "number",
                "required": false,
                "defaultValue": "15",
                "description": "Max tilt angle in degrees."
          },
          {
                "name": "springConfig",
                "type": "{ stiffness: number; damping: number }",
                "required": false,
                "description": "Custom spring config."
          },
          {
                "name": "glare",
                "type": "boolean",
                "required": false,
                "defaultValue": "false",
                "description": "Enable cursor-tracking glare."
          }
    ],
    examples: [
      `<ParallaxTiltCard maxTilt={20} glare>Content</ParallaxTiltCard>`
    ],
  },
  "popover": {
    name: "popover",
    displayName: "Popover",
    description: "Smart-positioning floating container with spring entrance. Click, hover, or focus triggers. Auto-repositions to stay in viewport. Optional arrow.",
    importPath: 'import { Popover } from "driftkit";',
    category: "Overlay",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/popover.tsx",
    props: [
          {
                "name": "children",
                "type": "ReactNode",
                "required": true,
                "description": "Trigger element."
          },
          {
                "name": "content",
                "type": "ReactNode",
                "required": true,
                "description": "Popover content."
          },
          {
                "name": "open",
                "type": "boolean",
                "required": false,
                "description": "Controlled open state."
          },
          {
                "name": "onOpenChange",
                "type": "(open: boolean) => void",
                "required": false,
                "description": "Open state callback."
          },
          {
                "name": "placement",
                "type": "\"top\" | \"bottom\" | \"left\" | \"right\"",
                "required": false,
                "defaultValue": "\"bottom\"",
                "description": "Preferred placement."
          },
          {
                "name": "trigger",
                "type": "\"click\" | \"hover\" | \"focus\"",
                "required": false,
                "defaultValue": "\"click\"",
                "description": "Open trigger."
          },
          {
                "name": "arrow",
                "type": "boolean",
                "required": false,
                "defaultValue": "false",
                "description": "Show arrow."
          },
          {
                "name": "offset",
                "type": "number",
                "required": false,
                "defaultValue": "8",
                "description": "Distance from trigger."
          }
    ],
    examples: [
      `<Popover content={<Menu />}><Button>Open</Button></Popover>`,
      `<Popover content={<UserCard />} trigger="hover" arrow><Avatar /></Popover>`
    ],
  },
  "progress-ring": {
    name: "progress-ring",
    displayName: "Progress Ring",
    description: "Circular progress with spring-animated fill and overshoot. The ring bounces past the target value before settling for a satisfying effect.",
    importPath: 'import { ProgressRing } from "driftkit";',
    category: "Feedback",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/progress-ring.tsx",
    props: [
          {
                "name": "value",
                "type": "number",
                "required": true,
                "description": "Progress 0-100."
          },
          {
                "name": "size",
                "type": "number",
                "required": false,
                "defaultValue": "80",
                "description": "Diameter in pixels."
          },
          {
                "name": "strokeWidth",
                "type": "number",
                "required": false,
                "defaultValue": "8",
                "description": "Stroke width."
          },
          {
                "name": "color",
                "type": "string",
                "required": false,
                "description": "Fill color."
          },
          {
                "name": "children",
                "type": "ReactNode",
                "required": false,
                "description": "Center content."
          }
    ],
    examples: [
      `<ProgressRing value={75} />`,
      `<ProgressRing value={100} color="#22c55e"><span>Done!</span></ProgressRing>`
    ],
  },
  "ripple-button": {
    name: "ripple-button",
    displayName: "Ripple Button",
    description: "Material-style click ripple with spring physics. Ripple expands from click point with spring overshoot for a more physical feel than standard CSS ripple.",
    importPath: 'import { RippleButton } from "driftkit";',
    category: "Buttons",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/ripple-button.tsx",
    props: [
          {
                "name": "children",
                "type": "ReactNode",
                "required": true,
                "description": "Button content."
          },
          {
                "name": "rippleColor",
                "type": "string",
                "required": false,
                "defaultValue": "\"rgba(255,255,255,0.3)\"",
                "description": "Ripple color."
          },
          {
                "name": "onClick",
                "type": "(e) => void",
                "required": false,
                "description": "Click handler."
          },
          {
                "name": "disabled",
                "type": "boolean",
                "required": false,
                "defaultValue": "false",
                "description": "Disable button and ripple."
          }
    ],
    examples: [
      `<RippleButton>Click me</RippleButton>`,
      `<RippleButton rippleColor="rgba(99,102,241,0.4)">Custom</RippleButton>`
    ],
  },
  "schedule-picker": {
    name: "schedule-picker",
    displayName: "Schedule Picker",
    description: "Weekly availability picker with expandable time slots. Days expand with spring height animation to reveal time slot controls.",
    importPath: 'import { SchedulePicker } from "driftkit";',
    category: "Input",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/schedule-picker.tsx",
    props: [
          {
                "name": "value",
                "type": "Schedule",
                "required": false,
                "description": "Controlled schedule (day → TimeSlot[])."
          },
          {
                "name": "defaultValue",
                "type": "Schedule",
                "required": false,
                "description": "Default schedule."
          },
          {
                "name": "onChange",
                "type": "(schedule: Schedule) => void",
                "required": false,
                "description": "Schedule change callback."
          }
    ],
    examples: [
      `<SchedulePicker onChange={setAvailability} />`
    ],
  },
  "scroll-reveal": {
    name: "scroll-reveal",
    displayName: "Scroll Reveal",
    description: "Viewport-triggered entrance with multiple variants: fade-up, slide-left/right, scale, and blur. Uses IntersectionObserver with spring physics.",
    importPath: 'import { ScrollReveal } from "driftkit";',
    category: "Animation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/scroll-reveal.tsx",
    props: [
          {
                "name": "children",
                "type": "ReactNode",
                "required": true,
                "description": "Content to reveal."
          },
          {
                "name": "variant",
                "type": "\"fade-up\" | \"fade-down\" | \"slide-left\" | \"slide-right\" | \"scale\" | \"blur\"",
                "required": false,
                "defaultValue": "\"fade-up\"",
                "description": "Animation variant."
          },
          {
                "name": "delay",
                "type": "number",
                "required": false,
                "defaultValue": "0",
                "description": "Delay in seconds."
          },
          {
                "name": "once",
                "type": "boolean",
                "required": false,
                "defaultValue": "true",
                "description": "Only animate once."
          },
          {
                "name": "stiffness",
                "type": "number",
                "required": false,
                "defaultValue": "300",
                "description": "Spring stiffness."
          },
          {
                "name": "damping",
                "type": "number",
                "required": false,
                "defaultValue": "30",
                "description": "Spring damping."
          }
    ],
    examples: [
      `<ScrollReveal><Card>I fade up on scroll</Card></ScrollReveal>`,
      `<ScrollReveal variant="slide-left" delay={0.2}><Feature /></ScrollReveal>`
    ],
  },
  "skeleton": {
    name: "skeleton",
    displayName: "Skeleton",
    description: "Shimmer loading placeholder with spring crossfade reveal. Shows animated shapes while loading, then crossfades to real content with spring physics.",
    importPath: 'import { DriftSkeleton } from "driftkit";',
    category: "Layout",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/skeleton.tsx",
    props: [
          {
                "name": "variant",
                "type": "\"text\" | \"circular\" | \"rectangular\"",
                "required": false,
                "defaultValue": "\"text\"",
                "description": "Shape variant."
          },
          {
                "name": "loaded",
                "type": "boolean",
                "required": false,
                "defaultValue": "false",
                "description": "Crossfade to children when true."
          },
          {
                "name": "children",
                "type": "ReactNode",
                "required": false,
                "description": "Real content."
          },
          {
                "name": "width",
                "type": "string | number",
                "required": false,
                "description": "Width."
          },
          {
                "name": "height",
                "type": "string | number",
                "required": false,
                "description": "Height."
          },
          {
                "name": "lines",
                "type": "number",
                "required": false,
                "defaultValue": "3",
                "description": "Text lines count."
          },
          {
                "name": "pulse",
                "type": "boolean",
                "required": false,
                "defaultValue": "true",
                "description": "Enable shimmer."
          }
    ],
    examples: [
      `<DriftSkeleton loaded={!!data}><UserCard /></DriftSkeleton>`,
      `<DriftSkeleton variant="circular" width={48} height={48} />`
    ],
  },
  "spotlight": {
    name: "spotlight",
    displayName: "Spotlight",
    description: "Animated light beam that sweeps across content. Gradient beam moves horizontally with spring physics. Configurable color, width, speed, and delay.",
    importPath: 'import { Spotlight } from "driftkit";',
    category: "Animation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/spotlight.tsx",
    props: [
          {
                "name": "children",
                "type": "ReactNode",
                "required": true,
                "description": "Content to spotlight."
          },
          {
                "name": "duration",
                "type": "number",
                "required": false,
                "defaultValue": "3",
                "description": "Sweep duration in seconds."
          },
          {
                "name": "delay",
                "type": "number",
                "required": false,
                "defaultValue": "1",
                "description": "Delay between sweeps."
          },
          {
                "name": "color",
                "type": "string",
                "required": false,
                "description": "Beam color."
          },
          {
                "name": "beamWidth",
                "type": "number",
                "required": false,
                "defaultValue": "20",
                "description": "Beam width as percentage."
          }
    ],
    examples: [
      `<Spotlight><h1>Featured</h1></Spotlight>`
    ],
  },
  "spring-carousel": {
    name: "spring-carousel",
    displayName: "Spring Carousel",
    description: "Drag-to-navigate carousel with spring snap. Items snap to position after drag release. Supports touch and mouse with velocity-based momentum.",
    importPath: 'import { SpringCarousel } from "driftkit";',
    category: "Layout",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/spring-carousel.tsx",
    props: [
          {
                "name": "children",
                "type": "ReactNode",
                "required": true,
                "description": "Carousel slides."
          }
    ],
    examples: [
      `<SpringCarousel><Slide>1</Slide><Slide>2</Slide></SpringCarousel>`
    ],
  },
  "staggered-list": {
    name: "staggered-list",
    displayName: "Staggered List",
    description: "Cascading entrance animation with configurable stagger delay. Three variants: slide-up, fade, blur. Exit animations play in reverse order.",
    importPath: 'import { StaggeredList } from "driftkit";',
    category: "Animation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/staggered-list.tsx",
    props: [
          {
                "name": "children",
                "type": "ReactNode",
                "required": true,
                "description": "List items to stagger."
          }
    ],
    examples: [
      `<StaggeredList><div>Item 1</div><div>Item 2</div><div>Item 3</div></StaggeredList>`
    ],
  },
  "stepper": {
    name: "stepper",
    displayName: "Stepper",
    description: "Multi-step form wizard with spring-animated progress indicators. Steps show complete/active/upcoming states. Content slides directionally between steps.",
    importPath: 'import { Stepper } from "driftkit";',
    category: "Navigation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/stepper.tsx",
    props: [
          {
                "name": "steps",
                "type": "StepperStep[]",
                "required": true,
                "description": "Steps with id, label, content, optional icon."
          },
          {
                "name": "activeStep",
                "type": "number",
                "required": false,
                "description": "Controlled active step."
          },
          {
                "name": "defaultStep",
                "type": "number",
                "required": false,
                "defaultValue": "0",
                "description": "Default step."
          },
          {
                "name": "onChange",
                "type": "(step: number) => void",
                "required": false,
                "description": "Step change callback."
          },
          {
                "name": "showControls",
                "type": "boolean",
                "required": false,
                "defaultValue": "true",
                "description": "Show nav buttons."
          },
          {
                "name": "onFinish",
                "type": "() => void",
                "required": false,
                "description": "Finish callback."
          }
    ],
    examples: [
      `<Stepper steps={[{ id: "info", label: "Info", content: <Form /> }]} onFinish={submit} />`
    ],
  },
  "swipe-cards": {
    name: "swipe-cards",
    displayName: "Swipe Cards",
    description: "Tinder-style stacked cards with drag-to-dismiss. Cards fan out with depth scaling. Drag past threshold to dismiss left/right with velocity-based throw.",
    importPath: 'import { SwipeCards } from "driftkit";',
    category: "Layout",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/swipe-cards.tsx",
    props: [
          {
                "name": "cards",
                "type": "SwipeCardData[]",
                "required": true,
                "description": "Card data with id and content (ReactNode)."
          },
          {
                "name": "onSwipe",
                "type": "(id, direction) => void",
                "required": false,
                "description": "Swipe callback."
          },
          {
                "name": "threshold",
                "type": "number",
                "required": false,
                "defaultValue": "150",
                "description": "Dismiss distance in pixels."
          }
    ],
    examples: [
      `<SwipeCards cards={[{ id: 1, content: <Card /> }]} onSwipe={handleSwipe} />`
    ],
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
    description: "Animated gradient sweep across text. A shimmering highlight moves across text content for a premium loading or attention-grabbing effect.",
    importPath: 'import { TextShimmer } from "driftkit";',
    category: "Animation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/text-shimmer.tsx",
    props: [
          {
                "name": "children",
                "type": "string",
                "required": true,
                "description": "Text to shimmer."
          },
          {
                "name": "duration",
                "type": "number",
                "required": false,
                "defaultValue": "2",
                "description": "Sweep duration in seconds."
          }
    ],
    examples: [
      `<TextShimmer>Loading...</TextShimmer>`,
      `<TextShimmer duration={3} className="text-2xl font-bold">Premium</TextShimmer>`
    ],
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
    description: "Spring pop-in tooltip with auto-flip positioning. Automatically repositions if it would overflow viewport. Supports cursor-following mode.",
    importPath: 'import { Tooltip } from "driftkit";',
    category: "Overlay",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/tooltip.tsx",
    props: [
          {
                "name": "content",
                "type": "ReactNode",
                "required": true,
                "description": "Tooltip content."
          },
          {
                "name": "children",
                "type": "ReactNode",
                "required": true,
                "description": "Trigger element."
          },
          {
                "name": "position",
                "type": "\"top\" | \"bottom\" | \"left\" | \"right\"",
                "required": false,
                "defaultValue": "\"top\"",
                "description": "Preferred position."
          },
          {
                "name": "delay",
                "type": "number",
                "required": false,
                "defaultValue": "200",
                "description": "Show delay in ms."
          },
          {
                "name": "followCursor",
                "type": "boolean",
                "required": false,
                "defaultValue": "false",
                "description": "Follow cursor movement."
          }
    ],
    examples: [
      `<Tooltip content="Hello!"><Button>Hover</Button></Tooltip>`,
      `<Tooltip content="I follow" followCursor><div>Track me</div></Tooltip>`
    ],
  },
  "typewriter": {
    name: "typewriter",
    displayName: "Typewriter",
    description: "Spring-physics typewriter with per-character animation. Characters land with spring overshoot instead of just appearing. Supports loop mode to cycle through phrases with natural typing/deleting rhythm.",
    importPath: 'import { Typewriter } from "driftkit";',
    category: "Animation",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/typewriter.tsx",
    props: [
          {
                "name": "text",
                "type": "string",
                "required": true,
                "description": "The text to type out character by character."
          },
          {
                "name": "speed",
                "type": "number",
                "required": false,
                "defaultValue": "50",
                "description": "Milliseconds between each character. Has natural jitter (±30%) built in."
          },
          {
                "name": "delay",
                "type": "number",
                "required": false,
                "defaultValue": "0",
                "description": "Initial delay in milliseconds before typing starts."
          },
          {
                "name": "cursor",
                "type": "boolean",
                "required": false,
                "defaultValue": "true",
                "description": "Show blinking cursor at the end of typed text."
          },
          {
                "name": "persistCursor",
                "type": "boolean",
                "required": false,
                "defaultValue": "true",
                "description": "Keep cursor visible after typing completes."
          },
          {
                "name": "onComplete",
                "type": "() => void",
                "required": false,
                "description": "Callback fired when typing animation finishes."
          },
          {
                "name": "loop",
                "type": "string[]",
                "required": false,
                "description": "Array of phrases to cycle through. Enables type → pause → delete → type loop."
          },
          {
                "name": "loopPause",
                "type": "number",
                "required": false,
                "defaultValue": "2000",
                "description": "Pause duration in ms between phrases when looping."
          }
    ],
    examples: [
      `<Typewriter text="Hello, world!" />`,
      `<Typewriter loop={["Designer", "Developer", "Creator"]} loopPause={3000} />`
    ],
  },
  "wobble-card": {
    name: "wobble-card",
    displayName: "Wobble Card",
    description: "Jelly-like card that wobbles on hover using low-damping springs. Cursor position drives rotation with intentional overshoot for a playful feel.",
    importPath: 'import { WobbleCard } from "driftkit";',
    category: "Layout",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/wobble-card.tsx",
    props: [
          {
                "name": "children",
                "type": "ReactNode",
                "required": true,
                "description": "Card content."
          }
    ],
    examples: [
      `<WobbleCard><h2>Hover me!</h2></WobbleCard>`
    ],
  },
  "avatar": {
    name: "avatar",
    displayName: "Avatar",
    description: "Profile image with spring-animated hover scale, fallback initials with consistent color generation, and animated status indicators. Supports 5 sizes (xs–xl).",
    importPath: 'import { Avatar } from "@/components/avatar";',
    props: [
      { name: "src", type: "string", required: false, description: "Image source URL." },
      { name: "alt", type: "string", required: false, defaultValue: '""', description: "Alt text. Used to auto-generate initials fallback." },
      { name: "fallback", type: "string", required: false, description: "Override fallback text (initials)." },
      { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', required: false, defaultValue: '"md"', description: "Avatar size." },
      { name: "status", type: '"online" | "offline" | "busy" | "away"', required: false, description: "Status indicator dot." },
    ],
    examples: [
      `<Avatar src="/me.jpg" alt="Nikki Kipple" />`,
      `<Avatar alt="John Doe" size="lg" status="online" />`,
      `<Avatar fallback="NK" size="sm" />`,
    ],
    category: "Data Display",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/avatar.tsx",
  },
  "avatar-group": {
    name: "avatar-group",
    displayName: "Avatar Group",
    description: "Stacked avatar group with spring-animated stagger entrance. Avatars overlap with ring borders and show a +N overflow count. Supports max visible limit.",
    importPath: 'import { AvatarGroup, Avatar } from "@/components/avatar";',
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Avatar elements." },
      { name: "max", type: "number", required: false, defaultValue: "5", description: "Max visible avatars before +N overflow." },
      { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', required: false, defaultValue: '"md"', description: "Size for all child avatars." },
    ],
    examples: [
      `<AvatarGroup max={3}><Avatar alt="Alice" /><Avatar alt="Bob" /><Avatar alt="Charlie" /><Avatar alt="Diana" /></AvatarGroup>`,
    ],
    category: "Data Display",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/avatar.tsx",
  },
  "select": {
    name: "select",
    displayName: "Select",
    description: "Single-value dropdown with spring-animated open/close, keyboard navigation, focus highlight tracking, and animated checkmark. Supports icons, disabled options, and error state.",
    importPath: 'import { Select } from "@/components/select";',
    props: [
      { name: "options", type: "SelectOption[]", required: true, description: "Options with value, label, optional icon and disabled." },
      { name: "value", type: "string", required: false, description: "Controlled value." },
      { name: "defaultValue", type: "string", required: false, description: "Default value." },
      { name: "onChange", type: "(value: string) => void", required: false, description: "Change callback." },
      { name: "placeholder", type: "string", required: false, defaultValue: '"Select..."', description: "Placeholder text." },
      { name: "disabled", type: "boolean", required: false, defaultValue: "false", description: "Disable the select." },
      { name: "error", type: "boolean", required: false, defaultValue: "false", description: "Error state styling." },
    ],
    examples: [
      `<Select options={[{ value: "react", label: "React" }, { value: "vue", label: "Vue" }]} />`,
      `<Select options={frameworks} value={selected} onChange={setSelected} placeholder="Pick a framework" />`,
    ],
    category: "Input",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/select.tsx",
  },
  "slider": {
    name: "slider",
    displayName: "Slider",
    description: "Range slider with spring-snapping thumb, press squish feedback, and value tooltip. Supports step snapping, keyboard navigation, and custom formatting.",
    importPath: 'import { Slider } from "@/components/slider";',
    props: [
      { name: "value", type: "number", required: false, description: "Controlled value." },
      { name: "defaultValue", type: "number", required: false, defaultValue: "50", description: "Default value." },
      { name: "onChange", type: "(value: number) => void", required: false, description: "Fires continuously while dragging." },
      { name: "onChangeEnd", type: "(value: number) => void", required: false, description: "Fires when dragging ends." },
      { name: "min", type: "number", required: false, defaultValue: "0", description: "Minimum value." },
      { name: "max", type: "number", required: false, defaultValue: "100", description: "Maximum value." },
      { name: "step", type: "number", required: false, defaultValue: "1", description: "Step increment." },
      { name: "showTooltip", type: "boolean", required: false, defaultValue: "true", description: "Show value tooltip while dragging." },
      { name: "formatValue", type: "(v: number) => string", required: false, description: "Format the tooltip display value." },
      { name: "disabled", type: "boolean", required: false, defaultValue: "false", description: "Disable the slider." },
    ],
    examples: [
      `<Slider />`,
      `<Slider value={volume} onChange={setVolume} min={0} max={100} />`,
      `<Slider min={0} max={1} step={0.01} formatValue={(v) => \`\${Math.round(v * 100)}%\`} />`,
    ],
    category: "Input",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/slider.tsx",
  },
  "checkbox": {
    name: "checkbox",
    displayName: "Checkbox",
    description: "Checkbox with spring-animated checkmark path drawing and press squish. Supports indeterminate state, labels with descriptions, and three sizes.",
    importPath: 'import { Checkbox } from "@/components/checkbox";',
    props: [
      { name: "checked", type: "boolean", required: false, description: "Controlled checked state." },
      { name: "defaultChecked", type: "boolean", required: false, defaultValue: "false", description: "Default checked." },
      { name: "onChange", type: "(checked: boolean) => void", required: false, description: "Change callback." },
      { name: "label", type: "string", required: false, description: "Label text." },
      { name: "description", type: "string", required: false, description: "Description below label." },
      { name: "disabled", type: "boolean", required: false, defaultValue: "false", description: "Disabled state." },
      { name: "indeterminate", type: "boolean", required: false, defaultValue: "false", description: "Indeterminate visual state." },
      { name: "size", type: '"sm" | "md" | "lg"', required: false, defaultValue: '"md"', description: "Size variant." },
    ],
    examples: [
      `<Checkbox label="Accept terms" />`,
      `<Checkbox checked={agreed} onChange={setAgreed} label="I agree" description="By checking this you accept our terms." />`,
      `<Checkbox indeterminate label="Select all" />`,
    ],
    category: "Input",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/checkbox.tsx",
  },
  "radio": {
    name: "radio",
    displayName: "Radio",
    description: "Radio button with spring-animated inner dot entrance and press squish. Must be used within a RadioGroup. Supports labels, descriptions, horizontal/vertical layout.",
    importPath: 'import { RadioGroup, Radio } from "@/components/radio";',
    props: [
      { name: "value", type: "string", required: true, description: "Value for this option." },
      { name: "label", type: "string", required: false, description: "Label text." },
      { name: "description", type: "string", required: false, description: "Description below label." },
      { name: "disabled", type: "boolean", required: false, defaultValue: "false", description: "Disable this option." },
      { name: "size", type: '"sm" | "md" | "lg"', required: false, defaultValue: '"md"', description: "Size variant." },
    ],
    examples: [
      `<RadioGroup defaultValue="react"><Radio value="react" label="React" /><Radio value="vue" label="Vue" /><Radio value="svelte" label="Svelte" /></RadioGroup>`,
      `<RadioGroup value={plan} onChange={setPlan} orientation="horizontal"><Radio value="free" label="Free" description="Basic features" /><Radio value="pro" label="Pro" description="All features" /></RadioGroup>`,
    ],
    category: "Input",
    githubUrl: "https://github.com/kippledigital/driftkit/blob/main/src/components/radio.tsx",
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
