/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',  // blue-600
          dark: '#1d4ed8',     // blue-700
          light: '#3b82f6',    // blue-500
        },
        secondary: {
          DEFAULT: '#475569',  // slate-600
          dark: '#334155',     // slate-700
          light: '#64748b',    // slate-500
        },
        success: {
          DEFAULT: '#22c55e',  // green-500
          dark: '#16a34a',     // green-600
        },
        warning: {
          DEFAULT: '#f59e0b',  // amber-500
          dark: '#d97706',     // amber-600
        },
        error: {
          DEFAULT: '#ef4444',  // red-500
          dark: '#dc2626',     // red-600
        }
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '2rem',
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      minHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ],
  darkMode: 'class'
};