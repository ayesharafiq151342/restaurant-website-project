/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0c1e21",
        accent: "#1e8a8a",
        whitebg: "#f6f4ee",
        textDark: "#1E1B4B",
        card: "#FFFFFF",
        border: "#E0E7FF",
      },
      borderRadius: {
        base: "0.5rem",
      },
      spacing: {
        4.5: "1.125rem",
      },

      /* ✅ ADD FONTS HERE */
      fontFamily: {
        atkinson: ['"Atkinson Hyperlegible Mono"', 'monospace'],
        tharoma: ['Tharoma', 'sans-serif'],      
        montserrat: ['Montserrat', 'sans-serif'],
         bangers: ['Bangers', 'cursive'],

      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};

export default config;
