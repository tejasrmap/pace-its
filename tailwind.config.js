/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#073B60',
          50: '#EBF3F8',
          100: '#D6E5F1',
          200: '#ADCBE3',
          300: '#85B0D5',
          400: '#5C96C7',
          500: '#347CB9',
          600: '#226095',
          700: '#174771',
          800: '#073B60', // Primary Navy
          900: '#052D49', // Deep Navy
          950: '#062C46', // Dark Background
        },
        gold: {
          DEFAULT: '#E9AC21',
          light: '#F6C54A',
          hover: '#D39815',
          dark: '#B27D0B',
          50: '#FEF9EC',
          100: '#FDF1D0',
          200: '#FBE2A1',
          300: '#F8D372',
          400: '#F6C54A',
          500: '#E9AC21',
          600: '#CA8E12',
          700: '#9C6C0A',
        },
        surface: {
          light: '#F5F7F9',
          border: '#E4E9EF',
          muted: '#718096',
          body: '#283746',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        condensed: ['Oswald', 'Impact', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'premium': '0 20px 40px -15px rgba(7, 59, 96, 0.15)',
        'premium-hover': '0 30px 60px -15px rgba(7, 59, 96, 0.25)',
        'gold-glow': '0 0 30px rgba(233, 172, 33, 0.35)',
      }
    },
  },
  plugins: [],
};

