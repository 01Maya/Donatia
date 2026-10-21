import Image from 'next/image';
import Button from '../ui/Button';
import { IMAGES } from '@/lib/data';

export default function Mission() {
  return (
    <section id="mission" className="wrap about" aria-labelledby="mission-title">
      <div className="rv l">
        <span className="pill out">About us</span>
        <h2 id="mission-title">One organization, many battles</h2>
        <p className="mut">
          We don&apos;t limit our compassion to a single cause. Whether feeding the hungry,
          planting trees, or rebuilding communities, we measure success in lives uplifted
          and ecosystems restored.
        </p>
        <Button href="#programs">Our history</Button>
      </div>

      <div className="media cur">
        <Image
          src={IMAGES.mission}
          alt="Hands planting a young tree in fresh soil"
          width={900}
          height={675}
          quality={72}
          sizes="(max-width: 900px) 100vw, 50vw"
        />
      </div>
    </section>
  );
}
