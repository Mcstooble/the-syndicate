import { m } from "motion/react";
import Section from "../ui/Section";
import MaskLines from "../ui/MaskLines";
import { site } from "../../content/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Services() {
  return (
    <Section id="services" divider={false}>
      <h2 className="max-w-2xl text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em]">
        <MaskLines lines={["Where we go deep."]} inView />
      </h2>

      <ul className="mt-16 md:mt-24">
        {site.services.map((s, i) => (
          <li key={s.title} className="group relative">
            <m.span
              className="absolute inset-x-0 top-0 block h-px origin-left bg-line"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.04 }}
            />
            <m.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.08 + i * 0.04 }}
              className="grid grid-cols-1 gap-2 py-7 md:grid-cols-12 md:items-baseline md:gap-8 md:py-9"
            >
              <h3 className="font-serif text-2xl tracking-tight text-ink transition-colors duration-300 group-hover:text-accent md:col-span-5 md:text-[1.75rem]">
                {s.title}
              </h3>
              <p className="max-w-md text-base leading-relaxed text-mist md:col-span-7">
                {s.outcome}
              </p>
            </m.div>
          </li>
        ))}
        <span className="block h-px bg-line" />
      </ul>
    </Section>
  );
}
