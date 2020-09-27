// Imports: Dependencies
const path = require("path");
require("@babel/register");

const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// Webpack Configuration
const config = {
  target: "web",

  // Entry
  entry: "./src/main.js",

  // Output
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },

  // Plugins
  plugins: [new MiniCssExtractPlugin()],

  // Loaders
  module: {
    rules: [
      // JavaScript/JS Files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      // CSS Files
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      // SGV, Font Files
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        use: ["file-loader"],
      },
    ],
  },

  // Dev server settings
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },

  // Terser to minify js
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },

  // OPTIONAL
  // Reload On File Change
  watch: true,
  // Development Tools (Map Errors To Source File)
  devtool: "source-map",

  mode: "development",
};

// Exports
module.exports = config;
