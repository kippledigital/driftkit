import { Transition, HTMLMotionProps } from 'framer-motion';
import * as React$1 from 'react';
import React__default, { ReactNode, MouseEvent } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

/**
 * DriftKit motion system
 * =============================================================================
 * One source of truth for how DriftKit moves. Every component pulls its springs
 * from here, so the whole library feels like one family and a single edit
 * retunes everything.
 *
 * Copy-paste note: if you copy a component into your project, copy this file
 * next to it (it has no dependencies beyond framer-motion).
 *
 * HOW TO PICK A SPRING
 * --------------------
 * Ask "how far does it travel, and how much should it say?"
 *
 *   snappy  small, direct feedback: toggles, presses, indicators, checkmarks.
 *           Fast and nearly critically damped; it lands, it doesn't wobble.
 *   smooth  medium travel: dialogs, popovers, tab content, list items.
 *           The default. A hint of settle that reads as "arrived".
 *   gentle  large travel: drawers, sheets, carousels, full-panel moves.
 *           Lower stiffness so big distances don't feel violent; no overshoot.
 *   bouncy  playful moments you want noticed: badges, dock icons, success states.
 *           Visible overshoot. Use sparingly, at most one per screen.
 *   wobbly  decorative jelly (wobble card, liquid button). Never for UI that
 *           someone is waiting on.
 *
 * ENTER WITH A SPRING, EXIT WITH A TWEEN
 * --------------------------------------
 * People wait for things to appear, but they've already moved on when they
 * dismiss something. Exits are short ease-in tweens so the UI gets out of the
 * way instead of springing slowly closed.
 *
 * DAMPING RATIO, FOR THE CURIOUS
 * ------------------------------
 * zeta = damping / (2 * sqrt(stiffness * mass)). Below 1 overshoots, 1 lands
 * exactly, above 1 creeps in. The ratio is noted on each token.
 * =============================================================================
 */

declare const spring: {
    /** zeta ~0.88. Controls and indicators. */
    readonly snappy: {
        readonly type: "spring";
        readonly stiffness: 520;
        readonly damping: 40;
        readonly mass: 1;
    };
    /** zeta ~0.87. The default for things that appear. */
    readonly smooth: {
        readonly type: "spring";
        readonly stiffness: 320;
        readonly damping: 31;
        readonly mass: 1;
    };
    /** zeta ~1.0. Large panels and anything that travels far. */
    readonly gentle: {
        readonly type: "spring";
        readonly stiffness: 210;
        readonly damping: 29;
        readonly mass: 1;
    };
    /** zeta ~0.52. Visible overshoot, for moments of delight. */
    readonly bouncy: {
        readonly type: "spring";
        readonly stiffness: 380;
        readonly damping: 20;
        readonly mass: 1;
    };
    /** zeta ~0.35. Decorative jelly only. */
    readonly wobbly: {
        readonly type: "spring";
        readonly stiffness: 180;
        readonly damping: 9.5;
        readonly mass: 1;
    };
};
type SpringName = keyof typeof spring;
/** Same springs without `type`, for useSpring(). */
declare const springValue: {
    readonly snappy: {
        readonly stiffness: 520;
        readonly damping: 40;
        readonly mass: 1;
    };
    readonly smooth: {
        readonly stiffness: 320;
        readonly damping: 31;
        readonly mass: 1;
    };
    readonly gentle: {
        readonly stiffness: 210;
        readonly damping: 29;
        readonly mass: 1;
    };
    readonly bouncy: {
        readonly stiffness: 380;
        readonly damping: 20;
        readonly mass: 1;
    };
    readonly wobbly: {
        readonly stiffness: 180;
        readonly damping: 9.5;
        readonly mass: 1;
    };
};
/** Exits: quick and out of the way. */
declare const exit: {
    /** Small things: tooltips, menus, toasts. */
    readonly quick: {
        readonly duration: 0.12;
        readonly ease: [0.4, 0, 1, 1];
    };
    /** Overlays and panels. */
    readonly panel: {
        readonly duration: 0.18;
        readonly ease: [0.4, 0, 1, 1];
    };
};
/** Fades for backdrops and anything blurred: springs make blur shimmer. */
declare const fade: {
    readonly in: {
        readonly duration: 0.2;
        readonly ease: [0, 0, 0.2, 1];
    };
    readonly out: {
        readonly duration: 0.15;
        readonly ease: [0.4, 0, 1, 1];
    };
};
/** Stagger between siblings. Keep total cascades under ~250ms. */
declare const stagger: {
    readonly tight: 0.025;
    readonly normal: 0.04;
    readonly loose: 0.06;
};
/** What reduced motion becomes: a short crossfade, no travel. */
declare const reducedTransition: Transition;
/**
 * Returns transitions that respect `prefers-reduced-motion`.
 *
 *   const m = useMotionPrefs();
 *   <motion.div transition={m.spring("smooth")} />
 *   <motion.div initial={m.reduced ? { opacity: 0 } : { opacity: 0, y: 8 }} />
 */
