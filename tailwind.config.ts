import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rhody: {
          gold: '#C9A227',
          yellow: '#F4D35E',
          cream: '#F7F1E7',
          blush: '#EFC9D1',
          brown: '#4A2E1F',
          blue: '#0F2232',
          navy: '#0E1B2A',
          black: '#121212',
        },
      },
      boxShadow: {
        luxury: '0 20px 50px rgba(15, 34, 50, 0.15)',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
