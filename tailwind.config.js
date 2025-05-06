/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1c4075',
        secondary: '#ad902b',
        blue: {
          50: '#e6ebf2',
          100: '#ccd7e6',
          200: '#99afc6',
          300: '#6687a6',
          400: '#335f86',
          500: '#1c4075',
          600: '#16335e',
          700: '#102647',
          800: '#0b1a2f',
          900: '#050d18'
        }
      }
    },
  },
  plugins: [],
};