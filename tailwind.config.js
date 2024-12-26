module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "2xs": "10px",
        "3xs": "8px",
      },
      fontFamily: {
        logo: "'Montserrat', sans-serif",
      },
      colors: {
        fedex: {
          DEFAULT: "#4d148c",
          bg: "#f2f2f2",
          light: "#fafafa",
          secondary: "#ff6200",
        },
      },
    },
  },
  plugins: [],
};
