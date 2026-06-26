import { LazyMotion, domAnimation, MotionConfig } from "motion/react";
import { useSmoothScroll } from "./lib/useSmoothScroll";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./components/sections/Services";
import Process from "./components/sections/Process";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Partners from "./components/sections/Partners";
import Contact from "./components/sections/Contact";
import Footer from "./components/Footer";

export default function App() {
  useSmoothScroll();
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="bg-paper font-sans text-ink">
          <Nav />
          <Hero />
          <main>
            <Services />
            <Process />
            <About />
            <Experience />
            <Partners />
            <Contact />
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
