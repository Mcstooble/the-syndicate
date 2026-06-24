# Prologue Partners Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Visual section build (Phase 5) MUST invoke `frontend-design`; do not hand-roll generic markup.

**Goal:** Ship a single-page, cinematic marketing site for Prologue Partners with a mercury-canyon video hero, four layered interactions, seven content sections, and proper baseline SEO/AI-SEO.

**Architecture:** Astro (static output) + Tailwind. Mostly-static HTML/CSS; interaction logic lives in small, pure, unit-tested TypeScript modules wired to the DOM by tiny client scripts (Astro islands only where needed). The hero video is generated with Higgsfield (Veo), slowed in post, and encoded to WebM+MP4 with a poster fallback.

**Tech Stack:** Astro, Tailwind CSS, TypeScript, Vitest, ffmpeg, Higgsfield (Veo 3.1 + Topaz slow-mo), Vercel.

**House rules (from CLAUDE.md + memory):** No em dashes in copy. Unit tests for non-trivial JS in the same commit. Don't over-run tests (once per logical unit). Ceremony matches scope - CSS/section polish is batched, not pseudo-TDD'd. Never touch unrelated git state. Use `frontend-design` for all UI work.

---

## File Structure

```
prologue-partners/
├── astro.config.mjs
├── tailwind.config.ts          # design tokens (color, type, spacing)
├── vitest.config.ts
├── package.json
├── public/
│   ├── hero/
│   │   ├── canyon.webm         # final slowed hero loop (VP9/AV1)
│   │   ├── canyon.mp4          # H.264 fallback
│   │   ├── canyon-mobile.mp4   # lighter mobile encode
│   │   └── canyon-poster.jpg   # poster / reduced-motion frame
│   ├── partners/ (photos)  ·  logos/ (proof logos)
│   ├── og.jpg  ·  llms.txt  ·  robots.txt
├── src/
│   ├── layouts/Base.astro
│   ├── components/
│   │   ├── Seo.astro           # title/meta/OG/JSON-LD
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   └── sections/ (About, Services, Experience, Partners, Process, Contact).astro
│   ├── lib/                    # pure, tested logic
│   │   ├── nav.ts              # active-section resolver
│   │   ├── parallax.ts         # cursor -> transform mapping
│   │   ├── bloom.ts            # scroll progress -> bloom opacity
│   │   ├── glide.ts            # scroll progress -> video time
│   │   ├── ripple-gate.ts      # capability/perf gate
│   │   └── scroll.ts           # smooth-scroll-to-anchor helper
│   ├── scripts/                # tiny DOM-binding islands (use lib/*)
│   ├── content/site.ts         # all copy + service/proof/partner data
│   └── styles/global.css
└── docs/superpowers/{specs,plans}/...
```

Files that change together live together. Each `lib/*` module is one pure function plus types, independently testable. `content/site.ts` centralises copy so sections stay presentational.

---

## Phase 0 - Scaffold

### Task 0.1: Initialise project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `vitest.config.ts`, `tsconfig` (via Astro)

- [ ] **Step 1: Stop the brainstorm server and rename the folder**

```bash
# from the project root
bash .superpowers/brainstorm/*/.. 2>/dev/null; true
/Users/waynempro/.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/skills/brainstorming/scripts/stop-server.sh "$(ls -d .superpowers/brainstorm/*/ | head -1)" || true
cd ".." && mv "Syndicate Consulting" "prologue-partners" && cd "prologue-partners"
```
Note: keep `hero-tests/` and `docs/` - they move with the folder.

- [ ] **Step 2: Scaffold Astro + Tailwind + Vitest**

```bash
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict --yes
npx astro add tailwind --yes
npm i -D vitest @vitest/coverage-v8
npm i @fontsource-variable/fraunces @fontsource-variable/inter
git init && printf "node_modules\ndist\n.astro\n.superpowers/\n.DS_Store\n" > .gitignore
```

- [ ] **Step 3: Add vitest config**

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
export default defineConfig({
  test: { environment: "node", include: ["src/**/*.test.ts"] },
});
```

- [ ] **Step 4: Add the test script to package.json**

Add to `"scripts"`: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 5: Verify the toolchain**

Run: `npm run build` then `npm run test`
Expected: Astro builds an empty site; Vitest reports "No test files found" (exit 0).

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "chore: scaffold Astro + Tailwind + Vitest for Prologue Partners"
```

