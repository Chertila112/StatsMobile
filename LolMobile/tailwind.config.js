/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#ffffff',
          secondary: '#f2f2f2',
          tertiary: '#e6e6e6'
        },
        dark: {
          primary: '#000000',
          secondary: '#0d0d0d',
          tertiary: '#1a1a1a' 
        }
      }
    },
  },
  plugins: [],
}

