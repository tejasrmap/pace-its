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
        pace: {
          navy: '#123D5A',
          'navy-deep': '#0B2C43',
          gold: '#E5AD35',
          'gold-light': '#F6C54A',
          bg: '#F8FAFB',
          'bg-alt': '#F1F4F6',
          text: '#172B3A',
          'text-muted': '#687783',
          border: '#E2E8F0',
        },
        navy: {
          DEFAULT: '#123D5A',
          50: '#F0F5F9',
          100: '#E1EBF2',
          200: '#C2D7E6',
          300: '#A4C3DA',
          400: '#679BBE',
          500: '#2A72A3',
          600: '#1D5A83',
          700: '#154769',
          800: '#123D5A', // Primary Navy
          900: '#0B2C43', // Deep Navy
          950: '#071E2E',
        },
        gold: {
          DEFAULT: '#E5AD35',
          light: '#F6C54A',
          hover: '#CF9B2D',
          dark: '#B08221',
          50: '#FEFBF3',
          100: '#FDF6E2',
          200: '#FAECC1',
          300: '#F6E1A0',
          400: '#EFCB5F',
          500: '#E5AD35',
          600: '#CF9B2D',
          700: '#A8791F',
        },
        surface: {
          light: '#F8FAFB',
          alt: '#F1F4F6',
          border: '#E2E8F0',
          muted: '#687783',
          body: '#172B3A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        condensed: ['Oswald', 'Impact', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(18, 61, 90, 0.05), 0 1px 2px 0 rgba(18, 61, 90, 0.03)',
        'premium': '0 10px 25px -5px rgba(18, 61, 90, 0.08), 0 8px 10px -6px rgba(18, 61, 90, 0.05)',
        'premium-hover': '0 20px 30px -10px rgba(18, 61, 90, 0.15)',
        'gold-glow': '0 0 25px rgba(229, 173, 53, 0.3)',
      }
    },
  },
  plugins: [],
};
