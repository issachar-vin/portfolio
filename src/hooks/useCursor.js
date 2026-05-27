import { useEffect } from 'react'

/**
 * Moves the .cursor element to follow the mouse.
 * The cursor element must already be in the DOM.
 */
export function useCursor() {
  useEffect(() => {
    const cursor = document.querySelector('.cursor')
    if (!cursor) return

    const move = (e) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
}
