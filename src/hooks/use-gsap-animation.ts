"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Direction = "up" | "down" | "left" | "right";

interface UseGsapScrollAnimationOptions {
  direction?: Direction;
  distance?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  /** CSS selector to animate children instead of the container itself */
  childSelector?: string;
  start?: string;
}

const directionMap: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 60 },
  down: { x: 0, y: -60 },
  left: { x: -60, y: 0 },
  right: { x: 60, y: 0 },
};

/**
 * Attaches a GSAP ScrollTrigger slide-in animation to the returned ref.
 * If `childSelector` is provided, animates matching children with stagger.
 */
export function useGsapScrollAnimation<T extends HTMLElement = HTMLElement>(
  options: UseGsapScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);

  const {
    direction = "up",
    distance,
    duration = 0.75,
    delay = 0,
    stagger = 0,
    ease = "power3.out",
    childSelector,
    start = "top 85%",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const baseOffset = directionMap[direction];
    const x = distance !== undefined ? (direction === "left" ? -distance : direction === "right" ? distance : 0) : baseOffset.x;
    const y = distance !== undefined ? (direction === "up" ? distance : direction === "down" ? -distance : 0) : baseOffset.y;

    const targets = childSelector ? el.querySelectorAll(childSelector) : el;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        x,
        y,
        duration,
        delay,
        stagger,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [direction, distance, duration, delay, stagger, ease, childSelector, start]);

  return ref;
}
