import { useRef } from 'react'
import { content } from '../data/content'
import Reveal from './ui/Reveal'
import { useScrollRoster } from '../hooks/useScrollRoster'
import styles from './Stack.module.css'

export default function Stack() {
  const { stack } = content
  const wrapRef = useRef(null)
  const listRef = useRef(null)
  const itemEls = useRef([])
  const noteEls = useRef([])
  const counterRef = useRef(null)

  // Flatten the grouped tools into one ordered list, keeping each item's
  // category label.
  const items = stack.groups.flatMap((g) =>
    g.items.map((t) => ({ ...t, cat: g.name })),
  )

  useScrollRoster(wrapRef, {
    listRef,
    itemsRef: itemEls,
    notesRef: noteEls,
    counterRef,
    step: 0.4,
  })

  return (
    <section id="stack" ref={wrapRef} className={styles.stack}>
      <div className={styles.sticky}>
        {/* Heading — stays pinned while the roster + text move. */}
        <div className={`shell ${styles.headWrap}`}>
          <Reveal as="span" className={styles.kicker}>
            {stack.kicker}
          </Reveal>
          <Reveal as="h2" className={styles.title} delay={60}>
            {stack.title}
          </Reveal>
        </div>

        <div className={`shell ${styles.stageWrap}`}>
          {/* LEFT — rolling tool names, each with a small logo. */}
          <div className={styles.roster}>
            <ul ref={listRef} className={styles.names}>
              {items.map((t, i) => (
                <li
                  key={t.name}
                  ref={(el) => (itemEls.current[i] = el)}
                  className={styles.nameItem}
                  style={{ '--brand': t.color || 'var(--text)' }}
                >
                  <span
                    className={styles.nLogo}
                    aria-hidden="true"
                    style={{
                      WebkitMaskImage: `url("${t.icon}")`,
                      maskImage: `url("${t.icon}")`,
                    }}
                  />
                  <span className={styles.nName}>{t.name}</span>
                  {/* Shown only in the static (mobile / reduced-motion) layout. */}
                  <span className={styles.nNote}>{t.note}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — big index + category + the active definition. */}
          <div className={styles.detail}>
            <span ref={counterRef} className={styles.num}>
              01
            </span>
            <div className={styles.notes}>
              {items.map((t, i) => (
                <div
                  key={t.name}
                  ref={(el) => (noteEls.current[i] = el)}
                  className={styles.note}
                >
                  <span className={styles.noteCat}>{t.cat}</span>
                  <p className={styles.noteText}>{t.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
