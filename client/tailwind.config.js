/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  //The theme object allows you to customize Tailwind's default theme.
  theme: {
    //extend: By using extend, you're adding to Tailwind's default settings without overriding them.
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
