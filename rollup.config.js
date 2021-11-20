import resolve from "@rollup/plugin-node-resolve"

export default {
  input: "javascripts/main.js",
  output: {
    file: "assets/javascripts/main.js",
    format: "es"
  },
  plugins: [
    resolve()
  ]
}
