const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("./package.json");
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const path = require('path');


module.exports = {
  mode: "development",
  devServer: {
    port: 3005,
    historyApiFallback: {
      index: "/",
    },
  },
  entry: "./src/index.js",
  output: {
    publicPath: "http://localhost:3005/",
    filename: "[name].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          // presets: ["@babel/preset-react"],
          // presets: ["@babel/preset-react", {"runtime": "automatic"}]
          "presets": [
            "@babel/preset-env",
           ["@babel/preset-react", {"runtime": "automatic"}]
        ]
   
        },
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
          loader: require.resolve('css-loader'),
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
