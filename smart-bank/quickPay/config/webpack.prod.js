const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");
// const dotenv = require("dotenv");
// let config = require("config");

// dotenv.config({ path: "./config.env" });

// const domain = process.env.PRODUCTION_DOMAIN;
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
      name: "quickPay",
      filename: "remoteEntry.js",
      exposes: {
        "./quickPayIndex": "./src/index.js",
      },
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
