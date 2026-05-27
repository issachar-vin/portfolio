import { useReducedMotion } from 'framer-motion'
import CRTCanvas from './components/CRTCanvas'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'

export default function App() {
  const prefersReduced = useReducedMotion()

  return (
    <div className={`crt-scanlines crt-vignette ${prefersReduced ? '' : 'crt-flicker'}`}>
      <CRTCanvas />
      <main>
        <Hero prefersReduced={prefersReduced} />
        <About />
        <Work />
        {/* Sections added one by one as built */}
      </main>
    </div>
  )
}
