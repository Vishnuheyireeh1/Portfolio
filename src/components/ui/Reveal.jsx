import { useInView } from '../../hooks/useInView'
import styles from './Reveal.module.css'

// Wraps children and fades/slides them in the first time they scroll
// into view. `delay` (ms) lets you stagger groups of items.
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  children,
  ...rest
}) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${inView ? styles.in : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
