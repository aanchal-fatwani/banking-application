const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("./package.json");
const path = require('path');

module.exports = {
  mode: "development",
  devServer: {
    port: 3002,
    historyApiFallback: {
      index: "/",
    },
  },
  entry: "./src/index.js",
  output: {
    publicPath: "http://localhost:3002/",
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
    ],
  },
  resolve:{
    alias: {
      // Config: path.resolve(__dirname, "..", "src", "config"),
      // Components: path.resolve(__dirname, "...", "src", "components"),
      // Ducks: path.resolve(__dirname, "..", "src", "ducks"),
      // Shared: path.resolve(__dirname, "..", "src", "shared"),
      // App: path.join(__dirname, "..", "src")

      components: path.resolve(__dirname, './src/components/'),
      api: path.resolve(__dirname, './src/api/'),
      assets: path.resolve(__dirname, './src/assets/'),

  },
  
  extensions: ['', '.js', '.jsx']
},
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./DashboardComponent": "./src/bootstrap",
      },
      remotes: {
        quickPay: "quickPay@http://localhost:3006/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
  ],
};