### Task 0.2: Design tokens and global styles

**Files:**
- Modify: `tailwind.config.ts`
- Create: `src/styles/global.css`

- [ ] **Step 1: Define tokens in Tailwind config**

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{astro,ts,tsx,md}"],
  theme: {
    extend: {
      colors: {
        paper: "#F4F2EE",
        canvas: "#FBFAF8",
        ink: "#14161A",
        slate: "#3A4654",
        mist: "#6B7480",
        gold: "#C99A4B",
        sky: "#C9D2DA",
      },
      fontFamily: {
        display: ["'Fraunces Variable'", "Georgia", "serif"],
        sans: ["'Inter Variable'", "system-ui", "sans-serif"],
      },
      maxWidth: { content: "72rem" },
    },
  },
} satisfies Config;
```

- [ ] **Step 2: Global base styles + font imports + reduced-motion**

```css
/* src/styles/global.css */
@import "@fontsource-variable/fraunces";
@import "@fontsource-variable/inter";
@tailwind base; @tailwind components; @tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; }
  body { @apply bg-paper text-ink font-sans antialiased; }
  h1,h2,h3 { @apply font-display; letter-spacing: -0.01em; }
  ::selection { background: theme(colors.gold); color: theme(colors.canvas); }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 3: Verify** - import `global.css` in a throwaway page, run `npm run build`. Expected: builds clean, fonts resolve.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: design tokens, fonts, and global styles"
```

---

## Phase 1 - Hero media production

### Task 1.1: Produce the final slowed hero loop

This is a media task using the Higgsfield MCP tools and ffmpeg. The validated source frame (Level B, 4K) is `hero-tests/level-B.png` (Higgsfield image job `2bc455c0-3595-484d-af9f-a2f6f2583160`).

- [ ] **Step 1: Regenerate the loop on Veo preview with minimal motion**

Call `generate_video` with `model: "veo3_1"`, `params.model: "veo-3-1-preview"`, `quality: "ultra"`, `duration: 8`, `aspect_ratio: "16:9"`, `medias: [{role:"start_image", value:"2bc455c0-3595-484d-af9f-a2f6f2583160"}]`, prompt emphasising "almost imperceptible motion, the camera barely creeping forward, the mercury surface nearly frozen with only the faintest shimmer, no warping". Poll with `job_status` (sync).

- [ ] **Step 2: Slow it down with optical-flow interpolation**

Call `upscale_video` provider `topaz`, resolution `2160p` on the Veo job to clean it, then slow in post:
```bash
cd public/hero
# stretch 8s -> ~24s with motion-interpolated frames, hold 4K
ffmpeg -i veo-source.mp4 -filter:v "setpts=3.0*PTS,minterpolate=fps=30:mi_mode=mci:mc_mode=aobmc" -an canyon-slow.mp4
```

- [ ] **Step 3: Make it loop seamlessly (crossfade tail into head)**

```bash
ffmpeg -i canyon-slow.mp4 -filter_complex \
 "[0]split[a][b];[b]reverse[r];[a][r]xfade=transition=fade:duration=1.5:offset=22.5" \
 -an canyon-loop.mp4
