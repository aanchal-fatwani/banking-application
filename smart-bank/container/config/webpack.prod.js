const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  entry: "./src/index.js",

  output: {
    filename: "[name].[contenthash].js",
    publicPath: `${domain}/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        header: "header@http://localhost:3001/remoteEntry.js",
        dashboard: "dashboard@http://localhost:3002/remoteEntry.js",
        auth: "auth@http://localhost:3003/remoteEntry.js",
        beneficiaries: "beneficiaries@http://localhost:3004/remoteEntry.js",
        transactions: "transactions@http://localhost:3005/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
