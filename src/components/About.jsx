import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { lineContainer, lineItem, headingReveal, fadeUp, instant } from '../animations/variants'
import { ABOUT } from '../data/copy'
import TerminalWindow from './TerminalWindow'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-15%' })
  const prefersReduced = useReducedMotion()

  const lineV = prefersReduced ? instant : lineContainer
  const headV = prefersReduced ? instant : headingReveal
  const upV = prefersReduced ? instant : fadeUp

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
          {/* Section label */}
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
            {ABOUT.sectionLabel}
          </motion.p>

          {/* Heading */}
          <motion.h2
            id="about-heading"
            className="glow-text prompt"
            variants={headV}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ marginBottom: '2rem' }}
          >
            {ABOUT.heading}
          </motion.h2>

          {/* Bio */}
          <motion.div
            variants={lineV}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            role="region"
            aria-label="Biography"
          >
            {ABOUT.bio.map((line, i) =>
              line === '' ? (
                <div key={i} style={{ height: '1rem' }} aria-hidden="true" />
              ) : (
                <motion.p
                  key={i}
                  variants={lineItem}
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--phosphor-dim)',
                    fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
                    lineHeight: 1.75,
                  }}
                >
                  {line}
                </motion.p>
              )
            )}
          </motion.div>

          {/* Loaded modules list */}
          <motion.dl
            variants={lineV}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{
              marginTop: '2.5rem',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              columnGap: '1.5rem',
              rowGap: '0.5rem',
            }}
            aria-label="Quick facts"
          >
            {ABOUT.facts.map(({ label, value }) => (
              <motion.div key={label} variants={lineItem} style={{ display: 'contents' }}>
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
                  }}
                >
                  {value}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
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
