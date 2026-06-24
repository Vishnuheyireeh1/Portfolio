import * as THREE from 'three'
import { makeDotTexture } from './glowTexture'

// One drifting, twinkling layer of stars. Create two layers at different
// depths/sizes for a sense of parallax.
export function makeStarfield({
  count = 1200,
  size = 1.3,
  spreadX = 340,
  spreadY = 220,
  depth = 280,
  depthOffset = -60,
  color = 0xcdd2ff,
  rotSpeed = 0.01,
  twinkleSpeed = 0.8,
  opacity = 0.85,
} = {}) {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spreadX
    positions[i * 3 + 1] = (Math.random() - 0.5) * spreadY
    positions[i * 3 + 2] = (Math.random() - 0.5) * depth + depthOffset
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const map = makeDotTexture()
  const material = new THREE.PointsMaterial({
    map,
    color,
    size,
    sizeAttenuation: true,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  const points = new THREE.Points(geometry, material)

  return {
    object: points,
    update(t) {
      points.rotation.y = t * rotSpeed
      points.rotation.x = Math.sin(t * 0.05) * 0.02
      material.opacity = opacity * (0.82 + Math.sin(t * twinkleSpeed) * 0.16)
    },
    dispose() {
      geometry.dispose()
      material.dispose()
      map.dispose()
    },
  }
}
