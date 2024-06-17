/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'grey':{
          light: '#f3f4f6',
          DEFAULT: '#b3b3b3'
        },
        
      },
    },
  },
  plugins: [],
}

