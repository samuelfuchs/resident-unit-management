import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-teal-500",
    "bg-red-500",
    "bg-pink-500",
    "bg-orange-500",
    "bg-indigo-500",
    "border-blue-500",
    "border-green-500",
    "border-yellow-500",
    "border-purple-500",
    "border-teal-500",
    "border-red-500",
    "border-pink-500",
    "border-orange-500",
    "border-indigo-500",
    "hover:bg-blue-500",
    "hover:bg-green-500",
    "hover:bg-yellow-500",
    "hover:bg-purple-500",
    "hover:bg-teal-500",
    "hover:bg-red-500",
    "hover:bg-pink-500",
    "hover:bg-orange-500",
    "hover:bg-indigo-500",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;
