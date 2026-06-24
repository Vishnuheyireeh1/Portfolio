import { useEffect } from 'react'

// Scroll-scrubbed storytelling for a pinned section, à la fromanother's team
// scroll: a giant number rolls bottom-left, the active image sits centre while
// the next one peeks in from the bottom-right, and the description crossfades
// on the right. The heading stays put. Degrades to a static stacked list on
// small screens / reduced motion via the wrapper's `data-static` attribute.
export function useScrollStory(wrapRef, refs = {}) {
  const {
    rollRef, // the column of numbers that translates
    imagesRef, // array of image buttons
    textsRef, // array of right-side text blocks
    chaptersRef, // array of left chapter items
    activeClass, // class toggled on the active chapter
    step = 1, // vertical screens of scroll per project
  } = refs

  useEffect(() => {
    const wrap = wrapRef.current
    const roll = rollRef?.current
    const images = (imagesRef?.current || []).filter(Boolean)
    const texts = (textsRef?.current || []).filter(Boolean)
    if (!wrap || !images.length) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const small = window.matchMedia('(max-width: 760px)')
    const isFallback = () => reduce.matches || small.matches
    const n = images.length

    const reset = () => {
      if (roll) roll.style.transform = ''
      images.forEach((el) => {
        el.style.transform = ''
        el.style.opacity = ''
        el.style.zIndex = ''
        el.style.pointerEvents = ''
      })
      texts.forEach((el) => {
        el.style.opacity = ''
        el.style.transform = ''
        el.style.filter = ''
        el.style.pointerEvents = ''
      })
      chaptersRef?.current?.forEach(
        (el) => el && activeClass && el.classList.remove(activeClass),
      )
    }

    const setHeight = () => {
      if (isFallback()) {
        wrap.dataset.static = 'true'
        wrap.style.height = ''
        reset()
        return
      }
      wrap.dataset.static = 'false'
      wrap.style.height = `${Math.round((n * step + 1) * window.innerHeight)}px`
    }

    let raf = 0
    let lastActive = -1
    const update = () => {
      raf = requestAnimationFrame(update)
      if (isFallback()) return

      const rect = wrap.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), total)
      const progress = total > 0 ? scrolled / total : 0
      const pos = progress * (n - 1)

      // Rolling number (odometer): translate the column by one line per step.
      if (roll && roll.firstElementChild) {
        const line = roll.firstElementChild.offsetHeight || 1
        roll.style.transform = `translate3d(0, ${(-pos * line).toFixed(2)}px, 0)`
      }

      // Image stage: active centred, next peeking bottom-right, prev sliding up.
      for (let i = 0; i < n; i++) {
        const d = i - pos
        const ad = Math.abs(d)
        const el = images[i]
        const tx = d * 14 // % — next shifts right, prev shifts left
        const ty = d * 70 // % — vertical travel
        const sc = Math.max(0.82, 1 - ad * 0.12)
        const op = ad <= 1 ? 1 - ad * 0.1 : Math.max(0, 1 - (ad - 1) * 1.3)
        el.style.transform = `translate(-50%, -50%) translate(${tx.toFixed(2)}%, ${ty.toFixed(2)}%) scale(${sc.toFixed(3)})`
        el.style.opacity = op.toFixed(3)
        el.style.zIndex = String(100 - Math.round(ad * 10))
        el.style.pointerEvents = ad < 0.5 ? 'auto' : 'none'
      }

      // Right-side text: crossfade + blur as one leaves and the next arrives.
      const W = 0.62
      for (let i = 0; i < texts.length; i++) {
        const d = i - pos
        const ad = Math.abs(d)
        const el = texts[i]
        const t = Math.max(0, Math.min(1, 1 - ad / W))
        const ease = t * t * (3 - 2 * t)
        el.style.opacity = ease.toFixed(3)
        el.style.pointerEvents = ease > 0.6 ? 'auto' : 'none'
        if (ease <= 0.002) {
          el.style.filter = 'none'
          el.style.transform = `translate3d(0, ${d < 0 ? -22 : 22}px, 0)`
          continue
        }
        el.style.filter = `blur(${((1 - ease) * 8).toFixed(2)}px)`
        el.style.transform = `translate3d(0, ${((1 - t) * 22 * (d < 0 ? -1 : 1)).toFixed(1)}px, 0)`
      }

      const active = Math.min(n - 1, Math.max(0, Math.round(pos)))
      if (active !== lastActive) {
        lastActive = active
        if (chaptersRef?.current && activeClass) {
          chaptersRef.current.forEach(
            (el, i) => el && el.classList.toggle(activeClass, i === active),
          )
        }
      }
    }

    setHeight()
    raf = requestAnimationFrame(update)

    const onResize = () => setHeight()
    window.addEventListener('resize', onResize)
    reduce.addEventListener?.('change', setHeight)
    small.addEventListener?.('change', setHeight)
    const settle = setTimeout(setHeight, 400)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      reduce.removeEventListener?.('change', setHeight)
      small.removeEventListener?.('change', setHeight)
      clearTimeout(settle)
    }
  }, [])
}
