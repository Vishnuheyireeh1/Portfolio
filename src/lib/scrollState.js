// Tiny shared mutable scroll state.
// Lenis writes to it (see hooks/useLenis), the three.js scene reads it
// every frame. Keeps the 3D background loosely coupled from React.

export const scrollState = {
  y: 0, // pixels scrolled
  progress: 0, // 0 → 1 over the whole page
  velocity: 0, // current scroll velocity (signed)
}
