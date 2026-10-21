
'use client';

import { useEffect, useRef, useState } from 'react';

/* ───────────────────────────── Helpers ───────────────────────────── */

const selectAll = (selector: string) =>
  Array.from(document.querySelectorAll<HTMLElement>(selector));

const prefersReducedMotion = () =>
  matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Normalised pointer position inside an element. */
const pointerOffset = (event: PointerEvent, element: HTMLElement) => {
  const rect = element.getBoundingClientRect();

  if (!rect.width || !rect.height) {
    return { x: 0, y: 0 };
  }

  return {
    x: (event.clientX - rect.left) / rect.width - 0.5,
    y: (event.clientY - rect.top) / rect.height - 0.5,
  };
};

/* ──────────────────────────── Scroll reveal ──────────────────────── */

function initReveal() {
  const targets = new Map<Element, HTMLElement[]>();

  const watch = (watched: Element, revealed: HTMLElement) => {
    targets.set(watched, [
      ...(targets.get(watched) ?? []),
      revealed,
    ]);
  };

  selectAll('.rv, .rv2').forEach((element) => {
    watch(element, element);
  });

  selectAll('.cur').forEach((element) => {
    watch(element.parentElement ?? element, element);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        targets.get(entry.target)?.forEach((element) => {
          element.classList.add('in');
        });

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.01,
      rootMargin: '0px 0px 180px 0px',
    },
  );

  targets.forEach((_, watched) => {
    observer.observe(watched);
  });

  return () => observer.disconnect();
}

/* ─────────────────────── Parallax + progress bar ─────────────────── */


function initParallax(progressBar: HTMLElement | null) {
  selectAll('.hero .hw').forEach((element) => {
    element.dataset.px = '-0.05';
    element.dataset.free = '1';
  });

  selectAll('.sq').forEach((element, index) => {
    element.dataset.px = index ? '0.12' : '-0.1';
    element.dataset.free = '1';
  });

  const items = selectAll('[data-px]');
  let ticking = false;
  let animationFrame: number | null = null;
  let disposed = false;

  const update = () => {
    if (disposed) return;

    ticking = false;
    animationFrame = null;

    const viewportHeight = window.innerHeight;

    items.forEach((element) => {
      // An element may have been removed since initialization.
      if (!element.isConnected) return;

      const parent = element.parentElement;
      if (!parent || !parent.isConnected) return;

      // Guard against unexpected DOM changes.
      let rect: DOMRect;

      try {
        rect = parent.getBoundingClientRect();
      } catch {
        return;
      }

      const isOffscreen =
        rect.bottom < -150 ||
        rect.top > viewportHeight + 150;

      if (isOffscreen) return;

      const speed = Number(element.dataset.px);
      if (!Number.isFinite(speed)) return;

      const maxTravel = element.dataset.free
        ? 70
        : element.offsetHeight * 0.085;

      const distanceFromCenter =
        rect.top + rect.height / 2 - viewportHeight / 2;

      const offset = -distanceFromCenter * speed;

      const clampedOffset = Math.max(
        -maxTravel,
        Math.min(maxTravel, offset),
      );

      element.style.translate = `0 ${clampedOffset}px`;
    });

    if (progressBar?.isConnected) {
      const scrollable = Math.max(
        1,
        document.documentElement.scrollHeight - viewportHeight,
      );

      progressBar.style.transform =
        `scaleX(${Math.min(1, window.scrollY / scrollable)})`;
    }
  };

  const onScroll = () => {
    if (disposed || ticking) return;

    ticking = true;
    animationFrame = requestAnimationFrame(update);
  };

  const onResize = () => {
    if (!disposed) update();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);

  update();

  return () => {
    disposed = true;

    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);

    if (animationFrame !== null) {
      cancelAnimationFrame(animationFrame);
    }
  };
}


/* ─────────────────────────────── Tilt ────────────────────────────── */