declare function useMotionPrefs(): {
    reduced: boolean;
    spring: (name: SpringName) => Transition;
    exit: (name?: keyof typeof exit) => Transition;
};

type ButtonVariant = "default" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";
interface DriftButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    success?: boolean;
    children: React__default.ReactNode;
}
declare const Button: React__default.ForwardRefExoticComponent<Omit<DriftButtonProps, "ref"> & React__default.RefAttributes<HTMLButtonElement>>;

type InputSize = "sm" | "md" | "lg";
type InputState = "default" | "error" | "success";
interface DriftInputProps extends Omit<React__default.InputHTMLAttributes<HTMLInputElement>, "size"> {
    label?: string;
    size?: InputSize;
    state?: InputState;
    errorMessage?: string;
}
declare const Input: React__default.ForwardRefExoticComponent<DriftInputProps & React__default.RefAttributes<HTMLInputElement>>;

/**
 * Toggle
 * =============================================================================
 * The thumb slides on the `snappy` spring. While pressed it stretches toward
 * the side it's about to travel to, like the iOS switch: it previews the
 * outcome before you let go.
 *
 * Track color is a CSS transition on classes, so it follows your app's dark
 * mode (class or media query) and never mismatches on server render.
 *
 * It's a native <button role="switch">, so Space and Enter work without any
 * key handling of our own.
 *
 * Needs: ./motion.ts
 * =============================================================================
 */

type ToggleSize = "sm" | "md" | "lg";
interface ToggleProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    size?: ToggleSize;
    disabled?: boolean;
    className?: string;
    /** Tailwind background class for the "on" track. Default bg-green-500. */
    onClassName?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
}
declare const Toggle: React__default.ForwardRefExoticComponent<ToggleProps & React__default.RefAttributes<HTMLButtonElement>>;

interface TabItem {
    value: string;
    label: React__default.ReactNode;
    content: React__default.ReactNode;
    disabled?: boolean;
}
interface TabsProps {
    items: TabItem[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    className?: string;
}
declare function Tabs({ items, value: controlled, defaultValue, onValueChange, className }: TabsProps): react_jsx_runtime.JSX.Element;
declare namespace Tabs {
    var displayName: string;
}

interface AccordionItem {
    value: string;
    trigger: React__default.ReactNode;
    content: React__default.ReactNode;
    disabled?: boolean;
}
interface AccordionProps {
    items: AccordionItem[];
    type?: "single" | "multiple";
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
    className?: string;
}
declare function Accordion({ items, type, value: controlled, defaultValue, onValueChange, className }: AccordionProps): react_jsx_runtime.JSX.Element;
declare namespace Accordion {
    var displayName: string;
}

type DialogSize = "sm" | "md" | "lg";
interface DialogProps {
    open: boolean;
    onClose: () => void;
    size?: DialogSize;
    children: ReactNode;
    className?: string;
    /** Accessible name, used when you don't render a <DialogTitle>. */
    title?: string;
    /** Close when the backdrop is clicked. Default true. */
    closeOnBackdrop?: boolean;
}
declare const Dialog: React__default.ForwardRefExoticComponent<DialogProps & React__default.RefAttributes<HTMLDivElement>>;
declare function DialogTitle({ children, className }: {
    children: ReactNode;
    className?: string;
}): react_jsx_runtime.JSX.Element;
declare function DialogDescription({ children, className }: {
    children: ReactNode;
    className?: string;
}): react_jsx_runtime.JSX.Element;
declare function DialogFooter({ children, className }: {
    children: ReactNode;
    className?: string;
}): react_jsx_runtime.JSX.Element;

type TooltipPosition = "top" | "bottom" | "left" | "right";
interface TooltipProps {
    /** The content shown inside the tooltip */
    content: ReactNode;
    /** The trigger element (wrapped in a span) */
    children: ReactNode;
    /** Preferred position — will auto-flip if near viewport edge */
    position?: TooltipPosition;
    /** Delay before showing on hover (ms). Default 300ms. */
    delay?: number;
    /** Follow the cursor instead of anchoring to the trigger */
    followCursor?: boolean;
    /** Additional className on the tooltip container */
    className?: string;
}
declare function Tooltip({ content, children, position, delay, followCursor, className, }: TooltipProps): react_jsx_runtime.JSX.Element;

interface DropdownItem {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    icon?: ReactNode;
    /** Set to true to render a separator before this item */
    separator?: boolean;
}
interface DropdownProps {
    /** The trigger element */
    trigger: ReactNode;
    /** Menu items */
    items: DropdownItem[];
    /** Alignment relative to trigger */
    align?: "left" | "right";
    /** Additional className on the menu panel */
    className?: string;
}
declare function Dropdown({ trigger, items, align, className, }: DropdownProps): react_jsx_runtime.JSX.Element;

type CardVariant = "default" | "outlined" | "elevated";
type CardSize = "sm" | "md" | "lg";
interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
    variant?: CardVariant;
    size?: CardSize;
    children: ReactNode;
    className?: string;
    /** Disable hover and press interactions */
    static?: boolean;
    /** Enable enter animation (use with CardGrid for stagger) */
    animated?: boolean;
    /** Animation delay for staggered entrances */
    delay?: number;
}
interface CardImageProps {
    src: string;
    alt: string;
    className?: string;
}
interface CardContentProps {
    title?: string;
    description?: string;
    children?: ReactNode;
    className?: string;
}
interface CardActionsProps {
    children: ReactNode;
    className?: string;
}
interface CardGridProps {
    children: ReactNode;
    columns?: 1 | 2 | 3 | 4;
    gap?: "sm" | "md" | "lg";
    staggerDelay?: number;
    className?: string;
}
declare const Card: React__default.ForwardRefExoticComponent<Omit<CardProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;
declare const CardImage: ({ src, alt, className }: CardImageProps) => react_jsx_runtime.JSX.Element;
declare const CardContent: ({ title, description, children, className }: CardContentProps) => react_jsx_runtime.JSX.Element;
declare const CardActions: ({ children, className }: CardActionsProps) => react_jsx_runtime.JSX.Element;
declare const CardGrid: ({ children, columns, gap, staggerDelay, className }: CardGridProps) => react_jsx_runtime.JSX.Element;
declare const CardHeader: ({ children, className }: {
    children: ReactNode;
    className?: string;
}) => react_jsx_runtime.JSX.Element;
declare const CardFooter: ({ children, className }: {
    children: ReactNode;
    className?: string;
}) => react_jsx_runtime.JSX.Element;
declare function FlipCard({ front, back, flipped: controlledFlipped, onFlip, className, }: {
    front: ReactNode;
    back: ReactNode;
    flipped?: boolean;
    onFlip?: (flipped: boolean) => void;
    className?: string;
}): react_jsx_runtime.JSX.Element;

