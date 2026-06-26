import { useEffect, useState } from "react";
import { resolveActive, type SectionPos } from "./nav";

/** Tracks which section id is currently active based on scroll position. */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState("");

  useEffect(() => {
    const marker = () => window.scrollY + window.innerHeight * 0.35;

    const compute = () => {
      const sections: SectionPos[] = ids
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, top: el.offsetTop } : null;
        })
        .filter((s): s is SectionPos => s !== null);
      setActive(resolveActive(sections, marker()));
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [ids]);

  return active;
}
