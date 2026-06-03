import { css } from 'styled-components'

export const darkTheme = {
  name: 'dark',
  colors: {
    bg: {
      primary: '#0d1117',
      secondary: '#161b22',
      tertiary: '#21262d',
      overlay: 'rgba(0, 0, 0, 0.6)',
    },
    border: {
      default: '#30363d',
      muted: '#21262d',
    },
    text: {
      primary: '#e6edf3',
      secondary: '#8b949e',
      muted: '#6e7681',
      link: '#58a6ff',
    },
    accent: {
      blue: '#58a6ff',
      green: '#3fb950',
      red: '#f85149',
      yellow: '#d29922',
      purple: '#a371f7',
      orange: '#e3b341',
    },
    ui: {
      success: { bg: '#1a4731', border: '#3fb950', text: '#3fb950' },
      error: { bg: '#3d1516', border: '#f85149', text: '#f85149' },
      warning: { bg: '#2d2100', border: '#d29922', text: '#d29922' },
      info: { bg: '#0c2d6b', border: '#58a6ff', text: '#58a6ff' },
    },
  },
  fonts: {
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  radii: {
    sm: '4px',
    md: '6px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 12px rgba(0, 0, 0, 0.4)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
    glow: '0 0 20px rgba(88, 166, 255, 0.15)',
  },
  transitions: {
    fast: '150ms ease',
    base: '250ms ease',
    slow: '400ms ease',
  },
  zIndex: {
    modal: 1000,
    snackbar: 1100,
    tooltip: 1200,
  },
}

export const lightTheme = {
  ...darkTheme,
  name: 'light',
  colors: {
    bg: {
      primary: '#ffffff',
      secondary: '#f6f8fa',
      tertiary: '#eaeef2',
      overlay: 'rgba(0, 0, 0, 0.3)',
    },
    border: {
      default: '#d0d7de',
      muted: '#eaeef2',
    },
    text: {
      primary: '#1f2328',
      secondary: '#656d76',
      muted: '#818b98',
      link: '#0969da',
    },
    accent: {
      blue: '#0969da',
      green: '#1a7f37',
      red: '#d1242f',
      yellow: '#9a6700',
      purple: '#8250df',
      orange: '#bc4c00',
    },
    ui: {
      success: { bg: '#dafbe1', border: '#1a7f37', text: '#1a7f37' },
      error: { bg: '#ffebe9', border: '#d1242f', text: '#d1242f' },
      warning: { bg: '#fff8c5', border: '#9a6700', text: '#9a6700' },
      info: { bg: '#ddf4ff', border: '#0969da', text: '#0969da' },
    },
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.08)',
    md: '0 4px 12px rgba(0, 0, 0, 0.12)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.16)',
    glow: '0 0 20px rgba(9, 105, 218, 0.15)',
  },
}

const breakpoints = {
  xs: 375,
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
}

export const media = Object.fromEntries(
  Object.entries(breakpoints).map(([key, value]) => [
    key,
    (strings, ...interpolations) => css`
      @media (max-width: ${value}px) {
        ${css(strings, ...interpolations)}
      }
    `,
  ])
)

export const mediaUp = Object.fromEntries(
  Object.entries(breakpoints).map(([key, value]) => [
    key,
    (strings, ...interpolations) => css`
      @media (min-width: ${value}px) {
        ${css(strings, ...interpolations)}
      }
    `,
  ])
)
