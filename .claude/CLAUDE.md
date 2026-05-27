# Portfolio — Project Context

## What this is
Retro CRT terminal-aesthetic portfolio site for Issachar Vinajeras.
Tech: React 18 + Vite + Framer Motion + Tailwind CSS v4.

Live at: https://vinajeras.com
Repo: https://github.com/issachar-vin/portfolio

## Architecture

### All visible copy lives in one file
`src/data/copy.js` — every string on the page is exported from here and
imported by components. Never hardcode text in components.

### Animation variants are centralized
`src/animations/variants.js` — all Framer Motion variant objects live here.
No inline animation props in components.

### Section order
hero → about → experience → skills → projects → contact

Section IDs match exactly: `hero`, `about`, `experience`, `skills`,
`projects`, `contact`. These are used by `useActiveSection`, `Footer`,
and `ScrollCue` — keep them in sync.

### Scroll snap
`html` has `scroll-snap-type: y mandatory`. Every `section` gets
`scroll-snap-align: start; scroll-snap-stop: always; min-height: 100dvh`.
`scroll-padding-top: 56px` (nav height), `scroll-padding-bottom: 52px`
(footer height).

### Fixed chrome
- `Nav` — fixed top, 56px tall, z-index 150
- `Footer` — fixed bottom, 52px tall, z-index 200
  - Left: scroll cue button (shows next section label, "CLEAR ↑" at end)
  - Right: social links + copyright
- `CRTCanvas` — fixed, full viewport, z-index 99, `mix-blend-mode: screen`

### Active section tracking
`src/hooks/useActiveSection.js` — shared by Nav and Footer via
IntersectionObserver, `rootMargin: '-40% 0px -60% 0px'`.

## CSS rules to never break
- **Never use `filter` or `transform` on the root app div or any ancestor
  of fixed elements.** Either property creates a new CSS containing block
  and breaks `position: fixed` on the canvas, nav, footer, scanlines, and
  vignette. The `crt-flicker` animation uses `opacity` only for this reason.
- Scanlines (`.crt-scanlines::after`) and vignette (`.crt-vignette::before`)
  are `position: fixed` pseudo-elements — they live on the root div.

## CRT effects
- **Canvas** (`src/components/CRTCanvas.jsx`): rAF loop — pulsing phosphor
  ambient, dynamic grain (reshuffles every 80ms), chromatic aberration,
  glass specular, slow roll band
- **CSS**: scanlines, vignette, irregular opacity flicker (11s), glow-pulse
  on `.glow-text` (5s breathing)

## Animation conventions
- `useInView(ref, { once: false })` on every section — re-animates on revisit
- Exit transitions are faster than enter (staggerDirection: -1 for lists)
- `prefersReduced ? instant : <variant>` pattern everywhere
- Hero name: character-split stagger via `SplitChars` + `charContainer`
- Hero subtitle: `TypewriterCycle` — 65ms type / 35ms delete / 2500ms pause

## Design tokens (src/index.css)
```
--bg: #07070a
--phosphor: #e8a020
--phosphor-dim: #7a4a10
--phosphor-faint: #2a1a06
--glow: rgba(232, 160, 32, 0.12)
--glow-strong: rgba(232, 160, 32, 0.3)
--border: #2a1a06
--surface: #0d0b09
--font-display: 'VT323', monospace
--font-body: 'Share Tech Mono', monospace
```

## Commands
```
npm run dev      # local dev server
npm run build    # production build
npm run lint     # eslint
npm run format   # prettier --write
```

## Deployment
GitHub Actions → GitHub Pages. Pushes to `main` auto-deploy.

## PR / commit rules
- No Co-Authored-By or Claude attribution in commits or PR descriptions
- Branch prefixes: feat/, fix/, refactor/, chore/, docs/
