/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light mode
        'logo-deep':        '#0D1B3C',
        'background-light': '#F4F4F4',
        'font-light':       '#2C2C2E',
        'border-light':     '#FFFFFF',
        // Dark mode
        'logo-light':       '#4A90E2',
        'background-dark':  '#2C2C2E',
        'font-dark':        '#FFFFFF',
        'border-dark':      '#8E44AD',
      }
    },
  },
  plugins: [],
}
