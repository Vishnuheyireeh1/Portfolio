import { content } from '../data/content'
import Reveal from './ui/Reveal'
import styles from './About.module.css'

export default function About() {
  const { about } = content

  return (
    <section id="about" className={styles.about}>
      <div className="shell">
        <Reveal as="span" className={styles.kicker}>
          {about.kicker}
        </Reveal>

        <Reveal as="p" className={styles.statement} delay={80}>
          {about.statement}
        </Reveal>

        <div className={styles.grid}>
          <div className={styles.bio}>
            {about.paragraphs.map((text, i) => (
              <Reveal as="p" key={i} className={styles.para} delay={120 + i * 90}>
                {text}
              </Reveal>
            ))}
          </div>

          <div className={styles.cols}>
            {about.columns.map((col, i) => (
              <Reveal key={col.title} className={styles.col} delay={160 + i * 110}>
                <h3 className={styles.colTitle}>{col.title}</h3>
                <ul className={styles.colList}>
                  {col.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
