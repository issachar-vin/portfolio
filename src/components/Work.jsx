import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { cardContainer, cardItem, instant } from '../animations/variants'
import { useTypingSequence } from '../hooks/useTypingSequence'
import { WORK } from '../data/copy'

/* ── Single project card ─────────────────────────────────────── */
function ProjectCard({ project, index, prefersReduced, titleText, stackText, descText }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)

  const onMove = (e) => {
    if (prefersReduced || !cardRef.current) return
    const { left, top, width, height } = cardRef.current.getBoundingClientRect()
    const cx = (e.clientX - left) / width - 0.5
    const cy = (e.clientY - top) / height - 0.5
    setTilt({ x: cy * -7, y: cx * 7 })
  }

  const onLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <motion.article variants={cardItem} style={{ height: '100%' }}>
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.title} on GitHub`}
        style={{ textDecoration: 'none', display: 'block', height: '100%' }}
      >
        <div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={onLeave}
          style={{
            height: '100%',
            border: `1px solid ${hovered ? 'var(--phosphor)' : 'var(--phosphor-dim)'}`,
            background: 'var(--surface)',
            padding: '1.75rem 2rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            transform: prefersReduced
              ? 'none'
              : `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            boxShadow: hovered ? '0 0 40px var(--glow-strong), 0 0 8px var(--glow)' : 'none',
            transition: hovered
              ? 'border-color 0.15s, box-shadow 0.2s, transform 0.08s'
              : 'border-color 0.3s, box-shadow 0.4s, transform 0.5s ease',
          }}
        >
          {/* Number + arrow */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1.75rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--phosphor-faint)',
                fontSize: '0.68rem',
                letterSpacing: '0.15em',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                color: hovered ? 'var(--phosphor)' : 'var(--phosphor-dim)',
                fontSize: '1.1rem',
                transition: 'color 0.2s',
              }}
            >
              ↗
            </span>
          </div>

          {/* Title */}
          <h3
            className={hovered ? 'glow-text' : ''}
            style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              marginBottom: '0.5rem',
              transition: 'text-shadow 0.2s',
              position: 'relative',
            }}
          >
            <span aria-hidden="true" style={{ visibility: 'hidden', display: 'block', pointerEvents: 'none' }}>
              {project.title.toUpperCase()}
            </span>
            <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>{titleText}</span>
          </h3>

          {/* Stack */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--phosphor-dim)',
              fontSize: '0.68rem',
              letterSpacing: '0.12em',
              marginBottom: '1.25rem',
              position: 'relative',
            }}
          >
            <span aria-hidden="true" style={{ visibility: 'hidden', display: 'block', pointerEvents: 'none' }}>
              {project.stack}
            </span>
            <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>{stackText}</span>
          </p>

          {/* Description */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--phosphor-dim)',
              fontSize: 'clamp(0.82rem, 1.4vw, 0.9rem)',
              lineHeight: 1.75,
              flexGrow: 1,
              position: 'relative',
            }}
          >
            <span aria-hidden="true" style={{ visibility: 'hidden', display: 'block', pointerEvents: 'none' }}>
              {project.description}
            </span>
            <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>{descText}</span>
          </p>
        </div>
      </a>
    </motion.article>
  )
}

/* ── Section ─────────────────────────────────────────────────── */
export default function Work() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-15%' })
  const prefersReduced = useReducedMotion()

  const cardV = prefersReduced ? instant : cardContainer

  const [sectionLabelText, headingText, ...projectRest] = useTypingSequence(isInView, [
    { text: WORK.sectionLabel, speed: 20 },
    { text: WORK.heading, speed: 35 },
    ...WORK.projects.flatMap((p) => [
      { text: p.title.toUpperCase(), speed: 20 },
      { text: p.stack, speed: 12 },
      { text: p.description, speed: 3 },
    ]),
  ])

  const projectTexts = WORK.projects.map((_, i) => ({
    titleText: projectRest[i * 3],
    stackText: projectRest[i * 3 + 1],
    descText: projectRest[i * 3 + 2],
  }))

  return (
    <section
      id="projects"
      aria-labelledby="work-heading"
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
            {WORK.sectionLabel}
          </span>
          <span style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>{sectionLabelText}</span>
        </p>

        <h2
          id="work-heading"
          className="glow-text prompt"
          aria-label={WORK.heading}
          style={{ marginBottom: '3.5rem', position: 'relative' }}
        >
          <span aria-hidden="true" style={{ visibility: 'hidden', pointerEvents: 'none' }}>
            {WORK.heading}
          </span>
          <span style={{ position: 'absolute', top: 0, left: 'calc(2ch + 0.04em)' }}>{headingText}</span>
        </h2>

        <motion.div
          variants={cardV}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
            alignItems: 'stretch',
          }}
        >
          {WORK.projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              prefersReduced={prefersReduced}
              {...projectTexts[i]}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
