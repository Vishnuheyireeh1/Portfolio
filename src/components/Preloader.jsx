import { useEffect, useRef, useState } from 'react'
import { HELLO_LETTERS } from './HelloMark'
import styles from './Preloader.module.css'

// Intro preloader: a solid panel shows a big staggered HELLO, holds, then the
// word smoothly flies up and shrinks onto the small top-centre HelloMark while
// the panel fades away — a shared-element handoff, so HELLO appears to "dock"
// into the header and stay there.
export default function Preloader() {
  const [phase, setPhase] = useState('intro') // 'intro' | 'dock' | 'gone'
  const [dockStyle, setDockStyle] = useState(null)
  const wordRef = useRef(null)
  const timers = useRef([])

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const MIN_MS = 2300 // hold the big HELLO at least this long
    const DOCK_MS = 1600 // must match the CSS fly/scale transition
    const start = performance.now()
    let done = false

    const dock = () => {
      if (done) return
      done = true

      // FLIP: measure the big word + the small target mark, then build the
      // transform that flies one exactly onto the other.
      const word = wordRef.current
      const target = document.querySelector('[data-hello-mark]')
      if (word && target) {
        const a = word.getBoundingClientRect()
        const b = target.getBoundingClientRect()
        const scale = b.width / a.width
        const dx = b.left + b.width / 2 - (a.left + a.width / 2)
        const dy = b.top + b.height / 2 - (a.top + a.height / 2)
        setDockStyle({ transform: `translate(${dx}px, ${dy}px) scale(${scale})` })
      }
      setPhase('dock')

      // Reveal the resting top mark just as the word lands on it — never before.
      timers.current.push(
        setTimeout(() => {
          document.documentElement.classList.add('intro-done')
        }, DOCK_MS - 150)
      )
      timers.current.push(
        setTimeout(() => {
          document.body.style.overflow = prevOverflow
          setPhase('gone')
        }, DOCK_MS + 250)
      )
    }

    const schedule = () => {
      const wait = Math.max(0, MIN_MS - (performance.now() - start))
      timers.current.push(setTimeout(dock, wait))
    }

    // Dock once the page is ready, but never before the minimum hold.
    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })

    return () => {
      timers.current.forEach(clearTimeout)
      window.removeEventListener('load', schedule)
      document.body.style.overflow = prevOverflow
    }
  }, [])

  if (phase === 'gone') return null

  return (
    <div
      className={`${styles.loader} ${phase === 'dock' ? styles.dock : ''}`}
      aria-hidden="true"
    >
      <span ref={wordRef} className={styles.word} style={dockStyle || undefined}>
        {HELLO_LETTERS.map((l, i) => (
          <span
            key={i}
            className={styles.letter}
            style={{ '--dy': `${l.dy}em`, '--delay': `${0.25 + i * 0.13}s` }}
          >
            {l.c}
          </span>
        ))}
      </span>
    </div>
  )
}
