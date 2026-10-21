import Image from 'next/image';
import Button from '../ui/Button';
import { IMAGES } from '@/lib/data';

export default function Contact() {
  return (
    <section id="contact" className="wide rv" aria-labelledby="contact-title">
      <div className="cta">
        <span className="pill pk">Together, we grow hope</span>
        <h2 id="contact-title">Your gift changes lives</h2>
        <p>
          Choose between monthly or one-time donations to make a lasting impact in our community.
        </p>
        <Button action="donate">Donate Now</Button>

        {/* Decorative floating icons */}
        <span className="sq s1" aria-hidden="true">
          <svg viewBox="0 0 60 60">
            <path d="M5 10c20 0 30 20 20 40M25 50l-8-12M25 50l12-8" strokeLinecap="round" />
          </svg>
        </span>
        <span className="sq s2" aria-hidden="true">
          <svg viewBox="0 0 60 60">
            <path d="M30 50C10 35 8 22 16 14c6-5 12-2 14 4 2-6 8-9 14-4 8 8 6 21-14 36Z" />
          </svg>
        </span>

        <Image
          src={IMAGES.contactGroup}
          alt="Friends smiling together beneath a blue sky"
          width={1536}
          height={1028}
          quality={72}
          sizes="(max-width: 700px) 100vw, 900px"
        />
      </div>
    </section>
  );
}
