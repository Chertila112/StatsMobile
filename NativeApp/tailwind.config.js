/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
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
          primary: '#1a1a1a',
          secondary: '#595959',
          tertiary: '#b0b0b0'
        }
      }
    },
  },
  plugins: [],
}
