/** @type {import('tailwindcss').Config} */
// Brand tokens live in /brand/tailwind.tokens.ts and are pasted under theme.extend below.
const { planwiseTokens } = require('./brand/tailwind.tokens.cjs');

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './content/**/*.{md,mdx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1400px' }
    },
    extend: {
      colors: {
        // Planwise brand — from brand/tailwind.tokens.ts
        navy: planwiseTokens.colors.navy,
        pillar: planwiseTokens.colors.pillar,
        accent: {
          ...planwiseTokens.colors.accent,
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        // Original shadcn semantic tokens (kept for radix primitives)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' }
      },
      fontFamily: {
        sans: planwiseTokens.fontFamily.sans
      },
      // Site-wide type scale, bumped ~10% over Tailwind's defaults for readability.
      fontSize: {
        xs: ['0.825rem', { lineHeight: '1.1rem' }],
        sm: ['0.9625rem', { lineHeight: '1.375rem' }],
        base: ['1.1rem', { lineHeight: '1.65rem' }],
        lg: ['1.2375rem', { lineHeight: '1.925rem' }],
        xl: ['1.375rem', { lineHeight: '1.925rem' }],
        '2xl': ['1.65rem', { lineHeight: '2.2rem' }],
        '3xl': ['2.0625rem', { lineHeight: '2.475rem' }],
        '4xl': ['2.475rem', { lineHeight: '2.75rem' }],
        '5xl': ['3.3rem', { lineHeight: '1' }],
        '6xl': ['4.125rem', { lineHeight: '1' }],
        '7xl': ['4.95rem', { lineHeight: '1' }],
        '8xl': ['6.6rem', { lineHeight: '1' }],
        '9xl': ['8.8rem', { lineHeight: '1' }]
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'fade-in-up': { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-up': 'fade-in-up 400ms ease-out both'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
