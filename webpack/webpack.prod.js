'use strict';

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const deployedConfig = require('./webpack.deployed');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(deployedConfig, {
    devtool: 'source-map',

    output: {
        path: path.resolve(deployedConfig.rootDir, 'server', 'public'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    htmlLoader: {
        minimize: false // workaround for ng2
    },

    plugins: [
        new webpack.NoErrorsPlugin(), //Build process will still bail on errors. Resources with errors are simply not emmited.
        new webpack.optimize.DedupePlugin(), //Exclude duplicated resources
        new webpack.optimize.UglifyJsPlugin({ //Cause my code is too pretty :D
            mangle: { keep_fnames: true }, //Required for angular2
            compress: { warnings: false }
        }),
        new ExtractTextPlugin('[name].[hash].css'),
        new webpack.DefinePlugin({
            'process.env': { 'ENV': JSON.stringify(ENV) }
        })
    ]
});