import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { lineContainer, lineItem, instant } from '../animations/variants'
import { useTypewriter } from '../hooks/useTypewriter'
import { SKILLS } from '../data/copy'

const S_LABEL = 20
const S_HEADING = 35
const S_CAT = 20

const badgeContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
}

const badgeVariant = {
  hidden: { opacity: 0, y: 6, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: 'easeOut' } },
}

/* ── Badge ───────────────────────────────────────────────────── */
function Badge({ skill }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.span
      variants={badgeVariant}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-body)',
        color: 'var(--phosphor)',
        fontSize: '0.78rem',
        letterSpacing: '0.1em',
        border: `1px solid ${hovered ? 'var(--phosphor)' : 'var(--phosphor-dim)'}`,
        padding: '0.35em 0.85em',
        background: hovered ? 'rgba(232, 160, 32, 0.07)' : 'var(--surface)',
        whiteSpace: 'nowrap',
        cursor: 'default',
        transition: 'border-color 0.15s, background 0.15s, box-shadow 0.15s, text-shadow 0.15s',
        boxShadow: hovered ? '0 0 16px var(--glow), inset 0 0 8px var(--glow)' : 'none',
        textShadow: hovered ? '0 0 8px var(--phosphor)' : 'none',
      }}
    >
      {skill}
    </motion.span>
  )
}

/* ── Category block ──────────────────────────────────────────── */
function CategoryBlock({ category, prefersReduced, isInView, delay }) {
  const fullLabel = `// ${category.label}`
  const label = useTypewriter(fullLabel, isInView, { speed: S_CAT, delay })

  return (
    <motion.div variants={prefersReduced ? instant : lineItem}>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--phosphor-dim)',
          fontSize: '0.7rem',
          letterSpacing: '0.18em',
          marginBottom: '0.75rem',
          position: 'relative',
        }}
      >
        <span aria-hidden="true" style={{ visibility: 'hidden', display: 'block', pointerEvents: 'none' }}>
          {fullLabel}
        </span>
        <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>{label}</span>
      </p>

      {prefersReduced ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {category.skills.map((skill) => (
            <span
              key={skill}
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--phosphor)',
                fontSize: '0.78rem',
                letterSpacing: '0.1em',
                border: '1px solid var(--phosphor-dim)',
                padding: '0.35em 0.85em',
                background: 'var(--surface)',
                whiteSpace: 'nowrap',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <motion.div
          variants={badgeContainer}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
        >
          {category.skills.map((skill) => (
            <Badge key={skill} skill={skill} />
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

/* ── Section ─────────────────────────────────────────────────── */
export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-15%' })
  const prefersReduced = useReducedMotion()

  const listV = prefersReduced ? instant : lineContainer

  // Sequential chain
  let cur = 0
  const labelDelay = cur; cur += SKILLS.sectionLabel.length * S_LABEL
  const headingDelay = cur; cur += SKILLS.heading.length * S_HEADING
  const catDelays = SKILLS.categories.map(({ label }) => {
    const d = cur; cur += `// ${label}`.length * S_CAT; return d
  })

  const sectionLabel = useTypewriter(SKILLS.sectionLabel, isInView, { speed: S_LABEL, delay: labelDelay })
  const heading = useTypewriter(SKILLS.heading, isInView, { speed: S_HEADING, delay: headingDelay })

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      ref={ref}
      style={{ padding: 'clamp(5rem, 12vw, 9rem) clamp(1.5rem, 6vw, 7rem)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
            {SKILLS.sectionLabel}
          </span>
          <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>{sectionLabel}</span>
        </p>

        <h2
          id="skills-heading"
          className="glow-text prompt"
          aria-label={SKILLS.heading}
          style={{ marginBottom: '3.5rem', position: 'relative' }}
        >
          <span aria-hidden="true" style={{ visibility: 'hidden', pointerEvents: 'none' }}>
            {SKILLS.heading}
          </span>
          <span style={{ position: 'absolute', top: 0, left: 'calc(2ch + 0.04em)' }}>{heading}</span>
        </h2>

        <motion.div
          variants={listV}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(2rem, 4vw, 3rem)',
          }}
        >
          {SKILLS.categories.map((cat, i) => (
            <CategoryBlock
              key={cat.label}
              category={cat}
              prefersReduced={prefersReduced}
              isInView={isInView}
              delay={catDelays[i]}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
