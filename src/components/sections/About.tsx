import { m } from "motion/react";
import Section from "../ui/Section";
import MaskLines from "../ui/MaskLines";
import { site } from "../../content/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function About() {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.02em] md:col-span-7">
          <MaskLines
            lines={[
              "We don't give advice",
              <span key="2">
                we <em className="font-normal italic text-accent">haven't lived.</em>
              </span>,
            ]}
            inView
          />
        </h2>

        <div className="flex flex-col gap-6 md:col-span-5 md:pt-3">
          {site.about.body.map((para, i) => (
            <m.p
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.12 }}
              className="text-lg leading-relaxed text-mist"
            >
              {para}
            </m.p>
          ))}
        </div>
      </div>
    </Section>
  );
}
