import * as THREE from 'three'
import { makeStarfield } from './starfield'
import { makeParticles } from './particles'
import { makeComet } from './comet'
import { makeHaloTexture } from './glowTexture'
import { scrollState } from '../lib/scrollState'

// Assembles the renderer/scene/camera, wires inputs (pointer + scroll),
// and runs the animation loop. The comet glow tracks the cursor in world
// space, over two parallax star layers and a faint nebula haze.
export function createScene(canvas, { reduce = false } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))

  // The cosmic starfield belongs to the dark theme; in light mode it fades
  // back so the cream page + cursor smoke carry the look.
  const applyTheme = (theme) => {
    canvas.style.opacity = theme === 'light' ? '0.32' : '1'
  }
  applyTheme(document.documentElement.getAttribute('data-theme') || 'light')
  const onTheme = (e) => applyTheme(e.detail)
  window.addEventListener('themechange', onTheme)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000)
  camera.position.set(0, 0, 60)

  const starFar = makeStarfield({
    count: 1500, size: 0.9, depth: 240, depthOffset: -130, rotSpeed: 0.006, opacity: 0.55,
  })
  const starNear = makeStarfield({
    count: 600, size: 1.7, depth: 150, depthOffset: -20, rotSpeed: 0.015, opacity: 0.95, twinkleSpeed: 1.1,
  })
  const particles = makeParticles()
  const comet = makeComet()
  scene.add(starFar.object, starNear.object, particles.object, comet.object)

  // Ambient nebula haze for depth and colour.
  const haloTex = makeHaloTexture()
  const nebulas = [
    { x: -42, y: 28, z: -90, s: 170, c: 0x6d5cff, o: 0.22 },
    { x: 55, y: -12, z: -110, s: 220, c: 0x3b4ad0, o: 0.16 },
  ].map((n) => {
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: haloTex, transparent: true, depthWrite: false,
        blending: THREE.AdditiveBlending, opacity: n.o, color: new THREE.Color(n.c),
      })
    )
    sprite.position.set(n.x, n.y, n.z)
    sprite.scale.set(n.s, n.s, 1)
    sprite.userData = n
    scene.add(sprite)
    return sprite
  })

  const mouse = new THREE.Vector2(0, 0) // eased, NDC
  const target = new THREE.Vector2(0, 0) // raw pointer, NDC
  const ray = new THREE.Vector3()
  const cometTarget = new THREE.Vector3()

  function resize() {
    const w = window.innerWidth
    const h = window.innerHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }

  function onPointer(e) {
    target.x = (e.clientX / window.innerWidth) * 2 - 1
    target.y = -((e.clientY / window.innerHeight) * 2 - 1)
  }

  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', onPointer)

  function cursorToWorld(t) {
    ray.set(mouse.x, mouse.y, 0.5).unproject(camera)
    ray.sub(camera.position).normalize()
    const dist = -camera.position.z / ray.z
    cometTarget.copy(camera.position).add(ray.multiplyScalar(dist))
    cometTarget.x += Math.sin(t * 0.5) * 1.4
    cometTarget.y += Math.cos(t * 0.4) * 1.1
    return cometTarget
  }

  const clock = new THREE.Clock()
  let raf = 0

  function loop() {
    raf = requestAnimationFrame(loop)
    const t = reduce ? 0 : clock.getElapsedTime()

    mouse.x += (target.x - mouse.x) * 0.08
    mouse.y += (target.y - mouse.y) * 0.08

    starFar.update(t)
    starNear.update(t)
    particles.update(t)
    comet.update(cursorToWorld(t), t)

    for (const n of nebulas) {
      n.position.x = n.userData.x + Math.sin(t * 0.05 + n.userData.z) * 8
      n.position.y = n.userData.y + Math.cos(t * 0.04 + n.userData.z) * 6
    }

    // Subtle camera parallax + gentle downward drift while scrolling.
    camera.position.x += (mouse.x * 3 - camera.position.x) * 0.04
    camera.position.y +=
      (-mouse.y * 2 - scrollState.progress * 26 - camera.position.y) * 0.04
    camera.lookAt(0, scrollState.progress * -10, 0)

    renderer.render(scene, camera)
  }
  loop()

  return {
    dispose() {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('themechange', onTheme)
      starFar.dispose()
      starNear.dispose()
      particles.dispose()
      comet.dispose()
      nebulas.forEach((n) => n.material.dispose())
      haloTex.dispose()
      renderer.dispose()
    },
  }
}
