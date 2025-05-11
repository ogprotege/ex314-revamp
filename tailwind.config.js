/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Chat interface specific colors
        "dark-bg": "#1A1A1A",
        "card-bg": "#252525",
        "input-bg": "#2A2A2A",
        "border-color": "#383838",
        "border-color-light": "#444",
        "gray-custom": "#A0A0A0",
        "accent-purple": "#9333EA", // Tailwind purple-600
        "purple-hover": "#7E22CE", // Tailwind purple-700
        "accent-gold": "#D4AF37", // Update to match the logo color
        "loading-dot": "#9333EA",
        // Liturgical colors
        "liturgical-green": {
          light: "#10b981", // Emerald-500
          dark: "#065f46", // Emerald-800
          muted: "#d1fae5", // Emerald-100
        },
        "liturgical-purple": {
          light: "#8b5cf6", // Violet-500
          dark: "#5b21b6", // Violet-800
          muted: "#ede9fe", // Violet-100
        },
        "liturgical-white": {
          light: "#f9fafb", // Gray-50
          dark: "#f3f4f6", // Gray-100
          muted: "#ffffff", // White
          accent: "#D4AF37", // Gold accent
        },
        "liturgical-red": {
          light: "#ef4444", // Red-500
          dark: "#b91c1c", // Red-700
          muted: "#fee2e2", // Red-100
        },
        "liturgical-rose": {
          light: "#f472b6", // Pink-400
          dark: "#be185d", // Pink-700
          muted: "#fce7f3", // Pink-100
        },
        "liturgical-black": {
          light: "#171717", // Neutral-900
          dark: "#0a0a0a", // Neutral-950
          muted: "#404040", // Neutral-700
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
