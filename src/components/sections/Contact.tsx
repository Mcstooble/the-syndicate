import { m } from "motion/react";
import { ArrowRight } from "lucide-react";
import Section from "../ui/Section";
import MaskLines from "../ui/MaskLines";
import Magnetic from "../ui/Magnetic";
import { site } from "../../content/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  return (
    <Section id="contact">
      <div className="flex flex-col items-start gap-10 py-10 md:py-20">
        <h2 className="text-[clamp(2.75rem,8vw,6rem)] font-medium leading-[1.02] tracking-[-0.025em]">
          <MaskLines
            lines={[
              "Let's write the",
              <em key="fc" className="font-normal italic text-accent">
                first chapter.
              </em>,
            ]}
            inView
          />
        </h2>

        <m.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          className="max-w-lg text-lg leading-relaxed text-mist"
        >
          The first session is free. Tell us where you are and where you are trying to get to.
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.32 }}
          className="flex flex-col items-start gap-6 sm:flex-row sm:items-center"
        >
          <Magnetic
            href={`mailto:${site.contactEmail}`}
            className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-8 py-4 text-base font-medium text-paper"
          >
            {site.hero.cta}
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Magnetic>
          <a
            href={`mailto:${site.contactEmail}`}
            className="font-serif text-lg italic text-mist underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            {site.contactEmail}
          </a>
        </m.div>
      </div>
    </Section>
  );
}
