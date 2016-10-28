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
    ],
    loaders: [
      {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader',
          exclude: [/node_modules/],
          query: {
            // use inline sourcemaps for "karma-remap-coverage" reporter
            sourceMap: false,
            inlineSourceMap: true,
            compilerOptions: {

              // Remove TypeScript helpers to be injected
              // below by DefinePlugin
              removeComments: true

            }
          }          
        },
    ],
    postLoaders: [
      {
        test: /\.ts$/,
        loader: 'istanbul-instrumenter-loader',
        include: [
          /public/
        ]
      }
    ]
  },

  tslint: {
    emitErrors: true
  }
});