const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue-dark-1': '#19254D',
        'blue-dark-2': '#232F5C',
        'blue-dark-3': '#2E3B6B',
        'blue-light': '#CBCAF9',
        blue: '#1AD6FF',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.bg-gradient-purple': {
          background: 'linear-gradient(45deg, #8D3AF8 0%, #5A07C5 100%)',
        },
        '.bg-gradient-purple-light': {
          background: 'linear-gradient(45deg, #AA6BFA 0%, #7109F6 100%)',
        },
      });
    }),
  ],
};
