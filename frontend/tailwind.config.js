/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          green: '#00FF41',
          yellow: '#FFFF00',
          magenta: '#FF00FF',
          blue: '#00FFFF',
        }
      },
      boxShadow: {
        'brutal': '8px 8px 0px 0px rgba(255, 255, 255, 1)',
        'brutal-green': '8px 8px 0px 0px #00FF41',
        'brutal-yellow': '8px 8px 0px 0px #FFFF00',
        'brutal-magenta': '8px 8px 0px 0px #FF00FF',
        'brutal-sm': '4px 4px 0px 0px rgba(255, 255, 255, 1)',
        'brutal-sm-green': '4px 4px 0px 0px #00FF41',
      },
      fontFamily: {
        'vt323': ['"VT323"', 'monospace'],
        'mono': ['"Space Mono"', 'monospace'],
        'geist': ['Geist', 'sans-serif'],
        'instrument': ['"Instrument Serif"', 'serif'],
      }
    },
  },
  plugins: [],
}

