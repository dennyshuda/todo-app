/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A87FE",
        secondary: "#FA3B3B",
      },
    },
  },
  plugins: [],
};
