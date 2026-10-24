import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import About from '@/components/About';
import Timeline from '@/components/Timeline';
import DesignWork from '@/components/DesignWork';
import Contact from '@/components/Contact';
import { getProjects } from '@/lib/projects';

export const metadata = { alternates: { canonical: '/' } };

export default function Home() {
  const projects = getProjects();
  return (
    <>
      <Hero />
      <section id="work">
        <div className="wrap">
          <p className="eyebrow">my projects</p>
          <h2 className="h2 disp">Things I made<br />(and you can click)</h2>
          <div style={{ display: 'grid', gap: 56 }}>
            {projects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
          </div>
        </div>
      </section>
      <DesignWork />
      <Timeline />
      <About />
      <Contact />
    </>
  );
}
