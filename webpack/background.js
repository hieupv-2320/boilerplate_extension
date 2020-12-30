const { resolve } = require('path');


module.exports = {
    mode: process.env.NODE_ENV,
  
    name: 'content-scripts',
  
    entry: [
      './src/background/index.js',
    ],
  
    output: {
      path: resolve(__dirname, '../dist'),
      filename: 'background/background.js',
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
}