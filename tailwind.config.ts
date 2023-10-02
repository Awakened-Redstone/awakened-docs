import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,md,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,md,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
