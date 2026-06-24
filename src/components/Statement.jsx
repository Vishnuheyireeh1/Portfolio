import { useRef } from 'react'
import { content } from '../data/content'
import { useWordReveal } from '../hooks/useWordReveal'
import styles from './Statement.module.css'

// Pinned scroll-reveal statement (text fills in word-by-word as you scroll).
export default function Statement() {
  const wrapRef = useRef(null)
  const wordEls = useRef([])
  const words = content.intro.text.split(' ')

  useWordReveal(wrapRef, wordEls)

  return (
    <section ref={wrapRef} className={styles.wrap} aria-label="Introduction">
      <div className={styles.sticky}>
        <p className={styles.text}>
          {words.map((w, i) => (
            <span
              key={i}
              ref={(el) => (wordEls.current[i] = el)}
              className={styles.word}
            >
              {w}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
