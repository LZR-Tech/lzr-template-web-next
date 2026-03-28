import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // Design System tokens da LZR
      // Ref: https://code.lzrtechnologies.com
    },
  },
  plugins: [],
}

export default config