type SkeletonVariant = "text" | "avatar" | "card" | "custom";
interface DriftSkeletonProps {
    variant?: SkeletonVariant;
    loaded?: boolean;
    children?: React__default.ReactNode;
    /** Width — only for text/custom variants */
    width?: string | number;
    /** Height — for all variants */
    height?: string | number;
    /** Number of text lines */
    lines?: number;
    /** Use pulse instead of shimmer */
    pulse?: boolean;
    className?: string;
}
declare function Skeleton({ variant, loaded, children, width, height, lines, pulse, className, }: DriftSkeletonProps): react_jsx_runtime.JSX.Element;

type ToastVariant = "default" | "success" | "error" | "warning";
interface Toast {
    id: string;
    title: string;
    description?: string;
    variant?: ToastVariant;
    /** Milliseconds before auto-dismiss. Default 4000. Use Infinity to keep it. */
    duration?: number;
}
interface ToastContextValue {
    toast: (t: Omit<Toast, "id">) => string;
    dismiss: (id: string) => void;
}
declare function useToast(): ToastContextValue;
interface ToastProviderProps {
    children: ReactNode;
    /** Most toasts visible at once; older ones leave first. Default 4. */
    max?: number;
}
declare function ToastProvider({ children, max }: ToastProviderProps): react_jsx_runtime.JSX.Element;

interface NavItem {
    id: string;
    label: string;
    href?: string;
    onClick?: () => void;
}
interface DriftNavMenuProps {
    items: NavItem[];
    activeId?: string;
    onActiveChange?: (id: string) => void;
    className?: string;
}
declare function NavMenu({ items, activeId, onActiveChange, className, }: DriftNavMenuProps): react_jsx_runtime.JSX.Element;

type BadgeVariant = "default" | "secondary" | "success" | "warning" | "error" | "info" | "outline";
type BadgeSize = "sm" | "md" | "lg";
interface BadgeProps {
    /** Badge content */
    children: ReactNode;
    /** Visual variant */
    variant?: BadgeVariant;
    /** Size of the badge */
    size?: BadgeSize;
    /** Icon to display */
    icon?: ReactNode;
    /** Whether to show a pulse animation */
    pulse?: boolean;
    /** Whether the badge is removable */
    removable?: boolean;
    /** Callback when badge is removed */
    onRemove?: () => void;
    /** Additional classes */
    className?: string;
    /** Click handler */
    onClick?: () => void;
}
declare function Badge({ children, variant, size, icon, pulse, removable, onRemove, className, onClick, }: BadgeProps): react_jsx_runtime.JSX.Element;
declare function AnimatedBadge({ children, ...props }: BadgeProps): react_jsx_runtime.JSX.Element;
interface NotificationBadgeProps {
    /** Content to wrap */
    children: ReactNode;
    /** Notification count */
    count?: number;
    /** Max count to display before showing "+" */
    max?: number;
    /** Show dot instead of count */
    dot?: boolean;
    /** Badge variant */
    variant?: BadgeVariant;
    /** Position of the notification */
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    /** Whether to show when count is 0 */
    showZero?: boolean;
    /** Additional classes */
    className?: string;
}
declare function NotificationBadge({ children, count, max, dot, variant, position, showZero, className, }: NotificationBadgeProps): react_jsx_runtime.JSX.Element;
declare const badgeVariants: {
    status: {
        online: react_jsx_runtime.JSX.Element;
        offline: react_jsx_runtime.JSX.Element;
        busy: react_jsx_runtime.JSX.Element;
    };
    priority: {
        low: react_jsx_runtime.JSX.Element;
        medium: react_jsx_runtime.JSX.Element;
        high: react_jsx_runtime.JSX.Element;
        critical: react_jsx_runtime.JSX.Element;
    };
    category: {
        new: react_jsx_runtime.JSX.Element;
        featured: react_jsx_runtime.JSX.Element;
        popular: react_jsx_runtime.JSX.Element;
        sale: react_jsx_runtime.JSX.Element;
    };
};

