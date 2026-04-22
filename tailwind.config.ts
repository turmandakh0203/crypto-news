import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './types/**/*.{js,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        bebas: ['var(--font-bebas)'],
        SpaceGrotesk: ['var(--font-space)'],
        ttNormsPro: ['var(--font-tt-norms-pro)'],
      },
      colors: {
        bg:      'var(--bg)',
        surface: 'var(--surface)',
        border:  'var(--border)',
        ink:     'rgb(var(--ink) / <alpha-value>)',
        muted:   'rgb(var(--muted) / <alpha-value>)',
        faint:   'var(--faint)',
        accent:  '#e63329',
      },
      TextGradientColor: {
        brand: 'linear-gradient(90deg, rgb(255,201,134) 0%, rgb(254,39,38) 40%)',
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
