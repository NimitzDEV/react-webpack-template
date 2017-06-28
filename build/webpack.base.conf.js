const path = require("path");
const config = require("../config");
const utils = require("./utils");

const projectRppt = path.resolve(__dirname, "../");

const env = process.env.NODE_ENV;

const cssSourceMapDev = env === "development" && config.dev.cssSourceMap;
const cssSourceMapProd =
  env === "production" && config.build.productionSourceMap;
const useCssSourceMap = cssSourceMapDev || cssSourceMapProd;

module.exports = {
  entry: {
    app: "./src/index"
  },
  output: {
    path: config.build.assetsRoot,
    // https://webpack.github.io/docs/configuration.html#output-publicpath
    publicPath: process.env.NODE_ENV === "production"
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
    filename: "[name].js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "../src/"),
      src: path.resolve(__dirname, "../src/"),
      "!": path.resolve(__dirname, "../src/assets/"),
      assets: path.resolve(__dirname, "../src/assets/"),
      "#": path.resolve(__dirname, "../src/components/"),
      components: path.resolve(__dirname, "../src/components/")
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: {
          loader: "json-loader"
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: "url-loader",
          query: {
            limit: 10000,
            name: utils.assetsPath("img/[name].[hash].[ext]")
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: "url-loader",
          query: {
            limit: 10000,
            name: utils.assetsPath("fonts/[name].[hash].[ext]")
          }
        }
      }
    ]
  }
};