interface BreadcrumbItem {
    /** Unique identifier */
    id: string;
    /** Display label */
    label: string;
    /** URL or path */
    href?: string;
    /** Click handler */
    onClick?: () => void;
    /** Icon to display */
    icon?: ReactNode;
    /** Whether this item is disabled */
    disabled?: boolean;
}
interface BreadcrumbsProps {
    /** Array of breadcrumb items */
    items: BreadcrumbItem[];
    /** Separator between items */
    separator?: ReactNode;
    /** Maximum items to show before collapsing */
    maxItems?: number;
    /** Show home icon on first item */
    showHomeIcon?: boolean;
    /** Additional classes */
    className?: string;
}
declare function Breadcrumbs({ items, separator, maxItems, showHomeIcon, className, }: BreadcrumbsProps): react_jsx_runtime.JSX.Element | null;
declare const breadcrumbPatterns: {
    /** Simple text breadcrumbs */
    simple: (labels: string[], onNavigate?: (index: number) => void) => BreadcrumbItem[];
    /** File system style breadcrumbs */
    filesystem: (path: string, onNavigate?: (path: string) => void) => BreadcrumbItem[];
    /** Page hierarchy breadcrumbs */
    pages: (pages: Array<{
        name: string;
        path?: string;
    }>, onNavigate?: (path: string) => void) => BreadcrumbItem[];
};

interface ContextMenuItem {
    id: string;
    label: string;
    icon?: ReactNode;
    shortcut?: string;
    disabled?: boolean;
    danger?: boolean;
    separator?: boolean;
    onClick?: () => void;
    submenu?: ContextMenuItem[];
}
interface ContextMenuProps {
    /** The trigger element */
    children: ReactNode;
    /** Menu items */
    items: ContextMenuItem[];
    /** Disable the context menu */
    disabled?: boolean;
    /** Additional classes */
    className?: string;
}
declare function ContextMenu({ children, items, disabled, className }: ContextMenuProps): react_jsx_runtime.JSX.Element;
declare const contextMenuItems: {
    copy: (onClick?: () => void) => ContextMenuItem;
    cut: (onClick?: () => void) => ContextMenuItem;
    paste: (onClick?: () => void) => ContextMenuItem;
    delete: (onClick?: () => void) => ContextMenuItem;
    separator: () => ContextMenuItem;
    rename: (onClick?: () => void) => ContextMenuItem;
    duplicate: (onClick?: () => void) => ContextMenuItem;
};

interface DrawerProps {
    open: boolean;
    onClose: () => void;
    side?: "left" | "right" | "top" | "bottom";
    /** Width (left/right) or height (top/bottom). */
    size?: string | number;
    backdrop?: boolean;
    closeOnBackdropClick?: boolean;
    closeOnEscape?: boolean;
    /** Drag toward the edge to close. Default true. */
    dragToClose?: boolean;
    /** Accessible name for the panel. */
    title?: string;
    children: ReactNode;
    className?: string;
}
declare function Drawer({ open, onClose, side, size, backdrop, closeOnBackdropClick, closeOnEscape, dragToClose, title, children, className, }: DrawerProps): React$1.ReactPortal | null;
interface DrawerHeaderProps {
    children: ReactNode;
    onClose?: () => void;
    showCloseButton?: boolean;
    className?: string;
}
declare function DrawerHeader({ children, onClose, showCloseButton, className }: DrawerHeaderProps): react_jsx_runtime.JSX.Element;
declare function DrawerContent({ children, className }: {
    children: ReactNode;
    className?: string;
}): react_jsx_runtime.JSX.Element;
declare function DrawerFooter({ children, className }: {
    children: ReactNode;
    className?: string;
}): react_jsx_runtime.JSX.Element;

type PopoverPlacement = "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end";
interface PopoverProps {
    /** The trigger element */
    children: ReactNode;
    /** The popover content */
    content: ReactNode;
    /** Whether the popover is open */
    open?: boolean;
    /** Callback when open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Preferred placement */
    placement?: PopoverPlacement;
    /** Trigger type */
    trigger?: "click" | "hover" | "focus";
    /** Delay for hover trigger (ms) */
    delay?: number;
    /** Whether to show arrow */
    arrow?: boolean;
    /** Offset from trigger */
    offset?: number;
    /** Close on outside click */
    closeOnOutsideClick?: boolean;
    /** Close on escape */
    closeOnEscape?: boolean;
    /** Additional classes for popover */
    className?: string;
    /** Portal container */
    container?: HTMLElement;
}
declare function Popover({ children, content, open: controlledOpen, onOpenChange, placement, trigger, delay, arrow, offset, closeOnOutsideClick, closeOnEscape, className, container, }: PopoverProps): react_jsx_runtime.JSX.Element;

