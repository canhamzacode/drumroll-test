/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        tablet: '970px'
      },
      boxShadow: {
        custom1: '0px 4px 12px 0px rgba(0, 0, 0, 0.05)',
        custom2: '0px 1px 2px 0px rgba(0, 0, 0, 0.08)',
        'property-card': '0px 2.4px 13.19px 0px rgba(181, 127, 250, 0.1)',
      },
    },
  },
  plugins: [],
}

