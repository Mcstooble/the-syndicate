import { useEffect, useMemo, useState } from "react";
import { m, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { site } from "../content/site";
import { useActiveSection } from "../lib/useActiveSection";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ids = useMemo(() => site.nav.map((n) => n.href.replace("#", "")), []);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  // Light bar (ink text) once scrolled past the hero; transparent (paper text) over it.
  const onDark = !scrolled;
  const textColor = onDark ? "text-paper" : "text-ink";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "border-b border-line bg-paper/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        <div className="flex items-center gap-12">
          <a
            href="#hero"
            className={`font-serif text-xl tracking-tight transition-colors duration-500 ${textColor}`}
          >
            {site.name}
          </a>
          <ul className="hidden items-center gap-9 md:flex">
            {site.nav.map((item) => {
              const isActive = active === item.href.replace("#", "");
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`text-sm transition-colors duration-300 ${
                      onDark
                        ? isActive
                          ? "text-paper"
                          : "text-paper/65 hover:text-paper"
                        : isActive
                          ? "text-ink"
                          : "text-mist hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <a
          href="#contact"
          className={`hidden rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-500 md:inline-block ${
            onDark
              ? "border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink"
              : "border-ink/20 text-ink hover:bg-ink hover:text-paper"
          }`}
        >
          {site.hero.cta}
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`relative z-50 flex h-10 w-10 items-center justify-center transition-transform active:scale-90 md:hidden ${
            open ? "text-ink" : textColor
          }`}
        >
          <m.span
            className="absolute"
            animate={{ opacity: open ? 0 : 1, rotate: open ? 90 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <Menu size={24} strokeWidth={1.75} />
          </m.span>
          <m.span
            className="absolute"
            animate={{ opacity: open ? 1 : 0, rotate: open ? 0 : -90 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <X size={24} strokeWidth={1.75} />
          </m.span>
        </button>
      </nav>

      {/* Mobile overlay - paper, editorial */}
      <AnimatePresence>
        {open && (
          <m.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-paper px-8 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <m.ul
              className="flex flex-col"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
                hidden: {},
              }}
            >
              {site.nav.map((item) => (
                <m.li
                  key={item.href}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="border-b border-line"
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 font-serif text-4xl text-ink"
                  >
                    {item.label}
                  </a>
                </m.li>
              ))}
            </m.ul>
            <m.a
              href="#contact"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.36 }}
              className="mt-10 inline-flex w-fit items-center rounded-full bg-ink px-8 py-3.5 text-base font-medium text-paper"
            >
              {site.hero.cta}
            </m.a>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
