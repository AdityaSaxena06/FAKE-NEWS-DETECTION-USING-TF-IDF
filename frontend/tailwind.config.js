import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070A14',
          900: '#0B1020', // Main Dark Navy
          850: '#0E1528',
          800: '#141C35',
          700: '#1D284B',
          600: '#2A3A68',
        },
        electric: {
          400: '#6BA0FF',
          500: '#4F8CFF', // Electric Blue Accent
          600: '#3A74E8',
          700: '#295DC4',
        },
        truth: {
          real: '#10B981', // Emerald for Real
          fake: '#F43F5E', // Rose for Fake
          neutral: '#38BDF8', // Cyan for Info
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(79, 140, 255, 0.25)',
        'glow-real': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'glow-fake': '0 0 25px -5px rgba(244, 63, 94, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('light', ':is(.light &)');
    }),
  ],
}
