import { useReducedMotion } from 'framer-motion'
import CRTCanvas from './components/CRTCanvas'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useScrollController } from './hooks/useScrollController'

export default function App() {
  const prefersReduced = useReducedMotion()
  useScrollController()

  return (
    <div className={`crt-scanlines crt-vignette ${prefersReduced ? '' : 'crt-flicker'}`}>
      <CRTCanvas />
      <Nav />
      <main style={{ paddingTop: '56px', paddingBottom: '52px' }}>
        <Hero prefersReduced={prefersReduced} />
        <About />
        <Experience />
        <Skills />
        <Work />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
