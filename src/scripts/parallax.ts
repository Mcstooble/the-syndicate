import { parallaxOffset } from "../lib/parallax";
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const v = document.querySelector<HTMLElement>("[data-hero-video]");
  addEventListener("pointermove", (e) => {
    if (!v) return;
    const { x, y } = parallaxOffset(e.clientX / innerWidth, e.clientY / innerHeight, 12);
    v.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
  }, { passive: true });
}
