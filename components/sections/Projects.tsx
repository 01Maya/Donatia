import Image from 'next/image';
import Button from '../ui/Button';
import { PROJECTS } from '@/lib/data';
import { stagger } from '@/lib/utils';

export default function Projects() {
  return (
    <section id="projects" className="wrap projs" aria-labelledby="projects-title">
      <div className="hd rv">
        <div>
          <span className="pill gr">Actions</span>
          <h2 id="projects-title" style={{ marginBottom: 12 }}>
            Our latest projects in action
          </h2>
          <p className="mut" style={{ fontSize: 14 }}>
            Explore how we turn donations into tangible change
          </p>
        </div>

        <Button variant="sm" href="#programs">
          View all
        </Button>
      </div>

      <div className="pg">
        {PROJECTS.map((project, index) => (
          <article
            key={project.title}
            className={`proj rv${project.featured ? ' big' : ''}`}
            style={stagger(index, 0.15)}
          >
            <div className="im cur">
              <Image
                src={project.image}
                alt={project.alt}
                width={900}
                height={700}
                quality={72}
                sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 40vw"
              />
            </div>

            <h3>{project.title}</h3>
            <p>{project.text}</p>
            <Button variant="link" action="donate">
              Donate
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