```

- [ ] **Step 4: Encode web deliverables (WebM + MP4 + mobile + poster)**

```bash
ffmpeg -i canyon-loop.mp4 -c:v libvpx-vp9 -b:v 0 -crf 30 -an canyon.webm
ffmpeg -i canyon-loop.mp4 -c:v libx264 -profile:v high -crf 21 -pix_fmt yuv420p -movflags +faststart -an canyon.mp4
ffmpeg -i canyon-loop.mp4 -vf "scale=1280:-2" -c:v libx264 -crf 24 -movflags +faststart -an canyon-mobile.mp4
ffmpeg -i canyon-loop.mp4 -frames:v 1 -q:v 2 canyon-poster.jpg
```

- [ ] **Step 5: Verify** - `ffprobe` each output; confirm 16:9, no audio track, `canyon.webm` < ~6MB, `canyon.mp4` plays and loops without a visible seam in a browser.

- [ ] **Step 6: Commit**

```bash
git add public/hero && git commit -m "feat: slowed seamless mercury-canyon hero loop (webm/mp4/poster)"
```

---

## Phase 2 - Shell and navigation

### Task 2.1: Base layout + SEO component shell

**Files:**
- Create: `src/layouts/Base.astro`, `src/components/Seo.astro`, `src/content/site.ts`

- [ ] **Step 1: Centralise copy/data in `site.ts`**

```ts
// src/content/site.ts
export const site = {
  name: "Prologue Partners",
  domain: "https://prologue.partners",
  tagline: "Product and growth partners for the zero-to-one stretch.",
  hero: {
    h1: "Every company has a first chapter. We help you write it.",
    sub: "Product and growth partners for the zero-to-one stretch.",
    cta: "Start the conversation",
  },
  nav: [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#experience" },
    { label: "About", href: "#partners" },
    { label: "Contact", href: "#contact" },
  ],
  services: [
    { title: "Product Strategy", outcome: "Decide what to build, and the roadmap to get there." },
    { title: "Growth & GTM", outcome: "Positioning, messaging, and the motion that wins your first customers." },
    { title: "AI Enablement", outcome: "Put AI to work inside your product and your team, practically." },
    { title: "Fractional Leadership", outcome: "An embedded product or growth lead while you build the bench." },
    { title: "Product & Growth Audits", outcome: "A clear read on what is working, what is not, and what to do next." },
  ],
  process: [
    { step: "01", title: "Conversation", body: "We start with your real challenge, not a sales script. The first session is free." },
    { step: "02", title: "Analysis", body: "We go deep on product, team, and data to find the constraint." },
    { step: "03", title: "Execution", body: "Strategy, coaching, or embedded leadership. We help you ship." },
  ],
  contactEmail: "hello@prologue.partners",
} as const;
```

- [ ] **Step 2: Base layout**

```astro
---
// src/layouts/Base.astro
import "../styles/global.css";
import Seo from "../components/Seo.astro";
const { title, description } = Astro.props;
---
<!doctype html><html lang="en"><head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <Seo title={title} description={description} />
</head>
<body><slot /></body></html>
```

- [ ] **Step 3: Verify** - `npm run build`. Expected: clean build.

- [ ] **Step 4: Commit** - `git add -A && git commit -m "feat: base layout and site content model"`

### Task 2.2: Nav with smooth scroll + active-section highlight (TDD)

**Files:**
- Create: `src/lib/nav.ts`, `src/lib/nav.test.ts`, `src/lib/scroll.ts`, `src/components/Nav.astro`, `src/scripts/nav.ts`

- [ ] **Step 1: Write the failing test for the active-section resolver**

```ts
// src/lib/nav.test.ts
import { describe, it, expect } from "vitest";
import { resolveActive } from "./nav";

