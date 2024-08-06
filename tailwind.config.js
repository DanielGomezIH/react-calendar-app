/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          '50': '#eff3ff',
          '100': '#dbe4fe',
          '200': '#bfcffe',
          '300': '#93aefd',
          '400': '#6088fa',
          '500': '#3b6bf6',
          '600': '#2558eb',
          '700': '#1d4dd8',
          '800': '#1e44af',
          '900': '#1e3a8a',
          '950': '#172754',
        },
      }
    },
  },
  plugins: [],
};
