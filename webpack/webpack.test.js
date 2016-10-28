'use strict';

const path = require('path');
const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.common');

module.exports = webpackMerge(commonConfig, {

  devtool: 'inline-source-map',

  resolve: {
    alias: {
      'tests': path.resolve(commonConfig.rootDir, 'tests')
    }
  },

  module: {
    preLoaders: [
      { exclude: /node_modules/, loader: 'tslint', test: /\.ts$/ }
    ]
  },

  tslint: {
    emitErrors: true
  }
});