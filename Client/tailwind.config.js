/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "#4e4e4e",
            h1: {
              fontSize: "36px",
              fontWeight: 600,
              margin: "0",
            },
            h2: {
              fontSize: "25px",
              fontWeight: 600,
              margin: "0",
            },
            h3: {
              fontSize: "20px",
              fontWeight: 600,
              margin: "0",
            },
            p: {
              margin: 0
            },
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
