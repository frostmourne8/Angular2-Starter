'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackConstants = require('./webpack-constants');

module.exports = {

    resolve: {
        modules: [
            'node_modules',
            WebpackConstants.APP_DIR,
            path.resolve(WebpackConstants.ROOT_DIR, 'server')
        ],
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            styles(),
            html(),
            fileAssets(),
            urlAssets()
        ]
    },

    plugins: [
        new ExtractTextPlugin('[name].[hash:20].css'),

        /* Fixes a spurious warning when building */
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            WebpackConstants.APP_DIR
        )
    ]
};

function fileAssets() {
    return {
        test: /\.(eot|svg|ico)$/,
        loader: 'file-loader?name=[name].[hash:20].[ext]'
    };
}

function urlAssets() {
    return {
        test: /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
        loader: 'url-loader?name=[name].[hash:20].[ext]&limit=10000'
    };
}

function  html() {
    return { test: /\.html$/, loader: 'raw-loader' };
}

function styles() {
    return {
        test: /\.css$/,
        loaders: [
            'exports-loader?module.exports.toString()',
            'css-loader?{\"sourceMap\": false, \"importsLoaders\": 1}'
        ]
    };
}

function libraryStyles() {
    return {
        test: /\.css$/,
        exclude: WebpackConstants.APP_DIR,
        use: ExtractTextPlugin.extract(['css-loader'])
    };
}