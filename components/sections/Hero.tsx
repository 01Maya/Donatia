import Image from 'next/image';
import Button from '../ui/Button';
import CountUp from '../ui/CountUp';
import { IMAGES, STATS } from '@/lib/data';
import { stagger } from '@/lib/utils';

export default function Hero() {
  return (
    <>
      <section className="hero wrap" aria-labelledby="hero-title">
        <span className="pill">Together, we grow hope</span>
        <h1 id="hero-title">Together, we build a brighter future</h1>
        <p className="sub">Because every small act of kindness waters the seeds of change</p>
        <Button action="donate">Donate Now</Button>

        {/* Stacked photo cards: two decorative backdrops + the main portrait */}
        <div className="hw" aria-label="Donatia impact highlights">
          <div className="hero-card hero-card-back" aria-hidden="true">
            <Image
              src={IMAGES.community}
              alt=""
              width={830}
              height={553}
              quality={72}
              sizes="(max-width: 560px) 92vw, 760px"
            />
          </div>

          <div className="hero-card hero-card-mid" aria-hidden="true">
            <Image
              src={IMAGES.mission}
              alt=""
              width={830}
              height={553}
              quality={72}
              sizes="(max-width: 560px) 92vw, 790px"
            />
          </div>

          <div className="hero-card hero-card-front">
            <Image
              src={IMAGES.heroPortrait}
              alt="Smiling volunteer enjoying a bright outdoor day"
              width={484}
              height={608}
              priority
              fetchPriority="high"
              quality={78}
              sizes="(max-width: 560px) 88vw, (max-width: 900px) 48vw, 520px"
            />
          </div>
        </div>
      </section>

      {/* Impact numbers */}
      <section className="wide rv" aria-label="Our impact in numbers">
        <div className="stats">
          {STATS.map((stat, index) => (
            <div key={stat.label} className="rv2" style={stagger(index, 0.15)}>
              <b>
                <CountUp value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                <sup aria-hidden="true">+</sup>
              </b>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