interface StepperStep {
    id: string;
    label: string;
    content: React__default.ReactNode;
    icon?: React__default.ReactNode;
}
interface StepperProps {
    steps: StepperStep[];
    activeStep?: number;
    defaultStep?: number;
    onChange?: (step: number) => void;
    className?: string;
    /** Show next/prev buttons */
    showControls?: boolean;
    /** Called when last step's "Finish" is clicked */
    onFinish?: () => void;
}
declare function Stepper({ steps, activeStep: controlledStep, defaultStep, onChange, className, showControls, onFinish, }: StepperProps): react_jsx_runtime.JSX.Element;
declare namespace Stepper {
    var displayName: string;
}

interface MultiSelectProps {
    value?: string[];
    defaultValue?: string[];
    onChange?: (tags: string[]) => void;
    placeholder?: string;
    className?: string;
    suggestions?: string[];
    maxTags?: number;
}
declare function MultiSelect({ value: controlledValue, defaultValue, onChange, placeholder, className, suggestions, maxTags, }: MultiSelectProps): react_jsx_runtime.JSX.Element;
declare namespace MultiSelect {
    var displayName: string;
}

interface DateRange {
    start: Date | null;
    end: Date | null;
}
interface DateRangePickerProps {
    value?: DateRange;
    defaultValue?: DateRange;
    onChange?: (range: DateRange) => void;
    className?: string;
    placeholder?: {
        start?: string;
        end?: string;
    };
}
declare function DateRangePicker({ value: controlledValue, defaultValue, onChange, className, placeholder, }: DateRangePickerProps): react_jsx_runtime.JSX.Element;
declare namespace DateRangePicker {
    var displayName: string;
}

interface TimeSlot {
    from: string;
    to: string;
}
interface DaySchedule {
    enabled: boolean;
    slots: TimeSlot[];
}
type ScheduleValue = Record<string, DaySchedule>;
interface SchedulePickerProps {
    value?: ScheduleValue;
    defaultValue?: ScheduleValue;
    onChange?: (value: ScheduleValue) => void;
    days?: string[];
    className?: string;
}
declare function SchedulePicker({ value: controlledValue, defaultValue, onChange, days, className, }: SchedulePickerProps): react_jsx_runtime.JSX.Element;
declare namespace SchedulePicker {
    var displayName: string;
}

interface CodeBlockProps {
    code: string;
    label?: string;
}
declare function CodeBlock({ code, label }: CodeBlockProps): react_jsx_runtime.JSX.Element;

interface CodeDisplayProps {
    title: string;
    code: string;
    language?: string;
}
declare function CodeDisplay({ title, code, language }: CodeDisplayProps): react_jsx_runtime.JSX.Element;

interface MagneticButtonProps {
    children: React__default.ReactNode;
    /** Magnetic pull strength multiplier. Default 1. Set to 0.5 for subtler effect. */
    intensity?: number;
    /** Extra CSS classes on the wrapper */
    className?: string;
    /** Disable the magnetic effect (still renders children normally) */
    disabled?: boolean;
    as?: "button" | "div" | "a";
    [key: string]: unknown;
}
declare function MagneticButton({ children, intensity, className, disabled, as, ...props }: MagneticButtonProps): react_jsx_runtime.JSX.Element;

interface GlowCardProps {
    children: React__default.ReactNode;
    className?: string;
    /** Show glow on the border instead of the surface */
    borderGlow?: boolean;
    /** Glow color. Default is white for dark mode, blue-ish for light */
    glowColor?: string;
    /** Glow radius in px. Default 200 */
    glowSize?: number;
    /** Glow opacity 0-1. Default 0.15 */
    glowOpacity?: number;
}
declare function GlowCard({ children, className, borderGlow, glowColor, glowSize, glowOpacity, }: GlowCardProps): react_jsx_runtime.JSX.Element;

interface NumberTickerProps {
    value: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    commas?: boolean;
    className?: string;
    /** Tailwind text-size class, e.g. "text-4xl". */
    fontSize?: string;
    /** BCP 47 locale for separators. Default "en-US". */
    locale?: string;
}
declare function NumberTicker({ value, prefix, suffix, decimals, commas, className, fontSize, locale }: NumberTickerProps): react_jsx_runtime.JSX.Element;

interface ModeSwitcherProps {
    /** Controlled mode. If not provided, manages its own state. */
    mode?: "light" | "dark";
    /** Called when mode changes */
    onChange?: (mode: "light" | "dark") => void;
    /** Enable iris wipe transition effect */
    irisWipe?: boolean;
    /** Size of the toggle button in px. Default 40 */
    size?: number;
    className?: string;
}
declare function ModeSwitcher({ mode: controlledMode, onChange, irisWipe, size, className, }: ModeSwitcherProps): react_jsx_runtime.JSX.Element;

