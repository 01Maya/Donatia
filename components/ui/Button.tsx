'use client';
import type { ReactNode } from 'react';
import { useSite, type ModalName } from '../modals/SiteProvider';

export const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M2 8h12M9 3l5 5-5 5" />
  </svg>
);

type Props = {
  children?: ReactNode;
  /** Renders an <a> when provided. */
  href?: string;
  /** Otherwise renders a <button> that opens this modal. */
  action?: ModalName;
  variant?: 'pill' | 'sm' | 'link' | 'play';
  /** aria-label for icon-only buttons. */
  label?: string;
};

const CLASS_NAMES = {
  pill: 'btn',
  sm: 'btn sm',
  link: 'ul',
  play: 'play',
} as const;

/** Single button primitive used across every section. */
export default function Button({
  children,
  href,
  action,
  variant = 'pill',
  label,
}: Props) {
  const { open } = useSite();
  const className = CLASS_NAMES[variant];

  const content = (
    <>
      {children}
      {variant === 'pill' && (
        <i aria-hidden>
          <ArrowIcon />
        </i>
      )}
    </>
  );

  if (href) {
    return (
      <a className={className} href={href}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      onClick={() => action && open(action)}
    >
      {content}
    </button>
  );
}
