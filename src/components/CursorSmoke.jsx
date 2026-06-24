import { useEffect, useRef } from 'react'

// A soft, blurred luminous blob that trails the cursor. Colour + blend mode
// come from CSS variables (--glow / --glow-blend), so it adapts to the
// active theme automatically. Disabled on touch devices.
export default function CursorSmoke() {
  const ref = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const el = ref.current
    const p = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const c = { ...p }

    const onMove = (e) => {
      p.x = e.clientX
      p.y = e.clientY
    }

    let raf = 0
    const loop = () => {
      c.x += (p.x - c.x) * 0.12
      c.y += (p.y - c.y) * 0.12
      el.style.transform = `translate(${c.x}px, ${c.y}px)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    window.addEventListener('pointermove', onMove)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <div ref={ref} className="cursor-smoke" aria-hidden="true" />
}
