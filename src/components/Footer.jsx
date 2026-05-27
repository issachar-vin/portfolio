import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { FOOTER, SOCIAL } from '../data/copy'

const ICONS = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
}

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--phosphor-faint)',
        padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 6vw, 7rem) clamp(4rem, 8vw, 6rem)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {/* Left: copyright + tagline */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--phosphor-dim)',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
            }}
          >
            {FOOTER.copyright}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--phosphor-faint)',
              fontSize: '0.62rem',
              letterSpacing: '0.08em',
              marginTop: '0.3rem',
            }}
          >
            {FOOTER.tagline}
          </p>
        </div>

        {/* Right: social links */}
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
                      gap: '0.45rem',
                      fontFamily: 'var(--font-body)',
                      color: 'var(--phosphor-dim)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.12em',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--phosphor)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--phosphor-dim)')}
                  >
                    {Icon && <Icon size={15} aria-hidden="true" />}
                    {label.toUpperCase()}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
