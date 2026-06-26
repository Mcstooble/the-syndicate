import { useEffect, useState, type ReactNode } from "react";
import { m } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
  /** Trigger on scroll-into-view instead of on mount. */
  inView?: boolean;
};

/** Editorial line reveal: each line wipes up from behind a mask, like type being set. */
export default function MaskLines({
  lines,
  className,
  delay = 0,
  stagger = 0.09,
  inView = false,
}: Props) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const line = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { y: "115%" },
        show: { y: 0, transition: { duration: 0.9, ease: EASE } },
      };

  return (
    <m.span
      className={className}
      style={{ display: "block" }}
      variants={container}
      initial="hidden"
      {...(inView
        ? { whileInView: "show", viewport: { once: true, amount: 0.6 } }
        : { animate: "show" })}
    >
      {lines.map((l, i) => (
        <span key={i} style={{ display: "block", overflow: "hidden", paddingBottom: "0.04em" }}>
          <m.span variants={line} style={{ display: "block", willChange: "transform" }}>
            {l}
          </m.span>
        </span>
      ))}
    </m.span>
  );
}
