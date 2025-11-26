/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      fontFamily: {
        title: ['var(--font-passionone)'],
        secondary: ['var(--font-patuaone)'],
        paragraph: ['var(--font-opensans)'],
      },
      colors: {
        darkred: '#C1121F',
        red: '#EF1424',
        lightred: '#F4383E',
        yellow: '#FFD000',
        lightyellow: '#FFE578',
        black: '#303030',
        white: '#FFFDFD',
      },
    },
  },
  variants: {},
  plugins: [],
};
