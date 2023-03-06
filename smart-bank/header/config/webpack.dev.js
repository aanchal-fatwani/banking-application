const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  entry: "./src/index.js",

  output: {
    publicPath: "http://localhost:3001/",
  },
  devServer: {
    port: 3001,
    historyApiFallback: {
      index: "/",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "header",
      filename: "remoteEntry.js",
      exposes: {
        "./HeaderComponent": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
  ],
};
module.exports = merge(commonConfig, devConfig);
