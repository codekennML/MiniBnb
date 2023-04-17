/** @type {import('tailwindcss').Config} */

const theme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    // "./pages/**/*.{js,ts,jsx,tsx}",
    // "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: colors.rose["500"],
        secondary: colors.gray["600"],
        bright: colors.white,
      },
    },
  },
  plugins: [
    // require("@tailwindcss/typography"),
    // require("prettier-plugin-tailwindcss"),
  ],
};
