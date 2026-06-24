import { bloomOpacity } from "../lib/bloom";
const bloom = document.querySelector<HTMLElement>("[data-hero-bloom]");
function update() {
  if (!bloom) return;
  const progress = window.scrollY / (document.body.scrollHeight - innerHeight);
  const o = bloomOpacity(progress, 0.6, 0.5);
  bloom.style.background = `radial-gradient(60% 50% at 50% 60%, rgba(201,154,75,${o}) 0%, rgba(201,154,75,0) 70%)`;
}
addEventListener("scroll", update, { passive: true }); update();
