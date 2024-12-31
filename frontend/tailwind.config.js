import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Thème clair
        'primary': {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#baddff',
          300: '#84c5ff',
          400: '#48a6ff',
          500: '#1a85ff',
          600: '#0062ff',
          700: '#0047cc',
          800: '#003ba8',
          900: '#003494',
        },
        'accent': {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        // Thème sombre
        'dark': {
          'bg': '#0a0b1e',
          'surface': '#131429',
          'border': '#2a2c4a',
          'text': '#e2e8f0',
          'text-secondary': '#94a3b8'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
