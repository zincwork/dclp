const ConcatPlugin = require('webpack-concat-plugin');

module.exports = {
  entry: ["./dist/core.js"],
  output: {
    filename: "bundle.js"
  },
  plugins: [
    new ConcatPlugin({
        sourceMap: true,
        name: 'core',
        fileName: '[name].bundle.js',
        filesToConcat: ["./dist/core.js"]
    })
  ]
 }
