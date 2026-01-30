import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0052cc", // Royal Blue
        secondary: "#172B4D",
        "background-light": "#ffffff",
        "background-dark": "#111827",
        "surface-light": "#f4f5f7",
        "surface-dark": "#1f2937",
        "border-light": "#e5e7eb",
        "border-dark": "#374151",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        'xl': '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};
export default config;
