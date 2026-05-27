import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { headingReveal, fadeUp, lineContainer, lineItem, instant } from '../animations/variants'
import { SKILLS } from '../data/copy'

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
function CategoryBlock({ category, prefersReduced }) {
  return (
    <motion.div variants={prefersReduced ? instant : lineItem}>
      {/* Category label */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--phosphor-dim)',
          fontSize: '0.7rem',
          letterSpacing: '0.18em',
          marginBottom: '0.75rem',
        }}
      >
        {'// '}
        {category.label}
      </p>

      {/* Badges */}
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
  const isInView = useInView(ref, { once: true, margin: '-15%' })
  const prefersReduced = useReducedMotion()

  const headV = prefersReduced ? instant : headingReveal
  const upV = prefersReduced ? instant : fadeUp
  const listV = prefersReduced ? instant : lineContainer

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      ref={ref}
      style={{ padding: 'clamp(5rem, 12vw, 9rem) clamp(1.5rem, 6vw, 7rem)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
          {SKILLS.sectionLabel}
        </motion.p>

        {/* Heading */}
        <motion.h2
          id="skills-heading"
          className="glow-text prompt"
          variants={headV}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ marginBottom: '3.5rem' }}
        >
          {SKILLS.heading}
        </motion.h2>

        {/* Category grid */}
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
          {SKILLS.categories.map((cat) => (
            <CategoryBlock key={cat.label} category={cat} prefersReduced={prefersReduced} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
