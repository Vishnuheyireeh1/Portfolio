import { useEffect } from 'react'
import { initLenis, destroyLenis } from '../lib/smoothScroll'

// Boots the shared Lenis instance and drives its RAF loop for the
// lifetime of the app.
export function useLenis() {
  useEffect(() => {
    const lenis = initLenis()

    let raf = 0
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      destroyLenis()
    }
  }, [])
}
