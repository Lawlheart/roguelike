/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    colors: {
      // rogue: {
      //   100: "#f76e02",
      //   200: "#f68002",
      //   300: "#f79101",
      //   400: "#f59e02",
      //   500: "#f2b104",
      // },
    },
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(bg|text|border)-(rogue)(-)(100|200|300|400|500)/,
    },
  ],
};