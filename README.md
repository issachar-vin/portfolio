# vinajeras.com

Personal portfolio site with a retro CRT terminal aesthetic.

**Live:** https://vinajeras.com

## Stack

- React 19 + Vite
- Framer Motion — spring scroll controller, section animations
- Tailwind CSS v4
- `react-icons` for social icons

## Architecture

| Concern | Location |
|---|---|
| All visible copy | `src/data/copy.js` |
| Framer Motion variants | `src/animations/variants.js` |
| Custom spring scroll | `src/hooks/useScrollController.js` |
| Active section tracking | `src/hooks/useActiveSection.js` |
| CRT canvas effects | `src/components/CRTCanvas.jsx` |

**Section order:** hero → about → experience → skills → projects → contact

Section IDs must match exactly — used by `useActiveSection`, `Footer`, and `useScrollController`.

## Scroll behavior

Desktop uses a custom spring scroll controller (`useScrollController`):
- Accumulates wheel delta; advances to the next section once threshold is reached
- Springs back to the section edge if threshold isn't met
- Free-scrolls within sections whose content overflows the viewport (e.g. Experience)
- Keyboard: `ArrowDown/Up`, `PageDown/Up`

Touch/mobile falls back to CSS `scroll-snap-type: y mandatory`.

## CRT effects

| Effect | Implementation |
|---|---|
| Phosphor ambient + grain + chromatic aberration | `CRTCanvas` rAF loop |
| Scanlines | `.crt-scanlines::after` fixed pseudo-element |
| Vignette (desktop only) | `.crt-vignette::before` fixed pseudo-element |
| Irregular flicker | `@keyframes flicker` on root div (`opacity` only) |
| Glow pulse | `@keyframes glow-pulse` on `.glow-text` |

> **CSS constraint:** never use `filter` or `transform` on the root app div or any ancestor of fixed elements — either property creates a new CSS containing block and breaks `position: fixed` on the canvas, nav, footer, scanlines, and vignette.

## Design tokens

```
--bg:             #07070a
--phosphor:       #e8a020
--phosphor-dim:   #7a4a10
--phosphor-faint: #2a1a06
--font-display:   VT323 (monospace)
--font-body:      Share Tech Mono (monospace)
```

## Commands

```bash
npm run dev        # local dev server
npm run build      # production build
npm run lint       # eslint
npm run format     # prettier --write
```

## Deployment

GitHub Actions → GitHub Pages on push to `main`.
