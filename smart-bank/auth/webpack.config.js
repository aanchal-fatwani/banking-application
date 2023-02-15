const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("./package.json");
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

module.exports = {
  mode: "development",
  devServer: {
    port: 3003,
    historyApiFallback: {
      index: "/",
    },

  },
  entry: "./src/index.js",
  output: {
    publicPath: "http://localhost:3003/",
    filename: "[name].[contenthash].js",
  },
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
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthComponent": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
  ],
};
