import { useEffect } from 'react'
import { getLenis } from '../lib/smoothScroll'
import styles from './ProjectDetail.module.css'

// In-page case-study overlay: a dark translucent backdrop + a scrollable panel
// with the project's write-up, tech, screenshots and an optional video.
export default function ProjectDetail({ project, onClose }) {
  useEffect(() => {
    const lenis = getLenis()
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  if (!project) return null
  const d = project.detail || {}

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={project.title}>
      <div className={styles.backdrop} onClick={onClose} />

      <div className={styles.panel} data-lenis-prevent>
        <button className={styles.close} onClick={onClose} aria-label="Close">
          ✕
        </button>

        <header className={styles.head}>
          <span className={styles.tag}>{project.tag}</span>
          <h2 className={styles.title}>{project.title}</h2>
          {d.tagline && <p className={styles.tagline}>{d.tagline}</p>}
          <div className={styles.metaRow}>
            <span>{project.year}</span>
            {d.role && <span>{d.role}</span>}
          </div>
        </header>

        {d.video && (
          <video
            className={styles.video}
            src={d.video}
            poster={project.cover}
            controls
            playsInline
          />
        )}

        {d.overview && (
          <section className={styles.block}>
            <h3 className={styles.blockTitle}>Overview</h3>
            <p className={styles.body}>{d.overview}</p>
          </section>
        )}

        {d.features?.length > 0 && (
          <section className={styles.block}>
            <h3 className={styles.blockTitle}>Key features</h3>
            <ul className={styles.features}>
              {d.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>
        )}

        {d.tech?.length > 0 && (
          <section className={styles.block}>
            <h3 className={styles.blockTitle}>Tech stack</h3>
            <div className={styles.chips}>
              {d.tech.map((t) => (
                <span key={t} className={styles.chip}>
                  {t}
                </span>
              ))}
            </div>
          </section>
        )}

        {d.screenshots?.length > 0 && (
          <section className={styles.block}>
            <h3 className={styles.blockTitle}>Screens</h3>
            <div className={styles.shots}>
              {d.screenshots.slice(0, 2).map((src, i) => (
                <img
                  key={i}
                  className={styles.shot}
                  src={src}
                  alt={`${project.title} screen ${i + 1}`}
                  loading="lazy"
                  draggable="false"
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
