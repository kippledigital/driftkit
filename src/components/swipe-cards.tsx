"use client";

/**
 * Swipe Cards
 * =============================================================================
 * Drag the top card. It tilts around a point below the card (like holding a
 * real card at the bottom), and a label fades in to preview the decision.
 * Let go past the threshold, or flick fast, and the card leaves in the
 * direction you threw it, at the speed you threw it. Otherwise it springs home.
 *
 * The cards underneath rise into place on `smooth` as each one leaves.
 *
 * Not everyone can drag: the buttons (and Left / Right arrow keys when the
 * stack is focused) do the same thing, and reduced motion swaps the throw for
 * a quick fade.
 *
 * Needs: ./motion.ts
 * =============================================================================
 */

import React, { useState, type ReactNode } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, type PanInfo } from "framer-motion";
import { spring, useMotionPrefs } from "./motion";

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
  labels?: { left: string; right: string };
}

export function SwipeCards({ cards: initial, className = "", onSwipe, threshold = 110, labels = { left: "Nope", right: "Like" } }: SwipeCardsProps) {
  const m = useMotionPrefs();
  const [cards, setCards] = useState(initial);
  const [exitDir, setExitDir] = useState<{ dir: number; velocity: number }>({ dir: 1, velocity: 0 });

  // Re-sync when a new deck is passed in.
  const [source, setSource] = useState(initial);
  if (source !== initial) {
    setSource(initial);
    setCards(initial);
  }

  const decide = (direction: Direction, velocity = 0) => {
    const top = cards[0];
    if (!top) return;
    setExitDir({ dir: direction === "right" ? 1 : -1, velocity });
    setCards((prev) => prev.slice(1));
    onSwipe?.(top.id, direction);
  };

  const visible = cards.slice(0, 3);

  return (
    <div className={`flex flex-col items-center gap-5 ${className}`}>
      <div
        role="group"
        aria-roledescription="card stack"
        aria-label={`${cards.length} cards left`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") decide("left");
          if (e.key === "ArrowRight") decide("right");
        }}
        className="relative h-[300px] w-full max-w-sm rounded-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4"
      >
        <AnimatePresence custom={exitDir}>
          {visible.map((card, i) => (
            <SwipeCard
              key={card.id}
              card={card}
              depth={i}
              threshold={threshold}
              reduced={m.reduced}
              labels={labels}
              onDecide={decide}
            />
          )).reverse()}
        </AnimatePresence>
        {cards.length === 0 && (
          <div className="absolute inset-0 grid place-items-center rounded-[12px] border border-dashed border-neutral-300 text-sm text-neutral-400 dark:border-neutral-700">
            That&rsquo;s the whole deck.
          </div>
        )}
      </div>
      <div className="flex gap-3">
        {(["left", "right"] as const).map((d) => (
          <button
            key={d}
            type="button"
            disabled={cards.length === 0}
            onClick={() => decide(d)}
            className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-40 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            {d === "left" ? `← ${labels.left}` : `${labels.right} →`}
          </button>
        ))}
      </div>
    </div>
  );
}

function SwipeCard({
  card,
  depth,
  threshold,
  reduced,
  labels,
  onDecide,
}: {
  card: SwipeCardData;
  depth: number;
  threshold: number;
  reduced: boolean;
  labels: { left: string; right: string };
  onDecide: (d: Direction, velocity: number) => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-240, 0, 240], [-14, 0, 14]);
  const rightLabel = useTransform(x, [20, threshold], [0, 1]);
  const leftLabel = useTransform(x, [-threshold, -20], [1, 0]);
  const isTop = depth === 0;

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    if (Math.abs(offset.x) > threshold || Math.abs(velocity.x) > 600) {
      onDecide((offset.x || velocity.x) > 0 ? "right" : "left", velocity.x);
    } else {
      animate(x, 0, spring.snappy);
    }
  };

  return (
    <motion.div
      className="absolute inset-0"
      style={{ x, rotate, transformOrigin: "50% 120%", zIndex: 10 - depth, touchAction: "pan-y" }}
      initial={reduced ? { opacity: 0 } : { scale: 0.9, y: 24, opacity: 0 }}
      animate={{ scale: 1 - depth * 0.05, y: depth * 10, opacity: depth > 2 ? 0 : 1, transition: spring.smooth }}
      exit={reduced ? { opacity: 0, transition: { duration: 0.12 } } : "thrown"}
      variants={{
        thrown: (c: { dir: number; velocity: number }) => ({
          x: c.dir * 520,
          rotate: c.dir * 22,
          opacity: 0,
          transition: { x: { ...spring.smooth, velocity: c.velocity }, rotate: spring.smooth, opacity: { duration: 0.25, delay: 0.05 } },
        }),
      }}
      drag={isTop && !reduced ? "x" : false}
      dragSnapToOrigin={false}
      dragMomentum={false}
      onDragEnd={isTop ? onDragEnd : undefined}
      aria-hidden={!isTop}
    >
      <div className={`relative h-full select-none overflow-hidden rounded-[12px] border border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 ${isTop && !reduced ? "cursor-grab active:cursor-grabbing" : ""}`}>
        {card.content}
        {isTop && (
          <>
            <motion.span style={{ opacity: rightLabel }} className="pointer-events-none absolute left-5 top-5 -rotate-12 rounded-[6px] border-2 border-green-500 px-2 py-0.5 text-sm font-bold uppercase tracking-wide text-green-600">
              {labels.right}
            </motion.span>
            <motion.span style={{ opacity: leftLabel }} className="pointer-events-none absolute right-5 top-5 rotate-12 rounded-[6px] border-2 border-red-500 px-2 py-0.5 text-sm font-bold uppercase tracking-wide text-red-600">
              {labels.left}
            </motion.span>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default SwipeCards;
