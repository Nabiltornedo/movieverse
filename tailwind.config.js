/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#14121C',
          soft: '#1E1B29',
          raised: '#262236',
        },
        paper: {
          DEFAULT: '#F6F1E7',
          soft: '#FFFFFF',
          raised: '#EDE6D6',
        },
        gold: {
          DEFAULT: '#E3A934',
          bright: '#F0C05C',
          dim: '#8A6A22',
        },
        crimson: {
          DEFAULT: '#B23A48',
          bright: '#D14F5F',
        },
        ink900: '#F3EFE6',
        ink600: '#A9A2B8',
        light900: '#1C1A22',
        light600: '#6B6478',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', '"Times New Roman"', 'serif'],
        body: [
          '"Inter"',
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 12px 30px -12px rgba(0,0,0,0.5)',
        glow: '0 0 0 1px rgba(227,169,52,0.4), 0 12px 30px -8px rgba(227,169,52,0.25)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        riseIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s linear infinite',
        riseIn: 'riseIn 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}
