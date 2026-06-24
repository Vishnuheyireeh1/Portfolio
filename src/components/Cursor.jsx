import { useEffect, useRef } from 'react'
import styles from './Cursor.module.css'

// Custom cursor: an instant dot + a lagging ring that reshapes by context.
//  • links / buttons         → ring grows a little
//  • [data-cursor="view"]    → big dark circle with ↗ (project images)
//  • [data-cursor="open"]    → accent circle with → (menu options)
// Disabled on touch / coarse-pointer devices.
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const arrowRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return

    const dot = dotRef.current
    const ring = ringRef.current
    const arrow = arrowRef.current
    document.body.classList.add('cursor-custom')

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...pos }

    // Default cursor is the big contrast dot (always). Project images and
    // menu options swap it for their own shapes.
    const setMode = (target) => {
      const el = target.closest?.('[data-cursor]')
      const kind = el ? el.getAttribute('data-cursor') : ''

      ring.classList.toggle(styles.view, kind === 'view')
      ring.classList.toggle(styles.open, kind === 'open')
      dot.classList.toggle(styles.hidden, !!kind)
      arrow.textContent = kind === 'view' ? '↗' : kind === 'open' ? '→' : ''
    }

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      dot.style.transform = `translate(${pos.x}px, ${pos.y}px)`
    }
    const onOver = (e) => setMode(e.target)
    const onDown = () => ring.classList.add(styles.down)
    const onUp = () => ring.classList.remove(styles.down)

    let raf = 0
    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.15
      ringPos.y += (pos.y - ringPos.y) * 0.15
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerover', onOver)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.body.classList.remove('cursor-custom')
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className={styles.ring} aria-hidden="true">
        <span ref={arrowRef} className={styles.arrow} />
      </div>
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
    </>
  )
}
