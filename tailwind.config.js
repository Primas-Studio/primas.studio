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
        'chat-bg': '#212121',
        'chat-input': '#2f2f2f',
        'chat-user': '#10a37f',
        'chat-assistant': '#444654',
      },
      animation: {
        'typing': 'typing 1.5s ease-in-out infinite',
      },
      keyframes: {
        typing: {
          '0%, 60%': { opacity: 0 },
          '30%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
