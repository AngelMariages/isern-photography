const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': ['0.68rem', {
          letterSpacing: '.1rem',
          lineHeight: '1.7rem',
        }],
      },
      fontFamily: {
        sans: ["Rajdhani", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        pulseArrow: "pulseArrow 2s ease-in-out infinite",
      },
      keyframes: {
        pulseArrow: {
          "0%, 100%": {
            opacity: 0,
          },
          "50%": {
            opacity: 1,
          },
        }
      }
    }
  },
  plugins: [
    require("tailwindcss-animation-delay"),
  ],
}
