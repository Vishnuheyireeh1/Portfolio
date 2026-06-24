import { useEffect } from 'react'

// Scroll-scrubbed "roster" for a pinned section, à la fromanother's
// "They trust us": a vertical list of names rolls on the left so the active
// one sits centred, upright and bright while the rest fade and slant away;
// the matching definition crossfades on the right. Also drives a big counter
// and a progress bar. The heading stays put — only the roster + text move.
//
// Degrades to a plain static list on small screens / reduced motion via the
// wrapper's `data-static` attribute.
export function useScrollRoster(wrapRef, refs = {}) {
  const {
    listRef, // the translating <ul> of names
    itemsRef, // array of name <li>
    notesRef, // array of right-side note elements
    counterRef, // node showing "03"
    barRef, // progress fill
    step = 0.55, // vertical screens of scroll per item
  } = refs

  useEffect(() => {
    const wrap = wrapRef.current
    const list = listRef?.current
    const items = (itemsRef?.current || []).filter(Boolean)
    const notes = (notesRef?.current || []).filter(Boolean)
    if (!wrap || !list || !items.length) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const small = window.matchMedia('(max-width: 860px)')
    const isFallback = () => reduce.matches || small.matches
    const n = items.length

    const reset = () => {
      list.style.transform = ''
      items.forEach((el) => {
        el.style.transform = ''
        el.style.opacity = ''
        el.removeAttribute('data-active')
      })
      notes.forEach((el) => {
        el.style.opacity = ''
        el.style.transform = ''
        el.style.filter = ''
        el.style.pointerEvents = ''
      })
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

      // Roll the list so the active row sits on the centre line.
      const row = items[0].offsetHeight || 1
      const viewH = list.parentElement.clientHeight
      const centerY = viewH / 2 - row / 2
      list.style.transform = `translate3d(0, ${(centerY - pos * row).toFixed(2)}px, 0)`

      // Each name: fade + shrink + slant with distance from the active row.
      for (let i = 0; i < n; i++) {
        const d = i - pos
        const ad = Math.abs(d)
        const el = items[i]
        const op = Math.max(0.1, 1 - ad * 0.42)
        const sc = Math.max(0.8, 1 - ad * 0.07)
        const skew = Math.max(-18, Math.min(18, d * 6))
        el.style.opacity = op.toFixed(3)
        el.style.transform = `scale(${sc.toFixed(3)}) skewY(${skew.toFixed(2)}deg)`
      }

      // Right-side definitions crossfade to match the active row, blurring
      // and sliding as one leaves and the next comes into focus.
      const W = 0.72 // crossfade window (in rows)
      for (let i = 0; i < notes.length; i++) {
        const d = i - pos
        const ad = Math.abs(d)
        const el = notes[i]
        const t = Math.max(0, Math.min(1, 1 - ad / W))
        const ease = t * t * (3 - 2 * t) // smoothstep
        el.style.opacity = ease.toFixed(3)
        if (ease <= 0.002) {
          el.style.filter = 'none'
          el.style.pointerEvents = 'none'
          continue
        }
        const blur = (1 - ease) * 10
        const shift = (1 - t) * 26 * (d < 0 ? -1 : 1)
        el.style.filter = `blur(${blur.toFixed(2)}px)`
        el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`
        el.style.pointerEvents = ease > 0.6 ? 'auto' : 'none'
      }

      const active = Math.min(n - 1, Math.max(0, Math.round(pos)))
      if (active !== lastActive) {
        lastActive = active
        for (let i = 0; i < n; i++) {
          if (i === active) items[i].setAttribute('data-active', 'true')
          else items[i].removeAttribute('data-active')
        }
        if (counterRef?.current) {
          counterRef.current.textContent = String(active + 1).padStart(2, '0')
        }
      }
      if (barRef?.current) barRef.current.style.transform = `scaleX(${progress.toFixed(4)})`
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
