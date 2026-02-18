/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        shark: {
          950: "#050505", // Extreme dark background
          900: "#0F1115", // Card background
          50: "#E2E8F0", // Text
          accent: "#00E5FF", // Electric Cyan
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Archivo Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