interface MorphingHamburgerProps {
    /** Controlled open state */
    open?: boolean;
    /** Callback when toggled */
    onToggle?: (open: boolean) => void;
    /** Size in px. Default 40 */
    size?: number;
    className?: string;
}
declare function MorphingHamburger({ open: controlledOpen, onToggle, size, className, }: MorphingHamburgerProps): react_jsx_runtime.JSX.Element;

interface TypewriterProps {
    text: string;
    speed?: number;
    delay?: number;
    cursor?: boolean;
    persistCursor?: boolean;
    onComplete?: () => void;
    loop?: string[];
    loopPause?: number;
    className?: string;
}
declare function Typewriter({ text, speed, delay, cursor, persistCursor, onComplete, loop, loopPause, className, }: TypewriterProps): react_jsx_runtime.JSX.Element;

interface DockItem {
    id: string;
    icon: React__default.ReactNode;
    label: string;
    onClick?: () => void;
}
interface MagneticDockProps {
    items: DockItem[];
    /** Largest size as a multiple of the base size. Default 1.6. */
    maxScale?: number;
    /** How far (px) the effect reaches from the pointer. Default 110. */
    magneticRange?: number;
    /** Base icon size in px. Default 44. */
    size?: number;
    className?: string;
}
declare function MagneticDock({ items, maxScale, magneticRange, size, className }: MagneticDockProps): react_jsx_runtime.JSX.Element;

interface StaggeredListProps {
    /** Array of items to render */
    items: {
        id: string;
        content: React__default.ReactNode;
    }[];
    /** Animation variant. Default "slide-up" */
    variant?: "slide-up" | "fade-blur" | "slide-left";
    /** Extra class on each item wrapper */
    itemClassName?: string;
    className?: string;
}
declare function StaggeredList({ items, variant, itemClassName, className, }: StaggeredListProps): react_jsx_runtime.JSX.Element;

interface ParallaxTiltCardProps {
    children?: ReactNode;
    className?: string;
    /** Max tilt angle in degrees */
    maxTilt?: number;
    /** Spring config */
    springConfig?: {
        stiffness: number;
        damping: number;
    };
    /** Show light reflection */
    glare?: boolean;
}
declare function ParallaxTiltCard({ children, className, maxTilt, springConfig, glare, }: ParallaxTiltCardProps): react_jsx_runtime.JSX.Element;
/** Parallax layer — children shift based on depth factor */
declare function ParallaxLayer({ children, depth, className, }: {
    children: ReactNode;
    depth?: number;
    className?: string;
}): react_jsx_runtime.JSX.Element;

type RevealVariant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale" | "blur";
interface ScrollRevealProps {
    children: ReactNode;
    variant?: RevealVariant;
    className?: string;
    /** Delay in seconds */
    delay?: number;
    /** Viewport margin (e.g. "-100px") */
    margin?: string;
    /** Animate only once */
    once?: boolean;
    /** Spring stiffness */
    stiffness?: number;
    /** Spring damping */
    damping?: number;
}
declare function ScrollReveal({ children, variant, className, delay, margin, once, stiffness, damping, }: ScrollRevealProps): react_jsx_runtime.JSX.Element;

interface MarqueeProps {
    children: ReactNode;
    className?: string;
    /** Speed in pixels per second */
    speed?: number;
    /** Scroll direction */
    direction?: "left" | "right";
    /** Pause on hover */
    pauseOnHover?: boolean;
    /** Gap between repeated items */
    gap?: number;
}
declare function Marquee({ children, className, speed, direction, pauseOnHover, gap, }: MarqueeProps): react_jsx_runtime.JSX.Element;
/** A convenience wrapper for marquee items */
declare function MarqueeItem({ children, className, }: {
    children: ReactNode;
    className?: string;
}): react_jsx_runtime.JSX.Element;

interface RippleButtonProps {
    children: ReactNode;
    className?: string;
    /** Ripple color (CSS value) */
    rippleColor?: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}
declare function RippleButton({ children, className, rippleColor, onClick, disabled, }: RippleButtonProps): react_jsx_runtime.JSX.Element;

interface GradientBorderProps {
    children: ReactNode;
    className?: string;
    /** Border width in px */
    borderWidth?: number;
    /** Rotation duration in seconds */
    duration?: number;
    /** Gradient colors */
    colors?: string[];
}
declare function GradientBorder({ children, className, borderWidth, duration, colors, }: GradientBorderProps): react_jsx_runtime.JSX.Element;

interface SpotlightProps {
    children: ReactNode;
    className?: string;
    /** Sweep duration in seconds */
    duration?: number;
    /** Delay between sweeps */
    delay?: number;
    /** Beam color */
    color?: string;
    /** Beam width as percentage */
    beamWidth?: number;
}
declare function Spotlight({ children, className, duration, delay, color, beamWidth, }: SpotlightProps): react_jsx_runtime.JSX.Element;

