import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { fadeUp, instant } from '../animations/variants'
import { useTypewriter } from '../hooks/useTypewriter'
import { ABOUT } from '../data/copy'
import TerminalWindow from './TerminalWindow'

const S_LABEL = 20
const S_HEADING = 35
const S_BODY = 3
const S_FACT = 12

function BioLine({ line, isInView, delay }) {
  const text = useTypewriter(line, isInView, { speed: S_BODY, delay })
  return (
    <p
      style={{
        fontFamily: 'var(--font-body)',
        color: 'var(--phosphor-dim)',
        fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
        lineHeight: 1.75,
        position: 'relative',
      }}
    >
      <span aria-hidden="true" style={{ visibility: 'hidden', display: 'block', pointerEvents: 'none' }}>
        {line}
      </span>
      <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>{text}</span>
    </p>
  )
}

function FactItem({ label, value, isInView, delay }) {
  const displayedValue = useTypewriter(value, isInView, { speed: S_FACT, delay })
  return (
    <div style={{ display: 'contents' }}>
      <dt
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--phosphor-dim)',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          paddingTop: '0.1em',
        }}
      >
        {label}
      </dt>
      <dd
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--phosphor)',
          fontSize: '0.85rem',
          borderLeft: '1px solid var(--border)',
          paddingLeft: '1rem',
          position: 'relative',
        }}
      >
        <span aria-hidden="true" style={{ visibility: 'hidden', display: 'block', pointerEvents: 'none' }}>
          {value}
        </span>
        <span style={{ position: 'absolute', top: 0, left: '1rem', right: 0 }}>{displayedValue}</span>
      </dd>
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-15%' })
  const prefersReduced = useReducedMotion()
  const upV = prefersReduced ? instant : fadeUp

  // Sequential chain: each item starts when the previous finishes
  let cur = 0
  const labelDelay = cur; cur += ABOUT.sectionLabel.length * S_LABEL
  const headingDelay = cur; cur += ABOUT.heading.length * S_HEADING
  const bioLineDelays = ABOUT.bio.map((line) => {
    if (line === '') return null
    const d = cur; cur += line.length * S_BODY; return d
  })
  const factValueDelays = ABOUT.facts.map(({ value }) => {
    const d = cur; cur += value.length * S_FACT; return d
  })

  const sectionLabel = useTypewriter(ABOUT.sectionLabel, isInView, { speed: S_LABEL, delay: labelDelay })
  const heading = useTypewriter(ABOUT.heading, isInView, { speed: S_HEADING, delay: headingDelay })

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      ref={ref}
      style={{ padding: 'clamp(5rem, 12vw, 9rem) clamp(1.5rem, 6vw, 7rem)' }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(3rem, 6vw, 5rem)',
          alignItems: 'start',
        }}
      >
        {/* ── Left: text ── */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--phosphor-dim)',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              marginBottom: '0.75rem',
              position: 'relative',
            }}
          >
            <span aria-hidden="true" style={{ visibility: 'hidden', display: 'block', pointerEvents: 'none' }}>
              {ABOUT.sectionLabel}
            </span>
            <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>{sectionLabel}</span>
          </p>

          <h2
            id="about-heading"
            className="glow-text prompt"
            aria-label={ABOUT.heading}
            style={{ marginBottom: '2rem', position: 'relative' }}
          >
            <span aria-hidden="true" style={{ visibility: 'hidden', pointerEvents: 'none' }}>
              {ABOUT.heading}
            </span>
            <span style={{ position: 'absolute', top: 0, left: 'calc(2ch + 0.04em)' }}>{heading}</span>
          </h2>

          <div role="region" aria-label="Biography">
            {ABOUT.bio.map((line, i) => {
              if (line === '') return <div key={i} style={{ height: '1rem' }} aria-hidden="true" />
              return <BioLine key={i} line={line} isInView={isInView} delay={bioLineDelays[i]} />
            })}
          </div>

          <dl
            style={{
              marginTop: '2.5rem',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              columnGap: '1.5rem',
              rowGap: '0.5rem',
            }}
            aria-label="Quick facts"
          >
            {ABOUT.facts.map(({ label, value }, i) => (
              <FactItem
                key={label}
                label={label}
                value={value}
                isInView={isInView}
                delay={factValueDelays[i]}
              />
            ))}
          </dl>
        </div>

        {/* ── Right: animated terminal ── */}
        <motion.div
          variants={upV}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.2 }}
        >
          <TerminalWindow />
        </motion.div>
      </div>
    </section>
  )
}
