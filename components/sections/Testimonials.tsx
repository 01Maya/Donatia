'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { IMAGES, TESTIMONIALS } from '@/lib/data';

const AUTO_ADVANCE_MS = 6000;
const AVATARS = [IMAGES.dog, IMAGES.mission, IMAGES.community];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonial = TESTIMONIALS[activeIndex];

  // Auto-advance; the timer restarts whenever the slide changes (including manual clicks).
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;

    const timer = setTimeout(
      () => setActiveIndex((index) => (index + 1) % TESTIMONIALS.length),
      AUTO_ADVANCE_MS,
    );
    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <section id="testimonials" className="wide rv" aria-labelledby="testimonials-title">
      <div className="testi">
        {/* Left: intro copy + volunteer avatars */}
        <div className="rv l">
          <span className="pill out">Testimonials</span>
          <h2 id="testimonials-title">What they say about us?</h2>
          <p className="mut">
            We don&apos;t just act—we deliver measurable change. Transparency, agility, and
            proven results define how we turn compassion into lasting impact.
          </p>

          <div className="av">
            <span style={{ display: 'flex' }} aria-hidden="true">
              {AVATARS.map((src) => (
                <Image key={src} src={src} alt="" width={40} height={40} quality={60} sizes="40px" />
              ))}
            </span>
            +1,000 Volunteers
          </div>
        </div>

        {/* Right: photo, rotating quote and slide dots */}
        <div className="tsl rv r">
          <div className="media cur">
            <Image
              src={IMAGES.community}
              alt="Smiling Donatia volunteers"
              width={900}
              height={600}
            />
          </div>

          <figure className="quote" aria-live="polite">
            <blockquote>
              <q key={activeIndex} className="fade">
                “{testimonial.quote}”
              </q>
            </blockquote>
            <figcaption>
              <small>{testimonial.author}</small>
            </figcaption>
          </figure>

          <div className="dots">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                className={index === activeIndex ? 'on' : ''}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show testimonial ${index + 1}`}
                aria-current={index === activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
