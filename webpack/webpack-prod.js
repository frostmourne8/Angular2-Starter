'use strict';

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const WebpackConstants = require('./webpack-constants');
const WebpackDeployed = require('./webpack-deployed');

module.exports = webpackMerge(WebpackDeployed, {

    devtool: 'source-map',

    output: {
        path: path.resolve(WebpackConstants.ROOT_DIR, 'dist', 'src'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: { keep_fnames: true },
            compress: { warnings: false }
        }),
        new webpack.DefinePlugin({
            'process.env': { ENV: '"production"' }
        })
    ]
});