'use strict';

const path = require('path');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const deployedConfig = require('./webpack.deployed');
const distDir = path.resolve(deployedConfig.rootDir, 'public');

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

const DEV_ENDPOINTS = [];
const PROXY_TARGET = {host: "localhost", protocol: 'http:', port: 3000};

module.exports = webpackMerge(deployedConfig, {

    debug: true,
    devtool: 'source-map',

    devServer: {
        contentBase: distDir,     
        port: 9000,
        inline: false,
        proxy: createDevProxy()
    },
    
    output: {
        filename: '[name].js',
        path: distDir
    },
});

function createDevProxy() {
    let proxy = {};
    DEV_ENDPOINTS.forEach((endpoint) => {
        proxy[endpoint] = PROXY_TARGET;
    });

    return proxy;
}