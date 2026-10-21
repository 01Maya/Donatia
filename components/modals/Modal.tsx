'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { useSite } from './SiteProvider';

type Props = {
  open: boolean;
  label: string;
  wide?: boolean;
  children: ReactNode;
};

/** Accessible dialog shell: Esc / backdrop / ✕ to close, focus moves in on open and back on close. */
export default function Modal({ open, label, wide, children }: Props) {
  const { close } = useSite();
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;

    // Remember what had focus so we can restore it on close.
    opener.current = document.activeElement;
    const focusTimer = setTimeout(() => closeButton.current?.focus(), 60);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [open, close]);

  return (
    <div
      className={`mo${open ? ' on' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      aria-hidden={!open}
      onClick={(event) => event.target === event.currentTarget && close()}
    >
      <div className={`box${wide ? ' vid' : ''}`}>
        <button
          ref={closeButton}
          className="x"
          onClick={close}
          aria-label="Close dialog"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
