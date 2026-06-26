# Latest (2026-06-26)

## What this is
**Prologue Partners** marketing site — full rebuild from Astro to **React 19 + Vite + Tailwind v4 + Motion (motion.dev) + Lenis**, prerendered with **vite-react-ssg**. Single scroll page. Prologue is Wayne + Josh Stubbs' zero-to-one product+growth advisory (separate from OLC/Silhouette/SillySwap; anti-crypto positioning).

## State
- All work is on branch **`react-rebuild`**, committed (`f888023`) and **pushed** to `github.com/Mcstooble/the-syndicate` (remote `origin`). `main` and the live GitHub Pages site are **untouched** — do not overwrite them without Wayne asking.
- Verified green: `npx tsc --noEmit` clean, `npm test` 5/5, `npm run build` prerenders all section copy + JSON-LD into `dist/index.html`.
- Dev server: `npm run dev` (Vite, http://localhost:5173/). Build: `npm run build` (vite-react-ssg → `dist/`). Astro is gone.

## Design = "Manuscript" direction (Wayne chose this; brand-evolution pass done)
- Reference was a fullscreen-video-hero template ("Foldcraft" from motionsites.ai). Wayne wanted its *design execution*, Prologue's content. Then explicitly reset all brand (no canyon video, no Fraunces, no gold) and picked the **Manuscript** territory: editorial/literary, derived from the name.
- Palette in `src/styles/global.css` (`@theme`, OKLCH): cool **paper** body, near-black **ink**, fountain-pen **indigo accent**, **night** (dark hero). NOT black+gold (that was rejected as the fintech cliché).
- Type: **Newsreader** serif (display) + **Geist** sans (body), loaded via Google Fonts in `index.html`. Serif italic indigo for accent phrases (*first chapter*, *haven't lived*).
- Hero video: **indigo ink blooming in water** (Higgsfield `kling3_0_turbo`, on-concept "writing"). Processed to seamless boomerang loop → `public/hero/hero-bg.{mp4,webm}` + `-mobile.mp4` + `hero-poster.jpg`. Old canyon assets deleted.

## Motion (the "wow" — all reduced-motion safe, LazyMotion strict so use `m.*` not `motion.*`)
- `ui/MaskLines.tsx` — headline lines wipe up from behind a mask ("type-setting").
- `Hero.tsx` — scroll-linked parallax (`useScroll`/`useTransform`): video drifts+scales, content fades.
- `lib/useSmoothScroll.ts` — Lenis inertial scroll + hash-anchor handling (offset -80 for fixed nav).
- `Services.tsx` — hairline rules draw across (scaleX) on scroll-in.
- `ui/Magnetic.tsx` — CTA leans toward cursor (pointer-fine only).
- `Nav.tsx` — adaptive: transparent/white over hero → paper bar + ink text once scrolled; active-link via `lib/useActiveSection.ts` (`resolveActive` is unit-tested).
- Killed AI scaffolding: removed per-section eyebrows and decorative 01–05 numbers (kept 01/02/03 only on Process). Experience uses an honest typographic sector row, not fake logo boxes.

## Key gotcha fixed (watch for regressions)
The reference's `* { margin:0; padding:0 }` reset was **unlayered** and silently overrode ALL Tailwind padding/margin utilities sitewide. Removed it — Tailwind v4 Preflight handles resets. Do not reintroduce a blanket unlayered reset.

## Open / next
- Wayne: "in a good place," will give feedback later. Likely tweaks: ink could go bolder, indigo can shift warmer/cooler (edit `--color-accent`/`--color-accent-soft` in `global.css`).
- **Deploy story unresolved:** it's now an SSG app needing `npm run build`; current GitHub Pages won't serve it as-is. Offer a Pages Action or Vercel when asked.
- `og.jpg` social card still missing (referenced nowhere yet; flag before launch).
- Not merged to `main` / no PR opened. PR link: https://github.com/Mcstooble/the-syndicate/pull/new/react-rebuild
- Higgsfield: ~358 credits before this session, used ~30 (3 video gens). Bearer/keys in env, not here.

## Suggested skills
- `impeccable` (loaded this session — for further visual iteration; `live` mode for in-browser variants)
- `frontend-design` (UI work — Wayne's standing rule)
- `video` + Higgsfield MCP (regenerate/iterate the hero clip)
- `verify` / browser screenshots (Playwright is cached at `~/.npm/_npx/.../playwright-core`, headless-shell at `~/Library/Caches/ms-playwright/chromium_headless_shell-1200/...`; load video autoplay note: headless shows poster only)

## Verify visually
Screenshots this session via Playwright against `localhost:5173`. NOTE: reading many images into the conversation caused recurring "image could not be processed" API errors late in the session — capture sparingly, downscale to <1400px (`sips -Z 1400`), and read one at a time.
