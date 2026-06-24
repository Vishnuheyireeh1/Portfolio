import { useRef, useState } from 'react'
import { content } from '../data/content'
import ProjectDetail from './ProjectDetail'
import { useScrollStory } from '../hooks/useScrollStory'
import styles from './Work.module.css'

export default function Work() {
  const { work } = content
  const projects = work.projects

  const wrapRef = useRef(null)
  const rollRef = useRef(null)
  const imgEls = useRef([])
  const textEls = useRef([])
  const chapterEls = useRef([])
  const [active, setActive] = useState(null)

  useScrollStory(wrapRef, {
    rollRef,
    imagesRef: imgEls,
    textsRef: textEls,
    chaptersRef: chapterEls,
    activeClass: styles.chapterOn,
    step: 1,
  })

  const pad = (i) => String(i + 1).padStart(2, '0')

  return (
    <section id="work" ref={wrapRef} className={styles.work}>
      <div className={styles.sticky}>
        <div className={`shell ${styles.frame}`}>
          {/* Heading — stays put. */}
          <div className={styles.head}>
            <span className={styles.kicker}>{work.kicker}</span>
            <h2 className={styles.title}>{work.title}</h2>
          </div>

          {/* Left chapter index. */}
          <ul className={styles.chapters} aria-hidden="true">
            {projects.map((p, i) => (
              <li
                key={p.slug}
                ref={(el) => (chapterEls.current[i] = el)}
                className={styles.chapter}
              >
                <span className={styles.chapterNo}>{pad(i)}</span>
                <span className={styles.chapterName}>{p.title}</span>
              </li>
            ))}
          </ul>

          {/* Giant rolling number, bottom-left. */}
          <div className={styles.numWindow} aria-hidden="true">
            <div ref={rollRef} className={styles.numRoll}>
              {projects.map((p, i) => (
                <span key={p.slug} className={styles.num}>
                  {pad(i)}
                </span>
              ))}
            </div>
          </div>

          {/* Image stage — active centred, next peeks in bottom-right. */}
          <div className={styles.stage}>
            {projects.map((p, i) => (
              <button
                key={p.slug}
                ref={(el) => (imgEls.current[i] = el)}
                type="button"
                className={styles.shot}
                data-cursor="view"
                onClick={() => setActive(p)}
                aria-label={`Open ${p.title} case study`}
              >
                <img src={p.cover} alt={p.title} loading="lazy" draggable="false" />
                <span className={styles.shotMeta}>
                  <span className={styles.shotName}>{p.title}</span>
                  <span className={styles.shotTag}>{p.tag}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Right-side description (crossfades per project). */}
          <div className={styles.texts}>
            {projects.map((p, i) => (
              <div
                key={p.slug}
                ref={(el) => (textEls.current[i] = el)}
                className={styles.text}
              >
                <span className={styles.tag}>{p.tag}</span>
                <p className={styles.lead}>{p.detail?.tagline || p.desc}</p>
                <p className={styles.sub}>{p.desc}</p>
                <button
                  type="button"
                  className={styles.more}
                  onClick={() => setActive(p)}
                >
                  View case study <span aria-hidden="true">↗</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {active && (
        <ProjectDetail project={active} onClose={() => setActive(null)} />
      )}
    </section>
  )
}
