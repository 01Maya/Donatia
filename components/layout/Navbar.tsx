'use client';
import { useEffect, useRef, useState } from 'react';
import Button from '../ui/Button';
import { MORE_LINKS, NAV_LINKS } from '@/lib/data';

export const Logo = () => (
  <a href="#top" className="logo" aria-label="Donatia home">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 22C5 17 2 13 2 8.5A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 10 2.5C22 13 19 17 12 22Z"
        fill="#f08ae9"
      />
    </svg>
    Donatia
  </a>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close the "More" dropdown on outside click, and everything on Escape.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!moreRef.current?.contains(event.target as Node)) setMoreOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMoreOpen(false);
      setMenuOpen(false);
    };

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const closeAll = () => {
    setMenuOpen(false);
    setMoreOpen(false);
  };

  return (
    <header>
      <div className="wrap nav">
        <Logo />

        <nav className={`links${menuOpen ? ' on' : ''}`} id="main-nav" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={closeAll}>
              {link.label}
            </a>
          ))}

          <div ref={moreRef} className={`more${moreOpen ? ' open' : ''}`}>
            <button
              className="dd"
              aria-haspopup="true"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((value) => !value)}
            >
              More ▾
            </button>

            <div className="menu">
              {MORE_LINKS.map((link) => (
                <a key={link.href} href={link.href} onClick={closeAll}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        <div className="right">
          <Button variant="sm" action="volunteer">
            Volunteer
          </Button>

          <button
            className={`burger${menuOpen ? ' on' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
