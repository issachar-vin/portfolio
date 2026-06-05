import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { lineContainer, lineItem, instant } from '../animations/variants'
import { useTypingSequence } from '../hooks/useTypingSequence'
import { CONTACT } from '../data/copy'

const MAILFOLIO_URL = import.meta.env.VITE_MAILFOLIO_URL
const HCAPTCHA_SITE_KEY = import.meta.env.VITE_HCAPTCHA_SITE_KEY

const INITIAL_FIELDS = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const ref = useRef(null)
  const captchaRef = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-15%' })
  const prefersReduced = useReducedMotion()

  const [fields, setFields] = useState(INITIAL_FIELDS)
  const [captchaToken, setCaptchaToken] = useState(null)
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  const lineV = prefersReduced ? instant : lineContainer

  const [sectionLabelText, headingText, promptText] = useTypingSequence(isInView, [
    { text: CONTACT.sectionLabel, speed: 20 },
    { text: CONTACT.heading, speed: 35 },
    { text: CONTACT.prompt, speed: 20 },
  ])

  const onChange = (e) => setFields((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!captchaToken) {
      setStatus('error')
      setErrorMsg(CONTACT.errors.captcha)
      return
    }
    setStatus('sending')
    setErrorMsg('')
    try {
      const body = {
        name: fields.name,
        email: fields.email,
        message: fields.message,
        hcaptcha_token: captchaToken,
      }
      if (fields.subject) body.subject = fields.subject

      const res = await fetch(`${MAILFOLIO_URL}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.status === 202) {
        setStatus('success')
        setFields(INITIAL_FIELDS)
      } else {
        setStatus('error')
        setErrorMsg(
          res.status === 403
            ? CONTACT.errors.e403
            : res.status === 422
              ? CONTACT.errors.e422
              : res.status === 429
                ? CONTACT.errors.e429
                : CONTACT.errors.network,
        )
      }
    } catch {
      setStatus('error')
      setErrorMsg(CONTACT.errors.network)
    } finally {
      captchaRef.current?.resetCaptcha()
      setCaptchaToken(null)
    }
  }

  const sending = status === 'sending'

  return (
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
          <span
            aria-hidden="true"
            style={{ visibility: 'hidden', display: 'block', pointerEvents: 'none' }}
          >
            {CONTACT.sectionLabel}
          </span>
          <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
            {sectionLabelText}
          </span>
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
          <span style={{ position: 'absolute', top: 0, left: 'calc(2ch + 0.04em)' }}>
            {headingText}
          </span>
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
          <span
            aria-hidden="true"
            style={{ visibility: 'hidden', display: 'block', pointerEvents: 'none' }}
          >
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
                  required={field.required}
                  disabled={sending}
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
                  required={field.required}
                  disabled={sending}
                />
              )}
            </motion.div>
          ))}

          <motion.div variants={lineItem}>
            <HCaptcha
              ref={captchaRef}
              sitekey={HCAPTCHA_SITE_KEY}
              theme="dark"
              onVerify={(token) => {
                setCaptchaToken(token)
                if (status === 'error' && errorMsg === CONTACT.errors.captcha) {
                  setStatus('idle')
                  setErrorMsg('')
                }
              }}
              onExpire={() => setCaptchaToken(null)}
            />
          </motion.div>

          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--phosphor)',
                fontSize: '0.85rem',
                letterSpacing: '0.1em',
              }}
            >
              {CONTACT.successMessage}
            </motion.p>
          )}

          {status === 'error' && errorMsg && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--phosphor-dim)',
                fontSize: '0.85rem',
                letterSpacing: '0.1em',
              }}
            >
              {errorMsg}
            </motion.p>
          )}

          <motion.div variants={lineItem}>
            <button
              type="submit"
              className="terminal-btn prompt"
              disabled={sending}
            >
              {sending ? CONTACT.submittingLabel : CONTACT.submitLabel}
            </button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  )
}
