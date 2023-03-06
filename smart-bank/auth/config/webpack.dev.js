const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    publicPath: "http://localhost:3003/",
  },
  devServer: {
    port: 3003,
    historyApiFallback: {
      index: "/",
    },
  },
  plugins: [
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
module.exports = merge(commonConfig, devConfig);
