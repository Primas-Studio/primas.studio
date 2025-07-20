/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'professional': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        'accent': {
          'blue': '#3b82f6',
          'light': '#60a5fa',
          'dark': '#2563eb',
        },
        'dark': {
          100: '#1a1a1a',
          200: '#111111',
          300: '#000000',
        }
      },
      backgroundImage: {
        'professional-gradient': 'linear-gradient(135deg, #000000 0%, #111111 50%, #1a1a1a 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'button-gradient': 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
      },
      boxShadow: {
        'professional': '0 0 20px rgba(59, 130, 246, 0.2)',
        'professional-lg': '0 0 40px rgba(59, 130, 246, 0.25)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'inner-glow': 'inset 0 0 10px rgba(59, 130, 246, 0.1)',
      },
      animation: {
        'typing': 'typing 1.5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        typing: {
          '0%, 60%': { opacity: '0.3' },
          '30%': { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)' 
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.2)' 
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
