const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Rajdhani': ["Rajdhani", ...defaultTheme.fontFamily.sans],
      }
    }
  },
  plugins: [],
}
