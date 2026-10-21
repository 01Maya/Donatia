import type { CSSProperties } from 'react';

/** Joins class names, skipping falsy values. */
export function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(' ');
}

/**
 * Stagger helper: sets the --d (transition delay) custom property
 * used by the reveal animations in styles/effects.css.
 */
export const stagger = (index: number, step = 0.12, mod = 4) =>
  ({ '--d': `${(index % mod) * step}s` }) as CSSProperties;
