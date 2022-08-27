/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            900: '#0D47A1',
            800: '#1565C0',
            700: '#1976D2',
            600: '#1E88E5',
            500: '#2196F3',
            400: '#42A5F5',
            300: '#64B5F6',
            200: '#90CAF9',
            100: '#BBDEFB',
            50: '#E3F2FD',
          },
        },
      },
    },
  },
  plugins: [],
}
