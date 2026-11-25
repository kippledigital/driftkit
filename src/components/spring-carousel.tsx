"use client";

/**
 * Spring Carousel
 * =============================================================================
 * Drag, flick, or use the arrow keys. When you let go, the carousel projects
 * where your throw would have landed (position + velocity x 0.2s) and snaps to
 * the nearest slide from there, so a hard flick skips several slides and a lazy
 * drag moves one, the way a real list feels on a phone.
 *
 * The snap uses the `gentle` spring and starts at your release velocity, so the
 * hand-off from finger to spring is seamless. Neighbors scale down slightly so
 * the active slide reads as the subject.
 *
 * It never scrolls past the last slide, re-measures on resize, and keyboard
 * arrows only work while the carousel has focus (not on the whole page).
 *
 * Needs: ./motion.ts
 * =============================================================================
 */

import { motion, useMotionValue, animate, type PanInfo } from "framer-motion";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { spring, useMotionPrefs } from "./motion";

interface SpringCarouselProps {
  items: ReactNode[];
  itemWidth?: number;
  gap?: number;
  className?: string;
  /** Accessible name. Default "Carousel". */
  label?: string;
}

export function SpringCarousel({ items, itemWidth = 260, gap = 16, className = "", label = "Carousel" }: SpringCarouselProps) {
  const m = useMotionPrefs();
  const uid = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState(0);
  const [index, setIndex] = useState(0);
  const x = useMotionValue(0);

  const step = itemWidth + gap;
  const content = items.length * step - gap;
  const maxScroll = Math.max(0, content - viewport);
  // Last index whose left edge can still be reached without overscrolling.
  const lastIndex = Math.max(0, Math.min(items.length - 1, Math.ceil(maxScroll / step)));

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setViewport(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const offsetFor = (i: number) => -Math.min(i * step, maxScroll);

  const goTo = (i: number, velocity = 0) => {
    const next = Math.max(0, Math.min(lastIndex, i));
    setIndex(next);
    animate(x, offsetFor(next), m.reduced ? { duration: 0 } : { ...spring.gentle, velocity });
  };

  // Keep position valid if the viewport resizes.
  useEffect(() => {
    if (viewport) x.set(offsetFor(Math.min(index, lastIndex)));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on size changes
  }, [viewport, maxScroll]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const projected = x.get() + info.velocity.x * 0.2;
    goTo(Math.round(-projected / step), info.velocity.x);
  };

  return (
    <section aria-roledescription="carousel" aria-label={label} className={className}>
      <div
        ref={viewportRef}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            goTo(index - 1);
          } else if (e.key === "ArrowRight") {
            e.preventDefault();
            goTo(index + 1);
          }
        }}
        className="overflow-hidden rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          style={{ x, gap, touchAction: "pan-y" }}
          drag={m.reduced ? false : "x"}
          dragConstraints={{ left: -maxScroll, right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragEnd={onDragEnd}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${items.length}`}
              className="shrink-0 overflow-hidden rounded-[8px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
              style={{ width: itemWidth }}
              initial={false}
              animate={{ scale: i === index || m.reduced ? 1 : 0.94, opacity: i === index ? 1 : 0.65 }}
              transition={m.spring("smooth")}
            >
              {item}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-4 flex justify-center gap-1" role="group" aria-label="Choose slide">
        {Array.from({ length: lastIndex + 1 }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            className="grid h-6 w-6 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span className="relative block h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700">
              {i === index && (
                <motion.span
                  layoutId={`${uid}-dot`}
                  className="absolute inset-0 rounded-full bg-neutral-900 dark:bg-neutral-100"
                  transition={m.spring("snappy")}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default SpringCarousel;
