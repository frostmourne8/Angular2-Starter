'use strict';

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const WebpackConstants = require('./webpack-constants');
const WebpackCommon = require('./webpack-common');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

module.exports = webpackMerge(WebpackCommon, {

    devtool: 'inline-source-map',

    module: {
        rules: [
            assets(),
            applicationCode()
        ]
    },

    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: null, // if no value is provided the sosurcemap is inlined,
            test: /\.(ts|js)($|\?)/i, // process .js and .ts files only
            include: [ 'main.ts' ]
        }),

        new TsConfigPathsPlugin({
            tsconfig: path.resolve(WebpackConstants.ROOT_DIR, 'tsconfig.json'),
            compiler: 'typescript'
        })
    ]
});

function assets() {
    return {
        test: WebpackConstants.RESOURCE_PATTERN,
        loader: 'null-loader'
    };
}

function applicationCode() {
    return {
        test: /\.ts$/,
        exclude: /node_modules/,
        loaders: [
            'awesome-typescript-loader',
            'angular2-template-loader'
        ]
    };
}
