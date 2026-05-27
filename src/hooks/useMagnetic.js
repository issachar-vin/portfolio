import { useRef, useCallback } from 'react'

/**
 * Magnetic hover effect.
 * Attach { ref, onMouseMove, onMouseLeave } to any element.
 * strength: how far (px) the element shifts toward the cursor.
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef(null)

  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength
      el.style.transform = `translate(${dx}px, ${dy}px)`
    },
    [strength]
  )

  const onMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
