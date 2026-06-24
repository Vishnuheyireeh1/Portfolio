import { content } from '../data/content'
import Reveal from './ui/Reveal'
import styles from './Hero.module.css'

export default function Hero() {
  const { hero } = content

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.inner}>
        <Reveal as="h1" className={styles.headline}>
          {hero.lead} <em className={styles.accent}>{hero.accent}</em>
          {hero.rest}
        </Reveal>

        <div className={styles.meta}>
          {hero.facts.map((f, i) => (
            <Reveal key={f.label} className={styles.fact} delay={150 + i * 90}>
              <span className={styles.factLabel}>{f.label}</span>
              <span className={styles.factValue}>{f.value}</span>
            </Reveal>
          ))}
        </div>
      </div>

      <div className={styles.portrait} data-cursor="view" aria-hidden="true">
        {hero.image ? (
          <img
            className={styles.portraitImg}
            src={hero.image}
            alt=""
            draggable="false"
          />
        ) : (
          <span className={styles.portraitNote}>
            Drop your portrait here
            <br />
            <code>src/components/Hero.jsx</code>
          </span>
        )}
      </div>
    </section>
  )
}
