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
        rightside: '#F2EBE3',
        cBeige: '#f6f7f2',
        cBlue: '#3c4f6d', 
        cLighBlue: '#A5B5C4',
        cLeft: '#E9E2CF',
        mbWhite: '#F8F6F0',
        mWhite: '#F5F5F5',
        buttonB: '#F7E7CE',
        nWhite: '#E9E2CF',
      },
    },
  },
  plugins: [],
};
