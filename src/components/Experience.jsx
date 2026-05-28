import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { useTypingSequence } from '../hooks/useTypingSequence'
import { EXPERIENCE } from '../data/copy'

/* ── Presentational sub-components ──────────────────────────── */
function BulletLine({ text, displayedText }) {
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
        <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>{displayedText}</span>
      </span>
    </li>
  )
}

function RoleEntry({ role, companyText, periodText, titleText, bulletTexts }) {
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
          <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>{companyText}</span>
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
          <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>{periodText}</span>
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
        <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>{titleText}</span>
      </p>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {role.bullets.map((bullet, j) => (
          <BulletLine key={j} text={bullet} displayedText={bulletTexts[j]} />
        ))}
      </ul>
    </div>
  )
}

/* ── Section ─────────────────────────────────────────────────── */
export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-15%' })

  // Build flat item list in DOM display order
  const items = [
    { text: EXPERIENCE.sectionLabel, speed: 20 },
    { text: EXPERIENCE.heading, speed: 35 },
  ]
  EXPERIENCE.roles.forEach((role) => {
    items.push({ text: role.company.toUpperCase(), speed: 20 })
    items.push({ text: role.period, speed: 12 })
    items.push({ text: role.title.toUpperCase(), speed: 12 })
    role.bullets.forEach((b) => items.push({ text: b, speed: 3 }))
  })

  const [sectionLabelText, headingText, ...rest] = useTypingSequence(isInView, items)

  // Map flat results back to per-role shape
  let offset = 0
  const roleTexts = EXPERIENCE.roles.map((role) => {
    const companyText = rest[offset++]
    const periodText = rest[offset++]
    const titleText = rest[offset++]
    const bulletTexts = role.bullets.map(() => rest[offset++])
    return { companyText, periodText, titleText, bulletTexts }
  })

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
          <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>{sectionLabelText}</span>
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
          <span style={{ position: 'absolute', top: 0, left: 'calc(2ch + 0.04em)' }}>{headingText}</span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {EXPERIENCE.roles.map((role, i) => (
            <RoleEntry key={role.id} role={role} {...roleTexts[i]} />
          ))}
        </div>
      </div>
    </section>
  )
}
