'use client';
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import Image from 'next/image';
import { PROGRAMS } from '@/lib/data';
import { stagger } from '@/lib/utils';

/** Minimum drag (as a share of one card) that moves to the next / previous card. */
const DRAG_THRESHOLD = 0.15;
/** How long the glide to the target card takes before snapping is switched back on. */
const SETTLE_MS = 600;

type Mode = 'idle' | 'dragging' | 'settling';

export default function Programs() {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScrollLeft: 0 });
  const settleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [mode, setMode] = useState<Mode>('idle');

  useEffect(() => () => clearTimeout(settleTimer.current), []);

  /* ───────────────────────── Card positions ───────────────────────── */

  /** scrollLeft value that places each card flush at the start of the track (clamped to the scroll range). */
  const getCardPositions = () => {
    const element = track.current!;
    const trackLeft = element.getBoundingClientRect().left;
    const paddingStart = parseFloat(getComputedStyle(element).scrollPaddingLeft) || 0;
    const maxScroll = element.scrollWidth - element.clientWidth;

    return Array.from(element.querySelectorAll<HTMLElement>('.ini')).map((card) => {
      const left = card.getBoundingClientRect().left - trackLeft + element.scrollLeft - paddingStart;
      return Math.min(maxScroll, Math.max(0, left));
    });
  };

  const nearestIndex = (positions: number[], x: number) =>
    positions.reduce(
      (best, position, index) =>
        Math.abs(position - x) < Math.abs(positions[best] - x) ? index : best,
      0,
    );

  /** Glide to a card, keeping snapping off until the animation has finished. */
  const goToCard = (positions: number[], index: number) => {
    const element = track.current!;
    const safeIndex = Math.max(0, Math.min(positions.length - 1, index));

    setMode('settling');
    element.scrollTo({ left: positions[safeIndex], behavior: 'smooth' });

    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => setMode('idle'), SETTLE_MS);
  };

  /* ──────────────── Drag to scroll (mouse / pen only) ──────────────── */

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const element = track.current;
    // Touch screens swipe natively and land on a full card via CSS scroll-snap.
    if (!element || event.pointerType === 'touch' || event.button !== 0) return;

    clearTimeout(settleTimer.current);
    drag.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft: element.scrollLeft,
    };
    setMode('dragging');
    element.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = track.current;
    if (!drag.current.active || !element) return;

    const distance = event.clientX - drag.current.startX;
    element.scrollLeft = drag.current.startScrollLeft - distance;
  };

  /** On release, always finish on a whole card — never stop in the middle. */
  const stopDragging = () => {
    const element = track.current;
    if (!drag.current.active || !element) return;
    drag.current.active = false;

    const positions = getCardPositions();
    const current = element.scrollLeft;
    const moved = current - drag.current.startScrollLeft;
    const cardWidth = positions[1] - positions[0] || element.clientWidth;

    let target: number;

    if (Math.abs(moved) < cardWidth * DRAG_THRESHOLD) {
      // Barely moved: go back to the card we started on.
      target = nearestIndex(positions, drag.current.startScrollLeft);
    } else if (moved > 0) {
      // Dragged forward: first card that is ahead of the current position.
      const ahead = positions.findIndex((position) => position > current + 1);
      target = ahead === -1 ? positions.length - 1 : ahead;
    } else {
      // Dragged backward: last card that is behind the current position.
      const behind = positions.filter((position) => position < current - 1).length - 1;
      target = Math.max(0, behind);
    }

    goToCard(positions, target);
  };

  /* ───────────────────── Arrow buttons & keyboard ──────────────────── */

  const scrollNext = () => {
    const positions = getCardPositions();
    const current = nearestIndex(positions, track.current!.scrollLeft);
    const isLast = positions[current] >= positions[positions.length - 1] - 1;

    // Loop back to the first card after the last one.
    goToCard(positions, isLast ? 0 : current + 1);
  };

  const scrollPrev = () => {
    const positions = getCardPositions();
    goToCard(positions, nearestIndex(positions, track.current!.scrollLeft) - 1);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') scrollNext();
    if (event.key === 'ArrowLeft') scrollPrev();
  };

  /* ───────────────────────────── Markup ───────────────────────────── */

  const trackClass = [
    'track',
    mode === 'dragging' && 'is-dragging',
    mode !== 'idle' && 'no-snap',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section id="programs" className="prog" aria-labelledby="programs-title">
      <div className="wrap hd rv">
        <div>
          <span className="pill pk">Programs</span>
          <h2 id="programs-title">Our impact initiatives</h2>
        </div>

        <div className="arrows">
          <button onClick={scrollPrev} aria-label="Previous initiatives">
            ←
          </button>
          <button onClick={scrollNext} aria-label="Next initiatives">
            →
          </button>
        </div>
      </div>

      <div
        ref={track}
        className={trackClass}
        tabIndex={0}
        role="region"
        aria-label="Initiatives carousel"
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
      >
        {PROGRAMS.map((program, index) => (
          <article
            key={program.title}
            className="ini cur"
            style={stagger(index, 0.1, 3)}
          >
            <Image
              src={program.image}
              alt={program.alt}
              draggable={false}
              width={1200}
              height={800}
              quality={72}
              sizes="(max-width: 560px) 82vw, (max-width: 900px) 70vw, 580px"
            />
            <div>
              <span className="dot" aria-hidden="true">
                {program.icon}
              </span>
              <h3>{program.title}</h3>
              <p>{program.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}