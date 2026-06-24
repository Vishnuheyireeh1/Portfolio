import { useEffect, useState } from 'react'
import styles from './Clock.module.css'

// Thin, semi-transparent live time + date, pinned to the bottom-centre.
export default function Clock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const time = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  const date = now.toLocaleDateString([], {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className={styles.clock} aria-hidden="true">
      <span className={styles.time}>{time}</span>
      <span className={styles.dot} />
      <span className={styles.date}>{date}</span>
    </div>
  )
}
