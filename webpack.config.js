const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  devtool: devMode ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',

  entry: './src/app.js',

  output: {
    // webpack 如何输出结果的相关选项

    path: path.resolve(__dirname, 'dist'), // string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）

    filename: 'bundle.js', // string
    // 「入口分块(entry chunk)」的文件名模板（出口分块？）

    publicPath: '/' // string
    // 输出解析文件的目录，url 相对于 HTML 页面
  },

  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3009'
    },
    host: '127.0.0.1', // 主机地址
    port: 3000, // 端口号
    contentBase: path.join(__dirname, 'dist'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    // color: true,
    open: true,
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    stats: {
      colors: true,
      children: false, // 增加子级的信息
      chunks: false, // 增加包信息（设置为 `false` 能允许较少的冗长输出）
      chunkModules: false,
      modules: false, // 增加内置的模块信息
      reasons: false, // 增加模块被引入的原因
      source: false // 增加模块的源码
    }
    // ...
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        // exclude: [
        //   path.resolve(__dirname, 'node_modules')
        // ],
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        // use: sassExtract.extract({
        //   use: ['css-loader', 'sass-loader']
        // })
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: { javascriptEnabled: true }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|woff|woff2|ttf|otf|eot)$/,
        // exclude: [
        //   path.resolve(__dirname, 'node_modules')
        // ],
        loader: 'url-loader?limit=8192'
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src', 'lib'),
      to: path.resolve(__dirname, 'dist')
    }]),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      hash: true, // 防止缓存
      minify: {
        removeAttributeQuotes: true // 压缩 去掉引号
      }
    }),
    // new ExtractTextWebapckPlugin({
    //   filename: '[name].css',
    //   allChunks: true
    // }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  stats: {
    colors: true,
    children: false, // 增加子级的信息
    chunks: false, // 增加包信息（设置为 `false` 能允许较少的冗长输出）
    chunkModules: false,
    modules: false, // 增加内置的模块信息
    reasons: false, // 增加模块被引入的原因
    source: false // 增加模块的源码
  },

  // optimization: {
  //   splitChunks: { // 提取公共模块

  //   }
  // },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  externals: {
    'react': 'var React',
    'react-dom': 'var ReactDOM'
  }
};
