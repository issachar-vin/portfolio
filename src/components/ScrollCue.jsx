import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import useActiveSection from '../hooks/useActiveSection'

const SECTION_ORDER = ['hero', 'about', 'experience', 'skills', 'projects', 'contact']

function getNext(active) {
  const i = SECTION_ORDER.indexOf(active)
  if (i === -1 || i < SECTION_ORDER.length - 1) {
    return { id: SECTION_ORDER[(i + 1) % SECTION_ORDER.length], isEnd: false }
  }
  return { id: 'hero', isEnd: true }
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function ScrollCue() {
  const prefersReduced = useReducedMotion()
  const active = useActiveSection(SECTION_ORDER)
  const { id: nextId, isEnd } = getNext(active)

  // Label shown next to the arrow on non-end sections
  const nextLabel = isEnd ? null : SECTION_ORDER[SECTION_ORDER.indexOf(active) + 1]?.toUpperCase()

  return (
    <AnimatePresence mode="wait">
      <motion.button
        key={active}
        onClick={() => scrollTo(nextId)}
        initial={{ opacity: 0, y: isEnd ? -6 : 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        aria-label={isEnd ? 'Back to top' : `Scroll to ${nextLabel}`}
        style={{
          position: 'fixed',
          bottom: 'clamp(2rem, 5vw, 3.5rem)',
          left: 'clamp(1.5rem, 6vw, 7rem)',
          zIndex: 200,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '0.4rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--phosphor-dim)',
            fontSize: '0.72rem',
            letterSpacing: '0.15em',
          }}
        >
          {isEnd ? 'CLEAR' : `SCROLL — ${nextLabel}`}
        </span>

        {prefersReduced ? (
          <span style={{ color: 'var(--phosphor)', fontSize: '1.1rem' }}>{isEnd ? '↑' : '↓'}</span>
        ) : (
          <motion.span
            style={{ display: 'block', color: 'var(--phosphor)', fontSize: '1.1rem' }}
            animate={isEnd ? { y: [0, -7, 0] } : { y: [0, 7, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {isEnd ? '↑' : '↓'}
          </motion.span>
        )}
      </motion.button>
    </AnimatePresence>
  )
}
