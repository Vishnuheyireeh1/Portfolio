import { content } from '../data/content'
import { getLenis } from '../lib/smoothScroll'
import styles from './Footer.module.css'

export default function Footer() {
  const { meta } = content

  const toTop = (e) => {
    e.preventDefault()
    const lenis = getLenis()
    if (lenis) lenis.scrollTo('#top', { offset: 0 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.inner}`}>
        <span className={styles.copy}>
          © {meta.name}
        </span>
        <a href="#top" className={styles.top} onClick={toTop}>
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
