import { glideTime } from "../lib/glide";
const v = document.querySelector<HTMLVideoElement>("[data-hero-video]");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (v && !reduce) {
  let scrubbing = false;
  const hero = document.querySelector<HTMLElement>("[data-hero]")!;
  addEventListener("scroll", () => {
    const within = window.scrollY < hero.offsetHeight;
    if (!within) return;
    if (!scrubbing) { v.pause(); scrubbing = true; }
    const progress = window.scrollY / hero.offsetHeight;
    if (Number.isFinite(v.duration)) v.currentTime = glideTime(progress, v.duration);
  }, { passive: true });
}
