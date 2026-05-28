import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { fadeUp, instant } from '../animations/variants'
import { useTypingSequence } from '../hooks/useTypingSequence'
import { ABOUT } from '../data/copy'
import TerminalWindow from './TerminalWindow'

/* ── Presentational sub-components ──────────────────────────── */
function BioLine({ line, displayedText }) {
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
      <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>{displayedText}</span>
    </p>
  )
}

function FactItem({ label, value, displayedValue }) {
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

/* ── Section ─────────────────────────────────────────────────── */
export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-15%' })
  const prefersReduced = useReducedMotion()
  const upV = prefersReduced ? instant : fadeUp

  // Empty lines are spacers — excluded from the typing sequence
  const bioLines = ABOUT.bio.filter((l) => l !== '')

  const [sectionLabelText, headingText, ...rest] = useTypingSequence(isInView, [
    { text: ABOUT.sectionLabel, speed: 20 },
    { text: ABOUT.heading, speed: 35 },
    ...bioLines.map((l) => ({ text: l, speed: 3 })),
    ...ABOUT.facts.map((f) => ({ text: f.value, speed: 12 })),
  ])

  const bioTexts = rest.slice(0, bioLines.length)
  const factTexts = rest.slice(bioLines.length)

  // Maps each ABOUT.bio index to its position in bioLines (or -1 for spacers)
  let bioIdx = 0
  const bioLineIdxMap = ABOUT.bio.map((line) => (line === '' ? -1 : bioIdx++))

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
            <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>{sectionLabelText}</span>
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
            <span style={{ position: 'absolute', top: 0, left: 'calc(2ch + 0.04em)' }}>{headingText}</span>
          </h2>

          <div role="region" aria-label="Biography">
            {ABOUT.bio.map((line, i) => {
              if (line === '') return <div key={i} style={{ height: '1rem' }} aria-hidden="true" />
              return <BioLine key={i} line={line} displayedText={bioTexts[bioLineIdxMap[i]]} />
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
                displayedValue={factTexts[i]}
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
