const HtmlWebpackPlugin = require("html-webpack-plugin");
// const cssRegex = /\.css$/;
// const cssModuleRegex = /\.module\.css$/;

module.exports = {
  // module: {
  //   rules: [
  //     {
  //       loader: "babel-loader",
  //       test: /\.js/,
  //       exclude: /node_modules/,
  //       options: {
  //         presets: ["@babel/preset-react"],
  //       },
  //     },
  //     {
  //       test: cssRegex,
  //       exclude: cssModuleRegex,
  //       use: ["style-loader", "css-loader"],
  //     },
  //     {
  //       test: /\.s[ac]ss$/i,
  //       use: [
  //         // Creates `style` nodes from JS strings
  //         "style-loader",
  //         // Translates CSS into CommonJS
  //         "css-loader",
  //         // Compiles Sass to CSS
  //         "sass-loader",
  //       ],
  //     },

  //   ],
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
