/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        terminal: {
          bg: '#0a0b0d',
          surface: '#111216',
          panel: '#16181d',
          border: '#242730',
          borderLight: '#323642',
          muted: '#808594',
          text: '#e2e4e9',
          accent: '#d97706',      // 上品なアンバーゴールド
          accentLight: '#fbbf24',
          accentRed: '#ef4444',
          accentGreen: '#10b981',
          accentBlue: '#38bdf8',
        }
      }
    },
  },
  plugins: [],
}
