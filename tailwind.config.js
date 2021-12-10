const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    layers: ['base', 'components', 'utilities'],
    content: [
      './_includes/**/*.html',
      './_layouts/**/*.html',
      './_posts/*.md',
      './*.html'
    ]
  },
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        orange: colors.orange
      },
      fontSize: {
        'xs': '.75rem',
        'sm': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
      },
      fontFamily: {
        sans: [ "Bai Jamjuree" ],
        serif: [ "Prompt" ],
        mono: [ "JetBrainsMono" ]
      },
      container: {
        // you can configure the container to be centered
        center: true,
  
        // or have default horizontal padding
        padding: '1rem',
  
        // default breakpoints but with 40px removed
        screens: {
          sm: '600px',
          md: '728px',
          lg: '984px',
          xl: '1240px',
          '2xl': '1240px',
        }
      },
      inset: {
        '17': '4.25rem',
        '18': '4.5rem',
      }
    }
  },
  variants: {},
  plugins: []
}
