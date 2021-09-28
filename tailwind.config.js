// const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#252a41",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
