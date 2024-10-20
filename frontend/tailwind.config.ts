/** @type {import('tailwindcss').Config} **/
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        title:["Bodoni Moda", "serif"],
        noteTitle: ["Didact Gothic", "sans-serif"],
        para:["Gothic A1", "sans-serif"],
      },

    
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cGray: '#d9d8dd',
        cBeige: '#f6f7f2',
        cBlue: '#3c4f6d', 
        cLighBlue: '#a5b5c4',
        cDarkBlue: '#0A1944',
        nWhite: '#F6F7F2',
        hWhite: '#faf6ef',
        mWhite: '#FFFFFF'
      },
    },
  },
  plugins: [],
};
