import { useRef } from 'react'
import { content } from '../data/content'
import { useWordReveal } from '../hooks/useWordReveal'
import styles from './Testimonial.module.css'

// "Kind words" — pinned, and the quote fills word-by-word as you scroll.
export default function Testimonial() {
  const { testimonial } = content
  const wrapRef = useRef(null)
  const wordEls = useRef([])
  const words = testimonial.quote.split(' ')

  useWordReveal(wrapRef, wordEls, { dim: 0.16 })

  return (
    <section ref={wrapRef} className={styles.wrap} aria-label="Kind words">
      <div className={styles.sticky}>
        <div className="shell">
          <span className={styles.kicker}>{testimonial.kicker}</span>
          <blockquote className={styles.quote}>
            <span className={styles.mark}>“</span>
            {words.map((w, i) => (
              <span
                key={i}
                ref={(el) => (wordEls.current[i] = el)}
                className={styles.word}
              >
                {w}{' '}
              </span>
            ))}
            <span className={styles.mark}>”</span>
          </blockquote>
          <div className={styles.author}>
            <span className={styles.name}>{testimonial.author}</span>
            <span className={styles.role}>{testimonial.role}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
