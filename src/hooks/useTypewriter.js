import { useState, useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

export function useTypewriter(text, isInView, { speed = 30, delay = 0 } = {}) {
  const prefersReduced = useReducedMotion()
  const [displayed, setDisplayed] = useState(prefersReduced ? text : '')
  const timerRef = useRef(null)

  useEffect(() => {
    clearTimeout(timerRef.current)

    if (prefersReduced) {
      setDisplayed(text)
      return
    }

    if (!isInView) {
      setDisplayed('')
      return
    }

    let i = 0
    const tick = () => {
      i++
      setDisplayed(text.slice(0, i))
      if (i < text.length) {
        timerRef.current = setTimeout(tick, speed)
      }
    }

    timerRef.current = setTimeout(tick, delay)
    return () => clearTimeout(timerRef.current)
  }, [isInView, text, speed, delay, prefersReduced])

  return displayed
}
