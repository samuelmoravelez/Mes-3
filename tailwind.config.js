/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: '#171B35',
        abyss: '#11152B',
        rosesky: '#E9A9C4',
        rosecloud: '#F8E8E9',
        cream: '#FBF2E2',
        creamdeep: '#E8DCC4',
        nebula: '#3B2E5C',
        plum: '#5B4A7A',
        gold: {
          DEFAULT: '#D9B77E',
          soft: '#EAD2A6',
          deep: '#B8945A',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'Times New Roman', 'serif'],
        script: ['"Great Vibes"', '"Cormorant Garamond"', 'cursive'],
        body: ['Jost', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.32em',
      },
      boxShadow: {
        halo: '0 0 24px rgba(233,169,196,0.35)',
        goldhalo: '0 0 28px rgba(217,183,126,0.4)',
        card: '0 24px 60px -24px rgba(0,0,0,0.75)',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.25', transform: 'scale(0.85)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-16px,0)' },
          '100%': { transform: 'translate3d(0,0,0)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.06)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.09)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.06)' },
          '70%': { transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        shootingStar: {
          '0%': { transform: 'translate3d(0,0,0) rotate(14deg)', opacity: '0' },
          '8%': { opacity: '1' },
          '70%': { opacity: '0.9' },
          '100%': { transform: 'translate3d(58vw, 34vh, 0) rotate(14deg)', opacity: '0' },
        },
      },
      animation: {
        twinkle: 'twinkle 3.4s ease-in-out infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        drift: 'drift 12s ease-in-out infinite',
        breathe: 'breathe 7s ease-in-out infinite',
        heartbeat: 'heartbeat 2.6s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        shootingStar: 'shootingStar 3.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
