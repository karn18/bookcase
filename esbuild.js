const { build } = require('esbuild')

build({
  entryPoints: ['javascripts/main.js'],
  outfile: 'assets/javascripts/main.js',
  minify: process.env.NODE_ENV === 'production',
  bundle: true,
})
.then(() => console.log("⚡ Build Done !!!"))
.catch(() => process.exit(1))
