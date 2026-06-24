import { useLenis } from './hooks/useLenis'
import Background from './three/Background'
import CursorSmoke from './components/CursorSmoke'
import Cursor from './components/Cursor'
import ThemeToggle from './components/ThemeToggle'
import Clock from './components/Clock'
import Header from './components/Header'
import Hero from './components/Hero'
import Statement from './components/Statement'
import Work from './components/Work'
import OtherWork from './components/OtherWork'
import Services from './components/Services'
import Stack from './components/Stack'
import Testimonial from './components/Testimonial'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useLenis()

  return (
    <>
      <Background />
      <CursorSmoke />
      <div className="vignette" aria-hidden="true" />
      <Cursor />
      <ThemeToggle />
      <Clock />
      <Header />
      <main>
        <Hero />
        <Statement />
        <Work />
        <OtherWork />
        <Services />
        <Stack />
        <Testimonial />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
