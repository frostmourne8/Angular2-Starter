'use strict';

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonConfig = require('./webpack.common');

const appDir = path.resolve(commonConfig.rootDir, 'public');
const bundlesDir = path.resolve(appDir, 'bundles');

const resourcePattern = /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/;

module.exports = webpackMerge(commonConfig, {

    entry: {
        'polyfills': path.resolve(bundlesDir, 'polyfills.ts'),
        'dependencies': path.resolve(bundlesDir, 'dependencies.ts'),
        'main': path.resolve(bundlesDir, 'main.ts')
    },

    module: {
        loaders: [
            assets(),
            libraryStyles(),
            applicationCode()
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['dependencies', 'main', 'polyfills'],
            minChunks: Infinity
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(appDir, 'index.html')
        })
    ]
});

function applicationCode() {
    return { test: /\.ts$/, exclude: /node_modules/, loader: 'awesome-typescript-loader' };
}

function assets() {
    return {
        test: resourcePattern,
        loader: 'file?name=assets/[name].[hash].[ext]'
    };
}

function libraryStyles() {
    return {
        test: /\.css$/,
        exclude: appDir,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
    };
}