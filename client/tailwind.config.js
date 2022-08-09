/* eslint-disable*/
/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
    colors: { ...colors },
  },
  plugins: ["@tailwindcss/forms"],
};
