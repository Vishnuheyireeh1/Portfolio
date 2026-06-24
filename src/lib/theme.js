// Dark / light theme: stored on <html data-theme>, persisted to
// localStorage, and broadcast via a 'themechange' event so the three.js
// scene (and anything else) can react.
// Bumped to 'theme-v2' so any previously-saved 'dark' preference is
// discarded and everyone starts on the new light-first default.
const KEY = 'theme-v2'
let timer = 0

export function getTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light'
}

export function applyTheme(theme) {
  const root = document.documentElement
  root.setAttribute('data-theme', theme)

  // Temporarily enable colour transitions for a smooth cross-fade.
  root.classList.add('theming')
  window.clearTimeout(timer)
  timer = window.setTimeout(() => root.classList.remove('theming'), 650)

  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }))
}

export function initTheme() {
  let theme = 'light'
  try {
    theme = localStorage.getItem(KEY) || 'light'
  } catch {
    /* ignore */
  }
  document.documentElement.setAttribute('data-theme', theme)
  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }))
  return theme
}

export function toggleTheme() {
  const next = getTheme() === 'dark' ? 'light' : 'dark'
  try {
    localStorage.setItem(KEY, next)
  } catch {
    /* ignore */
  }
  applyTheme(next)
  return next
}
