import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { useTypewriter } from '../hooks/useTypewriter'
import { EXPERIENCE } from '../data/copy'

const S_LABEL = 20
const S_HEADING = 35
const S_NAME = 20
const S_SHORT = 12
const S_BODY = 3

function BulletLine({ text, isInView, delay }) {
  const displayed = useTypewriter(text, isInView, { speed: S_BODY, delay })
  return (
    <li
      style={{
        fontFamily: 'var(--font-body)',
        color: 'var(--phosphor-dim)',
        fontSize: 'clamp(0.82rem, 1.4vw, 0.9rem)',
        lineHeight: 1.75,
        paddingLeft: '1.4rem',
        position: 'relative',
      }}
    >
      <span aria-hidden="true" style={{ position: 'absolute', left: 0, color: 'var(--phosphor-faint)' }}>
        &gt;
      </span>
      <span style={{ position: 'relative', display: 'block' }}>
        <span aria-hidden="true" style={{ visibility: 'hidden', display: 'block', pointerEvents: 'none' }}>
          {text}
        </span>
        <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>{displayed}</span>
      </span>
    </li>
  )
}

function RoleEntry({ role, isInView, companyDelay, periodDelay, titleDelay, bulletDelays }) {
  const company = useTypewriter(role.company.toUpperCase(), isInView, { speed: S_NAME, delay: companyDelay })
  const period = useTypewriter(role.period, isInView, { speed: S_SHORT, delay: periodDelay })
  const title = useTypewriter(role.title.toUpperCase(), isInView, { speed: S_SHORT, delay: titleDelay })

  return (
    <div style={{ paddingBottom: '2.5rem', borderBottom: '1px solid var(--border)' }}>
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
            position: 'relative',
          }}
        >
          <span aria-hidden="true" style={{ visibility: 'hidden', display: 'block', pointerEvents: 'none' }}>
            {role.company.toUpperCase()}
          </span>
          <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>{company}</span>
        </h3>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--phosphor-dim)',
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            position: 'relative',
            display: 'inline-block',
          }}
        >
          <span aria-hidden="true" style={{ visibility: 'hidden', display: 'block', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
            {role.period}
          </span>
          <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>{period}</span>
        </span>
      </div>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--phosphor-dim)',
          fontSize: '0.78rem',
          letterSpacing: '0.14em',
          marginBottom: '1.25rem',
          position: 'relative',
        }}
      >
        <span aria-hidden="true" style={{ visibility: 'hidden', display: 'block', pointerEvents: 'none' }}>
          {role.title.toUpperCase()}
        </span>
        <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>{title}</span>
      </p>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {role.bullets.map((bullet, j) => (
          <BulletLine key={j} text={bullet} isInView={isInView} delay={bulletDelays[j]} />
        ))}
      </ul>
    </div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-15%' })

  // Sequential chain: cumulative delay per item
  let cur = 0
  const labelDelay = cur; cur += EXPERIENCE.sectionLabel.length * S_LABEL
  const headingDelay = cur; cur += EXPERIENCE.heading.length * S_HEADING

  const roleChains = EXPERIENCE.roles.map((role) => {
    const companyDelay = cur; cur += role.company.toUpperCase().length * S_NAME
    const periodDelay = cur; cur += role.period.length * S_SHORT
    const titleDelay = cur; cur += role.title.toUpperCase().length * S_SHORT
    const bulletDelays = role.bullets.map((bullet) => {
      const d = cur; cur += bullet.length * S_BODY; return d
    })
    return { companyDelay, periodDelay, titleDelay, bulletDelays }
  })

  const sectionLabel = useTypewriter(EXPERIENCE.sectionLabel, isInView, { speed: S_LABEL, delay: labelDelay })
  const heading = useTypewriter(EXPERIENCE.heading, isInView, { speed: S_HEADING, delay: headingDelay })

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
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
            {EXPERIENCE.sectionLabel}
          </span>
          <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>{sectionLabel}</span>
        </p>

        <h2
          id="experience-heading"
          className="glow-text prompt"
          aria-label={EXPERIENCE.heading}
          style={{ marginBottom: '3.5rem', position: 'relative' }}
        >
          <span aria-hidden="true" style={{ visibility: 'hidden', pointerEvents: 'none' }}>
            {EXPERIENCE.heading}
          </span>
          <span style={{ position: 'absolute', top: 0, left: 'calc(2ch + 0.04em)' }}>{heading}</span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {EXPERIENCE.roles.map((role, i) => (
            <RoleEntry key={role.id} role={role} isInView={isInView} {...roleChains[i]} />
          ))}
        </div>
      </div>
    </section>
  )
}
