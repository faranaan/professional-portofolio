/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          light: '#ecf0f3',
          dark: '#051b32',
        },
        surface: {
          light: '#ffffff',
          dark: '#0a2746',
        },
        text: {
          mainLight: '#1f2937',
          mutedLight: '#64748b',
          mainDark: '#f8fafc',
          mutedDark: '#94a3b8',
        },
        accent: {
          DEFAULT: '#2563eb',
          hover: '#1d4ed8',
        }
      }
    },
  },
  plugins: [],
}