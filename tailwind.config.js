/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        surface: "var(--color-surface)",
        royal: "var(--color-royal)",
        electric: "var(--color-electric)",
        paper: "var(--color-paper)",
        muted: "var(--color-muted)",
        natal: {
          red: "var(--color-natal-red)",
          gold: "var(--color-natal-gold)",
        },
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },
    },
  },
  plugins: [],
};
