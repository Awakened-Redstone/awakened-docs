const colors = require('tailwindcss/colors')

const makePrimaryColor = l => ({opacityValue}) => {
  return (
    `hsl(var(--nextra-primary-hue) var(--nextra-primary-saturation) ${l}%` +
    (opacityValue ? ` / ${opacityValue})` : ')')
  )
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./docs/**/*.{js,jsx,ts,tsx,md,mdx}"
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        dark: '#111',
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000',
        white: '#fff',
        gray: colors.gray,
        slate: colors.slate,
        neutral: colors.neutral,
        red: colors.red,
        orange: colors.orange,
        blue: colors.blue,
        yellow: colors.yellow,
        primary: {
          50: makePrimaryColor(97),
          100: makePrimaryColor(94),
          200: makePrimaryColor(86),
          300: makePrimaryColor(77),
          400: makePrimaryColor(66),
          500: makePrimaryColor(50),
          600: makePrimaryColor(45),
          700: makePrimaryColor(39),
          750: makePrimaryColor(35),
          800: makePrimaryColor(32),
          900: makePrimaryColor(24)
        }
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}

