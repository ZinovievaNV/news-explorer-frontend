const path = require('path');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const autoprefixer = require('autoprefixer');


const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    index: './src/js/index.js',
    articles: './src/js/articles/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/, //матчится js файлы через бабель исключив node_modules
        use: {loader: 'babel-loader'},
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [
          (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer()
              ],
              sourceMap: true
            }
          },

        ]
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
              useRelativePath: true,
              esModule: false,

            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              outputPath: "./images/",
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
              mimetype: 'application/font-woff',
              publicPath: '../',
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      inject: false, // стили НЕ нужно прописывать внутри тегов
      template: './src/pages/index.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      inject: false, // стили НЕ нужно прописывать внутри тегов
      template: './src/pages/articles.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'articles.html',
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].[contenthash].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/i,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true// оставлять сообщение в консоли
    }),

    new WebpackMd5Hash(),
  ]
};