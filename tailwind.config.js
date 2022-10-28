const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
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
        fadeIn: "fadeIn .3s cubic-bezier(0.47, 0, 0.745, 0.715)",
        fadeOut: "fadeOut .3s cubic-bezier(0.47, 0, 0.745, 0.715)",
      },
      keyframes: {
        pulseArrow: {
          "0%, 100%": {
            opacity: 0,
          },
          "50%": {
            opacity: 1,
          },
        },
        fadeIn: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        fadeOut: {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
      }
    }
  },
  plugins: [
    require("tailwindcss-animation-delay"),
  ],
}
