import { m } from "motion/react";
import Section from "../ui/Section";
import MaskLines from "../ui/MaskLines";
import { site } from "../../content/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Partners() {
  return (
    <Section id="partners">
      <h2 className="max-w-2xl text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em]">
        <MaskLines lines={["Two operators.", "No bench warmers."]} inView />
      </h2>

      <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-14 md:mt-24 md:grid-cols-2">
        {site.partners.map((p, i) => (
          <m.article
            key={p.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
            className="border-t border-ink/20 pt-7"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-serif text-3xl tracking-tight text-ink">{p.name}</h3>
              <span className="font-serif text-xl italic text-accent">{p.monogram}</span>
            </div>
            <p className="mt-2 text-sm uppercase tracking-[0.16em] text-mist">{p.role}</p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-mist">{p.body}</p>
          </m.article>
        ))}
      </div>
    </Section>
  );
}
