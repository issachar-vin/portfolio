// All Framer Motion variants live here — no inline animation props elsewhere.
// Each variant set exports { container, item } where stagger is needed.

/* ─── Shared easing ──────────────────────────────────────────── */
const easeOut = [0.16, 1, 0.3, 1]

/* ─── Character stagger (hero name) ─────────────────────────── */
export const charContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.018, delayChildren: 0.1 },
  },
}

export const charItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: easeOut } },
}

/* ─── Line stagger (about bio, subtitle) ────────────────────── */
export const lineContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

export const lineItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
}

/* ─── Section heading reveal ─────────────────────────────────── */
export const headingReveal = {
  hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  visible: {
    opacity: 1,
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.6, ease: easeOut },
  },
}

/* ─── Card reveal (clip-path wipe upward) ────────────────────── */
export const cardContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

export const cardItem = {
  hidden: { opacity: 0, clipPath: 'inset(100% 0 0 0)', y: 20 },
  visible: {
    opacity: 1,
    clipPath: 'inset(0% 0 0 0)',
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
}

/* ─── Skill badge stagger ────────────────────────────────────── */
export const skillContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
}

export const skillItem = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: easeOut } },
}

/* ─── Fade up (contact, footer) ──────────────────────────────── */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
}

/* ─── Reduced-motion overrides — pass to all variants ───────── */
export const instant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
}
