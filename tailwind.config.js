/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#ebd8c0',
        primary: '#2d70b9',
        secondary: '#93d0dd',
        salmon: '#fac5c6',
        darksalmon: '#ea7579',
      },
    },
  },
  plugins: [],
};
