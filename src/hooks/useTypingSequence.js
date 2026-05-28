import { useState, useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// items: [{ text: string, speed: number }] in display order
// Returns a string[] of the same length — each entry is the current typed state.
export function useTypingSequence(isInView, items) {
  const prefersReduced = useReducedMotion()

  // Stable identity key so the effect doesn't re-run on every render
  // (items is a new array reference each render since it's defined inline)
  const key = items.map(i => i.text).join('\0')

  const stableItems = useRef(items)
  const prevKey = useRef(key)
  if (prevKey.current !== key) {
    prevKey.current = key
    stableItems.current = items
  }

  const [states, setStates] = useState(() =>
    items.map(item => (prefersReduced ? item.text : ''))
  )

  useEffect(() => {
    const seq = stableItems.current
    if (prefersReduced) {
      setStates(seq.map(i => i.text))
      return
    }
    if (!isInView) {
      setStates(seq.map(() => ''))
      return
    }

    let cancelled = false

    function run(index) {
      if (cancelled || index >= seq.length) return
      const { text, speed } = seq[index]
      let i = 0
      function tick() {
        if (cancelled) return
        i++
        setStates(s => s.map((v, j) => (j === index ? text.slice(0, i) : v)))
        if (i < text.length) setTimeout(tick, speed)
        else run(index + 1)
      }
      setTimeout(tick, 0)
    }

    run(0)
    return () => { cancelled = true }
  }, [isInView, prefersReduced, key]) // eslint-disable-line react-hooks/exhaustive-deps

  return states
}
