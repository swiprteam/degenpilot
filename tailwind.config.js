/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00A7DC',
        secondary: '#0C2243',
        success: '#58C502'
      }
    },
  },
  plugins: [],
}

