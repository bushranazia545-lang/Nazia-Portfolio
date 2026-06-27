import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        cream: '#f5f4f0',
        'cream-dark': '#faf9f7',
        charcoal: '#1a1a1a',
        'charcoal-light': '#6b6b6b',
        muted: '#999',
        'accent-gold': '#d4a853',
        'border-custom': '#e0dfd9',
        'folder-blue': '#dbeafe',
        'folder-beige': '#fef3c7',
        'folder-green': '#dcfce7',
        'folder-pink': '#fce7f3',
        'folder-purple': '#f3e8ff',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-diagonal': 'floatDiagonal 6s ease-in-out infinite',
        'float-right': 'floatRight 4.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatDiagonal: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(8px, -10px)' },
        },
        floatRight: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(212,168,83,0.4)' },
          '50%': { boxShadow: '0 0 20px rgba(212,168,83,0.8)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
