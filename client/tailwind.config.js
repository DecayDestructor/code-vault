const { nextui } = require('@nextui-org/react')
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      'inter-tight': ['Inter Tight', 'sans-serif'],
      lato: ['Lato', 'sans-serif'],
    },
    extend: {
      colors: {
        'bg-primary': '#222831',
        linkedin: '#0A66C2',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
