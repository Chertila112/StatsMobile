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
          1: '#111111',
          2: '#232323',
          3: '#343434',
          4: '#464646',
          5: '#575757',
          6: '#696969',
          7: '#9C9C9C'
        },
        util: {
          1: '#a9ff68',
          2: '#e9b7ce'
        }
      }
    },
  },
  plugins: [],
}
