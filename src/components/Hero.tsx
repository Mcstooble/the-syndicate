import { useRef, useEffect, useState } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import Magnetic from "./ui/Magnetic";
import MaskLines from "./ui/MaskLines";
import { site } from "../content/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden bg-night text-paper"
    >
      {/* Background video with scroll parallax */}
      <m.div className="absolute inset-0" style={{ y: videoY, scale: videoScale }}>
        {reduced ? (
          <img
            src="/hero/hero-poster.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover [object-position:60%_center]"
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero/hero-poster.jpg"
            className="h-full w-full object-cover [object-position:60%_center]"
          >
            <source src="/hero/hero-bg-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
            <source src="/hero/hero-bg.webm" type="video/webm" />
            <source src="/hero/hero-bg.mp4" type="video/mp4" />
          </video>
        )}
      </m.div>

      {/* Scrim - vignette + bottom darken for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 70% 30%, transparent 30%, rgba(10,11,13,0.55) 100%), linear-gradient(180deg, rgba(10,11,13,0.5) 0%, transparent 35%, rgba(10,11,13,0.75) 100%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <m.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="flex flex-1 flex-col justify-end px-6 pb-14 md:px-12 md:pb-20 lg:px-16"
        >
          {/* Title-page kicker (the one deliberate kicker on the site) */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            className="mb-7 flex items-center gap-4 text-sm text-paper/70"
          >
            <span className="h-px w-10 bg-paper/40" />
            <span className="font-serif italic">A product &amp; growth studio</span>
          </m.div>

          <h1 className="max-w-[16ch] text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[1.04] tracking-[-0.02em]">
            <MaskLines
              lines={[
                "Every company has a",
                <em key="fc" className="font-normal italic text-accent-soft">
                  first chapter.
                </em>,
                "We help you write it.",
              ]}
              delay={0.3}
            />
          </h1>

          <div className="mt-9 flex max-w-xl flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
            <m.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.95 }}
              className="max-w-sm text-base leading-relaxed text-paper/70"
            >
              {site.hero.sub}
            </m.p>
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
            >
              <Magnetic
                href="#contact"
                className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-paper px-7 py-3.5 text-sm font-medium text-ink"
              >
                {site.hero.cta}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Magnetic>
            </m.div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
