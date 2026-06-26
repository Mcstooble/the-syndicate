import { m } from "motion/react";
import Section from "../ui/Section";
import MaskLines from "../ui/MaskLines";
import { site } from "../../content/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Process() {
  return (
    <Section id="process">
      <h2 className="max-w-2xl text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em]">
        <MaskLines lines={["Three moves, no theatre."]} inView />
      </h2>

      <ol className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-3 md:gap-10">
        {site.process.map((p, i) => (
          <m.li
            key={p.step}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
            className="border-t border-ink/20 pt-6"
          >
            <span className="font-serif text-5xl italic text-accent md:text-6xl">{p.step}</span>
            <h3 className="mt-5 font-serif text-2xl tracking-tight text-ink">{p.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-mist">{p.body}</p>
          </m.li>
        ))}
      </ol>
    </Section>
  );
}
