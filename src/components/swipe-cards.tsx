"use client";

import React, { useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
  AnimatePresence,
  type PanInfo,
} from "framer-motion";

// =============================================================================
// SWIPE CARDS
// =============================================================================
// Tinder-style card stack with spring-physics swipe dismiss. Cards rotate as
// they're dragged and fly off screen. Stack shows depth with scale/offset.

interface SwipeCardData {
  id: string | number;
  content: ReactNode;
}

interface SwipeCardsProps {
  cards: SwipeCardData[];
  className?: string;
  /** Called when a card is swiped */
  onSwipe?: (id: string | number, direction: "left" | "right") => void;
  /** Swipe threshold in px */
  threshold?: number;
}

export function SwipeCards({
  cards: initialCards,
  className = "",
  onSwipe,
  threshold = 120,
}: SwipeCardsProps) {
  const [cards, setCards] = useState(initialCards);
  const prefersReduced = useReducedMotion();

  const handleDismiss = (id: string | number, direction: "left" | "right") => {
    setCards((prev) => prev.filter((c) => c.id !== id));
    onSwipe?.(id, direction);
  };

  return (
    <div className={`relative h-[300px] w-full overflow-visible ${className}`} style={{ padding: "20px" }}>
      <AnimatePresence>
        {cards.slice(0, 3).map((card, i) => (
          <SwipeCard
            key={card.id}
            card={card}
            index={i}
            total={Math.min(cards.length, 3)}
            threshold={threshold}
            prefersReduced={!!prefersReduced}
            onDismiss={handleDismiss}
          />
        ))}
      </AnimatePresence>
      {cards.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-neutral-400">
          No more cards
        </div>
      )}
    </div>
  );
}

function SwipeCard({
  card,
  index,
  total,
  threshold,
  prefersReduced,
  onDismiss,
}: {
  card: SwipeCardData;
  index: number;
  total: number;
  threshold: number;
  prefersReduced: boolean;
  onDismiss: (id: string | number, direction: "left" | "right") => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18]);
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0.3, 1, 1, 1, 0.3]);

  // Stack offset
  const stackScale = 1 - index * 0.05;
  const stackY = index * 8;

  const isTop = index === 0;

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > threshold) {
      onDismiss(card.id, info.offset.x > 0 ? "right" : "left");
    }
  };

  return (
    <motion.div
      className="absolute"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? opacity : 1,
        scale: stackScale,
        y: stackY,
        zIndex: total - index,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
      drag={isTop && !prefersReduced ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.4}
      dragMomentum={false}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
      onDragEnd={isTop ? handleDragEnd : undefined}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: stackScale, opacity: 1, y: stackY }}
      exit={{
        x: 300,
        opacity: 0,
        transition: { type: "spring", stiffness: 300, damping: 25 },
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      whileDrag={{ cursor: "grabbing" }}
    >
      <div className="h-full rounded-[8px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg p-6 cursor-grab">
        {card.content}
      </div>
    </motion.div>
  );
}
