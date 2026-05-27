import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { headingReveal, fadeUp, instant } from '../animations/variants'
import { SKILLS } from '../data/copy'

/* ── Badge ───────────────────────────────────────────────────── */
function Badge({ label, ariaHidden }) {
  return (
    <span
      aria-hidden={ariaHidden || undefined}
      style={{
        fontFamily: 'var(--font-body)',
        color: 'var(--phosphor)',
        fontSize: '0.78rem',
        letterSpacing: '0.12em',
        border: '1px solid var(--phosphor-dim)',
        padding: '0.38em 0.9em',
        whiteSpace: 'nowrap',
        background: 'var(--surface)',
        flexShrink: 0,
      }}
    >
      {label}
    </span>
  )
}

/* ── Scrolling row ───────────────────────────────────────────── */
function TickerRow({ items, reverse, prefersReduced }) {
  const [paused, setPaused] = useState(false)

  if (prefersReduced) {
    return (
      <div
        role="list"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          padding: '0 clamp(1.5rem, 6vw, 7rem)',
        }}
      >
        {items.map((skill) => (
          <span key={skill} role="listitem">
            <Badge label={skill} />
          </span>
        ))}
      </div>
    )
  }

  // 3 copies → animate by -33.333% (one set width) for seamless loop
  const tripled = [...items, ...items, ...items]

  return (
    <div
      aria-hidden="true"
      style={{
        overflow: 'hidden',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          width: 'max-content',
          animation: `${reverse ? 'ticker-rev' : 'ticker-fwd'} 35s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {tripled.map((skill, i) => (
          <Badge key={`${skill}-${i}`} label={skill} ariaHidden={i >= items.length} />
        ))}
      </div>
    </div>
  )
}

/* ── Section ─────────────────────────────────────────────────── */
export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })
  const prefersReduced = useReducedMotion()

  const headV = prefersReduced ? instant : headingReveal
  const upV = prefersReduced ? instant : fadeUp

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      ref={ref}
      // Vertical padding only — ticker rows are full-bleed
      style={{ padding: 'clamp(5rem, 12vw, 9rem) 0' }}
    >
      {/* Heading — constrained width with side padding */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 6vw, 7rem)',
          marginBottom: '3.5rem',
        }}
      >
        <motion.p
          variants={upV}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--phosphor-dim)',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            marginBottom: '0.75rem',
          }}
        >
          {SKILLS.sectionLabel}
        </motion.p>

        <motion.h2
          id="skills-heading"
          className="glow-text prompt"
          variants={headV}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {SKILLS.heading}
        </motion.h2>
      </div>

      {/* Ticker rows — full viewport width */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {SKILLS.rows.map((row, i) => (
          <TickerRow key={i} items={row} reverse={i % 2 === 1} prefersReduced={prefersReduced} />
        ))}
      </div>
    </section>
  )
}
