/**
 * CRTCanvas — animated canvas for phosphor effects and glass appearance.
 *
 * Layers composited each frame (mix-blend-mode: screen):
 *   1. Phosphor ambient     — warm tint that breathes with sin wave
 *   2. Phosphor grain       — noise texture that shuffles every 80ms
 *   3. Chromatic aberration — red/cyan fringe at left/right edges
 *   4. Glass specular       — faint elliptical glare, upper-left
 *   5. Roll band            — slow bright horizontal band sweeping down
 *
 * Scanlines, vignette, and overall flicker live in CSS.
 */
import { useEffect, useRef } from 'react'

export default function CRTCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let frameId
    let lastGrainTime = 0
    // Grain pixels buffered so we only regenerate every 80ms
    let grainPixels = []
    let rollY = Math.random() // start at random position in [0,1)

    function buildGrain(w, h) {
      const count = Math.floor(w * h * 0.005)
      grainPixels = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        a: Math.random() * 0.09 + 0.01,
      }))
    }

    function setSize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      buildGrain(canvas.width, canvas.height)
    }

    setSize()
    window.addEventListener('resize', setSize)

    function draw(timestamp) {
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      // ── 1. Phosphor ambient — breathes slowly ─────────────────
      const pulse = 0.065 + Math.sin(timestamp * 0.0007) * 0.015
      ctx.fillStyle = `rgba(232, 160, 32, ${pulse.toFixed(3)})`
      ctx.fillRect(0, 0, w, h)

      // ── 2. Grain — reshuffle every 80ms ──────────────────────
      if (timestamp - lastGrainTime > 80) {
        lastGrainTime = timestamp
        buildGrain(w, h)
      }
      for (const { x, y, a } of grainPixels) {
        ctx.fillStyle = `rgba(232, 160, 32, ${a.toFixed(3)})`
        ctx.fillRect(x, y, 1, 1)
      }

      // ── 3. Chromatic aberration ───────────────────────────────
      const caLeft = ctx.createLinearGradient(0, 0, w * 0.09, 0)
      caLeft.addColorStop(0, 'rgba(255, 40, 0, 0.10)')
      caLeft.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = caLeft
      ctx.fillRect(0, 0, w * 0.09, h)

      const caRight = ctx.createLinearGradient(w, 0, w * 0.91, 0)
      caRight.addColorStop(0, 'rgba(0, 190, 255, 0.10)')
      caRight.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = caRight
      ctx.fillRect(w * 0.91, 0, w * 0.09, h)

      // ── 4. Glass specular highlight ───────────────────────────
      ctx.save()
      ctx.translate(w * 0.28, h * 0.14)
      ctx.scale(1.8, 1)
      const spec = ctx.createRadialGradient(0, 0, 0, 0, 0, h * 0.28)
      spec.addColorStop(0, 'rgba(255, 252, 238, 0.060)')
      spec.addColorStop(0.45, 'rgba(255, 252, 238, 0.016)')
      spec.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = spec
      ctx.beginPath()
      ctx.arc(0, 0, h * 0.3, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // ── 5. Roll band — slow scan line drifting down ───────────
      // Advances ~0.4px per frame at 60fps ≈ sweeps full height in ~4.5s
      rollY = (rollY + 0.0008) % 1
      const bandCenter = rollY * h
      const bandH = h * 0.18
      const roll = ctx.createLinearGradient(0, bandCenter - bandH, 0, bandCenter + bandH)
      roll.addColorStop(0, 'rgba(232, 160, 32, 0)')
      roll.addColorStop(0.5, 'rgba(232, 160, 32, 0.05)')
      roll.addColorStop(1, 'rgba(232, 160, 32, 0)')
      ctx.fillStyle = roll
      ctx.fillRect(0, bandCenter - bandH, w, bandH * 2)

      // Wrap-around: draw the band again if it spans the bottom edge
      if (bandCenter + bandH > h) {
        const overflow = bandCenter + bandH - h
        const rollWrap = ctx.createLinearGradient(0, -bandH + overflow, 0, overflow)
        rollWrap.addColorStop(0, 'rgba(232, 160, 32, 0)')
        rollWrap.addColorStop(0.5, 'rgba(232, 160, 32, 0.05)')
        rollWrap.addColorStop(1, 'rgba(232, 160, 32, 0)')
        ctx.fillStyle = rollWrap
        ctx.fillRect(0, 0, w, overflow)
      }

      frameId = requestAnimationFrame(draw)
    }

    frameId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', setSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
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
