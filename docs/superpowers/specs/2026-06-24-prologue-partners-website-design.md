# Prologue Partners - Website Design Spec

Date: 2026-06-24
Status: Draft for review
Owner: Wayne van Niekerk (with Josh Stubbs)

## 1. What we're building

A single-page, cinematic marketing site for **Prologue Partners**, a product and growth advisory that takes companies from zero to one. The site's two jobs: land a genuine "wow" on arrival, and be found and cited (baseline SEO + AI-SEO) so it generates inbound leads. It is built as self-contained sections with anchor-scroll navigation, structured so any section can later graduate into its own page without a redesign.

## 2. Brand foundation

- **Name:** Prologue Partners. Chosen over "The Syndicate" (placeholder, crypto-adjacent baggage) for its "first chapter / beginning of the story" meaning, which maps directly onto zero-to-one work and supports content/brand storytelling.
- **Domain:** `prologue.partners` (the `.partners` TLD doubles as the descriptor). Available ~$14/yr first year (renewal ~$25-40/yr). Recommend buying via Porkbun or Cloudflare Registrar; defensively grab `prologuepartners.com` to redirect. GoDaddy avoided.
- **Positioning:** Product and growth partners for the zero-to-one stretch. Operators who have built, not advisors reciting theory ("we don't give advice we haven't lived").
- **Verticals (lead with, not limited to):** fintech and ecommerce. AI enablement is a named service line. Crypto/Web3 experience is proof of operating in hard, fast markets, **not** a headline (deliberately positioning away from crypto).
- **Market:** Global / remote-first, with South Africa as the warm home base. SEO is content/intent and AI-citation driven, not geo-anchored.
- **Founders:** Wayne van Niekerk (growth) and Josh Stubbs (product). Combined 18+ years across fintech, Web3, ecommerce, logistics, on three continents.
- **Voice:** Smart-person-to-smart-person. Warm, confident, no corporate filler. Plain English first, jargon in brackets. No em dashes.

## 3. Visual identity

Direction: **cinematic impact with editorial restraint** ("C with a touch of A"). The hero carries the drama; the rest of the page is calm, premium, generous whitespace, editorial typography.

**Palette** (derived from the chosen hero footage - white stone, mercury, warm first-light):
- Paper / background: `#F4F2EE` (off-white), `#FBFAF8` (canvas)
- Ink / primary text: `#14161A` (cool near-black)
- Slate / secondary text: `#3A4654`
- Mist / muted: `#6B7480`
- Warm first-light accent (sparingly, for CTAs/links): `#C99A4B`
- Cool sky reflection (optional tints/dividers): `#C9D2DA`

**Type** (default; final pass via frontend-design):
- Display / headlines: an editorial serif - **Fraunces** (literary, optical sizing, characterful) or Spectral as a calmer alternative.
- Body / UI: a clean grotesque sans - **Inter** (or General Sans).
- One serif for display only; sans for everything else.

**Motion principles:** restrained and intentional. Smooth anchor-scroll, gentle fades/reveals on scroll, subtle hover lifts. Nothing bouncy or theatrical. Respect `prefers-reduced-motion` everywhere.

## 4. The hero (the wow)

**Concept:** "Liquid on soft limestone canals," refined to a **mercury river in a white stone slot canyon**, shot at water level, walls towering on both sides, the mirror-still surface throwing a near-symmetrical reflection, with warm first-light glowing at the far end (the path forward / zero-to-one).

**Production pipeline (validated this session):**
1. Still frame generated with `nano_banana_pro`, low/level water-line angle (chosen: "Level B" with warm light at the canyon end).
2. Upscaled to 4K (`upscale_image`, bytedance).
3. Image-to-video from the 4K frame. Head-to-head tested Seedance 2.0 vs Veo 3.1; **Veo 3.1 won** on realism. Re-run on the Veo "preview" (max-fidelity) variant with a near-imperceptible drift prompt.
4. **Slow it down a lot.** The motion must read as barely-moving and hypnotic. Achieve via (a) minimal-motion prompt on regen, and/or (b) optical-flow slow-mo (Topaz) to stretch the clip to ~20s+ while staying smooth. Then subtle film grain, seamless loop, encode high-bitrate **WebM (VP9/AV1) + MP4 (H.264)**.

