"use client";

import { motion, useMotionValue, useSpring, animate, PanInfo } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";

interface SpringCarouselProps {
  items: React.ReactNode[];
  itemWidth?: number;
  gap?: number;
  className?: string;
}

// Consistent spring configuration for smooth tracking
const SPRING_CONFIG = { stiffness: 300, damping: 20, mass: 0.4 };

export function SpringCarousel({
  items,
  itemWidth = 260,
  gap = 16,
  className = "",
}: SpringCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const x = useMotionValue(0);
  const springX = useSpring(x, SPRING_CONFIG);

  // Calculate proper constraints - ensure we don't overshoot
  const getConstraints = useCallback(() => {
    if (!containerRef.current) return { left: 0, right: 0 };
    
    const containerWidth = containerRef.current.offsetWidth;
    const contentWidth = items.length * (itemWidth + gap) - gap;
    const maxScroll = Math.max(0, contentWidth - containerWidth);
    
    return {
      left: -maxScroll,
      right: 0,
    };
  }, [items.length, itemWidth, gap]);

  const snapTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(items.length - 1, index));
      setActiveIndex(clamped);
      const target = -clamped * (itemWidth + gap);
      animate(x, target, { type: "spring", ...SPRING_CONFIG });
    },
    [items.length, itemWidth, gap, x]
  );

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const velocity = info.velocity.x;
      const offset = info.offset.x;
      let newIndex = activeIndex;

      // More sensitive velocity threshold for better responsiveness
      if (Math.abs(velocity) > 200) {
        newIndex = velocity > 0 ? activeIndex - 1 : activeIndex + 1;
      } 
      // Reduced offset threshold for easier swiping
      else if (Math.abs(offset) > itemWidth / 4) {
        newIndex = offset > 0 ? activeIndex - 1 : activeIndex + 1;
      }

      snapTo(newIndex);
    },
    [activeIndex, itemWidth, snapTo]
  );

  // Keyboard nav
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") snapTo(activeIndex - 1);
      if (e.key === "ArrowRight") snapTo(activeIndex + 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, snapTo]);

  return (
    <div className={`overflow-hidden ${className}`} ref={containerRef}>
      <motion.div
        className="flex cursor-grab active:cursor-grabbing"
        style={{ x: springX, gap }}
        drag="x"
        dragConstraints={getConstraints()}
        dragElastic={0.3}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="flex-shrink-0 rounded-[8px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden"
            style={{ width: itemWidth }}
            animate={{
              scale: i === activeIndex ? 1 : 0.92,
              opacity: i === activeIndex ? 1 : 0.6,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {item}
          </motion.div>
        ))}
      </motion.div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => snapTo(i)}
            className="relative w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700"
          >
            {i === activeIndex && (
              <motion.div
                layoutId="carousel-dot"
                className="absolute inset-0 rounded-full bg-neutral-900 dark:bg-neutral-100"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
