// tailwind.config.js
import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

/** @type {Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Include NextUI's theme files from node_modules
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class", // Enables dark mode using the "class" strategy
  plugins: [nextui(), require('tailwind-scrollbar')({ nocompatible: true }),
    
  ], // Adds NextUI's Tailwind plugin
};

export default config;
