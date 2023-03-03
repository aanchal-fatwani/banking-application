const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  entry: "./src/index.js",

  output: {
    publicPath: "http://localhost:3006/",
  },
  devServer: {
    port: 3006,
    historyApiFallback: {
      index: "/",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "quickPay",
      filename: "remoteEntry.js",
      exposes: {
        "./quickPayIndex": "./src/index.js",
      },
    }),
  ],
};
module.exports = merge(commonConfig, devConfig);
