import Button from '../ui/Button';
import { IMPACT_CARDS } from '@/lib/data';
import { stagger } from '@/lib/utils';

export default function Impact() {
  return (
    <section id="impact" className="wide rv" aria-labelledby="impact-title">
      <div className="impact">
        <span className="pill out">Impact Delivered</span>
        <h2 id="impact-title">How we deliver change</h2>
        <p>
          We don&apos;t just act—we deliver measurable change. Transparency, agility, and
          proven results define how we turn compassion into lasting impact.
        </p>

        <div className="cards">
          {IMPACT_CARDS.map((card, index) => (
            <article key={card.title} className="card rv2" style={stagger(index)}>
              <div className="ico" style={{ background: card.bg }} aria-hidden="true">
                {card.icon}
              </div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>

        <Button href="#projects">Our impact</Button>
      </div>
    </section>
  );
}
