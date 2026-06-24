import * as THREE from 'three'
import { makeDotTexture } from './glowTexture'

// Foreground floating dust: soft particles that drift slowly upward with a
// gentle horizontal sway, wrapping around when they leave the field.
export function makeParticles({ count = 150 } = {}) {
  const RANGE_X = 200
  const RANGE_Y = 130
  const positions = new Float32Array(count * 3)
  const speed = new Float32Array(count)
  const sway = new Float32Array(count)
  const phase = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * RANGE_X
    positions[i * 3 + 1] = (Math.random() - 0.5) * RANGE_Y
    positions[i * 3 + 2] = Math.random() * 60 - 10
    speed[i] = 0.8 + Math.random() * 1.6
    sway[i] = 1.5 + Math.random() * 3
    phase[i] = Math.random() * Math.PI * 2
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const map = makeDotTexture()
  const material = new THREE.PointsMaterial({
    map,
    color: 0xd8d4ff,
    size: 2.1,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  const points = new THREE.Points(geometry, material)
  const pos = geometry.attributes.position
  let last = 0

  return {
    object: points,
    update(t) {
      const dt = Math.min(t - last, 0.05)
      last = t
      for (let i = 0; i < count; i++) {
        let y = pos.array[i * 3 + 1] + speed[i] * dt * 2
        if (y > RANGE_Y / 2) y = -RANGE_Y / 2
        pos.array[i * 3 + 1] = y
        pos.array[i * 3] += Math.sin(t * 0.4 + phase[i]) * sway[i] * dt
      }
      pos.needsUpdate = true
      material.opacity = 0.42 + Math.sin(t * 0.6) * 0.1
    },
    dispose() {
      geometry.dispose()
      material.dispose()
      map.dispose()
    },
  }
}
