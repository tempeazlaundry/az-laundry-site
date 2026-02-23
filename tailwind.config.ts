import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: "#8C1D40",
        "maroon-dark": "#5C132A",
        gold: "#FFC627",
        "gold-dark": "#D1A01F",
        dark: "#333333",
        "off-white": "#F9F9F9",
        footer: "#1A1A1A",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
