import { FOOTER, SOCIAL } from '../data/copy'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--phosphor-faint)',
        padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 6vw, 7rem)',
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
              gap: '1.75rem',
              margin: 0,
              padding: 0,
            }}
          >
            {SOCIAL.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
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
                  {label.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
