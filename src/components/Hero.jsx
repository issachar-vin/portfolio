import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { charContainer, charItem, fadeUp, instant } from '../animations/variants'
import { HERO } from '../data/copy'

/* ── Character-split name ────────────────────────────────────── */
function SplitChars({ text }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <motion.span key={i} variants={charItem} style={{ display: 'inline-block' }}>
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </>
  )
}

/* ── Typewriter cycling title ────────────────────────────────── */
function TypewriterCycle({ phrases }) {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const pausing = !deleting && displayed === phrases[index]

  useEffect(() => {
    const phrase = phrases[index]
    let t

    if (!deleting && displayed.length < phrase.length) {
      t = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 65)
    } else if (!deleting && displayed.length === phrase.length) {
      t = setTimeout(() => setDeleting(true), 2500)
    } else if (deleting && displayed.length > 0) {
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    } else if (deleting && displayed.length === 0) {
      t = setTimeout(() => {
        setDeleting(false)
        setIndex((i) => (i + 1) % phrases.length)
      }, 0)
    }

    return () => clearTimeout(t)
  }, [displayed, deleting, index, phrases])

  return (
    <span>
      {'> '}
      {displayed}
      <span
        className={pausing ? 'blink' : undefined}
        aria-hidden="true"
        style={{ color: 'var(--phosphor)' }}
      >
        _
      </span>
    </span>
  )
}

/* ── Section ─────────────────────────────────────────────────── */
export default function Hero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-10%' })
  const prefersReduced = useReducedMotion()

  const container = prefersReduced ? instant : charContainer
  const up = prefersReduced ? instant : fadeUp

  return (
    <section
      id="hero"
      aria-label="Hero — introduction"
      ref={ref}
      style={{
        minHeight: 'calc(100dvh - 108px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(1.5rem, 3vw, 3rem) clamp(1.5rem, 6vw, 7rem)',
        position: 'relative',
      }}
    >
      {/* Boot line */}
      <motion.p
        variants={up}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--phosphor-dim)',
          fontSize: '0.85rem',
          marginBottom: '1.5rem',
          letterSpacing: '0.12em',
        }}
      >
        {HERO.bootLine}
      </motion.p>

      {/* Name — rewrites on every visit */}
      <motion.h1
        className="glow-text"
        variants={container}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ fontFamily: 'var(--font-display)', lineHeight: 1, marginBottom: '1.2rem' }}
        aria-label={HERO.name.replace(/_/g, ' ')}
      >
        <SplitChars text={HERO.name} />
        <motion.span
          className="blink"
          variants={charItem}
          aria-hidden="true"
          style={{ display: 'inline-block', color: 'var(--phosphor)' }}
        >
          _
        </motion.span>
      </motion.h1>

      {/* Title — cycles through phrases with typewriter effect */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--phosphor-dim)',
          fontSize: 'clamp(0.75rem, 1.8vw, 1rem)',
          letterSpacing: '0.1em',
          marginBottom: '3rem',
          minHeight: '1.6em',
        }}
      >
        {prefersReduced ? (
          `> ${HERO.titleOptions[0]}`
        ) : (
          <TypewriterCycle phrases={HERO.titleOptions} />
        )}
      </p>
    </section>
  )
}
