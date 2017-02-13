var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

var includePaths = [
  fs.realpathSync(__dirname + '/node_modules/jju'),
];

module.exports = function () {
  return {
    entry: {
      main: ['./src/main.js', './src/kii.js', 'kii-gateway-agent', 'body-parser', 'net', 'math-uint32-to-binary-string', 'math-float32-from-bits'],
      mt7688: ['./src/kii_mt7688_v11.js', 'body-parser', 'net', 'math-uint32-to-binary-string', 'math-float32-from-bits'],
      // test: ['./src/test.js', 'kii-gateway-agent'],
      // test2: ['./src/test2.js', './src/kii.js'],
      // vendor: ['kii-gateway-agent']
    },
    target: 'node',
    // module: {
    //   loaders: [{
    //     test: /\.js?$/,
    //     include: includePaths,
    //     loader: 'babel-loader'
    //   }]
    // },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: 'src/resource',
        to: 'resource'
      }])
      // new webpack.optimize.CommonsChunkPlugin({
      //   names: 'vendor'
      // })
    ],
    externals: {
      'express': 'require("express")',
      'jju': 'require("jju")',
      'jsupm_i2clcd': 'require("jsupm_i2clcd")'
    }
  };
}