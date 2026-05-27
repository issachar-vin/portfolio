import { motion, useReducedMotion } from 'framer-motion'
import { charContainer, charItem, lineContainer, lineItem, fadeUp, instant } from '../animations/variants'
import { HERO } from '../data/copy'

function SplitChars({ text, className }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <motion.span key={i} variants={charItem} className={className} style={{ display: 'inline-block' }}>
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </>
  )
}

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const container = prefersReduced ? instant : charContainer
  const line      = prefersReduced ? instant : lineContainer
  const up        = prefersReduced ? instant : fadeUp

  return (
    <section
      id="hero"
      aria-label="Hero — introduction"
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(1.5rem, 6vw, 7rem)',
        position: 'relative',
      }}
    >
      {/* Boot line */}
      <motion.p
        variants={up}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--phosphor-dim)',
          fontSize: '0.85rem',
          marginBottom: '1.5rem',
          letterSpacing: '0.12em',
        }}
      >
        {HERO.bootLine}
      </motion.p>

      {/* Name */}
      <motion.h1
        className="glow-text"
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ fontFamily: 'var(--font-display)', lineHeight: 1, marginBottom: '1.2rem' }}
        aria-label={HERO.name.replace(/_/g, ' ')}
      >
        <SplitChars text={HERO.name} />
        <motion.span
          className="blink"
          variants={charItem}
          aria-hidden="true"
          style={{ display: 'inline-block', color: 'var(--phosphor)' }}
        >
          _
        </motion.span>
      </motion.h1>

      {/* Title */}
      <motion.p
        variants={line}
        initial="hidden"
        animate="visible"
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--phosphor-dim)',
          fontSize: 'clamp(0.75rem, 1.8vw, 1rem)',
          letterSpacing: '0.1em',
          marginBottom: '3rem',
        }}
      >
        <motion.span variants={lineItem}>{HERO.title}</motion.span>
      </motion.p>

      {/* Scroll cue */}
      <motion.div
        variants={up}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.4 }}
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 'clamp(2rem, 5vw, 3.5rem)',
          left: 'clamp(1.5rem, 6vw, 7rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '0.4rem',
        }}
      >
        <span style={{ fontFamily: 'var(--font-body)', color: 'var(--phosphor-dim)', fontSize: '0.75rem', letterSpacing: '0.15em' }}>
          {HERO.scrollCue}
        </span>
        <motion.span
          style={{ display: 'block', color: 'var(--phosphor)', fontSize: '1.2rem' }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  )
}
