/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        levis: {
          red: '#E11D48',
          dark: '#0F172A',
          gray: '#64748B',
          light: '#F8FAFC',
        },
        ucb: {
          blue: '#2563EB',
          green: '#059669',
          yellow: '#D97706',
          orange: '#EA580C',
        },
        brand: {
          dark: '#0F172A',
          card: '#FFFFFF',
          indigo: '#2563EB',
          emerald: '#059669',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      minHeight: {
        touch: '48px',
      },
      minWidth: {
        touch: '48px',
      }
    },
  },
  plugins: [],
}
