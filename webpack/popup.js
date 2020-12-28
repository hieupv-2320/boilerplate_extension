const { resolve } = require('path');

const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const devMode = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV,

  name: 'popup',

  entry: [
    './src/popup/main.js',
  ],

  output: {
    path: resolve(__dirname, '../dist/popup'),
    filename: 'js/index.js',
  },

  resolve: {
    extensions: ['.js', '.vue', '.scss', '.css'],
    alias: {
      '@': resolve(__dirname, '../src'),
    },
  },

  devServer: {
    inline: false,
    contentBase: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules|bower_components/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          },
        },
      },
      {
        test: /\.css$/, use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/, use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' }
        ]
    },
      {
        test: /\.(png|jpg|svg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]?[hash]',
          esModule: false,
        },
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),

    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
      ignoreOrder: false,
    }),

    new HtmlPlugin({
      template: resolve(__dirname, '../template/popup.html'),
      filename: 'index.html',
    }),
  ],
};
