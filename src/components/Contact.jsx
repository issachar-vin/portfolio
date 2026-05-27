import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { headingReveal, fadeUp, lineContainer, lineItem, instant } from '../animations/variants'
import { CONTACT } from '../data/copy'

// Replace with your Formspree (or equivalent) endpoint
const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })
  const prefersReduced = useReducedMotion()

  const [fields, setFields] = useState({ name: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const headV = prefersReduced ? instant : headingReveal
  const upV = prefersReduced ? instant : fadeUp
  const lineV = prefersReduced ? instant : lineContainer

  const onChange = (e) => setFields((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
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
          {CONTACT.sectionLabel}
        </motion.p>

        {/* Heading */}
        <motion.h2
          id="contact-heading"
          className="glow-text prompt"
          variants={headV}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ marginBottom: '0.75rem' }}
        >
          {CONTACT.heading}
        </motion.h2>

        {/* Prompt line */}
        <motion.p
          variants={upV}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--phosphor-dim)',
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            marginBottom: '2.5rem',
          }}
        >
          {CONTACT.prompt}
        </motion.p>

        {/* Form or success message */}
        {status === 'success' ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="prompt"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--phosphor)',
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
            }}
          >
            {CONTACT.successMessage}
            <span className="blink" style={{ marginLeft: '2px' }}>
              ▌
            </span>
          </motion.p>
        ) : (
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
                    required
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
                    required
                  />
                )}
              </motion.div>
            ))}

            {status === 'error' && (
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'rgba(255, 80, 60, 0.85)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                }}
              >
                &gt; TRANSMISSION FAILED. TRY AGAIN.
              </p>
            )}

            <motion.div variants={lineItem}>
              <button type="submit" className="terminal-btn prompt" disabled={status === 'sending'}>
                {status === 'sending' ? 'TRANSMITTING_' : CONTACT.submitLabel}
                {status === 'sending' && <span className="blink">▌</span>}
              </button>
            </motion.div>
          </motion.form>
        )}
      </div>
    </section>
  )
}