describe("resolveActive", () => {
  it("returns the id whose top is closest to (but above) the marker line", () => {
    const sections = [
      { id: "hero", top: 0 },
      { id: "services", top: 800 },
      { id: "experience", top: 1600 },
    ];
    expect(resolveActive(sections, 850)).toBe("services");
  });
  it("returns the first section when scrolled above all markers", () => {
    expect(resolveActive([{ id: "hero", top: 0 }, { id: "services", top: 800 }], -10)).toBe("hero");
  });
  it("returns the last section when scrolled past all", () => {
    expect(resolveActive([{ id: "hero", top: 0 }, { id: "services", top: 800 }], 5000)).toBe("services");
  });
});
```

- [ ] **Step 2: Run it - expect FAIL**

Run: `npm run test -- nav`
Expected: FAIL ("resolveActive is not a function").

- [ ] **Step 3: Implement**

```ts
// src/lib/nav.ts
export type SectionPos = { id: string; top: number };
/** The active section is the last one whose top is at or above the scroll marker. */
export function resolveActive(sections: SectionPos[], scrollY: number): string {
  let active = sections[0]?.id ?? "";
  for (const s of sections) { if (scrollY >= s.top) active = s.id; }
  return active;
}
```

- [ ] **Step 4: Run it - expect PASS**

Run: `npm run test -- nav`
Expected: PASS (3 tests).

- [ ] **Step 5: Smooth-scroll helper**

```ts
// src/lib/scroll.ts
export function scrollToAnchor(href: string, reduce: boolean): void {
  const el = document.querySelector(href);
  if (!el) return;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
```

- [ ] **Step 6: Nav component + binding script**

```astro
---
// src/components/Nav.astro
import { site } from "../content/site.ts";
---
<header class="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 text-canvas mix-blend-difference">
  <a href="#hero" class="font-display text-lg font-semibold">Prologue Partners</a>
  <nav class="flex gap-6 text-sm" data-nav>
    {site.nav.map((n) => (
      <a href={n.href} data-link={n.href} class="opacity-80 transition-opacity hover:opacity-100">{n.label}</a>
    ))}
  </nav>
</header>
<script src="../scripts/nav.ts"></script>
```

```ts
// src/scripts/nav.ts
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
```

- [ ] **Step 7: Verify + commit** - `npm run test`, `npm run build`. Then:
```bash
git add -A && git commit -m "feat: nav with smooth anchor scroll and active-section highlight (tested)"
```

---

## Phase 3 - Hero (static baseline)

### Task 3.1: Hero section with video, poster, scrim, copy, CTA

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Build the hero**

```astro
---
// src/components/Hero.astro
import { site } from "../content/site.ts";
---
<section id="hero" class="relative h-[100svh] w-full overflow-hidden bg-ink" data-hero>
  <img src="/hero/canyon-poster.jpg" alt="" aria-hidden="true"
       class="absolute inset-0 h-full w-full scale-105 object-cover" data-hero-poster />
  <video class="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-opacity duration-700"
         autoplay muted loop playsinline preload="auto" poster="/hero/canyon-poster.jpg" data-hero-video>
    <source src="/hero/canyon.webm" type="video/webm" />
    <source src="/hero/canyon.mp4" type="video/mp4" />
  </video>
  <div class="absolute inset-0" data-hero-bloom
       style="background: radial-gradient(60% 50% at 50% 40%, rgba(201,154,75,0) 0%, rgba(201,154,75,0) 100%);"></div>
  <div class="absolute inset-0" style="background: linear-gradient(180deg, rgba(20,22,26,0.25) 0%, rgba(20,22,26,0.05) 45%, rgba(20,22,26,0.55) 100%);"></div>
  <div class="relative z-10 mx-auto flex h-full max-w-content flex-col justify-end px-6 pb-24 text-canvas">
    <h1 class="max-w-3xl text-4xl font-medium leading-[1.08] sm:text-6xl" style="text-shadow:0 2px 30px rgba(0,0,0,0.45)">{site.hero.h1}</h1>
    <p class="mt-5 max-w-xl text-lg opacity-90">{site.hero.sub}</p>
    <a href="#contact" class="mt-8 inline-flex w-fit rounded-full bg-canvas px-7 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.02]">{site.hero.cta}</a>
  </div>
</section>
<script>
  // reveal the video over the poster once it can play; respect reduced motion
  const v = document.querySelector<HTMLVideoElement>("[data-hero-video]");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (v && !reduce) v.addEventListener("canplay", () => { v.style.opacity = "1"; }, { once: true });
  if (reduce && v) v.remove();
</script>
```

- [ ] **Step 2: Compose the page** - create `src/pages/index.astro` rendering `Base > Nav + Hero` (sections added in Phase 5). Run `npm run build && npm run preview`, confirm hero fills viewport, poster shows then video fades in, reduced-motion shows poster only.

- [ ] **Step 3: Commit** - `git add -A && git commit -m "feat: hero section with video, poster fallback, scrim, CTA"`

---

## Phase 4 - Hero interactions (priority order, logic TDD'd)

Each interaction is a pure mapping in `lib/` (unit-tested) plus a tiny binding script. All read `prefers-reduced-motion` and no-op when set.

### Task 4.1: Cursor parallax

**Files:** Create `src/lib/parallax.ts`, `src/lib/parallax.test.ts`, `src/scripts/parallax.ts`

- [ ] **Step 1: Failing test**

```ts
// src/lib/parallax.test.ts
import { describe, it, expect } from "vitest";
import { parallaxOffset } from "./parallax";
describe("parallaxOffset", () => {
  it("is zero at the centre", () => expect(parallaxOffset(0.5, 0.5, 12)).toEqual({ x: 0, y: 0 }));
  it("pushes to max at the corners", () => expect(parallaxOffset(1, 1, 12)).toEqual({ x: 12, y: 12 }));
  it("inverts past centre", () => expect(parallaxOffset(0, 0, 12)).toEqual({ x: -12, y: -12 }));
});
```

- [ ] **Step 2: Run - expect FAIL** (`npm run test -- parallax`).

- [ ] **Step 3: Implement**

```ts
// src/lib/parallax.ts
export function parallaxOffset(nx: number, ny: number, strength: number) {
  return { x: (nx - 0.5) * 2 * strength, y: (ny - 0.5) * 2 * strength };
}
```

- [ ] **Step 4: Run - expect PASS.**

- [ ] **Step 5: Bind it**

```ts
// src/scripts/parallax.ts
import { parallaxOffset } from "../lib/parallax";
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const v = document.querySelector<HTMLElement>("[data-hero-video]");
  addEventListener("pointermove", (e) => {
    if (!v) return;
    const { x, y } = parallaxOffset(e.clientX / innerWidth, e.clientY / innerHeight, 12);
    v.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
  }, { passive: true });
}
```
Add `<script src="../scripts/parallax.ts"></script>` to `Hero.astro`.

- [ ] **Step 6: Verify + commit** - `npm run test`, manual check. `git commit -m "feat: hero cursor parallax (tested)"`

### Task 4.2: Light bloom near CTA

**Files:** Create `src/lib/bloom.ts`, `src/lib/bloom.test.ts`, `src/scripts/bloom.ts`

- [ ] **Step 1: Failing test**

```ts
// src/lib/bloom.test.ts
import { describe, it, expect } from "vitest";
import { bloomOpacity } from "./bloom";
describe("bloomOpacity", () => {
  it("is 0 before the trigger point", () => expect(bloomOpacity(0, 0.6, 1)).toBe(0));
  it("ramps to max at full progress", () => expect(bloomOpacity(1, 0.6, 0.5)).toBeCloseTo(0.5));
  it("is clamped to [0,max]", () => expect(bloomOpacity(2, 0.6, 0.5)).toBe(0.5));
});
```

- [ ] **Step 2: Run - expect FAIL.**

- [ ] **Step 3: Implement**

```ts
// src/lib/bloom.ts
/** progress 0..1 down the page; bloom starts at `start`, eases to `max`. */
export function bloomOpacity(progress: number, start: number, max: number): number {
  if (progress <= start) return 0;
  const t = Math.min(1, (progress - start) / (1 - start));
  return Math.min(max, t * max);
}
```

- [ ] **Step 4: Run - expect PASS.**

- [ ] **Step 5: Bind it**

```ts
// src/scripts/bloom.ts
import { bloomOpacity } from "../lib/bloom";
const bloom = document.querySelector<HTMLElement>("[data-hero-bloom]");
function update() {
  if (!bloom) return;
  const progress = window.scrollY / (document.body.scrollHeight - innerHeight);
  const o = bloomOpacity(progress, 0.6, 0.5);
  bloom.style.background = `radial-gradient(60% 50% at 50% 60%, rgba(201,154,75,${o}) 0%, rgba(201,154,75,0) 70%)`;
}
addEventListener("scroll", update, { passive: true }); update();
```
Add the script tag to `Hero.astro`.

- [ ] **Step 6: Verify + commit** - `git commit -m "feat: hero light bloom toward CTA (tested)"`

### Task 4.3: Scroll-linked glide (the signature)

**Files:** Create `src/lib/glide.ts`, `src/lib/glide.test.ts`, `src/scripts/glide.ts`

- [ ] **Step 1: Failing test**

```ts
// src/lib/glide.test.ts
import { describe, it, expect } from "vitest";
import { glideTime } from "./glide";
describe("glideTime", () => {
  it("maps 0 progress to 0s", () => expect(glideTime(0, 24)).toBe(0));
  it("maps full progress to the clip duration", () => expect(glideTime(1, 24)).toBe(24));
  it("maps mid progress proportionally", () => expect(glideTime(0.25, 24)).toBe(6));
  it("clamps out-of-range progress", () => expect(glideTime(1.5, 24)).toBe(24));
});
```

- [ ] **Step 2: Run - expect FAIL.**

- [ ] **Step 3: Implement**

```ts
// src/lib/glide.ts
/** Map page-scroll progress (0..1) to a target video time in seconds. */
export function glideTime(progress: number, duration: number): number {
  return Math.max(0, Math.min(1, progress)) * duration;
}
```

- [ ] **Step 4: Run - expect PASS.**

- [ ] **Step 5: Bind it (with autoplay->scrub handoff)**

```ts
// src/scripts/glide.ts
import { glideTime } from "../lib/glide";
const v = document.querySelector<HTMLVideoElement>("[data-hero-video]");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (v && !reduce) {
  // Within the hero, scroll scrubs the clip. Pause autoplay once the user scrolls.
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
```
Add the script tag to `Hero.astro`. Note: `canyon.mp4` already encoded with `+faststart` (Task 1.1) for scrub seeking.

- [ ] **Step 6: Verify + commit** - confirm scrolling the hero glides the clip and it stays smooth. `git commit -m "feat: scroll-linked canyon glide (tested)"`

### Task 4.4: Reactive mercury ripples (gated)

**Files:** Create `src/lib/ripple-gate.ts`, `src/lib/ripple-gate.test.ts`, `src/scripts/ripple.ts`

- [ ] **Step 1: Failing test for the capability gate**

```ts
// src/lib/ripple-gate.test.ts
import { describe, it, expect } from "vitest";
import { shouldEnableRipples } from "./ripple-gate";
describe("shouldEnableRipples", () => {
  const base = { reduceMotion: false, coarsePointer: false, hardwareConcurrency: 8, webgl: true };
  it("enabled on a capable desktop", () => expect(shouldEnableRipples(base)).toBe(true));
  it("disabled under reduced motion", () => expect(shouldEnableRipples({ ...base, reduceMotion: true })).toBe(false));
  it("disabled on coarse pointer (touch/mobile)", () => expect(shouldEnableRipples({ ...base, coarsePointer: true })).toBe(false));
  it("disabled on low-core devices", () => expect(shouldEnableRipples({ ...base, hardwareConcurrency: 2 })).toBe(false));
  it("disabled without webgl", () => expect(shouldEnableRipples({ ...base, webgl: false })).toBe(false));
});
```

- [ ] **Step 2: Run - expect FAIL.**

- [ ] **Step 3: Implement**

```ts
// src/lib/ripple-gate.ts
export type Caps = { reduceMotion: boolean; coarsePointer: boolean; hardwareConcurrency: number; webgl: boolean };
export function shouldEnableRipples(c: Caps): boolean {
  return c.webgl && !c.reduceMotion && !c.coarsePointer && c.hardwareConcurrency >= 4;
}
```

- [ ] **Step 4: Run - expect PASS.**

- [ ] **Step 5: Bind it (WebGL displacement over the video)**

```ts
// src/scripts/ripple.ts
import { shouldEnableRipples } from "../lib/ripple-gate";
function caps() {
  const gl = !!document.createElement("canvas").getContext("webgl");
  return { reduceMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    coarsePointer: matchMedia("(pointer: coarse)").matches,
    hardwareConcurrency: navigator.hardwareConcurrency ?? 2, webgl: gl };
}
if (shouldEnableRipples(caps())) {
  import("./ripple-impl").then((m) => m.mountRipples(document.querySelector("[data-hero]")!));
}
```
Then build `src/scripts/ripple-impl.ts` as a lazy-loaded module: a transparent canvas over the hero running a lightweight ripple shader that distorts a copy of the current video frame near the pointer. This is visual/perf work - **invoke `frontend-design`** for the shader and tuning. Hard budget: <2ms/frame on a mid laptop, capped DPR, `cancelAnimationFrame` when the hero leaves the viewport. It is purely additive: if it fails to mount, the plain video remains.

- [ ] **Step 6: Verify + commit** - `npm run test`; manual perf check (DevTools FPS). `git commit -m "feat: gated reactive mercury ripples (tested gate, lazy WebGL)"`

---

## Phase 5 - Content sections

Each section reads from `site.ts`, uses the design tokens, and is built for visual quality with **`frontend-design`** (invoke it per section; do not hand-roll generic markup). Sections are self-contained components so they can graduate to standalone pages later. Batch the visual polish and run `npm run build` once at the end of the phase (test-economy).

### Task 5.1: About / Who we are
- [ ] Create `src/components/sections/About.astro` (`id="about"`). Content: the operator thesis ("We don't give advice we haven't lived."), the zero-to-one focus, fintech/ecommerce/AI. Two-column editorial layout, generous whitespace. Invoke `frontend-design`.

### Task 5.2: Services
- [ ] Create `src/components/sections/Services.astro` (`id="services"`). Render `site.services` as five cards/rows, each `title` + `outcome`. Each card structured so it can later link to its own page. Invoke `frontend-design`.

### Task 5.3: Experience / Proof
- [ ] Create `src/components/sections/Experience.astro` (`id="experience"`). Logo set + outcome-oriented framing. **Blocked on open item:** which companies/results are namable publicly (spec §10) - use a placeholder logo grid + neutral copy until Wayne confirms; leave a clearly-marked TODO comment listing the names to swap in. Invoke `frontend-design`.

### Task 5.4: The Partners
- [ ] Create `src/components/sections/Partners.astro` (`id="partners"`). Wayne + Josh bios, photos, credibility line. Invoke `frontend-design`. (Photos to `public/partners/`.)

### Task 5.5: Process - How we work
- [ ] Create `src/components/sections/Process.astro` (`id="process"`). Render `site.process` as three numbered steps. Invoke `frontend-design`.

### Task 5.6: Contact / Book a call
- [ ] Create `src/components/sections/Contact.astro` (`id="contact"`). Free-first-session framing, `site.contactEmail`, and a simple form or scheduling link (mailto or Cal.com embed - confirm with Wayne; default mailto for v1). Invoke `frontend-design`.

- [ ] **Compose + commit** - add all sections to `index.astro` in order (Hero, About, Services, Experience, Partners, Process, Contact). `npm run build`. `git commit -m "feat: content sections (about, services, experience, partners, process, contact)"`

---

## Phase 6 - SEO / AI-SEO

### Task 6.1: SEO head + JSON-LD schema

**Files:** Modify `src/components/Seo.astro`

- [ ] **Step 1: Implement Seo.astro**

```astro
---
// src/components/Seo.astro
import { site } from "../content/site.ts";
const { title, description } = Astro.props;
const pageTitle = title ?? `${site.name} - ${site.tagline}`;
const desc = description ?? "Operators who take fintech and ecommerce companies from zero to one. Product strategy, growth and GTM, AI enablement, and fractional leadership.";
const schema = {
  "@context": "https://schema.org", "@type": "ProfessionalService",
  name: site.name, url: site.domain, email: site.contactEmail,
  description: desc, areaServed: "Worldwide",
  serviceType: site.services.map((s) => s.title),
  founder: [
    { "@type": "Person", name: "Wayne van Niekerk", jobTitle: "Growth Partner" },
    { "@type": "Person", name: "Josh Stubbs", jobTitle: "Product Partner" },
  ],
};
---
<title>{pageTitle}</title>
<meta name="description" content={desc} />
<link rel="canonical" href={site.domain} />
<meta property="og:title" content={pageTitle} />
<meta property="og:description" content={desc} />
<meta property="og:type" content="website" />
<meta property="og:url" content={site.domain} />
<meta property="og:image" content={`${site.domain}/og.jpg`} />
<meta name="twitter:card" content="summary_large_image" />
<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

- [ ] **Step 2: Verify** - `npm run build`, inspect `dist/index.html` for valid `<title>`, meta, and one JSON-LD block. Validate the JSON-LD with a linter or `JSON.parse`.

- [ ] **Step 3: Add a citable FAQ block** - in a section (e.g. end of Services or Process) add 3-4 Q&A pairs ("What does a fractional head of growth do?", "How do you take a company from zero to one?") and a matching `FAQPage` JSON-LD. Invoke `frontend-design` for layout.

- [ ] **Step 4: Commit** - `git commit -m "feat: SEO head, OG, ProfessionalService + FAQPage schema"`

### Task 6.2: llms.txt, sitemap, robots

- [ ] **Step 1: Add the sitemap integration** - `npx astro add sitemap --yes`; set `site: "https://prologue.partners"` in `astro.config.mjs`.

- [ ] **Step 2: Author `public/llms.txt`**

```
# Prologue Partners
> Product and growth partners who take fintech and ecommerce companies from zero to one.

We are operators (Wayne van Niekerk, growth; Josh Stubbs, product) with 18+ years building in fintech, ecommerce, AI, and Web3 across three continents. We do not give advice we have not lived.

## Services
- Product Strategy: decide what to build and the roadmap to get there.
- Growth & GTM: positioning, messaging, and the motion that wins first customers.
- AI Enablement: put AI to work inside your product and team, practically.
- Fractional Leadership: an embedded product or growth lead.
- Product & Growth Audits: a clear read on what to do next.

## Contact
The first session is free. Email hello@prologue.partners or visit https://prologue.partners
```

- [ ] **Step 3: Author `public/robots.txt`**

```
User-agent: *
Allow: /
Sitemap: https://prologue.partners/sitemap-index.xml
```

- [ ] **Step 4: Verify + commit** - `npm run build`; confirm `dist/sitemap-index.xml`, `llms.txt`, `robots.txt` ship. `git commit -m "feat: llms.txt, sitemap, robots for AI-SEO + crawlers"`

### Task 6.3: Performance pass

- [ ] **Step 1:** Ensure `<img>`/poster use width/height + `loading="lazy"` (except hero poster which is eager). Hero video `preload="auto"` desktop, swap to `canyon-mobile.mp4` + `preload="metadata"` under `(max-width: 640px)` via a `<source media=...>` or matchMedia swap.
- [ ] **Step 2:** Run `npm run build && npm run preview`, then Lighthouse (mobile). Target: LCP < 2.5s, CLS < 0.1, Performance >= 90. Fix regressions (compress hero further if needed).
- [ ] **Step 3: Commit** - `git commit -m "perf: media optimization and Core Web Vitals pass"`

---

## Phase 7 - Deploy

### Task 7.1: Vercel + domain

- [ ] **Step 1:** Push repo to GitHub (new repo, Wayne's personal account). `git remote add origin ...` then push `main`.
- [ ] **Step 2:** Import to Vercel (or `deploy_to_vercel`), framework preset Astro. Confirm preview deploy renders, video plays, interactions work.
- [ ] **Step 3:** Connect `prologue.partners` (once Wayne has purchased it) + redirect `prologuepartners.com`. Set `site` URL.
- [ ] **Step 4:** Final prod smoke test on desktop + mobile (hero, scroll-glide, nav, contact). 

---

## Self-Review

**Spec coverage:** Brand/positioning -> `site.ts` + copy (Task 2.1, 5.x). Visual identity -> tokens (0.2). Hero video + pipeline -> Phase 1. Hero interactions (all four) -> Phase 4.1-4.4. Single-page structure + anchor nav + graduate-to-pages -> Phase 2.2, 5. SEO/AI-SEO (schema, llms.txt, FAQ, perf) -> Phase 6. Stack Astro+Tailwind -> Phase 0. Deploy -> Phase 7. All spec sections mapped.

**Open items carried (spec §10):** final slowed Veo clip (Task 1.1 produces and validates it); namable proof/logos (Task 5.3 placeholder + TODO until Wayne confirms); domain purchase (Task 7.1 gated on Wayne); type lock (default Fraunces in 0.2, revisit in frontend-design); contact mechanism (default mailto, confirm Cal.com).

**Placeholder scan:** the only deliberate placeholder is the Experience logo grid, which is explicitly blocked on Wayne's input and marked with a TODO - not a plan gap.

**Type consistency:** `resolveActive(SectionPos[], number)`, `parallaxOffset(nx,ny,strength)->{x,y}`, `bloomOpacity(progress,start,max)`, `glideTime(progress,duration)`, `shouldEnableRipples(Caps)` are each defined once and consumed by their matching `scripts/*` binder with identical signatures.
