import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import { Skiper30 } from '@/components/Gallery';
import About from '@/components/About';
import Achievements from '@/components/Achievements';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Blogs from '@/components/Blogs';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Skiper30 />
      <About />
      <Achievements />
      <Skills />
      <Experience />
      <Blogs />
      <Contact />
      <Footer />
    </div>
  );
}
