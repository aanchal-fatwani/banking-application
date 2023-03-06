const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const domain = "";
const prodConfig = {
  mode: "production",
  entry: "./src/index.js",

  output: {
    filename: "[name].[contenthash].js",
    publicPath: `${domain}/`,
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

module.exports = merge(commonConfig, prodConfig);
