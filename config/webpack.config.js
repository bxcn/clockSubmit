const path = require('path');
const webpack = require('webpack');
// 将多CSS文件合并成一个文件
// 设置生成css 的路径和文件名，会自动将对应entry入口js文件中引入的CSS抽出成单独的文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin') // 复制文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// webpack.config.js
module.exports = {
  mode: 'production',
  entry: {
    clockSubmit: "./src/clockSubmit.js",
  },
  output: {
    path: path.resolve(__dirname, "../dist/js/"), // or path: path.join(__dirname, "dist/js"),
    filename: "[name].js"
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          safe: true
        }
      }) // use OptimizeCSSAssetsPlugin
    ]
  },
  // 新添加的module属性
  module: {
    rules: [

      {
        //正则匹配后缀.js文件;
        test: /\.js$/,
        //需要排除的目录
        exclude: /node_modules/,
        //加载babel-loader转译es6
        use: [{
          loader: 'babel-loader'
        }],
      }

    ],
    noParse: [/moment-with-locales/]
  },
  resolve: {
    alias: {

    },
    // 自动解析确定的扩展
    extensions: [".js", ".json"]
  },
  externals: {},

  /**
   * 配置如何展示性能提示。例如，如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你。
   * https://doc.webpack-china.org/configuration/performance/
   * @type {Object}
   */
  performance: {
    hints: false,
    // 入口起点表示针对指定的入口，对于所有资源，要充分利用初始加载时(initial load time)期间。
    // 此选项根据入口起点的最大体积，控制 webpack 何时生成性能提示。默认值是：250000 (bytes)。
    maxEntrypointSize: 400000,
    //资源(asset)是从 webpack 生成的任何文件。此选项根据单个资源体积，控制 webpack 何时生成性能提示。默认值是：250000 (bytes)。
    maxAssetSize: 100000

  },
  plugins: [

  ]
}
