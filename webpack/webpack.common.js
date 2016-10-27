'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rootDir = path.resolve(__dirname, '..');
const appDir = path.resolve(rootDir, 'public');
const bundlesDir = path.resolve(appDir, 'bundles');

module.exports = {

    rootDir: rootDir,

    resolve: {
        extensions: ['', '.ts', '.js'],
        root: appDir
    },

    module: {
        loaders: [
            html(),
            applicationStyles(),
            applicationCode()
        ]
    }    
};

function html() {
    return { test: /\.html$/, loader: 'html' };
}

function applicationCode() {
    return { test: /\.ts$/, exclude: /node_modules/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] };
}

function applicationStyles() {
    return { test: /\.css$/, include: appDir, loader: 'raw' };
}