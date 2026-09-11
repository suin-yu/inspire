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
    // 모바일/터치 기기에서는 네이티브 관성 스크롤을 사용하여 스크롤 튕김 및 간섭을 원천 방지
    const isTouch = typeof window !== 'undefined' && (
      window.innerWidth <= 768 ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    );

    if (isTouch) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothTouch: false,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

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