function initTilt() {
  const hasMouse = matchMedia(
    '(hover: hover) and (pointer: fine)',
  ).matches;

  if (!hasMouse || prefersReducedMotion()) {
    return;
  }

  const controller = new AbortController();
  const options = { signal: controller.signal };

  // Cards and photos tilt towards the pointer.
  selectAll('.card, .proj .im, .ini, .about .media, .fc').forEach(
    (element) => {
      element.classList.add('tilt');

      const isCard = element.matches('.card');
      const strength = isCard ? 16 : 12;

      element.addEventListener(
        'pointermove',
        (event) => {
          const { x, y } = pointerOffset(event, element);
          const lift = isCard ? 'translateY(-8px) ' : '';

          element.style.transform =
            `perspective(900px) rotateX(${-y * strength}deg) ` +
            `rotateY(${x * strength}deg) ${lift}` +
            'scale3d(1.03, 1.03, 1.03)';
        },
        options,
      );

      element.addEventListener(
        'pointerleave',
        () => {
          element.style.transform = '';
        },
        options,
      );
    },
  );

  // Hero image follows the pointer across the hero section.
  const hero = document.querySelector<HTMLElement>('.hero');
  const heroImage = document.querySelector<HTMLElement>('.hero .hw img');

  if (hero && heroImage) {
    hero.addEventListener(
      'pointermove',
      (event) => {
        const { x, y } = pointerOffset(event, hero);

        heroImage.style.transform =
          `perspective(1000px) rotateY(${x * 12}deg) ` +
          `rotateX(${-y * 9}deg)`;
      },
      options,
    );

    hero.addEventListener(
      'pointerleave',
      () => {
        heroImage.style.transform = '';
      },
      options,
    );
  }

  return () => controller.abort();
}

/* ──────────────────────────── Component ──────────────────────────── */

const CURTAIN_OPEN_DELAY_MS = 120;
const CURTAIN_FAILSAFE_MS = 1500;
const CURTAIN_REMOVE_DELAY_MS = 900;

export default function PageEffects() {
  const progressBar = useRef<HTMLDivElement>(null);

  const [curtainOpen, setCurtainOpen] = useState(false);
  const [curtainRemoved, setCurtainRemoved] = useState(false);

  useEffect(() => {
    const cleanups = [
      initReveal(),
      initParallax(progressBar.current),
      initTilt(),
    ];

    let openTimer: ReturnType<typeof setTimeout> | undefined;
    let loadListener: (() => void) | undefined;

    const openCurtain = () => {
      setCurtainOpen(true);
    };

    if (document.readyState === 'complete') {
      openTimer = setTimeout(
        openCurtain,
        CURTAIN_OPEN_DELAY_MS,
      );
    } else {
      loadListener = () => {
        openTimer = setTimeout(
          openCurtain,
          CURTAIN_OPEN_DELAY_MS,
        );
      };

      window.addEventListener('load', loadListener, {
        once: true,
      });
    }

    // Fallback in case the load event is delayed.
    const failsafeTimer = setTimeout(
      openCurtain,
      CURTAIN_FAILSAFE_MS,
    );

    return () => {
      cleanups.forEach((cleanup) => cleanup?.());

      if (openTimer) {
        clearTimeout(openTimer);
      }

      clearTimeout(failsafeTimer);

      if (loadListener) {
        window.removeEventListener('load', loadListener);
      }
    };
  }, []);

  // Remove the curtain after its slide-away animation.
  useEffect(() => {
    if (!curtainOpen) return;

    const timer = setTimeout(() => {
      setCurtainRemoved(true);
    }, CURTAIN_REMOVE_DELAY_MS);

    return () => clearTimeout(timer);
  }, [curtainOpen]);

  return (
    <>
      <div id="pg" ref={progressBar} aria-hidden="true" />

      {!curtainRemoved && (
        <div
          id="curtain"
          className={curtainOpen ? 'go' : ''}
          aria-hidden="true"
        >
          <i className="cp l" />
          <i className="cp r" />

          <div className="cl">
            <svg viewBox="0 0 24 24">
              <path
                d="M12 22C5 17 2 13 2 8.5A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 10 2.5C22 13 19 17 12 22Z"
                fill="#f08ae9"
              />
            </svg>

            <span>Donatia</span>
          </div>
        </div>
      )}
    </>
  );
}
