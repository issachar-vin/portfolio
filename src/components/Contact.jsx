import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { lineContainer, lineItem, instant } from '../animations/variants'
import { useTypingSequence } from '../hooks/useTypingSequence'
import { CONTACT, SITE, SOCIAL } from '../data/copy'

const linkedinHref = SOCIAL.find((s) => s.label === 'LinkedIn')?.href

/* ── WIP modal ───────────────────────────────────────────────── */
function WipModal({ onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wip-heading"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: 'rgba(7, 7, 10, 0.88)',
        backdropFilter: 'blur(6px)',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--phosphor)',
          boxShadow: '0 0 48px var(--glow-strong), 0 0 12px var(--glow)',
          padding: 'clamp(1.75rem, 4vw, 2.5rem)',
          maxWidth: '420px',
          width: '100%',
          position: 'relative',
        }}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            color: 'var(--phosphor-dim)',
            fontSize: '0.85rem',
            letterSpacing: '0.08em',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--phosphor)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--phosphor-dim)')}
        >
          [X]
        </button>

        <h3
          id="wip-heading"
          className="glow-text"
          style={{ fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', marginBottom: '1rem' }}
        >
          {CONTACT.wip.heading}
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--phosphor-dim)',
            fontSize: '0.85rem',
            lineHeight: 1.7,
            marginBottom: '1.75rem',
          }}
        >
          {CONTACT.wip.body}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <a
            href={`mailto:${SITE.email}`}
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--phosphor)',
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'center',
              transition: 'text-shadow 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.textShadow = '0 0 8px var(--phosphor)')}
            onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}
          >
            <span style={{ color: 'var(--phosphor-dim)', minWidth: '5rem' }}>
              {CONTACT.wip.emailLabel}
            </span>
            {SITE.email}
          </a>

          {linkedinHref && (
            <a
              href={linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--phosphor)',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'center',
                transition: 'text-shadow 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textShadow = '0 0 8px var(--phosphor)')}
              onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}
            >
              <span style={{ color: 'var(--phosphor-dim)', minWidth: '5rem' }}>
                {CONTACT.wip.linkedinLabel}
              </span>
              {linkedinHref.replace('https://', '')}
            </a>
          )}
        </div>
      </motion.div>
    </div>
  )
}

/* ── Section ─────────────────────────────────────────────────── */
export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-15%' })
  const prefersReduced = useReducedMotion()

  const [fields, setFields] = useState({ name: '', message: '' })
  const [showWip, setShowWip] = useState(false)

  const lineV = prefersReduced ? instant : lineContainer

  const [sectionLabelText, headingText, promptText] = useTypingSequence(isInView, [
    { text: CONTACT.sectionLabel, speed: 20 },
    { text: CONTACT.heading, speed: 35 },
    { text: CONTACT.prompt, speed: 20 },
  ])

  const onChange = (e) => setFields((f) => ({ ...f, [e.target.name]: e.target.value }))
  const onSubmit = (e) => {
    e.preventDefault()
    setShowWip(true)
  }

  return (
    <>
      {showWip && <WipModal onClose={() => setShowWip(false)} />}

      <section
        id="contact"
        aria-labelledby="contact-heading"
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
              {CONTACT.sectionLabel}
            </span>
            <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>{sectionLabelText}</span>
          </p>

          <h2
            id="contact-heading"
            className="glow-text prompt"
            aria-label={CONTACT.heading}
            style={{ marginBottom: '0.75rem', position: 'relative' }}
          >
            <span aria-hidden="true" style={{ visibility: 'hidden', pointerEvents: 'none' }}>
              {CONTACT.heading}
            </span>
            <span style={{ position: 'absolute', top: 0, left: 'calc(2ch + 0.04em)' }}>{headingText}</span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--phosphor-dim)',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              marginBottom: '2.5rem',
              position: 'relative',
            }}
          >
            <span aria-hidden="true" style={{ visibility: 'hidden', display: 'block', pointerEvents: 'none' }}>
              {CONTACT.prompt}
            </span>
            <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>{promptText}</span>
          </p>

          <motion.form
            onSubmit={onSubmit}
            variants={lineV}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            noValidate
            style={{ maxWidth: '560px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {CONTACT.fields.map((field) => (
              <motion.div key={field.name} variants={lineItem}>
                <label
                  htmlFor={field.name}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--phosphor-dim)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    marginBottom: '0.4rem',
                  }}
                >
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    className="terminal-input"
                    placeholder={field.placeholder}
                    value={fields[field.name]}
                    onChange={onChange}
                    rows={5}
                  />
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    className="terminal-input"
                    placeholder={field.placeholder}
                    value={fields[field.name]}
                    onChange={onChange}
                  />
                )}
              </motion.div>
            ))}

            <motion.div variants={lineItem}>
              <button type="submit" className="terminal-btn prompt">
                {CONTACT.submitLabel}
              </button>
            </motion.div>
          </motion.form>
        </div>
      </section>
    </>
  )
}
