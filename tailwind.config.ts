// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: '#ffffff',
          dark: '#121212'
        },
        text: {
          light: '#000000',
          dark: '#ffffff'
        }
      },
    },
  },
  plugins: [],
} satisfies Config;