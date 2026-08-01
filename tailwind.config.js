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
        devibe: {
          red: '#E11D48',
          blue: '#2563EB',
          green: '#059669',
          yellow: '#D97706',
          dark: '#0F172A',
          gray: '#64748B',
          light: '#F8FAFC',
        },
        levis: {
          red: '#E11D48',
        },
        brand: {
          dark: '#0F172A',
          card: '#FFFFFF',
          indigo: '#2563EB',
          emerald: '#059669',
          muted: '#64748B',
          red: '#E11D48'
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
