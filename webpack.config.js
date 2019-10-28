const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html'})
  ],
  devServer: {
      contentBase: './dist',
  },
  module: {
    rules: [
     {
       test: /\.jsx?/,
       exclude: /node_modules/,
       use: [{
           loader: 'babel-loader', 
       }]
      }
    ]
  }
}