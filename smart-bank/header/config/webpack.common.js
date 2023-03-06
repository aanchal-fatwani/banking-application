const HtmlWebpackPlugin = require("html-webpack-plugin");
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

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
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
