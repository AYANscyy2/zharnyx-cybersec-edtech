"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  onComplete?: () => void;
}

export function SplitText({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  onComplete,
}: SplitTextProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      delay,
      onComplete,
    });

    tl.fromTo(
      wordsRef.current,
      {
        yPercent: 100,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4.out",
      }
    );

    return () => {
      tl.kill();
    };
  }, [delay, onComplete]);

  const words = text.split(" ");

  return (
    <h1
      ref={containerRef}
      className={`flex flex-wrap items-center justify-center gap-x-[0.2em] overflow-hidden ${className}`}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden"
        >
          <span
            ref={(el) => {
              if (el) wordsRef.current[i] = el;
            }}
            className={`inline-block ${wordClassName}`}
          >
            {word}
          </span>
        </span>
      ))}
    </h1>
  );
}
