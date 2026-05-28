import { useState, useEffect, useMemo } from 'react'
import { useReducedMotion } from 'framer-motion'

// items: [{ text: string, speed: number }] in display order
// Returns a string[] of the same length — each entry is the current typed state.
export function useTypingSequence(isInView, items) {
  const prefersReduced = useReducedMotion()

  // Memoize by text content so the effect doesn't re-run on every render
  // (items is a new array reference each render since callers define it inline)
  const key = items.map(i => i.text).join('\0')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableItems = useMemo(() => items, [key])

  const [states, setStates] = useState(() => stableItems.map(() => ''))

  useEffect(() => {
    if (!isInView) return

    let cancelled = false

    function run(index) {
      if (cancelled || index >= stableItems.length) return
      const { text, speed } = stableItems[index]
      const isFirst = index === 0
      let i = 0

      function tick() {
        if (cancelled) return
        i++
        setStates(s => s.map((v, j) => {
          if (j === index) return text.slice(0, i)
          // On the first character of the first item, wipe all others clean
          // so a re-entry doesn't flash previously-typed content
          if (isFirst && i === 1) return ''
          return v
        }))
        if (i < text.length) setTimeout(tick, speed)
        else run(index + 1)
      }
      setTimeout(tick, 0)
    }

    run(0)
    return () => { cancelled = true }
  }, [isInView, stableItems])

  // Derived returns — no setState needed for these paths
  if (!isInView) return stableItems.map(() => '')
  if (prefersReduced) return stableItems.map(i => i.text)
  return states
}
