import Lenis from 'lenis'
import { scrollState } from './scrollState'

// Single shared Lenis instance so both the RAF loop (useLenis) and
// anchor-link navigation (Header / Footer) drive the same scroller.
let lenis = null

export function initLenis() {
  if (lenis) return lenis

  lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  })

  lenis.on('scroll', (e) => {
    scrollState.y = e.scroll
    scrollState.progress = e.limit ? e.scroll / e.limit : 0
    scrollState.velocity = e.velocity
  })

  return lenis
}

export function getLenis() {
  return lenis
}

export function destroyLenis() {
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
}
