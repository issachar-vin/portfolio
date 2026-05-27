/**
 * CRTCanvas — single-draw canvas for phosphor effects and glass appearance.
 *
 * Layers painted (all on one canvas, mix-blend-mode: screen):
 *   1. Phosphor ambient fill   — flat warm tint across the screen
 *   2. Phosphor grain          — static noise simulating phosphor texture
 *   3. Chromatic aberration    — red fringe left edge, cyan fringe right edge
 *   4. Glass specular          — faint elliptical glare, upper-left area
 *
 * Scanlines and vignette live in CSS. No animation loop.
 */
export default function CRTCanvas() {
  return (
    <canvas
      aria-hidden="true"
      ref={(canvas) => {
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        const w = (canvas.width = window.innerWidth)
        const h = (canvas.height = window.innerHeight)

        // ── 1. Phosphor ambient fill ──────────────────────────
        ctx.fillStyle = 'rgba(232, 160, 32, 0.07)'
        ctx.fillRect(0, 0, w, h)

        // ── 2. Phosphor grain ─────────────────────────────────
        for (let i = 0; i < w * h * 0.005; i++) {
          const x = Math.random() * w
          const y = Math.random() * h
          const a = Math.random() * 0.08 + 0.01
          ctx.fillStyle = `rgba(232, 160, 32, ${a})`
          ctx.fillRect(x, y, 1, 1)
        }

        // ── 3. Chromatic aberration ───────────────────────────
        // Lateral colour fringe: red bleeds in from the left edge,
        // cyan from the right. screen blend tints the underlying
        // content, simulating RGB channel misalignment at the lens edge.
        const caLeft = ctx.createLinearGradient(0, 0, w * 0.09, 0)
        caLeft.addColorStop(0, 'rgba(255, 40, 0, 0.10)')
        caLeft.addColorStop(1, 'rgba(0,   0, 0, 0)')
        ctx.fillStyle = caLeft
        ctx.fillRect(0, 0, w * 0.09, h)

        const caRight = ctx.createLinearGradient(w, 0, w * 0.91, 0)
        caRight.addColorStop(0, 'rgba(0, 190, 255, 0.10)')
        caRight.addColorStop(1, 'rgba(0,   0,   0, 0)')
        ctx.fillStyle = caRight
        ctx.fillRect(w * 0.91, 0, w * 0.09, h)

        // ── 4. Glass specular highlight ───────────────────────
        // Diffuse elliptical glare in the upper-left quadrant —
        // simulates light bouncing off the curved convex glass surface.
        // scale(1.8, 1) stretches the circle into a wide ellipse.
        ctx.save()
        ctx.translate(w * 0.28, h * 0.14)
        ctx.scale(1.8, 1)
        const spec = ctx.createRadialGradient(0, 0, 0, 0, 0, h * 0.28)
        spec.addColorStop(0, 'rgba(255, 252, 238, 0.060)')
        spec.addColorStop(0.45, 'rgba(255, 252, 238, 0.016)')
        spec.addColorStop(1, 'rgba(0,   0,   0,   0)')
        ctx.fillStyle = spec
        ctx.beginPath()
        ctx.arc(0, 0, h * 0.3, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99,
        mixBlendMode: 'screen',
      }}
    />
  )
}
