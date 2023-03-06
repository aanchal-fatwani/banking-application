const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  entry: "./src/index.js",

  output: {
    publicPath: "http://localhost:3005/",
  },
  devServer: {
    port: 3005,
    historyApiFallback: {
      index: "/",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "transactions",
      filename: "remoteEntry.js",
      exposes: {
        "./TransactionsComponent": "./src/bootstrap",
      },
      remotes: {
        quickPay: "quickPay@http://localhost:3006/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
  ],
};
module.exports = merge(commonConfig, devConfig);
