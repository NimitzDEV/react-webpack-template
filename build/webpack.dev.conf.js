const config = require("../config");
const webpack = require("webpack");
const merge = require("webpack-merge");
const utils = require("./utils");

const baseWebpackConfig = require("./webpack.base.conf");
const HtmlWebpackPlugin = require("html-webpack-plugin");

Object.keys(baseWebpackConfig.entry).forEach(name => {
  baseWebpackConfig.entry[name] = ["./build/dev-client"].concat(
    baseWebpackConfig.entry[name]
  );
});

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: "style-loader",
            options: { sourceMap: process.env.NODE_ENV === "development" }
          },
          {
            loader: "css-loader",
            options: {
              localIdentName: "[sha512:hash:base32]-[name]-[local]",
              modules: false,
              sourceMap: process.env.NODE_ENV === "development"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: process.env.NODE_ENV === "development"
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: process.env.NODE_ENV === "development"
            }
          }
        ]
      }
    ]
  },
  devtool: "#eval-source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": config.dev.env
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      inject: true
    })
  ]
});
