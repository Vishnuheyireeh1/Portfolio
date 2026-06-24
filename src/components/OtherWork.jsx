import { content } from '../data/content'
import Reveal from './ui/Reveal'
import styles from './OtherWork.module.css'

// Compact, honest list of client / company projects (no solo case-study claims).
export default function OtherWork() {
  const { clientWork } = content
  if (!clientWork?.items?.length) return null

  return (
    <section id="client-work" className={styles.section}>
      <div className="shell">
        <div className={styles.head}>
          <Reveal as="span" className={styles.kicker}>
            {clientWork.kicker}
          </Reveal>
          <Reveal as="h2" className={styles.title} delay={60}>
            {clientWork.title}
          </Reveal>
          {clientWork.note && (
            <Reveal as="p" className={styles.note} delay={120}>
              {clientWork.note}
            </Reveal>
          )}
        </div>

        <ul className={styles.list}>
          {clientWork.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.name}
              className={styles.item}
              delay={140 + i * 80}
            >
              <div className={styles.itemMain}>
                <h3 className={styles.name}>{item.name}</h3>
                <p className={styles.desc}>{item.desc}</p>
              </div>
              <div className={styles.tech}>
                {item.tech.map((t) => (
                  <span key={t} className={styles.chip}>
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
