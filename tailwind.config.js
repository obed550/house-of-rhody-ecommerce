module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rhody: {
          gold: '#c9a227',
          yellow: '#f4d35e',
          cream: '#f7f1e7',
          blush: '#efc9d1',
          brown: '#4a2e1f',
          blue: '#0f2232',
          navy: '#0e1b2a',
          black: '#121212',
        },
      },
      boxShadow: {
        luxury: '0 20px 50px rgba(15, 34, 50, 0.15)',
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
