module.exports = {
  entry: {
    "prs-markdown-render.min": "./index.js",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.min?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: 'babel-loader?presets[]=es2015',
          }
        }
      }
    ]
  },
  performance : {
    hints : false,
  },
};