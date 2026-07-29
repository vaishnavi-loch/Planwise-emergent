// CommonJS mirror of tailwind.tokens.ts so tailwind.config.js can require() it at build time.
// Keep in sync with tailwind.tokens.ts. This is the same object, single source of hex values.
const planwiseTokens = {
  colors: {
    navy: { DEFAULT: '#384967', 80: '#5A6885', 60: '#7C87A3', 40: '#9DA6C1', 20: '#CED2E0' },
    pillar: {
      purpose: '#41AC6B',
      'legal-financial': '#4DA7D9',
      'mind-body': '#AB82BB',
      'where-how': '#F79C5B'
    },
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
};
module.exports = { planwiseTokens };
