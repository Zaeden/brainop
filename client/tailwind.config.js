/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        placeholderImage: "url('/assets/images/image-placeholder.jpg')",
      },
      colors: {
        hotPink: {
          100: "#fbe3eb",
          200: "#f7b8cd",
          300: "#f38caa",
          400: "#ef6088",
          500: "#ea4b8b",
          600: "#d23874",
          700: "#b32b5e",
          800: "#922046",
          900: "#721732",
        },
        softPink: {
          100: "#fce7e7",
          200: "#f8c0c0",
          300: "#f49898",
          400: "#f07070",
          500: "#e58d8c",
          600: "#cc7a7a",
          700: "#b36666",
          800: "#994f4f",
          900: "#803a3a",
        },
        paleYellow: {
          100: "#fdf7e4",
          200: "#fcebb8",
          300: "#fbde8a",
          400: "#fad25c",
          500: "#f4d086",
          600: "#e0bb6a",
          700: "#cca54e",
          800: "#b98e32",
          900: "#a57817",
        },
        midnightBlue: {
          900: "#0d0c22",
        },
      },
      transitionProperty: {
        outline: "outline",
      },
    },
  },
  plugins: [],
};
