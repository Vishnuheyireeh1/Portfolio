import { useEffect, useState } from 'react'
import { initTheme, toggleTheme } from '../lib/theme'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    setTheme(initTheme())
  }, [])

  const onClick = () => setTheme(toggleTheme())

  return (
    <button
      type="button"
      className={styles.btn}
      onClick={onClick}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title="Toggle theme"
    >
      <span className={styles.track}>
        <span className={`${styles.knob} ${theme === 'light' ? styles.light : ''}`}>
          <svg className={styles.moon} viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M21 12.8A8.5 8.5 0 0 1 11.2 3a7 7 0 1 0 9.8 9.8Z"
              fill="currentColor"
            />
          </svg>
          <svg className={styles.sun} viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4.2" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5 5l1.6 1.6M17.4 17.4 19 19M19 5l-1.6 1.6M6.6 17.4 5 19" />
            </g>
          </svg>
        </span>
      </span>
    </button>
  )
}
