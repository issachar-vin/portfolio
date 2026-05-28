import { useEffect, useRef } from 'react'
import { animate, useReducedMotion } from 'framer-motion'

const SECTION_IDS = ['hero', 'about', 'experience', 'skills', 'projects', 'contact']
const NAV_HEIGHT = 56
const FOOTER_HEIGHT = 52
// Scroll delta (px) required to advance to the next section
const THRESHOLD = 300
// How much the page visually drifts before threshold (at section edge)
const RESISTANCE = 0
// Ms of wheel inactivity before springing back to section edge
const IDLE_MS = 140
// Tolerance for "are we at the edge?" check
const EDGE_TOL = 6

function getSectionTargets() {
  return SECTION_IDS.map((id) => {
    const el = document.getElementById(id)
    if (!el) return 0
    return el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT
  })
}

// scrollY at which the section's bottom aligns with the top of the footer
function getSectionEndTarget(el) {
  const docTop = el.getBoundingClientRect().top + window.scrollY
  return docTop + el.offsetHeight - window.innerHeight + FOOTER_HEIGHT
}

function resolveIndex(targets) {
  const probe = window.scrollY + window.innerHeight * 0.35
  let idx = 0
  for (let i = 0; i < targets.length; i++) {
    if (probe >= targets[i]) idx = i
  }
  return idx
}

export function useScrollController() {
  const prefersReduced = useReducedMotion()
  const indexRef = useRef(0)
  const animRef = useRef(null)
  const animatingRef = useRef(false)
  const deltaRef = useRef(0)
  const idleRef = useRef(null)

  useEffect(() => {
    if (prefersReduced) return

    function springTo(target, isSnapBack = false) {
      animRef.current?.stop()
      animatingRef.current = true
      animRef.current = animate(window.scrollY, target, {
        type: 'spring',
        stiffness: isSnapBack ? 380 : 280,
        damping: isSnapBack ? 36 : 30,
        mass: 0.85,
        restDelta: 0.5,
        onUpdate: (v) => window.scrollTo(0, v),
        onComplete: () => {
          window.scrollTo(0, target)
          animatingRef.current = false
        },
      })
    }

    function advance(dir, targets) {
      const next = Math.max(0, Math.min(indexRef.current + dir, targets.length - 1))
      deltaRef.current = 0
      if (next !== indexRef.current) {
        indexRef.current = next
        springTo(targets[next])
      } else {
        springTo(targets[indexRef.current], true)
      }
    }

    function handleWheel(e) {
      e.preventDefault()
      if (animatingRef.current) return

      const targets = getSectionTargets()
      indexRef.current = resolveIndex(targets)

      const el = document.getElementById(SECTION_IDS[indexRef.current])
      if (!el) return

      const sectionTop = targets[indexRef.current]
      const sectionEnd = getSectionEndTarget(el)
      // Section overflows if there is content beyond what fits in the visible viewport
      const sectionOverflows = sectionEnd > sectionTop + EDGE_TOL

      const atTop = window.scrollY <= sectionTop + EDGE_TOL
      const atEnd = window.scrollY >= sectionEnd - EDGE_TOL
      const goingDown = e.deltaY > 0

      if (sectionOverflows) {
        const tryingToLeaveAtTop = atTop && !goingDown
        const tryingToLeaveAtEnd = atEnd && goingDown
        if (!tryingToLeaveAtTop && !tryingToLeaveAtEnd) {
          window.scrollTo(0, window.scrollY + e.deltaY)
          deltaRef.current = 0
          return
        }
      }

      // Threshold gate: accumulate delta, advance or spring back
      clearTimeout(idleRef.current)
      deltaRef.current += e.deltaY

      if (deltaRef.current > THRESHOLD) {
        advance(1, targets)
      } else if (deltaRef.current < -THRESHOLD) {
        advance(-1, targets)
      } else {
        // Resistance nudge while under threshold
        const snapBase = sectionOverflows && goingDown ? sectionEnd : sectionTop
        window.scrollTo(0, snapBase + deltaRef.current * RESISTANCE)

        idleRef.current = setTimeout(() => {
          if (!animatingRef.current) {
            const t = getSectionTargets()
            const elNow = document.getElementById(SECTION_IDS[indexRef.current])
            const base =
              sectionOverflows && goingDown ? getSectionEndTarget(elNow) : t[indexRef.current]
            springTo(base, true)
            deltaRef.current = 0
          }
        }, IDLE_MS)
      }
    }

    let touchY0 = 0
    function handleTouchStart(e) {
      touchY0 = e.touches[0].clientY
    }
    function handleTouchEnd(e) {
      if (animatingRef.current) return
      const diff = touchY0 - e.changedTouches[0].clientY
      const targets = getSectionTargets()
      indexRef.current = resolveIndex(targets)
      if (diff > THRESHOLD * 0.6) {
        advance(1, targets)
      } else if (diff < -THRESHOLD * 0.6) {
        advance(-1, targets)
      } else {
        springTo(targets[indexRef.current], true)
      }
    }

    function handleKeyDown(e) {
      if (animatingRef.current) return
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        const t = getSectionTargets()
        indexRef.current = resolveIndex(t)
        advance(1, t)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        const t = getSectionTargets()
        indexRef.current = resolveIndex(t)
        advance(-1, t)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(idleRef.current)
      animRef.current?.stop()
    }
  }, [prefersReduced])
}