interface TextShimmerProps {
    children: string;
    /** Duration of one gradient sweep in seconds. Default 2.5 */
    duration?: number;
    /** Gradient colors. Default: neutral to highlight to neutral */
    className?: string;
}
declare function TextShimmer({ children, duration, className, }: TextShimmerProps): react_jsx_runtime.JSX.Element;

interface WobbleCardProps {
    children: React__default.ReactNode;
    className?: string;
}
declare function WobbleCard({ children, className }: WobbleCardProps): react_jsx_runtime.JSX.Element;

interface AnimatedTabItem {
    id: string;
    label: string;
    content: React__default.ReactNode;
}
interface AnimatedTabsProps {
    items: AnimatedTabItem[];
    defaultId?: string;
    className?: string;
}
declare function AnimatedTabs({ items, defaultId, className }: AnimatedTabsProps): react_jsx_runtime.JSX.Element;

/**
 * Command Palette
 * =============================================================================
 * The panel drops 12px into place on the `smooth` spring; results cascade in
 * once, on open, and then hold still while you type. Re-animating every row on
 * every keystroke is the most common reason palettes feel busy.
 *
 * The highlight glides between rows on the `snappy` spring. Keyboard and mouse
 * don't fight: the highlight only follows the pointer when the pointer actually
 * moves, so scrolling the list with arrow keys never "steals" the selection.
 *
 * Search ranks prefix matches first, then word starts, then loose matches,
 * and shows which letters matched.
 *
 * Accessibility: role="combobox" input controlling a role="listbox", with
 * aria-activedescendant, so screen readers announce the highlighted command.
 *
 * Needs: ./motion.ts, ./overlay.ts
 * =============================================================================
 */

interface CommandItem {
    id: string;
    label: string;
    icon?: React__default.ReactNode;
    shortcut?: string;
    /** Extra words to match, e.g. ["settings", "preferences"]. */
    keywords?: string[];
    onSelect: () => void;
}
interface CommandPaletteProps {
    items: CommandItem[];
    open: boolean;
    onClose: () => void;
    placeholder?: string;
    query?: string;
    onQueryChange?: (query: string) => void;
    /** Shown when nothing matches. */
    emptyText?: string;
}
declare function CommandPalette({ items, open, onClose, placeholder, query: externalQuery, onQueryChange, emptyText, }: CommandPaletteProps): React__default.ReactPortal | null;

interface ExpandableCardProps {
    preview: React__default.ReactNode;
    detail: React__default.ReactNode;
    className?: string;
    id?: string;
    /** Accessible name for the opened card. */
    label?: string;
}
declare function ExpandableCard({ preview, detail, className, id, label }: ExpandableCardProps): react_jsx_runtime.JSX.Element;

interface CursorTrailProps {
    /** Number of trail dots. Default 8 */
    count?: number;
    /** Dot size in px. Default 8 */
    size?: number;
    /** Color of the dots. Default "currentColor" (a rainbow). */
    color?: string;
    className?: string;
}
declare function CursorTrail({ count, size, color, className }: CursorTrailProps): react_jsx_runtime.JSX.Element | null;

interface SwipeCardData {
    id: string | number;
    content: ReactNode;
}
type Direction = "left" | "right";
interface SwipeCardsProps {
    cards: SwipeCardData[];
    className?: string;
    onSwipe?: (id: string | number, direction: Direction) => void;
    /** Drag distance in px that counts as a decision. Default 110. */
    threshold?: number;
    /** Labels for the two directions. */
    labels?: {
        left: string;
        right: string;
    };
}
declare function SwipeCards({ cards: initial, className, onSwipe, threshold, labels }: SwipeCardsProps): react_jsx_runtime.JSX.Element;

interface LiquidButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    color?: string;
}
declare function LiquidButton({ children, className, onClick, color, }: LiquidButtonProps): react_jsx_runtime.JSX.Element;

interface AnimatedCounterProps {
    target: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    duration?: number;
    className?: string;
    showReplayButton?: boolean;
}
declare function AnimatedCounter({ target, prefix, suffix, decimals, duration, className, showReplayButton, }: AnimatedCounterProps): react_jsx_runtime.JSX.Element;
interface StatCardProps {
    value: number;
    label: string;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    icon?: string;
    showReplayButton?: boolean;
}
declare function StatCard({ value, label, prefix, suffix, decimals, icon, showReplayButton, }: StatCardProps): react_jsx_runtime.JSX.Element;

type ProgressRingSize = "sm" | "md" | "lg" | "xl";
interface ProgressRingProps {
    value: number;
    size?: number | ProgressRingSize;
    strokeWidth?: number;
    color?: string;
    trackColor?: string;
    showLabel?: boolean;
    className?: string;
}
declare const sizePresets: Record<ProgressRingSize, {
    size: number;
    strokeWidth: number;
    fontSize: string;
}>;
declare function ProgressRing({ value, size, strokeWidth, color, trackColor, showLabel, className, }: ProgressRingProps): react_jsx_runtime.JSX.Element;
interface ProgressRingGroupProps {
    variant?: "uniform" | "graduated" | "mixed";
    className?: string;
    children: React.ReactNode;
}
declare function ProgressRingGroup({ variant, className, children }: ProgressRingGroupProps): react_jsx_runtime.JSX.Element;

