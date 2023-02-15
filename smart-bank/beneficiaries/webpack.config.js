const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("./package.json");
const path = require('path');

const temp = {
  mode: "development",
  devServer: {
    port: 3004,
    historyApiFallback: {
      index: "/",
    },
  },
  entry: "./src/index.js",
  output: {
    publicPath: "http://localhost:3004/",
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
      name: "beneficiaries",
      filename: "remoteEntry.js",
      exposes: {
        "./BeneficiariesComponent": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
  ],
};
console.log(temp.resolve);
module.exports = temp;