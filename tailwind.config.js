module.exports = {
  purge: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/*.md',
    './*.html',
  ],
  // mode: 'jit',
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: [ "Bai Jamjuree", "Prompt", "JetBrainsMono" ]
      }
    }
  },
  variants: {},
  plugins: [],
}
