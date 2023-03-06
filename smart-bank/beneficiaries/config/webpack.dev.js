const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  entry: "./src/index.js",

  output: {
    publicPath: 'http://localhost:3004/',
  },
  devServer: {
    port: 3004,
    historyApiFallback: {
      index: '/',
    },
  },
  plugins: [
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
module.exports = merge(commonConfig, devConfig);