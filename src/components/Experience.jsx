import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { headingReveal, fadeUp, lineContainer, lineItem, instant } from '../animations/variants'
import { EXPERIENCE } from '../data/copy'

function RoleEntry({ role, prefersReduced }) {
  return (
    <motion.div
      variants={prefersReduced ? instant : lineItem}
      style={{
        paddingBottom: '2.5rem',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Company + period */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '0.3rem',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)',
            color: 'var(--phosphor)',
            letterSpacing: '0.04em',
          }}
        >
          {role.company.toUpperCase()}
        </h3>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--phosphor-dim)',
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            whiteSpace: 'nowrap',
          }}
        >
          {role.period}
        </span>
      </div>

      {/* Title */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--phosphor-dim)',
          fontSize: '0.78rem',
          letterSpacing: '0.14em',
          marginBottom: '1.25rem',
        }}
      >
        {role.title.toUpperCase()}
      </p>

      {/* Bullets */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {role.bullets.map((bullet, i) => (
          <li
            key={i}
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--phosphor-dim)',
              fontSize: 'clamp(0.82rem, 1.4vw, 0.9rem)',
              lineHeight: 1.75,
              paddingLeft: '1.4rem',
              position: 'relative',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 0,
                color: 'var(--phosphor-faint)',
              }}
            >
              &gt;
            </span>
            {bullet}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-15%' })
  const prefersReduced = useReducedMotion()

  const headV = prefersReduced ? instant : headingReveal
  const upV = prefersReduced ? instant : fadeUp
  const listV = prefersReduced ? instant : lineContainer

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
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
          {EXPERIENCE.sectionLabel}
        </motion.p>

        {/* Heading */}
        <motion.h2
          id="experience-heading"
          className="glow-text prompt"
          variants={headV}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ marginBottom: '3.5rem' }}
        >
          {EXPERIENCE.heading}
        </motion.h2>

        {/* Role list */}
        <motion.div
          variants={listV}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
        >
          {EXPERIENCE.roles.map((role) => (
            <RoleEntry key={role.id} role={role} prefersReduced={prefersReduced} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
