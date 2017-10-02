'use strict';

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const WebpackCommon = require('./webpack-common');
const WebpackConstants = require('./webpack-constants');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

module.exports = webpackMerge(WebpackCommon, {

    module: {
        rules: [
            assets(),
            lintLoader(),
            coverageLoader(),
            testTranspileLoader(),
            testTemplateLoader()
        ],
        exprContextCritical: false
    },

    plugins: [
        new TsConfigPathsPlugin({
            tsconfig: path.resolve(WebpackConstants.ROOT_DIR, 'tsconfig.json'),
            compiler: 'typescript'
        })
    ]
});

function lintLoader() {
    return {
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'tslint-loader',
        test: /\.ts$/,
        options: {
            emitErrors: true,
            failOnHint: true
        }
    };
}

function coverageLoader() {
    return { 
        test: /\.ts$/,
        enforce: 'post',
        loader: 'istanbul-instrumenter-loader',
        include: [ WebpackConstants.APP_DIR ],
        exclude: [ /tests/ ]
    };
}

function testTranspileLoader() {
    return {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: [ /node_modules/ ],
        query: {
            sourceMap: false,
            inlineSourceMap: true,
            compilerOptions: {
                removeComments: true
            }
        }
    };
}

function assets() {
    return {
        test: WebpackConstants.RESOURCE_PATTERN,
        loader: 'null-loader'
    };
}

function testTemplateLoader() {
    return {
        test: /\.ts$/,
        loader: 'angular2-template-loader'
    }
}