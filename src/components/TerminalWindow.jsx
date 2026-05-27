import { useState, useEffect, useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { TERMINAL } from '../data/copy'

const CHAR_DELAY = 38 // ms per character while typing
const OUTPUT_DELAY = 320 // ms after command finishes before output starts
const LINE_DELAY = 540 // ms between output lines
const PAUSE_DELAY = 1600 // ms before next command
const LOOP_DELAY = 2200 // ms of idle before typing 'clear'
const CLEAR_CMD = '$ clear'

/**
 * State machine phases:
 *   typing   — typing the current command char by char
 *   output   — revealing output lines one by one
 *   pause    — waiting before next command (or before clear)
 *   clearing — typing '$ clear' before resetting
 */
function useTerminalSequence(active) {
  const [lines, setLines] = useState([])
  const [cmdText, setCmdText] = useState('')
  const [phase, setPhase] = useState('typing')
  const [seqIdx, setSeqIdx] = useState(0)
  const [outputIdx, setOutputIdx] = useState(0)
  const timerRef = useRef(null)

  const cancel = () => clearTimeout(timerRef.current)
  const after = (ms, fn) => {
    timerRef.current = setTimeout(fn, ms)
  }

  useEffect(() => {
    if (!active) return
    cancel()

    // ── typing ────────────────────────────────────────────────
    if (phase === 'typing') {
      const target = TERMINAL[seqIdx].command
      if (cmdText.length < target.length) {
        // Still mid-type: advance one char
        after(CHAR_DELAY, () => setCmdText(target.slice(0, cmdText.length + 1)))
      } else {
        // Fully typed: commit to lines, clear cmdText, move to output
        after(OUTPUT_DELAY, () => {
          setLines((prev) => [...prev, { type: 'cmd', text: target, id: `${seqIdx}-cmd` }])
          setCmdText('')
          setPhase('output')
        })
      }
    }

    // ── output ────────────────────────────────────────────────
    if (phase === 'output') {
      const outputs = TERMINAL[seqIdx].output
      if (outputIdx < outputs.length) {
        after(outputIdx === 0 ? 100 : LINE_DELAY, () => {
          setLines((prev) => [
            ...prev,
            { type: 'out', text: outputs[outputIdx], id: `${seqIdx}-out-${outputIdx}` },
          ])
          setOutputIdx(outputIdx + 1)
        })
      } else {
        after(0, () => setPhase('pause'))
      }
    }

    // ── pause ─────────────────────────────────────────────────
    if (phase === 'pause') {
      const isLast = seqIdx === TERMINAL.length - 1
      after(isLast ? LOOP_DELAY : PAUSE_DELAY, () => {
        if (isLast) {
          // Type '$ clear' before resetting
          setPhase('clearing')
        } else {
          setSeqIdx(seqIdx + 1)
          setOutputIdx(0)
          setPhase('typing')
        }
      })
    }

    // ── clearing ──────────────────────────────────────────────
    if (phase === 'clearing') {
      if (cmdText.length < CLEAR_CMD.length) {
        after(CHAR_DELAY, () => setCmdText(CLEAR_CMD.slice(0, cmdText.length + 1)))
      } else {
        // Fully typed 'clear' — wipe and restart
        after(500, () => {
          setLines([])
          setCmdText('')
          setOutputIdx(0)
          setSeqIdx(0)
          setPhase('typing')
        })
      }
    }

    return cancel
  }, [active, phase, cmdText, seqIdx, outputIdx])

  const currentTarget = phase === 'clearing' ? CLEAR_CMD : (TERMINAL[seqIdx]?.command ?? '')
  const isMidType = cmdText.length < currentTarget.length

  return { lines, cmdText, phase, isMidType }
}

/* ── Cursor block ──────────────────────────────────────────── */
const Cursor = () => (
  <span
    aria-hidden="true"
    className="blink"
    style={{
      display: 'inline-block',
      width: '0.55em',
      height: '1em',
      background: 'var(--phosphor)',
      verticalAlign: 'text-bottom',
      marginLeft: '1px',
    }}
  />
)

export default function TerminalWindow() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-10%' })
  const prefersReduced = useReducedMotion()

  const { lines, cmdText, phase, isMidType } = useTerminalSequence(isInView && !prefersReduced)

  // Reduced-motion: all lines shown statically, no animation
  const staticLines = TERMINAL.flatMap((entry, si) => [
    { type: 'cmd', text: entry.command, id: `${si}-cmd` },
    ...entry.output.map((o, oi) => ({ type: 'out', text: o, id: `${si}-out-${oi}` })),
  ])

  const displayLines = prefersReduced ? staticLines : lines
  const showTypingLine = !prefersReduced && (phase === 'typing' || phase === 'clearing')
  const showIdleCursor = !prefersReduced && phase === 'pause'

  return (
    <figure
      ref={ref}
      aria-label="Animated terminal showing Issachar's experience and stack"
      style={{ margin: 0, width: '100%', maxWidth: '480px' }}
    >
      <div
        role="presentation"
        style={{
          border: '1px solid var(--phosphor-dim)',
          boxShadow: '0 0 32px var(--glow), 0 0 4px var(--glow)',
          background: 'var(--surface)',
          overflow: 'hidden',
        }}
      >
        {/* Title bar */}
        <div
          aria-hidden="true"
          style={{
            borderBottom: '1px solid var(--phosphor-faint)',
            padding: '0.4rem 0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {['var(--phosphor-faint)', 'var(--phosphor-dim)', 'var(--phosphor)'].map((c, i) => (
            <span
              key={i}
              style={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                background: c,
                display: 'inline-block',
              }}
            />
          ))}
          <span
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--phosphor-dim)',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              marginLeft: 'auto',
            }}
          >
            issachar@terminal: ~
          </span>
        </div>

        {/* Terminal body */}
        <div
          style={{
            padding: '1rem 1.1rem 1.2rem',
            minHeight: '320px',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.72rem, 1.3vw, 0.82rem)',
            lineHeight: 1.7,
          }}
        >
          {/* Committed lines */}
          {displayLines.map((line) => (
            <div
              key={line.id}
              style={{ color: line.type === 'cmd' ? 'var(--phosphor)' : 'var(--phosphor-dim)' }}
            >
              {line.text}
            </div>
          ))}

          {/* Actively typing line — cursor only while still mid-type */}
          {showTypingLine && (
            <div style={{ color: 'var(--phosphor)' }}>
              {cmdText}
              {isMidType && <Cursor />}
            </div>
          )}

          {/* Idle prompt cursor between commands */}
          {showIdleCursor && (
            <div style={{ color: 'var(--phosphor)' }}>
              $&nbsp;
              <Cursor />
            </div>
          )}
        </div>
      </div>

      <figcaption
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--phosphor-dim)',
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          marginTop: '0.75rem',
        }}
      >
        ISSACHAR VINAJERAS — MIAMI, FL
      </figcaption>
    </figure>
  )
}
