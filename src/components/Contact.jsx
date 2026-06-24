import { content } from '../data/content'
import Reveal from './ui/Reveal'
import styles from './Contact.module.css'

export default function Contact() {
  const { contact, meta, socials } = content

  return (
    <section id="contact" className={styles.contact}>
      <div className="shell">
        <Reveal as="span" className={styles.kicker}>
          {contact.kicker}
        </Reveal>

        <Reveal as="h2" className={styles.title} delay={80}>
          {contact.title}
        </Reveal>

        <Reveal className={styles.actions} delay={160}>
          <a className={styles.email} href={`mailto:${meta.email}`}>
            {meta.email}
            <span className={styles.emailArrow}>↗</span>
          </a>
          <p className={styles.note}>{contact.note}</p>
        </Reveal>

        <Reveal className={styles.socials} delay={220}>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className={styles.social}>
              {s.label}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