interface SpringCarouselProps {
    items: ReactNode[];
    itemWidth?: number;
    gap?: number;
    className?: string;
    /** Accessible name. Default "Carousel". */
    label?: string;
}
declare function SpringCarousel({ items, itemWidth, gap, className, label }: SpringCarouselProps): react_jsx_runtime.JSX.Element;

interface ParallaxScrollProps {
    children?: React.ReactNode;
    className?: string;
}
interface ParallaxItemProps {
    children: React.ReactNode;
    speed?: number;
    className?: string;
}
declare function ParallaxScroll({ children, className }: ParallaxScrollProps): react_jsx_runtime.JSX.Element;
declare function ParallaxItem({ children, speed, className }: ParallaxItemProps): react_jsx_runtime.JSX.Element;

interface MorphingShapeProps {
    size?: number;
    color?: string;
    strokeColor?: string;
    className?: string;
}
declare function MorphingShape({ size, color, strokeColor, className, }: MorphingShapeProps): react_jsx_runtime.JSX.Element;

interface ComponentSwitcherProps {
    currentComponent: string;
}
declare function ComponentSwitcher({ currentComponent }: ComponentSwitcherProps): react_jsx_runtime.JSX.Element;

interface ControlConfig {
    type: "slider" | "dropdown";
    label: string;
    key: string;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
    options?: {
        value: any;
        label: string;
    }[];
}
interface ControlPanelProps {
    title: string;
    config: Record<string, any>;
    controls: ControlConfig[];
    onChange: (key: string, value: any) => void;
}
declare function ControlPanel({ title, config, controls, onChange }: ControlPanelProps): react_jsx_runtime.JSX.Element;

export { Accordion, type AccordionItem, type AccordionProps, AnimatedBadge, AnimatedCounter, type AnimatedTabItem, AnimatedTabs, type AnimatedTabsProps, Badge, type BadgeProps, type BadgeSize, type BadgeVariant, type BreadcrumbItem, Breadcrumbs, type BreadcrumbsProps, Button, type ButtonSize, type ButtonVariant, Card, CardActions, type CardActionsProps, CardContent, type CardContentProps, CardFooter, CardGrid, type CardGridProps, CardHeader, CardImage, type CardImageProps, type CardProps, type CardSize, type CardVariant, CodeBlock, CodeDisplay, type CodeDisplayProps, type CommandItem, CommandPalette, type CommandPaletteProps, ComponentSwitcher, type ComponentSwitcherProps, ContextMenu, type ContextMenuItem, type ContextMenuProps, type ControlConfig, ControlPanel, type ControlPanelProps, CursorTrail, type CursorTrailProps, type DateRange, DateRangePicker, type DateRangePickerProps, type DaySchedule, Dialog, DialogDescription, DialogFooter, type DialogProps, type DialogSize, DialogTitle, type DockItem, Drawer, DrawerContent, DrawerFooter, DrawerHeader, type DrawerHeaderProps, type DrawerProps, type DriftButtonProps, type DriftInputProps, type DriftNavMenuProps, type DriftSkeletonProps, Dropdown, type DropdownItem, type DropdownProps, ExpandableCard, type ExpandableCardProps, FlipCard, GlowCard, type GlowCardProps, GradientBorder, Input, type InputSize, type InputState, LiquidButton, MagneticButton, type MagneticButtonProps, MagneticDock, type MagneticDockProps, Marquee, MarqueeItem, ModeSwitcher, type ModeSwitcherProps, MorphingHamburger, type MorphingHamburgerProps, MorphingShape, MultiSelect, type MultiSelectProps, type NavItem, NavMenu, NotificationBadge, type NotificationBadgeProps, NumberTicker, type NumberTickerProps, ParallaxItem, ParallaxLayer, ParallaxScroll, ParallaxTiltCard, Popover, type PopoverPlacement, type PopoverProps, ProgressRing, ProgressRingGroup, RippleButton, SchedulePicker, type SchedulePickerProps, type ScheduleValue, ScrollReveal, Skeleton, type SkeletonVariant, Spotlight, SpringCarousel, type SpringName, StaggeredList, type StaggeredListProps, StatCard, Stepper, type StepperProps, type StepperStep, SwipeCards, type TabItem, Tabs, type TabsProps, TextShimmer, type TextShimmerProps, type TimeSlot, type Toast, ToastProvider, type ToastProviderProps, type ToastVariant, Toggle, type ToggleProps, type ToggleSize, Tooltip, type TooltipPosition, type TooltipProps, Typewriter, type TypewriterProps, WobbleCard, type WobbleCardProps, badgeVariants, breadcrumbPatterns, contextMenuItems, exit, fade, reducedTransition, sizePresets, spring, springValue, stagger, useMotionPrefs, useToast };
