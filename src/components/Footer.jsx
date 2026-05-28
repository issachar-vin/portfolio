import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { FOOTER, SOCIAL } from '../data/copy'
import useActiveSection from '../hooks/useActiveSection'

const ICONS = { GitHub: FaGithub, LinkedIn: FaLinkedin }

const SECTION_ORDER = ['hero', 'about', 'experience', 'skills', 'projects', 'contact']

function getNext(active) {
  const i = SECTION_ORDER.indexOf(active)
  if (i < SECTION_ORDER.length - 1) {
    return { id: SECTION_ORDER[i + 1], label: SECTION_ORDER[i + 1].toUpperCase(), isEnd: false }
  }
  return { id: 'hero', label: 'CLEAR', isEnd: true }
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const prefersReduced = useReducedMotion()
  const active = useActiveSection(SECTION_ORDER)
  const { id: nextId, label: nextLabel, isEnd } = getNext(active)

  return (
    <footer
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        borderTop: '1px solid var(--border)',
        background: 'rgba(7, 7, 10, 0.92)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: '0 clamp(1.5rem, 6vw, 7rem)',
        height: '52px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        {/* Left: scroll cue */}
        <AnimatePresence mode="wait">
          <motion.button
            key={active}
            onClick={() => scrollTo(nextId)}
            initial={{ opacity: 0, y: isEnd ? -4 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            aria-label={isEnd ? 'Back to top' : `Scroll to ${nextLabel}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'var(--font-body)',
              color: 'var(--phosphor-dim)',
              fontSize: '0.68rem',
              letterSpacing: '0.15em',
              whiteSpace: 'nowrap',
            }}
          >
            <span>{nextLabel}</span>
            {prefersReduced ? (
              <span style={{ color: 'var(--phosphor)' }}>{isEnd ? '↑' : '↓'}</span>
            ) : (
              <motion.span
                style={{ color: 'var(--phosphor)', display: 'block', lineHeight: 1 }}
                animate={isEnd ? { y: [0, -4, 0] } : { y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                {isEnd ? '↑' : '↓'}
              </motion.span>
            )}
          </motion.button>
        </AnimatePresence>

        {/* Right: social links + pipe + copyright */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <nav aria-label="Social links">
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                gap: '1.5rem',
                margin: 0,
                padding: 0,
              }}
            >
              {SOCIAL.map(({ label, href }) => {
                const Icon = ICONS[label]
                return (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontFamily: 'var(--font-body)',
                        color: 'var(--phosphor-dim)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.1em',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--phosphor)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--phosphor-dim)')}
                    >
                      {Icon && <Icon size={13} aria-hidden="true" />}
                      <span className="footer-label">{label.toUpperCase()}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <span aria-hidden="true" style={{ color: 'var(--phosphor-faint)', fontSize: '0.65rem' }}>
            |
          </span>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--phosphor-dim)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
            }}
          >
            {FOOTER.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
