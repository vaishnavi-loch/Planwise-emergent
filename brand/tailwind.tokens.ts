// Planwise brand tokens — values from Brand_Guidelines.pdf.
// Paste into tailwind.config.ts under theme.extend. No hard-coded hex in components.

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
      'legal-financial': '#4DA7D9', // Blue — Financial & Legal
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
    sans: ['var(--font-sans)', 'Futura PT', 'Century Gothic', 'system-ui', 'sans-serif']
  }
} as const;
