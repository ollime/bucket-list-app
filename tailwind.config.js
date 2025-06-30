/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#ebd8c0',
        secondary: '#2d70b9',
        salmon: '#fac5c6',
        darksalmon: '#ea7579',
      },
    },
  },
  plugins: [],
};
