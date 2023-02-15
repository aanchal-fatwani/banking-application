const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =  require("webpack/lib/container/ModuleFederationPlugin")
module.exports = {
  mode: "development",
  devServer: {
    port: "3006",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
        name:"quickPay",
        filename:"remoteEntry.js",
        exposes:{
            "./quickPayIndex":"./src/index.js"
        }
    })
  ],
};
