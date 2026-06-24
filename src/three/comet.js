import * as THREE from 'three'
import { makeGlowTexture, makeHaloTexture } from './glowTexture'

// The cursor light: a wide soft halo + a bright head + a short fading trail.
// The head eases toward a target point (the cursor, in world space); the
// trailing sprites follow its recent positions so quick moves streak and a
// resting cursor settles into a soft bloom.
export function makeComet({ trail = 11 } = {}) {
  const glow = makeGlowTexture()
  const halo = makeHaloTexture()
  const group = new THREE.Group()
  const HEAD = 26

  // Wide soft wash behind everything.
  const haloSprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: halo,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.6,
    })
  )
  haloSprite.scale.set(95, 95, 1)
  group.add(haloSprite)

  // Bright head + trail.
  const sprites = []
  for (let i = 0; i < trail; i++) {
    const material = new THREE.SpriteMaterial({
      map: glow,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: Math.pow(1 - i / trail, 1.7),
    })
    const sprite = new THREE.Sprite(material)
    const scale = i === 0 ? HEAD : 4 + 15 * (1 - i / trail)
    sprite.scale.set(scale, scale, 1)
    group.add(sprite)
    sprites.push(sprite)
  }

  const history = []
  const head = new THREE.Vector3()

  return {
    object: group,
    update(target, t) {
      head.lerp(target, 0.12)

      history.unshift(head.clone())
      if (history.length > trail) history.pop()

      for (let i = 0; i < sprites.length; i++) {
        sprites[i].position.copy(history[Math.min(i, history.length - 1)])
      }

      // Halo trails the head softly and breathes.
      haloSprite.position.lerp(head, 0.06)
      const hs = 95 + Math.sin(t * 0.9) * 8
      haloSprite.scale.set(hs, hs, 1)

      const s = HEAD + Math.sin(t * 1.6) * 2
      sprites[0].scale.set(s, s, 1)
    },
    dispose() {
      glow.dispose()
      halo.dispose()
      haloSprite.material.dispose()
      sprites.forEach((s) => s.material.dispose())
    },
  }
}
