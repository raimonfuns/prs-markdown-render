const webpack_rules = [];
const webpackOption = {
    entry: {
      "prs-markdown-render.min": "./index.js",
    },
    output: {
      path: __dirname + "/dist",
      filename: "[name].es5.js"
    },
    module: {
        rules: webpack_rules
    },
    performance : {
      hints : false,
    },
};
let babelLoader = {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: "babel-loader",
        options: {
            presets: ["@babel/preset-env"]
        }
    }
};
webpack_rules.push(babelLoader);
module.exports = webpackOption;