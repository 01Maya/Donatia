'use client';
import { useEffect, useRef, useState } from 'react';

type Props = {
  value: number;
  suffix?: string;
  decimals?: number;
};

const DURATION_MS = 1800;

/** Animates 0 → value once the number scrolls into view. */
export default function CountUp({ value, suffix = '', decimals = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = matchMedia('(prefers-reduced-motion:reduce)').matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (prefersReducedMotion) return setCurrent(value);

        const startTime = performance.now();

        // Ease-out cubic: fast start, slow finish.
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / DURATION_MS, 1);
          setCurrent(value * (1 - Math.pow(1 - progress, 3)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      {current.toFixed(decimals)}
      {suffix}
    </span>
  );
}
