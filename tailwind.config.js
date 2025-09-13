module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#ffffff', // white for light mode
          dark: '#000000',  // black for dark mode
        },
        secondary: {
          light: '#000000', // black for light mode
          dark: '#ffffff',  // white for dark mode
        },
      },
    },
  },
  plugins: [],
};
