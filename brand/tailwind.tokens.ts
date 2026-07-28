// Planwise brand tokens — values from Brand_Guidelines.pdf.
// Paste into tailwind.config.ts under theme.extend. No hard-coded hex in components.
//
// FONT IS PROVISIONAL. Brand font is "Agenda" (Adobe), fallback "Futura PT" — both are
// licensed Adobe fonts, not free webfonts. Using a geometric-sans fallback until the client
// confirms an Adobe Fonts web kit ID or approves a substitute. Swap `fontFamily.sans` then.

export const planwiseTokens = {
  colors: {
    // Primary — the star of every layout
    navy: {
      DEFAULT: '#384967',
      80: '#5A6885',
      60: '#7C87A3',
      40: '#9DA6C1',
      20: '#CED2E0'
    },
    // Secondary — ONE colour per pillar. Use only for its pillar, or as small accents.
    pillar: {
      purpose: '#41AC6B', // Green — Purpose
      'legal-financial': '#4DA7D9', // Blue — Legal & Financial
      'mind-body': '#AB82BB', // Purple — Mind & Body
      'where-how': '#F79C5B' // Orange — Where & How You Live
    },
    // Tertiary — illustration accents only, not UI
    accent: {
      'dark-green': '#284734',
      indigo: '#44499C',
      maroon: '#672E45',
      pink: '#A73A64',
      'dark-orange': '#A65523',
      lipstick: '#C5003E',
      mustard: '#C69214',
      tobacco: '#91852C'
    }
  },
  fontFamily: {
    // PROVISIONAL — see note above.
    sans: ['Jost', 'Futura PT', 'Century Gothic', 'system-ui', 'sans-serif']
  }
} as const;
