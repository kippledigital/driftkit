"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export type PopoverPlacement = 
  | "top" | "top-start" | "top-end"
  | "bottom" | "bottom-start" | "bottom-end" 
  | "left" | "left-start" | "left-end"
  | "right" | "right-start" | "right-end";

export interface PopoverProps {
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

const popoverVariants = {
  closed: {
    opacity: 0,
    scale: 0.95,
    y: -10,
  },
  open: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
};

const springConfig = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

export function Popover({
  children,
  content,
  open: controlledOpen,
  onOpenChange,
  placement = "bottom",
  trigger = "click",
  delay = 200,
  arrow = true,
  offset = 8,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  className = "",
  container,
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [actualPlacement, setActualPlacement] = useState<PopoverPlacement>(placement);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>(undefined);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = (open: boolean) => {
    if (isControlled) {
      onOpenChange?.(open);
    } else {
      setInternalOpen(open);
      onOpenChange?.(open);
    }
  };

  // Calculate position
  const calculatePosition = () => {
    if (!triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let x = 0;
    let y = 0;
    let finalPlacement = placement;

    // Calculate base position
    switch (placement) {
      case "top":
      case "top-start":
      case "top-end":
        y = triggerRect.top - popoverRect.height - offset;
        break;
      case "bottom":
      case "bottom-start":
      case "bottom-end":
        y = triggerRect.bottom + offset;
        break;
      case "left":
      case "left-start":
      case "left-end":
        x = triggerRect.left - popoverRect.width - offset;
        break;
      case "right":
      case "right-start":
      case "right-end":
        x = triggerRect.right + offset;
        break;
    }

    // Calculate horizontal alignment
    if (placement.includes("top") || placement.includes("bottom")) {
      if (placement.includes("start")) {
        x = triggerRect.left;
      } else if (placement.includes("end")) {
        x = triggerRect.right - popoverRect.width;
      } else {
        x = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
      }
    }

    // Calculate vertical alignment
    if (placement.includes("left") || placement.includes("right")) {
      if (placement.includes("start")) {
        y = triggerRect.top;
      } else if (placement.includes("end")) {
        y = triggerRect.bottom - popoverRect.height;
      } else {
        y = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
      }
    }

    // Flip if needed
    if (placement.includes("top") && y < 0) {
      y = triggerRect.bottom + offset;
      finalPlacement = placement.replace("top", "bottom") as PopoverPlacement;
    } else if (placement.includes("bottom") && y + popoverRect.height > viewport.height) {
      y = triggerRect.top - popoverRect.height - offset;
      finalPlacement = placement.replace("bottom", "top") as PopoverPlacement;
    }

    if (placement.includes("left") && x < 0) {
      x = triggerRect.right + offset;
      finalPlacement = placement.replace("left", "right") as PopoverPlacement;
    } else if (placement.includes("right") && x + popoverRect.width > viewport.width) {
      x = triggerRect.left - popoverRect.width - offset;
      finalPlacement = placement.replace("right", "left") as PopoverPlacement;
    }

    // Keep in viewport
    x = Math.max(8, Math.min(x, viewport.width - popoverRect.width - 8));
    y = Math.max(8, Math.min(y, viewport.height - popoverRect.height - 8));

    setPosition({ x, y });
    setActualPlacement(finalPlacement);
  };

  // Update position when open
  useEffect(() => {
    if (isOpen) {
      calculatePosition();
    }
  }, [isOpen, placement]);

  // Handle click outside
  useEffect(() => {
    if (!isOpen || !closeOnOutsideClick) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current && 
        triggerRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeOnOutsideClick]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEscape]);

  // Handle scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      if (isOpen) {
        calculatePosition();
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isOpen]);

  // Trigger handlers
  const handleClick = () => {
    if (trigger === "click") {
      setOpen(!isOpen);
    }
  };

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      clearTimeout(hoverTimeoutRef.current);
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "hover") {
      hoverTimeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, delay);
    }
  };

  const handleFocus = () => {
    if (trigger === "focus") {
      setOpen(true);
    }
  };

  const handleBlur = () => {
    if (trigger === "focus") {
      setOpen(false);
    }
  };

  // Arrow component
  const Arrow = () => {
    if (!arrow) return null;

    const arrowSize = 8;
    const arrowClasses = "absolute w-2 h-2 rotate-45 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800";

    let arrowStyle = {};
    let arrowClassName = arrowClasses;

    if (actualPlacement.includes("top")) {
      arrowStyle = { bottom: -arrowSize / 2, left: "50%", transform: "translateX(-50%)" };
      arrowClassName += " border-t-0 border-l-0";
    } else if (actualPlacement.includes("bottom")) {
      arrowStyle = { top: -arrowSize / 2, left: "50%", transform: "translateX(-50%)" };
      arrowClassName += " border-b-0 border-r-0";
    } else if (actualPlacement.includes("left")) {
      arrowStyle = { right: -arrowSize / 2, top: "50%", transform: "translateY(-50%)" };
      arrowClassName += " border-l-0 border-t-0";
    } else if (actualPlacement.includes("right")) {
      arrowStyle = { left: -arrowSize / 2, top: "50%", transform: "translateY(-50%)" };
      arrowClassName += " border-r-0 border-b-0";
    }

    return <div className={arrowClassName} style={arrowStyle} />;
  };

  const popover = isOpen && (
    <AnimatePresence>
      <motion.div
        ref={popoverRef}
        initial="closed"
        animate="open"
        exit="closed"
        variants={popoverVariants}
        transition={springConfig}
        className={`
          fixed z-50 max-w-xs
          bg-white dark:bg-neutral-900 
          border border-neutral-200 dark:border-neutral-800
          rounded-lg shadow-lg p-3
          ${className}
        `}
        style={{
          left: position.x,
          top: position.y,
        }}
        onMouseEnter={trigger === "hover" ? handleMouseEnter : undefined}
        onMouseLeave={trigger === "hover" ? handleMouseLeave : undefined}
      >
        <Arrow />
        {content}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <>
      <div
        ref={triggerRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="inline-block"
      >
        {children}
      </div>
      {typeof document !== "undefined" && 
        createPortal(popover, container || document.body)
      }
    </>
  );
}