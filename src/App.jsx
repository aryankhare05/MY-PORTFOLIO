import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackgroundFX from './components/BackgroundFX'
import { useMagicInteractions } from './hooks/useMagicInteractions'

export default function App() {
  // Powers the site-wide magnetic buttons, ripple clicks, and tilt cards —
  // see src/hooks/useMagicInteractions.js for details.
  useMagicInteractions()

  return (
    <>
      <BackgroundFX />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
