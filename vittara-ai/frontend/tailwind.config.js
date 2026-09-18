/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FAF7F0",
        navy: "#0F1F3D",
        "navy-light": "#1E3357",
        aqua: "#2EC4C6",
        blue: {
          accent: "#2D5DF0",
        },
        orange: {
          muted: "#E8895A",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        sans: ["'Inter'", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(15,31,61,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,31,61,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "28px 28px",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
