const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  resolve:{
      alias: {
        components: path.resolve(__dirname, '../src/components/'),
        api: path.resolve(__dirname, '../src/api/'),
        assets: path.resolve(__dirname, '../src/assets/'),
    },
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
