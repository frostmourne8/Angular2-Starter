'use strict';

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const WebpackConstants = require('./webpack-constants');
const WebpackDeployed = require('./webpack-deployed');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

module.exports = webpackMerge(WebpackDeployed, {

    devServer: {
        host: '0.0.0.0',
        contentBase: WebpackConstants.APP_DIR,
        port: 9000,
        inline: false,
        proxy: {
            '/api': 'http://127.0.0.1/3000'
        },
        watchOptions: {
            poll: true
        }
    },

    output: {
        filename: '[name].js',
        path: WebpackConstants.APP_DIR
    },

    plugins: [
        new webpack.SourceMapDevToolPlugin()
    ]
});