**Web implementation (pattern proven on Snowball, quality bar raised):**
- Full-bleed `<video>`: `autoplay muted loop playsInline preload="auto"`, `object-fit: cover`, with `poster` frame.
- `prefers-reduced-motion`: swap video for the static poster image (no autoplay).
- Mobile: lighter-weight encode or poster-only fallback to protect data/battery and LCP.
- Left/bottom-weighted scrim gradient so the headline stays legible.
- Crispness safeguards: high source resolution, high bitrate (avoid Snowball's softness), minimal/zero upscale-stretch, optional fine grain for a filmic finish.

**Interactivity - REVISED 2026-06-24: none.** The four-effect stack (parallax, bloom, scroll-glide, ripples) was built then removed: stacked together they overdid it and read as gimmickry, which undercuts a premium advisory. Decision: the footage carries the hero. No cursor-reactive effects, no scroll-scrub. The clip is slowed to a near-imperceptible drift (2.8x) and simply autoplays/loops. Only behaviour retained: fade the video in over its poster on `canplay`, and swap to the static poster under `prefers-reduced-motion`. Scroll-glide is the one effect worth reconsidering later if the hero ever needs more, but ship clean first.

**Hero copy (working):** H1 "Every company has a first chapter. We help you write it." Sub: "Product and growth partners for the zero-to-one stretch." CTA: "Start the conversation" (free first session).

## 5. Site architecture

Single page, anchor-nav smooth scroll. Sticky minimal nav: wordmark left; Services / Work / About / Contact right; clicking auto-scrolls to the section. Forward-compatible: each section is a self-contained component that can become its own route later, at which point the nav flips from anchors to real links.

Section order:
1. **Hero** - video + H1 + sub + primary CTA.
2. **About / Who we are** - the operator thesis ("we don't give advice we haven't lived"), the zero-to-one focus, fintech/ecommerce/AI.
3. **Services** - Product Strategy, Growth & GTM, AI Enablement, Fractional Leadership, Product & Growth Audits. Each as a card/block with a clear outcome line (written to double as future standalone-page seeds).
4. **Experience / Proof** - logos and what they've built (Wayflyer, Back Market, Fuel Labs, Microverse, etc.), with outcome-oriented framing. Anonymised results where public case studies don't yet exist.
5. **The Partners** - Wayne and Josh bios, credibility, photos.
6. **Process - How we work** - 3 steps: (1) conversation about the challenge, (2) deep analysis of product/team/data, (3) execution (strategy, coaching, or embedded leadership).
7. **Contact / Book a call** - free first session, simple form or scheduling link, email.

## 6. SEO + AI-SEO (baseline, done properly)

- Semantic, single clean `<h1>` (hero) and well-ordered section headings.
- Strong `<title>`, meta description, Open Graph / Twitter cards, canonical.
- Structured data: `Organization` + `ProfessionalService`, `Person` for each founder, `FAQPage` for a Q&A block, `BreadcrumbList` when pages are added.
- `llms.txt` describing the firm, services, and who to contact, for AI assistants.
- Q&A-style content blocks ("What does a fractional head of growth do?", "How do you take a company from zero to one?") written to be directly AI-citable.
- Performance as SEO: Astro's near-zero JS, optimized hero media, fast LCP, clean CLS. Sitemap + robots.
- Accessibility baseline (WCAG AA contrast, focus states, reduced-motion) - also helps SEO.

**Acknowledged tradeoff:** a one-pager caps how many queries we can rank for (one URL/H1/topic). Accepted for v1 in favour of the premium single-page experience; the graduate-to-pages structure preserves the option to expand ranking surface later. Blog/Insights explicitly deferred.

## 7. Tech stack & build

- **Astro + Tailwind.** Static output, JS islands only where needed (nav scroll behaviour, scroll-reveal motion, contact form).
- Deploy on **Vercel** (or static host). Buy/connect `prologue.partners`.
- Repo: new git repo for the project (init at build start). Standard branch workflow.
- Unit tests for any non-trivial JS (e.g., scroll/nav logic) per house rule; CSS/section polish batched.
- Assets: hero video (WebM + MP4 + poster), founder photos, partner-logo set.

## 8. Out of scope for v1 (future)

- Blog / Insights engine (deferred; can seed 3-5 cornerstone pillar pieces later).
- Individual service/landing pages (sections graduate when we chase rankings).
- CMS, case-study detail pages, multi-language.

## 9. Success criteria

- Lands with a genuine "wow" - the mercury-canyon hero reads as real, crisp, and clean (Wayne's bar).
- Loads fast (strong Core Web Vitals) on desktop and mobile, video included.
- Clear single conversion path: "Start the conversation" / book a free first session.
- Baseline SEO + AI-SEO complete: schema, llms.txt, metadata, performance, citable Q&A.
- Structurally ready to add pages and switch nav without rework.

## 10. Open items

- **Hero loop:** Veo chosen. Re-run on "preview" variant + slow dramatically (regen minimal-motion and/or Topaz slow-mo). Validate the slowed clip before lock.
- **Interactive mix:** resolved - all four, built in priority order under a perf budget (ripples gated/mobile-fallback). See §4.
- **Type lock:** Fraunces vs Spectral for display; confirm in frontend-design pass.
- **Proof/logos:** confirm which companies and results we can name publicly.
- **Folder/repo name:** project folder currently "Syndicate Consulting"; rename to "Prologue Partners" at build start.
- **Domain purchase:** Wayne to buy `prologue.partners` (+ defensive `.com`).
