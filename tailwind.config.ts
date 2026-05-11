import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FAF8F3",
          dark:    "#F0EAE0",
          border:  "#E5DDD3",
        },
        espresso: {
          DEFAULT: "#1C1917",
          light:   "#2D2520",
          subtle:  "#3D3530",
        },
        coffee: {
          DEFAULT: "#C4955A",
          light:   "#D4AB76",
          dark:    "#A07040",
          mist:    "#F5E8D0",
        },
        sage: {
          DEFAULT: "#6B9A70",
          light:   "#A8C4A6",
          mist:    "#E8F0E8",
        },
        muted:  "#78716C",
        stone:  "#6E6862",
      },
      fontFamily: {
        sans:  ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      animation: {
        "fade-up":   "fadeUp 0.7s ease-out forwards",
        "fade-in":   "fadeIn 0.5s ease-out forwards",
        "marquee":   "marquee 30s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
