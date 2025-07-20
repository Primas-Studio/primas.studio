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
        'cyber': {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        'neon': {
          'green': '#64ffda',
          'blue': '#40e0d0',
          'purple': '#bb86fc',
          'pink': '#ff79c6',
        },
        'dark': {
          100: '#1a1a1a',
          200: '#0f0f0f',
          300: '#000000',
        }
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #000000 0%, #0f0f0f 50%, #1a1a1a 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'button-gradient': 'linear-gradient(135deg, rgba(100, 255, 218, 0.1) 0%, rgba(64, 224, 208, 0.1) 100%)',
      },
      boxShadow: {
        'cyber': '0 0 20px rgba(100, 255, 218, 0.3)',
        'cyber-lg': '0 0 40px rgba(100, 255, 218, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'inner-glow': 'inset 0 0 10px rgba(100, 255, 218, 0.2)',
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
            boxShadow: '0 0 20px rgba(100, 255, 218, 0.1)' 
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(100, 255, 218, 0.3)' 
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
