import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Mission from '@/components/sections/Mission';
import Impact from '@/components/sections/Impact';
import Programs from '@/components/sections/Programs';
import Testimonials from '@/components/sections/Testimonials';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main id="top">
        <Hero />
        <Mission />
        <Impact />
        <Programs />
        <Testimonials />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
