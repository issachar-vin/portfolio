/**
 * All visible copy for the portfolio lives here.
 * Update text in this file — components just import and render.
 */

/* ─── Global ─────────────────────────────────────────────────── */
export const SITE = {
  name: 'Issachar Vinajeras',
  handle: 'ISSACHAR_VINAJERAS',
  tagline: 'Full-Stack Engineer · Problem Solver · Builder',
  location: 'Miami, FL',
  email: 'issacharv@gmail.com',
  url: 'https://vinajeras.com',
}

export const SOCIAL = [
  { label: 'GitHub', href: 'https://github.com/issachar-vin' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ivinajeras' },
]

export const NAV = [
  { label: 'ABOUT', href: '#about' },
  { label: 'WORK', href: '#work' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'CONTACT', href: '#contact' },
]

/* ─── Hero ───────────────────────────────────────────────────── */
export const HERO = {
  bootLine: 'TERMINAL_OS v1.0.0 — READY',
  name: 'ISSACHAR_VINAJERAS',
  title: '> FULL-STACK ENGINEER · PROBLEM SOLVER · BUILDER',
  scrollCue: 'SCROLL',
}

/* ─── About — terminal sequence ─────────────────────────────── */
export const TERMINAL = [
  { command: '$ whoami', output: ['issachar-vinajeras'] },
  { command: '$ cat experience.log', output: ['10 yrs · 4 companies · 1 mission: ship'] },
  { command: '$ ls ./stack', output: ['python/  fastapi/  react/  docker/  aws/'] },
  {
    command: '$ git log --oneline -3',
    output: [
      'a91b2f3  feat: ai message suggestion (gemini)',
      'c847a1e  feat: twilio voice + transcripts',
      'f290c3d  chore: python 3.7 → 3.10 migration',
    ],
  },
  { command: '$ uptime', output: ['10 years, 3 months — still shipping'] },
  { command: '$ ping vinajeras.com', output: ['PONG — 1ms — all systems nominal'] },
]

/* ─── About ──────────────────────────────────────────────────── */
export const ABOUT = {
  sectionLabel: '01 / WHOAMI',
  heading: 'ABOUT',
  bio: [
    'I build things end to end — from schema design to deployed product.',
    "Backend is where I think. Python is how I speak. But I'm just",
    'as comfortable in a browser, a CI pipeline, or an SSH session.',
    '',
    "10+ years across startups and enterprise. I've automated warehouse",
    'operations, built recruiter tooling used daily by 20+ people, led',
    'frontend rewrites, and shipped AI-powered features in production.',
    '',
    "I don't specialise in a layer. I specialise in outcomes.",
  ],
  facts: [
    { label: 'ROLE', value: 'Senior Software Engineer' },
    { label: 'BASED', value: 'Miami, FL' },
    { label: 'FOCUS', value: 'Python · React · Cloud' },
    { label: 'STATUS', value: 'Open to opportunities' },
  ],
  photoAlt: 'Headshot of Issachar Vinajeras',
  photoCaption: 'ISSACHAR VINAJERAS — MIAMI, FL',
}

/* ─── Work ───────────────────────────────────────────────────── */
export const WORK = {
  sectionLabel: '02 / PROJECTS',
  heading: 'WORK',
  projects: [
    {
      id: 'stream-manager',
      title: 'Stream Manager',
      stack: 'Python · ffmpeg · OBS WebSocket',
      description:
        'Push to YouTube and Facebook simultaneously from a single click — handles auth, RTMP relay, and stream keys automatically.',
      href: 'https://github.com/issachar-vin/stream-manager',
    },
    {
      id: 'dragon-traveler',
      title: 'Dragon Traveler Guide',
      stack: 'FastAPI · React · TypeScript · MongoDB',
      description:
        'Full-stack travel companion — Python scraper seeds the DB, FastAPI serves the data, React renders it.',
      href: 'https://github.com/issachar-vin/DragonTravelerUI',
    },
    {
      id: 'chess-learner',
      title: 'Chess Learner',
      stack: 'FastAPI · React · MongoDB · Chess Engine',
      description:
        'Interactive chess trainer with drag-and-drop board, opening book, and move highlights — full stack from engine to UI.',
      href: 'https://github.com/issachar-vin/ChessLearnerUI',
    },
    {
      id: 'resume-builder',
      title: 'Resume Builder',
      stack: 'Python · Claude API · LaTeX · Streamlit',
      description:
        'AI-powered resume tailor — parses LaTeX source, rewrites it for a specific job posting via Claude, exports back to PDF.',
      href: 'https://github.com/issachar-vin/Resume-Builder',
    },
  ],
}

/* ─── Skills ─────────────────────────────────────────────────── */
export const SKILLS = {
  sectionLabel: '03 / CAPABILITIES',
  heading: 'SKILLS',
  rows: [
    // Scrolls →
    [
      'PYTHON',
      'FASTAPI',
      'DJANGO',
      'FLASK',
      'REACT',
      'NEXT.JS',
      'TYPESCRIPT',
      'NODE.JS',
      'ANGULAR',
    ],
    // Scrolls ←
    [
      'DOCKER',
      'KUBERNETES',
      'AWS',
      'GCP',
      'MONGODB',
      'POSTGRES',
      'GITHUB ACTIONS',
      'DATADOG',
      'REDIS',
    ],
  ],
}

/* ─── Contact ────────────────────────────────────────────────── */
export const CONTACT = {
  sectionLabel: '04 / REACH OUT',
  heading: 'CONTACT',
  prompt: '> ESTABLISH_CONNECTION',
  fields: [
    { name: 'name', label: '// YOUR_NAME', type: 'text', placeholder: 'John Doe' },
    {
      name: 'message',
      label: '// MESSAGE',
      type: 'textarea',
      placeholder: 'What are you building?',
    },
  ],
  submitLabel: 'TRANSMIT_',
  successMessage: '> MESSAGE_RECEIVED. TALK SOON.',
}

/* ─── Footer ─────────────────────────────────────────────────── */
export const FOOTER = {
  copyright: `ISSACHAR_VINAJERAS © ${new Date().getFullYear()}`,
  tagline: 'Built in a terminal. Deployed to the world.',
}
