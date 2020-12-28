const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pkg = require('../package.json');
const manifestTemplate = require('../template/manifest.json');

module.exports = {
    mode: process.env.NODE_ENV,
  
    name: 'content-scripts',
  
    entry: [
      './src/contentScripts/content.js',
    ],
  
    output: {
      path: resolve(__dirname, '../dist'),
      filename: 'content-scripts/main.js',
    },
  
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': resolve(__dirname, '../src'),
      },
    },
  
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },

    plugins: [
        new CopyWebpackPlugin({patterns: [
          {
            from: './template/manifest.json',
            to: 'manifest.json',
            transform: () => {
              manifestTemplate.version = pkg.version;
    
              return Buffer.from(JSON.stringify(manifestTemplate, null, 2));
            },
          },
          {
            from: './template/logo',
            to: 'assets/icons',
          },
        ],
      }),
    ],
}