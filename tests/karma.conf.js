'use strict';

var webpackConfig = require('../webpack/webpack.test');

module.exports = (config) => {
    config.set({
        
        basePath: '',

        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],

        phantomJsLauncher: {
            exitOnResourceError: true
        },

        files: [
            {pattern: 'karma.entry.js', watched: false}
        ],

        preprocessors: {
            'karma.entry.js': ['coverage', 'webpack', 'sourcemap']
        },

        webpack: webpackConfig,

        webpackMiddleware: { stats: 'errors-only', noInfo: true },

        webpackServer: { noInfo: true },

        coverageReporter: {
            type: 'in-memory'
        },

        remapCoverageReporter: {
            'text-summary': null,
            json: './coverage/coverage.json',
            html: './coverage/html'
        },

        reporters: ['progress', 'coverage', 'remap-coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: false
    });
}