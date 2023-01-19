/** @type {import('tailwindcss').Config} */
module.exports = {
  "fontawesome-svg-core": {
    license: "free",
  },
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), "macros"],
};
