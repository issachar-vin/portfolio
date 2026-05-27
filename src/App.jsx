import { useReducedMotion } from 'framer-motion'
import CRTCanvas from './components/CRTCanvas'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const prefersReduced = useReducedMotion()

  return (
    <div className={`crt-scanlines crt-vignette ${prefersReduced ? '' : 'crt-flicker'}`}>
      <CRTCanvas />
      <Nav />
      <main style={{ paddingTop: '56px' }}>
        <Hero prefersReduced={prefersReduced} />
        <About />
        <Experience />
        <Work />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
