'use strict';

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackConstants = require('./webpack-constants');
const WebpackCommon = require('./webpack-common');
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = webpackMerge(WebpackCommon, {

    module: {
        rules: [
            applicationCode(),
            jquery()
        ]
    },

    entry: {
        'app': path.resolve(WebpackConstants.BUNDLES_DIR, 'main'),
        'polyfills': path.resolve(WebpackConstants.BUNDLES_DIR, 'polyfills'),
        'bootstrap': 'bootstrap-loader'
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['dependencies'],
            minChunks: (module) => {
                let nodeModulesPath = path.resolve(WebpackConstants.ROOT_DIR, 'nodule_modules');
                return module.resource && module.resource.startsWith(nodeModulesPath);
            },
            chunks: ['app']
        }),

        new AotPlugin({
            basePath: WebpackConstants.ROOT_DIR,
            entryModule: path.resolve(WebpackConstants.APP_DIR, 'app', 'app.module#AppModule'),
            mainPath: path.resolve(WebpackConstants.BUNDLES_DIR, 'main.ts'),
            tsConfigPath: path.resolve(WebpackConstants.ROOT_DIR, 'tsconfig.json'),
            skipCodeGeneration: true
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(WebpackConstants.APP_DIR, 'index.html')
        }),

        new CopyWebpackPlugin([{
            from: path.resolve(WebpackConstants.APP_DIR, 'images'),
            to: '/images'
        }])
    ]
});

function applicationCode() {
    return {
        test: /\.ts$/,
        exclude: [
            /node_modules/,
            /tests/
        ],
        loader: '@ngtools/webpack'
    }
}

function jquery() {
    return {
        test: require.resolve('jquery'),
        use: [{
            loader: 'expose-loader',
            options: 'jQuery'
        }]
    };
}