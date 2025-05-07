/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#204F8C',
        secondary: '#A68521',
        'primary-dark': '#1A4173',
        'secondary-dark': '#A67926',
        blue: {
          50: '#e6ebf2',
          100: '#ccd7e6',
          200: '#99afc6',
          300: '#6687a6',
          400: '#335f86',
          500: '#204F8C',
          600: '#1A4173',
          700: '#102647',
          800: '#0b1a2f',
          900: '#050d18'
        },
        yellow: {
          50: '#fdf8e6',
          100: '#fbf1cc',
          200: '#f7e399',
          300: '#f3d566',
          400: '#efc733',
          500: '#A68521',
          600: '#A67926',
          700: '#8c6b1f',
          800: '#735618',
          900: '#594211'
        }
      }
    },
  },
  plugins: [],
};