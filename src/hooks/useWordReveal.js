import { useEffect } from 'react'

// Scroll-scrubbed word reveal for a pinned section. `wrapRef` is the tall
// wrapper (whose inner block is sticky); `wordsRef.current` is the array of
// word <span>s. As the wrapper scrolls past, words ease from dim to bright
// one after another.
export function useWordReveal(wrapRef, wordsRef, { dim = 0.14, feather = 2.4 } = {}) {
  useEffect(() => {
    const wrap = wrapRef.current
    const els = wordsRef.current.filter(Boolean)
    if (!wrap || !els.length) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => (el.style.opacity = '1'))
      return
    }

    let raf = 0
    const update = () => {
      raf = requestAnimationFrame(update)
      const rect = wrap.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), total)
      const progress = total > 0 ? scrolled / total : 0

      const n = els.length
      // Finish lighting every word by 80% of the scroll, so the whole line is
      // fully revealed before the pinned section releases to the next one.
      const p = Math.min(progress / 0.8, 1)
      const active = p * (n + feather)
      for (let i = 0; i < n; i++) {
        const wp = Math.min(Math.max((active - i) / feather, 0), 1)
        els[i].style.opacity = (dim + wp * (1 - dim)).toFixed(3)
      }
    }

    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [])
}
