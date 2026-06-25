import styles from './HelloMark.module.css'

// Small persistent "HELLO" pinned to the top-centre — the resting place the
// intro preloader flies into. Mirrors the live Clock at the bottom-centre.
// Letters carry the same staggered offsets (in em) as the intro word so the
// preloader's fly-in lands on it exactly.
export const HELLO_LETTERS = [
  { c: 'H', dy: 0.18 },
  { c: 'E', dy: -0.22 },
  { c: 'L', dy: 0.07 },
  { c: 'L', dy: 0.28 },
  { c: 'O', dy: -0.14 },
]

export default function HelloMark() {
  return (
    <div className={styles.mark} data-hello-mark aria-hidden="true">
      {HELLO_LETTERS.map((l, i) => (
        <span key={i} className={styles.letter} style={{ '--dy': `${l.dy}em` }}>
          {l.c}
        </span>
      ))}
    </div>
  )
}
