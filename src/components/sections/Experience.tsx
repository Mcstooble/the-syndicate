import { m } from "motion/react";
import Section from "../ui/Section";
import MaskLines from "../ui/MaskLines";
import { site } from "../../content/site";

const EASE = [0.22, 1, 0.36, 1] as const;
const SECTORS = ["Fintech", "Ecommerce", "AI", "Web3", "Logistics"];

export default function Experience() {
  return (
    <Section id="experience">
      <h2 className="max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.02em]">
        <MaskLines
          lines={["Experience built across", "fintech, ecommerce, and AI."]}
          inView
        />
      </h2>

      <div className="mt-14 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-line pt-8 md:mt-20">
        {SECTORS.map((s, i) => (
          <m.span
            key={s}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
            className="font-serif text-2xl text-ink/80 md:text-3xl"
          >
            {s}
          </m.span>
        ))}
      </div>

      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
        className="mt-8 max-w-xl text-sm leading-relaxed text-mist"
      >
        {site.experience.note}
      </m.p>
    </Section>
  );
}
