import { useEffect, useRef } from 'react'
import { createScene } from './scene'
import styles from './Background.module.css'

// Full-viewport fixed canvas that hosts the three.js starfield + comet.
export default function Background() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = createScene(canvasRef.current, { reduce })
    return () => scene.dispose()
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
