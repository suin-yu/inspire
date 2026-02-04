import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import Home from './sections/Home'
import About from './sections/About'
import AboutGallery from './sections/AboutGallery'
import AboutProfile from './sections/AboutProfile'
import Skill from './sections/Skill'
import SkillTools from './sections/SkillTools'
import Work from './sections/Work'
import Contact from './sections/Contact'



import Gnb from './components/Gnb'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      smooth: true,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    })

    const raf = (time) => {

      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  return (
    <main>
      <Gnb />
      <Home />
      <About />
      <AboutGallery />
      <AboutProfile />
      <Skill />
      <SkillTools />
      <Work />
      <Contact />
    </main>
  )
}

export default App
