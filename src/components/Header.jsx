import { useEffect, useRef, useState } from 'react'
import { content } from '../data/content'
import { getLenis } from '../lib/smoothScroll'
import styles from './Header.module.css'

export default function Header() {
  const { meta, menu, cta, socials } = content
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const go = (e, href) => {
    if (href && href.startsWith('#')) {
      e.preventDefault()
      setOpen(false)
      const lenis = getLenis()
      if (lenis) lenis.scrollTo(href, { offset: 0 })
      else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDoc)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDoc)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header ref={ref} className={styles.header}>
        <div className={styles.bar}>
        <a className={styles.brand} href="#top" onClick={(e) => go(e, '#top')}>
          <span className={styles.name}>{meta.name}</span>
          <span className={styles.role}>{meta.role}</span>
        </a>
        <button
          type="button"
          className={`${styles.menuBtn} ${open ? styles.menuBtnOpen : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`${styles.menu} ${open ? styles.open : ''}`} role="menu">
        <nav className={styles.links}>
          {menu.map((m, i) => (
            <a
              key={m.href}
              href={m.href}
              className={styles.link}
              data-cursor="open"
              role="menuitem"
              onClick={(e) => go(e, m.href)}
              style={{ transitionDelay: `${open ? 50 + i * 45 : 0}ms` }}
            >
              <span className={styles.linkIndex}>0{i + 1}</span>
              <span className={styles.linkLabel}>{m.label}</span>
              <span className={styles.linkArrow}>↗</span>
            </a>
          ))}
        </nav>

        <a className={styles.cta} href={cta.href} onClick={(e) => go(e, cta.href)}>
          {cta.label}
        </a>

        <div className={styles.socials}>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
        </div>
      </header>

      <a className={styles.contact} href={cta.href} onClick={(e) => go(e, cta.href)}>
        {cta.label}
      </a>
    </>
  )
}
