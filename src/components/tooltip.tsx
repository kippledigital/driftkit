"use client";

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

// =============================================================================
// SPRING PHYSICS
// =============================================================================
// Tooltip uses the "smooth" spring for pop-in — stiffness 300, damping 30, mass 1.
// WHY: Tooltips need to feel light and informational, not bouncy. The smooth
// spring gives a gentle settle that says "here's some context" without demanding
// attention. Scale 0.9 → 1.0 creates a subtle "growing into place" effect that
// feels organic — like a thought bubble forming.
//
// Exit uses a quick tween (not spring) — instant hover-out should feel responsive.
// WHY: Users expect tooltips to vanish immediately when they move away.
// A spring on exit would make it feel sticky and annoying.
// =============================================================================

const springs = {
  smooth: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
};

// =============================================================================
// TYPES
// =============================================================================

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
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

// =============================================================================
// POSITION UTILITIES
// =============================================================================

// WHY auto-flip: A tooltip that clips off-screen is worse than no tooltip.
// We measure the trigger's bounding rect against the viewport and flip to
// the opposite side if there isn't enough room. 8px buffer to avoid edge-hugging.
const FLIP_BUFFER = 8;
const TOOLTIP_OFFSET = 8;

function getFlippedPosition(
  position: TooltipPosition,
  triggerRect: DOMRect
): TooltipPosition {
  const { innerWidth: vw, innerHeight: vh } = window;
  switch (position) {
    case "top":
      return triggerRect.top < 60 ? "bottom" : "top";
    case "bottom":
      return triggerRect.bottom > vh - 60 ? "top" : "bottom";
    case "left":
      return triggerRect.left < 120 ? "right" : "left";
    case "right":
      return triggerRect.right > vw - 120 ? "left" : "right";
    default:
      return position;
  }
}

// WHY inline styles for positioning: Tailwind can't do dynamic pixel values.
// We calculate exact positions from the trigger's bounding rect so the tooltip
// is always precisely aligned regardless of layout context.
function getPositionStyles(
  pos: TooltipPosition
): React.CSSProperties {
  switch (pos) {
    case "top":
      return {
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        marginBottom: TOOLTIP_OFFSET,
      };
    case "bottom":
      return {
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        marginTop: TOOLTIP_OFFSET,
      };
    case "left":
      return {
        right: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        marginRight: TOOLTIP_OFFSET,
      };
    case "right":
      return {
        left: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        marginLeft: TOOLTIP_OFFSET,
      };
  }
}

// Arrow rotation per position — points toward the trigger
function getArrowStyles(pos: TooltipPosition): React.CSSProperties {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 8,
    height: 8,
    background: "inherit",
    borderRadius: 1,
  };
  switch (pos) {
    case "top":
      return { ...base, bottom: -4, left: "50%", marginLeft: -4, transform: "rotate(45deg)" };
    case "bottom":
      return { ...base, top: -4, left: "50%", marginLeft: -4, transform: "rotate(45deg)" };
    case "left":
      return { ...base, right: -4, top: "50%", marginTop: -4, transform: "rotate(45deg)" };
    case "right":
      return { ...base, left: -4, top: "50%", marginTop: -4, transform: "rotate(45deg)" };
  }
}

// =============================================================================
// COMPONENT
// =============================================================================

export function Tooltip({
  content,
  children,
  position = "top",
  delay = 300,
  followCursor = false,
  className = "",
}: TooltipProps) {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [resolvedPos, setResolvedPos] = useState(position);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // WHY delay on hover-in: Prevents tooltip spam when quickly scanning a UI.
  // 300ms is the sweet spot — long enough to filter drive-by hovers, short
  // enough to feel responsive when you actually want to read the tooltip.
  // Hover-out is instant because lingering tooltips feel broken.
  const handleMouseEnter = useCallback(() => {
    timerRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setResolvedPos(getFlippedPosition(position, rect));
      }
      setVisible(true);
    }, delay);
  }, [delay, position]);

  const handleMouseLeave = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (followCursor) {
        setCursorPos({ x: e.clientX, y: e.clientY });
      }
    },
    [followCursor]
  );

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // WHY scale 0.9 → 1.0: Just enough to create a "pop-in" feeling without
  // being cartoonish. Combined with opacity, it reads as the tooltip materializing
  // rather than just appearing. The origin matches the position so it feels
  // like it's emerging from the trigger element.
  const originMap: Record<TooltipPosition, string> = {
    top: "bottom center",
    bottom: "top center",
    left: "right center",
    right: "left center",
  };

  const variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
      };

  // Follow-cursor positioning: fixed position at cursor coords
  const followCursorStyle: React.CSSProperties = followCursor
    ? {
        position: "fixed",
        left: cursorPos.x + 12,
        top: cursorPos.y - 8,
        transform: "none",
        margin: 0,
      }
    : {};

  return (
    <span
      ref={triggerRef}
      className="relative inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            role="tooltip"
            className={`absolute z-50 px-3 py-1.5 text-xs font-medium rounded-[8px] bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 whitespace-nowrap pointer-events-none ${className}`}
            style={{
              ...(!followCursor ? getPositionStyles(resolvedPos) : {}),
              ...followCursorStyle,
              transformOrigin: originMap[resolvedPos],
            }}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              ...springs.smooth,
              // Exit should be instant — tween override
              opacity: { duration: 0.1 },
            }}
          >
            {content}
            {/* Arrow pointer — subtle directional cue connecting tooltip to trigger */}
            {!followCursor && (
              <span
                style={getArrowStyles(resolvedPos)}
                className="bg-neutral-900 dark:bg-neutral-100"
                aria-hidden
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

export default Tooltip;
