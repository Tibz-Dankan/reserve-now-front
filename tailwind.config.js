/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: "#7950f2",
      "primary-dark": "#5f3dc4",
      "primary-light": "#b197fc",
      secondary: "#4c6ef5",
      "secondary-light": "#91a7ff",
      white: "#f8fafc",
      black: "#09090b",
      "gray-light-1": "#f3f4f6",
      "gray-light-2": "#e5e7eb",
      "gray-light-3": "#d1d5db",
      "gray-light-4": "#9ca3af",
      "gray-dark-1": "#4b5563",
      "gray-dark-2": "#374151",
      "gray-dark-3": "#1f2937",
      "gray-dark-4": "#111827",
    },
  },
  plugins: [],
};
