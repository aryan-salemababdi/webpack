const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const inProduction = process.env.NODE_ENV === "production";


module.exports = {
  mode: 'development',
  entry: {
    app: [
      "./src/main.js",
      "./src/main.scss",
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name][hash].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    })
  ]
};

if (inProduction) {
  module.exports.plugins.push(
    new webpack.optimize.UglyfyJsPlugin()
  )
}