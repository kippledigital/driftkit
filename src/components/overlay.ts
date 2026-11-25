"use client";

/**
 * Shared overlay behavior for Dialog, Drawer, Command Palette and Expandable Card.
 * Motion is only half of an overlay; the other half is what keyboard and
 * screen-reader users feel. These hooks make every overlay behave the same way.
 *
 * Copy-paste note: copy this file next to any overlay component you copy.
 */

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const FOCUSABLE =
  'a[href], area[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), iframe, [contenteditable="true"], [tabindex]:not([tabindex="-1"])';

function focusables(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute("inert") && el.getClientRects().length > 0
  );
}

/**
 * Keeps Tab and Shift+Tab inside `ref` while active, moves focus in on open,
 * and gives it back to whatever had it before on close.
 */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean, initialFocus?: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!active) return;
    const previous = document.activeElement as HTMLElement | null;
    const root = ref.current;
    // Wait one frame so the element exists and is laid out.
    const raf = requestAnimationFrame(() => {
      if (!root) return;
      const target = initialFocus?.current ?? focusables(root)[0] ?? root;
      target.focus({ preventScroll: true });
    });
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !root) return;
      const items = focusables(root);
      if (items.length === 0) {
        e.preventDefault();
        root.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      if (e.shiftKey && (current === first || !root.contains(current))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (current === last || !root.contains(current))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      // Restore focus after the exit begins, without scrolling the page.
      if (previous && document.contains(previous)) previous.focus({ preventScroll: true });
    };
  }, [active, ref, initialFocus]);
}

let lockCount = 0;
let saved: { overflow: string; paddingRight: string } | null = null;

/**
 * Locks page scroll without the layout jump: the scrollbar's width is added
 * back as padding so content doesn't shift sideways. Safe to stack.
 */
export function useScrollLock(active: boolean) {
  useIsoLayoutEffect(() => {
    if (!active) return;
    const body = document.body;
    if (lockCount === 0) {
      const scrollbar = window.innerWidth - document.documentElement.clientWidth;
      saved = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
      body.style.overflow = "hidden";
      if (scrollbar > 0) {
        const current = parseFloat(getComputedStyle(body).paddingRight) || 0;
        body.style.paddingRight = `${current + scrollbar}px`;
      }
    }
    lockCount++;
    return () => {
      lockCount--;
      if (lockCount === 0 && saved) {
        body.style.overflow = saved.overflow;
        body.style.paddingRight = saved.paddingRight;
        saved = null;
      }
    };
  }, [active]);
}

/** Escape closes the topmost overlay only. */
const escapeStack: Array<() => void> = [];
export function useEscape(active: boolean, onEscape: () => void) {
  const cb = useRef(onEscape);
  useEffect(() => {
    cb.current = onEscape;
  });
  useEffect(() => {
    if (!active) return;
    const handler = () => cb.current();
    escapeStack.push(handler);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && escapeStack[escapeStack.length - 1] === handler && !e.isComposing) {
        e.preventDefault();
        handler();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      const i = escapeStack.lastIndexOf(handler);
      if (i >= 0) escapeStack.splice(i, 1);
    };
  }, [active]);
}

/** True after the first client render; use before createPortal to stay SSR-safe. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard mount flag
    setMounted(true);
  }, []);
  return mounted;
}
