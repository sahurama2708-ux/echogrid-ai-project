/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#070b14',
        cardBg: '#0d1527',
        cardBorder: '#172342',
      },
    },
  },
  plugins: [],
}