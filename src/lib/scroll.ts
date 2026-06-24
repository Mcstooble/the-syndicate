export function scrollToAnchor(href: string, reduce: boolean): void {
  const el = document.querySelector(href);
  if (!el) return;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
