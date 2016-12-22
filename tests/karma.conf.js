'use strict';

var webpackConfig = require('../webpack/webpack.test');

module.exports = (config) => {
    config.set({
        
        basePath: '',
        browserNoActivityTimeout: 60 * 1000, //For single runs that include webpack bundling

        browsers: ['Chrome'],
        frameworks: ['jasmine'],

        phantomJsLauncher: {
            exitOnResourceError: true
        },

        files: [
            {pattern: 'karma.entry.js', watched: false},
            {pattern: '../public/images/**/*', included: false, served: true, watched: false}
        ],

        proxies: {
            "/images/": "/base/public/images/"
        },

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