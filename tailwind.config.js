// Tailwind settings for the whole site.
// The pages load the built file assets/css/tailwind.css. After adding NEW Tailwind classes
// to any page, rebuild that file with:  npm run build:css
// Brand colours come from the logo: gold mark, black wordmark, navy window.

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  // Only switch to dark styles when a page opts in with class="dark"; keeps the design
  // the same for visitors whose computer is set to dark mode.
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // "primary" = brand gold (the readable shade for text and buttons on white)
        primary: { DEFAULT: '#8C6A3B', dark: '#7D5E33' },
        gold: {
          50: '#FAF6EF',
          100: '#F3E9D8',
          200: '#E6D3B3',
          300: '#D9B981',
          400: '#C9A66B',
          500: '#AB834F', // logo gold
          600: '#8C6A3B',
          700: '#7D5E33',
          800: '#5E4626',
          900: '#3F2F1A',
        },
        ink: '#111827',
        charcoal: '#1F1F23',
        cream: '#FAF6EF',
        navy: '#273A7C', // logo window
      },
      container: { center: true, padding: { DEFAULT: '1rem', md: '1.5rem', lg: '2rem', xl: '2.5rem' } },
    },
  },
};
