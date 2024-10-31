import { tailwindPlugin } from './tailwindPlugin'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        textColor3: 'rgba(47, 43, 61, 0.4) dark:rgba(225,222,245,0.4)',
      },
      boxShadow: {
        primary:
          '0 3px 12px rgba(47, 43, 61,0.14),0 0 transparent,0 0 transparent',
      },
      screens: {
        tablet: '768px',
        desktop: '1440px',
      },
    },
  },
  plugins: [tailwindPlugin],
}
