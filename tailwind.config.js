/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.jsx',
    './src/routes/**/*.jsx',
    './src/**/*.js',
    './src/*.jsx',
    './**/*.html'
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
