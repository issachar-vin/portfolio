import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { SITE, NAV } from '../data/copy'
import useActiveSection from '../hooks/useActiveSection'

const SECTION_IDS = NAV.map((n) => n.href.slice(1))

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (!el) return
    const target = el.getBoundingClientRect().top + window.scrollY - 56
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  return (
    <>
      <nav
        aria-label="Main navigation"
        className="glass-edge-bottom"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 300,
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(1.5rem, 6vw, 7rem)',
          background: scrolled ? 'rgba(0, 0, 0, 0.65)' : 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transition: 'background 0.35s',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--phosphor)',
            fontSize: '1.15rem',
            letterSpacing: '0.06em',
            textDecoration: 'none',
          }}
        >
          {SITE.handle}
        </a>

        {/* Desktop links */}
        <ul className="nav-links">
          {NAV.map(({ label, href }) => {
            const isActive = active === href.slice(1)
            return (
              <li key={label}>
                <a
                  href={href}
                  onClick={(e) => handleClick(e, href)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.16em',
                    textDecoration: 'none',
                    color: isActive ? 'var(--phosphor)' : 'var(--phosphor-dim)',
                    textShadow: isActive
                      ? '0 0 8px var(--phosphor), 0 0 20px rgba(232,160,32,0.3)'
                      : 'none',
                    transition: 'color 0.2s, text-shadow 0.2s',
                  }}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 299,
            background: 'rgba(7, 7, 10, 0.97)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
          }}
        >
          {NAV.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => handleClick(e, href)}
              className="glow-text"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--phosphor)',
                fontSize: 'clamp(2.2rem, 10vw, 3.2rem)',
                letterSpacing: '0.08em',
                textDecoration: 'none',
              }}
            >
              &gt;&nbsp;{label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
