import { resolveActive, type SectionPos } from "../lib/nav";
import { scrollToAnchor } from "../lib/scroll";
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelectorAll<HTMLAnchorElement>("[data-link]").forEach((a) =>
  a.addEventListener("click", (e) => { e.preventDefault(); scrollToAnchor(a.getAttribute("href")!, reduce); }),
);
const ids = [...document.querySelectorAll<HTMLAnchorElement>("[data-link]")].map((a) => a.getAttribute("href")!.slice(1));
function update() {
  const sections: SectionPos[] = ids
    .map((id) => { const el = document.getElementById(id); return el ? { id, top: el.offsetTop - 80 } : null; })
    .filter((s): s is SectionPos => !!s);
  const active = resolveActive(sections, window.scrollY);
  document.querySelectorAll<HTMLAnchorElement>("[data-link]").forEach((a) =>
    a.classList.toggle("opacity-100", a.getAttribute("href") === "#" + active));
}
addEventListener("scroll", update, { passive: true }); update();
