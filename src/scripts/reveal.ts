import { shouldReveal } from "../lib/reveal";

// Quiet fade + translate-up as elements enter the viewport. One-shot.
// Fully gated behind prefers-reduced-motion: if the user opts out, everything
// is shown immediately and no observer is created.
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");

if (reduce || !("IntersectionObserver" in window)) {
  targets.forEach((el) => el.setAttribute("data-revealed", ""));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (shouldReveal(entry)) {
          (entry.target as HTMLElement).setAttribute("data-revealed", "");
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
  );
  targets.forEach((el) => io.observe(el));
}
