"use client";

/**
 * Liquid Button
 * =============================================================================
 * The button is the liquid. Its body is a solid shape, and a droplet follows
 * your cursor just inside the edge. A gooey SVG filter (blur, then a hard
 * alpha threshold) melts the two together, so the button bulges and stretches
 * toward wherever you point, then pulls back into shape when you leave.
 *
 * The droplet rides a `bouncy` spring and grows in on hover, so the surface
 * wobbles a little as it settles. Reduced motion keeps the solid button and
 * drops the droplet.
 *
 * Needs: ./motion.ts
 * =============================================================================
 */

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { springValue } from "./motion";

interface LiquidButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  /** Liquid color. Text is white, so pick something with enough contrast. */
  color?: string;
}

/** Room around the button that the droplet can bulge into. */
const PAD = 18;

export function LiquidButton({ children, className = "", onClick, color = "#6366f1" }: LiquidButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  // useId() returns values like ":r1:", and colons break url(#…) filter references.
  const filterId = `goo-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [size, setSize] = useState({ w: 0, h: 0 });
  // Transforms read the latest size from a ref, so they never use a stale closure.
  const sizeRef = useRef(size);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const next = { w: el.offsetWidth, h: el.offsetHeight };
      sizeRef.current = next;
      setSize(next);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Pointer position relative to the button, in px.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const hover = useMotionValue(0);
  const sx = useSpring(px, springValue.bouncy);
  const sy = useSpring(py, springValue.bouncy);
  const sh = useSpring(hover, springValue.bouncy);

  // The droplet sits a little past the pointer, toward the edge it's nearest,
  // so it pushes the outline out instead of hiding inside the body.
  const cx = useTransform(sx, (x) => {
    const { w } = sizeRef.current;
    return PAD + Math.max(-8, Math.min(w + 8, w / 2 + (x - w / 2) * 1.12));
  });
  const cy = useTransform(sy, (y) => {
    const { h } = sizeRef.current;
    return PAD + Math.max(-8, Math.min(h + 8, h / 2 + (y - h / 2) * 1.25));
  });
  const r = useTransform(sh, (v) => Math.max(0, v) * sizeRef.current.h * 0.42);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      px.set(e.clientX - rect.left);
      py.set(e.clientY - rect.top);
    },
    [px, py]
  );

  const onEnter = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      // Start the droplet where the pointer came in, so it doesn't fly across.
      sx.jump(e.clientX - rect.left);
      sy.jump(e.clientY - rect.top);
      onMove(e);
    }
    hover.set(1);
  };

  const onLeave = () => {
    hover.set(0);
    px.set(sizeRef.current.w / 2);
    py.set(sizeRef.current.h / 2);
  };

  const { w, h } = size;

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      onPointerEnter={(e) => !reduced && onEnter(e)}
      onPointerMove={(e) => !reduced && onMove(e)}
      onPointerLeave={onLeave}
      // Touch: the droplet follows the finger and drains back on lift.
      onPointerUp={(e) => e.pointerType !== "mouse" && onLeave()}
      onPointerCancel={onLeave}
      className={`relative inline-flex cursor-pointer items-center justify-center rounded-[10px] px-6 py-3 text-sm font-medium text-white outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white dark:focus-visible:ring-offset-neutral-950 ${className}`}
    >
      {w > 0 && (
        <svg
          aria-hidden
          className="pointer-events-none absolute"
          style={{ left: -PAD, top: -PAD, overflow: "visible" }}
          width={w + PAD * 2}
          height={h + PAD * 2}
        >
          <defs>
            <filter id={filterId} x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
            </filter>
          </defs>
          <g filter={`url(#${filterId})`} fill={color}>
            <rect x={PAD} y={PAD} width={w} height={h} rx={10} />
            {!reduced && <motion.circle cx={cx} cy={cy} r={r} />}
          </g>
        </svg>
      )}
      {/* Fallback fill for the first paint, before the button is measured. */}
      {w === 0 && <span aria-hidden className="absolute inset-0 rounded-[10px]" style={{ background: color }} />}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export default LiquidButton;
