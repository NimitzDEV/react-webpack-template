const path = require("path");
const config = require("../config");
const utils = require("./utils");
const webpack = require("webpack");
const merge = require("webpack-merge");

const baseWebpackConfig = require("./webpack.base.conf");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

const env =
  process.env.NODE_ENV === "testing"
    ? require("../config/test.env")
    : config.build.env;

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: [
      {
        test: /\.s[ac]ss/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader",
              options: { sourceMap: true }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: { sourceMap: true }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new ExtractTextPlugin(utils.assetsPath("css/[name].[contenthash].css")),
    new HtmlWebpackPlugin({
      filename:
        process.env.NODE_ENV === "testing" ? "index.html" : config.build.index,
      template: "./src/index.html",
      inject: true,
      minify: {
        removeComments: true,
        collaspseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: "dependency"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: (module, count) => {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, "../node_modules/") === 0
          )
        );
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      chunks: ["vendor"]
    }),
    extractSass
  ]
});

if (config.build.productionGzip) {
  const compressionWebpackPlugin = require("compression-webpack-plugin");

  webpackConfig.plugins.push(
    new compressionWebpackPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp(
        "\\.(" + config.build.productionGzipExtensions.join("|") + ")$"
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

module.exports = webpackConfig;
