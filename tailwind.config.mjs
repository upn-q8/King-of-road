/** @type {import('tailwindcss').Config} */
export default {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "main-green": "#3B745B",
        "dark-green": "#2F6B51",
        "light-green": "#3B745B1A",
        "main-orange": "#F36E21",
        "mid-orange": "#FEB91B",
        "light-orange": "#F36E2133",
        "main-yellow": "#FEB91B",
        "light-yellow": "#CFB80C4D",
      },
      fontSize: {
        xl: "1.375rem",
      },
      textColor: {
        "main-black": "#2A2A2A",
      },
    },
  },
  plugins: [],
};
