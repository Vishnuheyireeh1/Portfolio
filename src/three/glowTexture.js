import * as THREE from 'three'

// Bright, layered bloom for the comet head + trail (tight core, soft falloff).
export function makeGlowTexture(size = 160) {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  const r = size / 2

  const g = ctx.createRadialGradient(r, r, 0, r, r, r)
  g.addColorStop(0.0, 'rgba(255, 255, 255, 1)')
  g.addColorStop(0.06, 'rgba(244, 240, 255, 0.95)')
  g.addColorStop(0.18, 'rgba(196, 181, 253, 0.55)')
  g.addColorStop(0.42, 'rgba(124, 140, 255, 0.18)')
  g.addColorStop(0.7, 'rgba(99, 102, 241, 0.05)')
  g.addColorStop(1.0, 'rgba(99, 102, 241, 0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

// Wide, very soft wash used for the cursor halo + ambient nebula haze.
export function makeHaloTexture(size = 256) {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  const r = size / 2

  const g = ctx.createRadialGradient(r, r, 0, r, r, r)
  g.addColorStop(0.0, 'rgba(180, 165, 255, 0.5)')
  g.addColorStop(0.35, 'rgba(135, 125, 240, 0.18)')
  g.addColorStop(0.7, 'rgba(110, 110, 230, 0.05)')
  g.addColorStop(1.0, 'rgba(110, 110, 230, 0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

// Tiny soft dot for the starfield points.
export function makeDotTexture(size = 64) {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  const r = size / 2

  const g = ctx.createRadialGradient(r, r, 0, r, r, r)
  g.addColorStop(0.0, 'rgba(255, 255, 255, 1)')
  g.addColorStop(0.4, 'rgba(255, 255, 255, 0.55)')
  g.addColorStop(1.0, 'rgba(255, 255, 255, 0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}
