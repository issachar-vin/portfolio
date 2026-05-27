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
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACT', href: '#contact' },
]

/* ─── Hero ───────────────────────────────────────────────────── */
export const HERO = {
  bootLine: 'TERMINAL_OS v1.0.0 — READY',
  name: 'ISSACHAR_VINAJERAS',
  titleOptions: [
    'FULL-STACK ENGINEER',
    'PROBLEM SOLVER',
    'BUILDER',
    'PYTHON DEVELOPER',
    'REACT DEVELOPER',
  ],
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

/* ─── Experience ─────────────────────────────────────────────── */
export const EXPERIENCE = {
  sectionLabel: '02 / EXPERIENCE',
  heading: 'EXPERIENCE',
  roles: [
    {
      id: 'nomad-health-senior',
      company: 'Nomad Health',
      title: 'Senior Software Engineer',
      period: 'May 2025 – May 2026',
      bullets: [
        'Architected Scout, an internal recruiting tool used by 20+ recruiters — evolved from a Zendesk-based system into a Twilio-integrated platform with in-browser messaging, voice calls with transcripts, and Gemini-powered message suggestions for clinician outreach',
        'Implemented an automated recruiter reminder system and led the Python 3.7→3.10 migration, converting data models from marshmallow to Pydantic across a React/Next.js stack',
      ],
    },
    {
      id: 'ukg',
      company: 'UKG',
      title: 'Software Engineer',
      period: 'Nov 2023 – May 2025',
      bullets: [
        'Led frontend feature development in Angular with AgGrid; contributed to a Java Spring Boot backend using CQRS microservice architecture with RabbitMQ for async messaging',
        'Deployed internal tools to GCP and mentored junior engineers in best practices and code quality',
      ],
    },
    {
      id: 'nomad-health-se2',
      company: 'Nomad Health',
      title: 'Software Engineer II',
      period: 'May 2022 – Oct 2023',
      bullets: [
        'Automated parts of the travel nurse hiring process and built a facility-facing portal for managing recruited nurses using Flask, MongoDB, Redis, and async/scheduled tasks with Beat',
        'Integrated object-oriented APIs with React and Next.js frontends; used MongoDB aggregations to enrich API outputs',
      ],
    },
    {
      id: 'globalrose',
      company: 'Globalrose.com LLC',
      title: 'Software Engineer',
      period: 'Apr 2014 – May 2022',
      bullets: [
        'Built a custom label-making application that automated warehouse sorting and stamping, directly reducing manual labor in day-to-day operations',
        'Led and mentored two developers while modernizing the site frontend with JavaScript and jQuery; maintained PCI DSS compliance across all servers',
      ],
    },
  ],
}

/* ─── Work ───────────────────────────────────────────────────── */
export const WORK = {
  sectionLabel: '04 / PROJECTS',
  heading: 'PROJECTS',
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
      href: 'https://github.com/issachar-vin/DragonTravelerAPI',
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
  categories: [
    {
      label: 'FRONTEND',
      skills: ['REACT', 'NEXT.JS', 'ANGULAR', 'TYPESCRIPT', 'JAVASCRIPT', 'HTML/CSS', 'BOOTSTRAP'],
    },
    {
      label: 'BACKEND',
      skills: ['PYTHON', 'NODE.JS', 'JAVA'],
    },
    {
      label: 'API',
      skills: ['FASTAPI', 'DJANGO', 'FLASK', 'REST', 'GRAPHQL'],
    },
    {
      label: 'TOOLS',
      skills: [
        'DOCKER',
        'KUBERNETES',
        'AWS',
        'GCP',
        'MONGODB',
        'POSTGRES',
        'REDIS',
        'MYSQL',
        'GIT',
        'NGINX',
      ],
    },
    {
      label: 'CI/CD',
      skills: ['GITHUB ACTIONS', 'CIRCLECI', 'JENKINS', 'DATADOG', 'SPLUNK', 'ELASTICSEARCH'],
    },
    {
      label: 'AI',
      skills: [
        'CLAUDE CODE',
        'CURSOR',
        'SKILLS',
        'GITHUB COPILOT',
        'WINDSURF',
        'CHATGPT',
        'GEMINI',
      ],
    },
  ],
}

/* ─── Contact ────────────────────────────────────────────────── */
export const CONTACT = {
  sectionLabel: '05 / REACH OUT',
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
  wip: {
    heading: '> FEATURE_PENDING',
    body: 'The contact form is currently under development.',
    emailLabel: 'EMAIL',
    linkedinLabel: 'LINKEDIN',
  },
}

/* ─── Footer ─────────────────────────────────────────────────── */
export const FOOTER = {
  copyright: `ISSACHAR_VINAJERAS © ${new Date().getFullYear()}`,
  tagline: 'Built in a terminal. Deployed to the world.',
}
