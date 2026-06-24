import { content } from '../data/content'
import Reveal from './ui/Reveal'
import styles from './Services.module.css'

export default function Services() {
  const { services } = content

  return (
    <section id="services" className={styles.services}>
      <div className="shell">
        <Reveal as="h2" className={styles.title}>
          {services.title}
        </Reveal>

        <div className={styles.grid}>
          {services.items.map((s, i) => (
            <Reveal as="article" key={s.no} className={styles.item} delay={(i % 3) * 80}>
              <span className={styles.no}>{s.no}</span>
              <h3 className={styles.name}>{s.name}</h3>
              <p className={styles.desc}>{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
